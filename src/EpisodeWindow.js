import '../assets/css/menu-document-content.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/episode-layout.css';
import * as udviz from 'ud-viz';
import { MultiMediaObject } from './MultiMediaObject';

/**
 * Class that construct the UI to select the multimedia in the 3D scene, it create different button and the layout to see all the content in the same view
 */
export class EpisodeWindow {
  /**
   * 
   * @param {View3D} view3D the view where you put all your content 
   * @param {*} listMultimediaObject 
   */
  constructor(view3D = new udviz.Views.View3D(), listMultimediaObject) {
    this.view3D = view3D;

    //List of an Object content : must be a list of list
    this.listMultimediaObject = listMultimediaObject;

  }

  /**
   * Creation of HTML UI and setup button listener
   */
  constructMenu(){    
    //UI
    let MenuDiv = document.createElement('div');
    MenuDiv.id = 'question-title';
    document.getElementById('webgl_View3D').append(MenuDiv);

    document.getElementById('question-title').innerHTML = 
        '<h1>Derrière les fumées</h1>\
       ';

    //Button pannel
    let episodeMenuDiv = document.createElement('div');
    episodeMenuDiv.id = 'menu-question';
    document.getElementById('webgl_View3D').append(episodeMenuDiv);

    document.getElementById('menu-question').innerHTML = 
        '<ul id="_all_menu_content">\
          <h1>Derrière les fumées</h1>\
          <h2>La vallée de la chimie de l’intérieur</h2>\
          <li><button id="Q1">La perception de l’industrie chimique</button>\
          <li><button id="Q2">Les compétences nécessaires</li>\
          <li><button id="Q3">Qui peut travailler dans l’industrie chimique</<button></li>\
          <li><button id="Q4">Le travail dans l’industrie chimique</<button></li>\
          <li><button id="Q5">L’évolution des métiers</<button></li>\
          <li><button id="Q6">L’avenir de l’industrie chimique</<button></li>\
          <li></li>\
        </ul>\
       ';

    // Interactive content HMTL
    this.divInteractiveContent = document.createElement('div');
    this.divInteractiveContent.id = 'interview';
    document.getElementById('webgl_View3D').append(this.divInteractiveContent);
    this.divInteractiveContent.innerHTML = 
      '<button id="close"><img src="./assets/icons/logoCroixRouge.png" /></button>\
       <div id="iframe-video"></div>\
      ';

    //Button close
    document.getElementById('close').onclick = () => {
      this.divInteractiveContent.hidden = true;
      document.getElementById('iframe-video').innerHTML = '';
    };

    //Content Menu initialize
    this.contentDivUI = document.createElement('div');
    this.contentDivUI.id = 'content-ui';
    document.getElementById('webgl_View3D').append(this.contentDivUI);
    this.contentDivUI.hidden = true;

    this.divInteractiveContent.hidden = true;
    episodeMenuDiv.hidden = true;

    //Q1 button
    let elementButton1 =  document.getElementById('Q1');
    elementButton1.addEventListener(
      'mousedown',
      () => {
        let dataButtonChap1 = [['Prendre de la hauteur', './../Contenus sup/Chap01/Prendre de la hauteur/story.html'],['Qu’est-ce que la chimie ?','./../Contenus sup/Chap01/Qu_est-ce que la chimie/story.html']];
        this.createContentChap(elementButton1.textContent, dataButtonChap1,'./../Contenus sup/Questions/Q01/story.html', './../Contenus sup/Chap01/C_est_sur_une_bonne_voie_Jeune marche.mp3' );
        episodeMenuDiv.hidden = true;
        this.setObjectVisibility(this.listMultimediaObject[0]);
        this.travellingViewToSeeContent(new udviz.THREE.Vector3(1843554.77, 5165405.73, 220), 4000, 8500);
                
      },
      false
    );

    //Q2 button
    let elementButton2 =  document.getElementById('Q2');
    elementButton2.addEventListener(
      'mousedown',
      () => {
        let dataButtonChap2 = [['SoftSkills', './../Contenus sup/Chap02/SokftSkills/story.html']];
        this.createContentChap(elementButton2.textContent, dataButtonChap2,'./../Contenus sup/Questions/Q02/story.html', './../Contenus sup/Chap02/Que_de_la_motivation_Voix.mp3');
        episodeMenuDiv.hidden = true;
        this.setObjectVisibility(this.listMultimediaObject[1]);  
        this.travellingViewToSeeContent(new udviz.THREE.Vector3(1844147.58, 5166881.05, 220), 4000, 8800);   
      },
      false
    );

    //Q3 button
    let elementButton3 =  document.getElementById('Q3');
    elementButton3.addEventListener(
      'mousedown',
      () => {
        let dataButtonChap3 = [['Compétence ou pas ?', './../Contenus sup/Chap03/Compétence ou pas/story.html'], ['Le parcours d’alternant', './../Contenus sup/Chap03/Parcours alternant/story.html'], ['Peut-on se reconvertir dans l’industrie chimique ?', './../Contenus sup/Chap03/Se reconvertir/story.html']];
        this.createContentChap(elementButton3.textContent, dataButtonChap3,'./../Contenus sup/Questions/Q03/story.html', './../Contenus sup/Chap03/De_plus_en_plus_de_competences_requises_Prof_place_Guichard.mp3');
        episodeMenuDiv.hidden = true;
        this.setObjectVisibility(this.listMultimediaObject[2]); 
        
        this.travellingViewToSeeContent(new udviz.THREE.Vector3(1844147.58, 5166881.05, 220), 4000, 8800);
      },
      false
    );

    //Q4 button
    let elementButton4 = document.getElementById('Q4');
    elementButton4.addEventListener(
      'mousedown',
      () => {
        let dataButtonChap4 = [['C’est quoi une raffinerie ?', './../Contenus sup/Chap04/C est quoi une raffinerie/story.html'], ['Comment fidéliser ?', './../Contenus sup/Chap04/Commen fidéliser/story.html']];
        this.createContentChap(elementButton4.textContent, dataButtonChap4,'./../Contenus sup/Questions/Q04/story.html','./../Contenus sup/Chap04/Des_metiers_bien_payes_Infirmieere_Marchee.mp3');
        episodeMenuDiv.hidden = true; 
        this.setObjectVisibility(this.listMultimediaObject[3]);   

        this.travellingViewToSeeContent(new udviz.THREE.Vector3(1844032.16, 5165242.68, 220), 4000, 8800);
      },
      false
    );

    //Q5 button
    let elementButton5 = document.getElementById('Q5');
    elementButton5.addEventListener(
      'mousedown',
      () => {
        let dataButtonChap5 = [['Et dans les ressources humaines ?', './../Contenus sup/Chap05/Et dans les RH/story.html']];
        this.createContentChap(elementButton5.textContent, dataButtonChap5,'./../Contenus sup/Questions/Q05/story.html', './../Contenus sup/Chap05/Evolution_Grand_homme.mp3');
        episodeMenuDiv.hidden = true; 
        this.setObjectVisibility(this.listMultimediaObject[4]); 
        
        this.travellingViewToSeeContent(new udviz.THREE.Vector3(1844032.16, 5165242.68, 220), 4000, 9800);
      },
      false
    );

    //Q6 button
    let elementButton6 = document.getElementById('Q6');
    elementButton6.addEventListener(
      'mousedown',
      () => {
        this.createContentChap(elementButton6.textContent, null,'./../Contenus sup/Questions/Q06/story.html', './../Contenus sup/Chap06/Optimiste_a_long_terme_Prof_place Guichard.mp3');
        episodeMenuDiv.hidden = true;
        this.setObjectVisibility(this.listMultimediaObject[5]);    

        this.travellingViewToSeeContent(new udviz.THREE.Vector3(1842948.055, 5163731.63, 220), 4000, 7800);
      },
      false
    );

    this.listButton = [elementButton1, elementButton2, elementButton3, elementButton4, elementButton5, elementButton6];

    //Toggle button
    let toggleButton = document.createElement('button');
    toggleButton.id = 'toggleButtonLeft';
    toggleButton.src = './assets/icons/icons8-arrow-24.png';
    MenuDiv.append(toggleButton);
    toggleButton.innerHTML = '<img id="themeButtonImg" src="./assets/icons/logoDeroulant.png" />';
    //Toggle button in JS because CSS is bad
    toggleButton.addEventListener(
      'mousedown',
      () => {
        this.listMultimediaObject.forEach(element => {
          element.setVisibility(false);
        });
        this.contentDivUI.hidden = true;
        this.contentDivUI.innerHTML = '';
        if (episodeMenuDiv.hidden == true) {
          episodeMenuDiv.hidden = false;
          document.getElementById('themeButtonImg').src = './assets/icons/logoCroixRouge.png';
        } else {
          episodeMenuDiv.hidden = true;
          document.getElementById('themeButtonImg').src = './assets/icons/logoDeroulant.png';
        }
      },
      false
    );
  }

