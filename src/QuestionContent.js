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
  constructor(view3D = new udviz.Views.View3D(), listContent) {
    this.view3D = view3D;

    //List of an Object content : must be a list of list
    this.listContent = listContent;
  }


  constructMenu(){
    let questionMenuDiv = document.createElement('div');
    questionMenuDiv.id = 'menu-question';
    document.getElementById('webgl_View3D').append(questionMenuDiv);
    
    new Promise((resolve, reject) => {
      jQuery.ajax({
        type: 'GET',
        url: '../assets/html/question.html',
        datatype: 'html',
        success: (data) => {
          questionMenuDiv.innerHTML += data;
          resolve();
        },
        error: (e) => {
          console.error(e);
          reject();
        },
      });
    });

    //TO-DO : Need to be generalize
    //Bus Callback 
    document.getElementById('buttonBus').addEventListener(
      'mousedown',
      () => {
        if (!this.view3D.layerManager.getLayers()[3].visible){
          udviz.Components.focusCameraOn(this.view3D.getItownsView(),
            this.view3D.getItownsView().controls,
            new udviz.THREE.Vector3(1842938.8426268366, 5168976.164108982, 672.5442263364985),
            {duration: 1,
              verticalDistance : 6200,
              horizontalDistance : 6800});
          this.view3D.layerManager.getLayers()[3].visible = true;
        }else{
          this.view3D.layerManager.getLayers()[3].visible = false;
        }
      },
      false
    );
  }
}