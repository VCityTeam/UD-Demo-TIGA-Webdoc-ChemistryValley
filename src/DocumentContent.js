import '../src/menu-document-content.css';
import * as udviz from 'ud-viz';
/**
 * Class to create menu content
 * 
 */
export class DocumentContent {
  /**
   * Create an episode
   * 
   * @param {string} name name of your episode
   * @param {View3D} view3D the view where you put all your content 
   * @param {Array} listContents list of JSON data of your episode
   */
  constructor(view3D = new udviz.Views.View3D()) {
    this.view3D = view3D;
  }


  constructMenu(){
    let contentMenuDiv = document.createElement('div');
    contentMenuDiv.id = 'menu-document-content';
    document.getElementById('webgl_View3D').append(contentMenuDiv);

    document.getElementById('menu-document-content').innerHTML = 
        '<ul id="_all_menu_content">\
            <li><button id="buttondonnée"><h1>Titre donnée</h1><p>Information sur la donnée plus précise comme par exemple ça</p></button>\
            <li><button><h1>Titre donnée</h1><p>Information sur la donnée plus précise comme par exemple ça</p></li>\
            <li><button><h1>Titre donnée</h1><p>Information sur la donnée plus précise comme par exemple ça</p></li>\
            <li><button><h1>Titre donnée</h1><p>Information sur la donnée plus précise comme par exemple ça</p></<button></li>\
        </ul>\
       ';
       
    document.getElementById('buttondonnée').addEventListener(
      'mousedown',
      () => {
        console.log(this.view3D.controls);
        udviz.Components.focusCameraOn(this.view3D,
          this.view3D.controls,
          this.view3D.scene.children[4].position,
          {duration: 1});
      },
      false
    );
  }

}