  /**
   * 
   * @param {Boolean} visibility 
   */
  selectQuestions(visibility){
    this.listMultimediaObject.forEach(element => {
      element.setVisibility(visibility);
    });
  }

  /**
   * Method to highlight button when it selected
   * @param {HTMLElement} elementButton Button to change css
   */
  selectedButton(elementButton){
    this.unSelectedButton();
    elementButton.style.fontSize = '30px';
    elementButton.style.color = '#ff5851';
    elementButton.style.fontWeight = 'bold';
  }

  /**
   * Reset CSS Button unselected
   */
  unSelectedButton(){
    this.listButton.forEach(button => {
      button.style.fontSize = '15px';
      button.style.color = '#FFFFFF';
      button.style.fontWeight = '';
    });
  }

  /**
   * Set the visibilty of the collection of MultiMediaObject corresponding to the button selected
   * @param {MultiMediaObject[]} listInterview 
   */
  setObjectVisibility(listInterview){
    if (listInterview.visibility == true){
      listInterview.setVisibility(false);
    }else{
      listInterview.setVisibility(true);
      this.view3D.getItownsView().notifyChange();
    }
  }

  /**
   * Creating Content UI of a chapter 
   * @param {string} chapName Chapter name
   * @param {string[]} listData List of different multimedia view with is name and path to view the multimedia content
   * @param {string} stringQuestionUser User question to display in UI
   * @param {string} avisRuePath Path to mp3 file
   */
  createContentChap(chapName, listData, stringQuestionUser, avisRuePath){
    //Title
    let h1Element = document.createElement('h1');
    h1Element.textContent = chapName;
    this.contentDivUI.append(h1Element);

    //List Button
    let ulElement = document.createElement('ul');
    this.contentDivUI.append(ulElement);

    this.contentDivUI.hidden = false;

    //Button with iframe
    if (listData != null){
      for (let i = 0; i < listData.length ; i++){
        let itemButton = document.createElement('button');
        itemButton.id = 'button-iframe';
        itemButton.innerText = listData[i][0]; // button name
        ulElement.append(itemButton);

        itemButton.onclick = () => {
          this.divInteractiveContent.hidden = false;
          document.getElementById('iframe-video').innerHTML = 
          '<iframe src="' + listData[i][1] + '"></iframe>';
        };
      }
    }

    //Button for avis de la rue
    let buttonAvisRue= document.createElement('button');
    buttonAvisRue.id = 'button_avis_rue';
    buttonAvisRue.textContent = 'L’avis de la rue';
    this.contentDivUI.append(buttonAvisRue);
    buttonAvisRue.onclick = () => {
      // this.divInteractiveContent.hidden = false;
      if (!document.getElementById('avis_rue')){
        let audio = document.createElement('audio');
        audio.id = 'avis_rue'; audio.setAttribute('controls','controls');

        let sourceAudio = document.createElement('source');
        sourceAudio.src = avisRuePath; sourceAudio.type = 'audio/mpeg';
        audio.appendChild(sourceAudio);

        document.getElementById('content-ui').appendChild(audio);
        audio.autoplay = true;
      } 
      else{
        document.getElementById('avis_rue').remove();
      }
    };

    //Button for user response
    let buttonUserResponse = document.createElement('button');
    buttonUserResponse.id = 'button_user_response';
    buttonUserResponse.textContent = 'Votre avis';
    this.contentDivUI.append(buttonUserResponse);

    buttonUserResponse.onclick = () => {
      this.divInteractiveContent.hidden = false;
      // this.video.hidden = false;
      document.getElementById('iframe-video').innerHTML = 
          '<iframe src="' + stringQuestionUser + '"></iframe>';
    };
  }

  /**
   * Travelling method to orient camera and focus on the multimedia object in the scene
   * @param {Vector3} position 
   * @param {Float32Array} verticalDist 
   * @param {Float32Array} horizonDist 
   */
  travellingViewToSeeContent(position, verticalDist, horizonDist){
    udviz.Components.focusCameraOn(this.view3D.getItownsView(),
      this.view3D.getItownsView().controls,
      new udviz.THREE.Vector3(position.x, position.y, position.z),
      {duration: 1,
        verticalDistance : verticalDist,
        horizontalDistance : horizonDist});
  }

}