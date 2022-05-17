import '../assets/css/menu-document-content.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import jQuery from 'jquery';
import * as udviz from 'ud-viz';
/**
 * Class to create menu content
 * 
 */
export class QuestionContent {
  /**
   * Create an episode
   * 
   * @param {View3D} view3D the view where you put all your content 
   */
  constructor(view3D = new udviz.Views.View3D(), listQuestionObject) {
    this.view3D = view3D;

    //List of an Object content : must be a list of list
    this.listQuestionObject = listQuestionObject;
    console.log(listQuestionObject);
  }


  constructMenu(){
    let questionMenuDiv = document.createElement('div');
    questionMenuDiv.id = 'menu-question';
    document.getElementById('webgl_View3D').append(questionMenuDiv);

    document.getElementById('menu-question').innerHTML = 
        '<ul id="_all_menu_content">\
          <li id="dataTitle">Interviews :</li>\
          <li><button id="Q1">L’industrie chimique est-elle sale, polluante et mauvaise ?</button>\
          <li><button id="Q2">La motivation suffit-elle pour travailler dans l’industrie chimique ?</li>\
          <li><button id="Q3">Tout le monde peut-il travailler dans l’industrie chimique ?</<button></li>\
          <li><button id="Q4">Les métiers de l’industrie n’évoluent pas dans le bon sens ?</<button></li>\
          <li><button id="Q5">Dans l’industrie les salaires sont bas, et le travail est précaire </<button></li>\
          <li><button id="Q6">L’industrie chimique a-t-elle un avenir ?</<button></li>\
          <li></li>\
        </ul>\
       ';

    //Q1 button
    document.getElementById('Q1').addEventListener(
      'mousedown',
      () => {
        if (this.listQuestionObject[0].visibility == true){

          this.listQuestionObject[0].setVisibility(false);
        }else{
          this.selectQuestions(false);
          this.listQuestionObject[0].setVisibility(true);
        }
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    //Q2 button
    document.getElementById('Q2').addEventListener(
      'mousedown',
      () => {
        if (this.listQuestionObject[1].visibility == true){

          this.listQuestionObject[1].setVisibility(false);
        }else{
          this.selectQuestions(false);
          this.listQuestionObject[1].setVisibility(true);
        }
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    //Q3 button
    document.getElementById('Q3').addEventListener(
      'mousedown',
      () => {
        if (this.listQuestionObject[2].visibility == true){

          this.listQuestionObject[2].setVisibility(false);
        }else{
          this.selectQuestions(false);
          this.listQuestionObject[2].setVisibility(true);
        }
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    //Q4 button
    document.getElementById('Q4').addEventListener(
      'mousedown',
      () => {
        if (this.listQuestionObject[3].visibility == true){

          this.listQuestionObject[3].setVisibility(false);
        }else{
          this.selectQuestions(false);
          this.listQuestionObject[3].setVisibility(true);
        }
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    //Q5 button
    document.getElementById('Q5').addEventListener(
      'mousedown',
      () => {
        if (this.listQuestionObject[4].visibility == true){

          this.listQuestionObject[4].setVisibility(false);
        }else{
          this.selectQuestions(false);
          this.listQuestionObject[4].setVisibility(true);
        }
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    //Q6 button
    document.getElementById('Q6').addEventListener(
      'mousedown',
      () => {
        if (this.listQuestionObject[5].visibility == true){

          this.listQuestionObject[5].setVisibility(false);
        }else{
          this.selectQuestions(false);
          this.listQuestionObject[5].setVisibility(true);
        }
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    //Toggle button
    let toggleButton = document.createElement('button');
    toggleButton.id = 'toggleButtonLeft';
    toggleButton.src = './assets/icons/icons8-arrow-24.png';
    questionMenuDiv.append(toggleButton);
    toggleButton.innerHTML = '<img src="./assets/icons/icons8-arrow-24.png" />';
    //Toggle button in JS because CSS is bad
    toggleButton.addEventListener(
      'mousedown',
      () => {
        let menuQuestion = document.getElementById('menu-question');
        if (menuQuestion.style.left == '-2%') {
          toggleButton.style.transform = 'scaleX(1)';
          menuQuestion.style.left = '-25%'; // hide html element
        } else {
          menuQuestion.style.left = '-2%';
          toggleButton.style.transform = 'scaleX(-1)'; // Show html element
        }
      },
      false
    );
  }

  selectQuestions(visibility){
    this.listQuestionObject.forEach(element => {
      element.setVisibility(visibility);
    });
  }
}