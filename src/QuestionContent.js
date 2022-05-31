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

    let listButton = [];
  }


  constructMenu(){
    //UI
    let MenuDiv = document.createElement('div');
    MenuDiv.id = 'question-title';
    document.getElementById('webgl_View3D').append(MenuDiv);

    document.getElementById('question-title').innerHTML = 
        '<p>Derrière les fumées</p>\
       ';

    //Button pannel
    let questionMenuDiv = document.createElement('div');
    questionMenuDiv.id = 'menu-question';
    document.getElementById('webgl_View3D').append(questionMenuDiv);

    document.getElementById('menu-question').innerHTML = 
        '<ul id="_all_menu_content">\
          <h1>Derrière les fumées</h1>\
          <h2>De la vallée de la chimie de l’intérieur</h2>\
          <li id="dataTitle"></li>\
          <li id="dataTitle"></li>\
          <li id="dataTitle"></li>\
          <li><button id="Q1">La perception de l’industrie chimique</button>\
          <li><button id="Q2">Les compétences nécessaire</li>\
          <li><button id="Q3">Qui peut travailler dans l’industrie chimique</<button></li>\
          <li><button id="Q4">Le travail dans l’industrie chimique</<button></li>\
          <li><button id="Q5">L’évolution des métiers</<button></li>\
          <li><button id="Q6">L’avenir de l’industrie chimique</<button></li>\
          <li></li>\
        </ul>\
       ';

    questionMenuDiv.hidden = true;

    //Q1 button
    let elementButton1 =  document.getElementById('Q1');
    elementButton1.addEventListener(
      'mousedown',
      () => {
        if (this.listQuestionObject[0].visibility == true){
          this.unSelectedButton(elementButton1);
          this.listQuestionObject[0].setVisibility(false);
        }else{
          
          this.selectedButton(elementButton1);
          this.selectQuestions(false);
          this.listQuestionObject[0].setVisibility(true);
        }
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    //Q2 button
    let elementButton2 =  document.getElementById('Q2');
    elementButton2.addEventListener(
      'mousedown',
      () => {
        if (this.listQuestionObject[1].visibility == true){
          this.unSelectedButton(elementButton2);
          this.listQuestionObject[1].setVisibility(false);
        }else{
          this.selectQuestions(false);
          this.selectedButton(elementButton2);
          this.listQuestionObject[1].setVisibility(true);
        }
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    //Q3 button
    let elementButton3 =  document.getElementById('Q3');
    elementButton3.addEventListener(
      'mousedown',
      () => {
        if (this.listQuestionObject[2].visibility == true){
          this.unSelectedButton(elementButton3);
          this.listQuestionObject[2].setVisibility(false);
        }else{
          this.selectQuestions(false);
          this.selectedButton(elementButton3);
          this.listQuestionObject[2].setVisibility(true);
        }
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    //Q4 button
    let elementButton4 = document.getElementById('Q4');
    elementButton4.addEventListener(
      'mousedown',
      () => {
        if (this.listQuestionObject[3].visibility == true){
          this.unSelectedButton(elementButton4);
          this.listQuestionObject[3].setVisibility(false);
        }else{
          this.selectQuestions(false);
          this.selectedButton(elementButton4);
          this.listQuestionObject[3].setVisibility(true);
        }
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    //Q5 button
    let elementButton5 = document.getElementById('Q5');
    elementButton5.addEventListener(
      'mousedown',
      () => {
        if (this.listQuestionObject[4].visibility == true){
          this.unSelectedButton(elementButton5);
          this.listQuestionObject[4].setVisibility(false);
        }else{
          this.selectQuestions(false);
          this.selectedButton(elementButton5);
          this.listQuestionObject[4].setVisibility(true);
        }
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    //Q6 button
    let elementButton6 = document.getElementById('Q6');
    elementButton6.addEventListener(
      'mousedown',
      () => {
        if (this.listQuestionObject[5].visibility == true){
          this.unSelectedButton();
          this.listQuestionObject[5].setVisibility(false);
        }else{
          this.selectQuestions(false);
          this.selectedButton(elementButton6);
          this.listQuestionObject[5].setVisibility(true);
        }
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    this.listButton = [elementButton1, elementButton2, elementButton3, elementButton4, elementButton5, elementButton6];

    //Toggle button
    let toggleButton = document.createElement('button');
    toggleButton.id = 'toggleButtonLeft';
    toggleButton.src = './assets/icons/icons8-arrow-24.png';
    MenuDiv.append(toggleButton);
    toggleButton.innerHTML = '<img src="./assets/icons/logoDeroulant.png" />';
    //Toggle button in JS because CSS is bad
    toggleButton.addEventListener(
      'mousedown',
      () => {
        let menuQuestion = document.getElementById('menu-question');
        if (questionMenuDiv.hidden == true) {
          questionMenuDiv.hidden = false;
        } else {
          questionMenuDiv.hidden = true;
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

  selectedButton(elementButton){
    this.unSelectedButton();
    elementButton.style.fontSize = '30px';
    elementButton.style.color = '#ff5851';
    elementButton.style.fontWeight = 'bold';
  }
  unSelectedButton(){
    this.listButton.forEach(button => {
      button.style.fontSize = '15px';
      button.style.color = '#FFFFFF';
      button.style.fontWeight = '';
    });
  }
}