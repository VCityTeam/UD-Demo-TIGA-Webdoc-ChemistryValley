import '../assets/css/menu-document-content.css';
import jQuery from 'jquery';
import * as udviz from 'ud-viz';
/**
 * Class to create menu content
 * 
 */
export class DocumentContent {
  /**
   * Create an episode
   * 
   * @param {View3D} view3D the view where you put all your content 
   */
  constructor(view3D = new udviz.Views.View3D(), listEpisodeVisualizer) {
    this.view3D = view3D;

    //List of an Object content : must be a list of list
    this.listEpisodeVisualizer = listEpisodeVisualizer;
  }


  constructMenu(){
    let contentMenuDiv = document.createElement('div');
    contentMenuDiv.id = 'menu-document-content';
    document.getElementById('webgl_View3D').append(contentMenuDiv);


    document.getElementById('menu-document-content').innerHTML = 
        '<ul id="_all_menu_content">\
            <li id="dataTitle">Données de la vallée de la chimie :</li>\
            <li><button id="buttonBus"><img src="./assets/icons/layers.svg" /><h3>Lignes de bus du réseau Transports en Commun Lyonnais</h3></button>\
            <li><button id="buttonObservatoire"><img src="./assets/icons/layers.svg" /><h3>Observatoire - Vallée de la Chimie</h3><p>Observatoire - Vallée de la Chimie</p></li>\
            <li><button id="buttonEspace"><img src="./assets/icons/layers.svg" /><h3>Espaces naturels sensibles de la Métropole de Lyon</h3></<button></li>\
            <li><button id="buttonIndiceAtmo"><img src="./assets/icons/cO2.svg" /><h3>Indice atmosphérique 2016</h3></<button></li>\
            <li></li>\
        </ul>\
       ';

    // new Promise((resolve, reject) => {
    //   jQuery.ajax({
    //     type: 'GET',
    //     url: '../assets/html/data.html',
    //     datatype: 'html',
    //     success: (data) => {
    //       contentMenuDiv.innerHTML += data;
    //       resolve();
    //     },
    //     error: (e) => {
    //       console.error(e);
    //       reject();
    //     },
    //   });
    // });   
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
    //Observatory Callback
    document.getElementById('buttonObservatoire').addEventListener(
      'mousedown',
      () => {
        if (this.listEpisodeVisualizer.visibility == true){
          this.listEpisodeVisualizer.setVisibility(false);
        }else{
          this.listEpisodeVisualizer.setVisibility(true);
        }
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    //Natural spaces Callback
    document.getElementById('buttonEspace').addEventListener(
      'mousedown',
      () => {
        if (!this.view3D.layerManager.getLayers()[5].visible){
          this.view3D.layerManager.getLayers()[5].visible = true;
          this.view3D.getItownsView().notifyChange();
        }else{
          this.view3D.layerManager.getLayers()[5].visible = false;
        }
      },
      false
    );

    //Polution Callback
    document.getElementById('buttonIndiceAtmo').addEventListener(
      'mousedown',
      () => {
        if (!this.view3D.layerManager.getLayers()[7].visible){
          this.view3D.layerManager.getLayers()[7].visible = true;
        }else{
          this.view3D.layerManager.getLayers()[7].visible = false;
        }
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    
    //Toggle button
    let toggleButton = document.createElement('button');
    toggleButton.id = 'toggleButton';
    toggleButton.src = './assets/icons/icons8-arrow-24.png';
    contentMenuDiv.append(toggleButton);
    toggleButton.innerHTML = '<img src="./assets/icons/icons8-arrow-24.png" />';
    //Toggle button in JS because CSS is bad
    toggleButton.addEventListener(
      'mousedown',
      () => {
        let menuContent = document.getElementById('menu-document-content');
        if (menuContent.style.right == '110px') {
          toggleButton.style.transform = 'scaleX(-1)';
          menuContent.style.right = '-250px'; // hide html element
        } else {
          menuContent.style.right = '110px';
          toggleButton.style.transform = 'scaleX(1)'; // Show html element
        }
      },
      false
    );
  }

}