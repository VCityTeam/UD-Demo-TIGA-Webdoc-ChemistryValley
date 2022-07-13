import '../assets/css/menu-document-content.css';
import * as udviz from 'ud-viz';
/**
 * Class to create Data UI
 * 
 */
export class DataWindow {
  /**
   * 
   * @param {View3D} view3D the view where you put all your content 
   */
  constructor(view3D = new udviz.Views.View3D(), listDataVisualizer) {
    this.view3D = view3D;

    //List of an Object content : must be a list of list
    this.listDataVisualizer = listDataVisualizer;
  }


  /**
   * Construction of HTML Element for the Data UI
   */
  constructMenu(){
    //UI
    let dataDiv = document.createElement('div');
    dataDiv.id = 'data-title';
    document.getElementById('webgl_View3D').append(dataDiv);

    document.getElementById('data-title').innerHTML = 
        '<p>Les data de la vallée</p>\
       ';

    let contentMenuDiv = document.createElement('div');
    contentMenuDiv.id = 'menu-document-content';
    document.getElementById('webgl_View3D').append(contentMenuDiv);

    document.getElementById('menu-document-content').innerHTML = 
        '<ul id="_all_menu_content">\
            <h1>Les data</h1>\
            <h2>De la vallée de la chimie</h2>\
            <li><button id="buttonBus">Lignes de bus du réseau Transports en Commun Lyonnais</button>\
            <li><button id="buttonObservatoire">Observatoire - Vallée de la Chimie</li>\
            <li><button id="buttonEspace">Espaces naturels sensibles de la Métropole de Lyon</<button></li>\
            <li><button id="buttonIndiceAtmo">Indice atmosphérique, Moyennes annuelles NO2</<button></li>\
            <li><button id="buttonReset">Réinitialiser les données</<button></li>\
        </ul>\
       ';

    contentMenuDiv.hidden = true;
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
        if (this.listDataVisualizer.visibility == true){
          this.listDataVisualizer.setVisibility(false);
        }else{
          this.listDataVisualizer.setVisibility(true);
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

    //Reset Callback
    document.getElementById('buttonReset').addEventListener(
      'mousedown',
      () => {
        this.view3D.layerManager.getLayers()[7].visible = false;
        this.view3D.layerManager.getLayers()[5].visible = false;
        this.view3D.layerManager.getLayers()[3].visible = false;
        this.listEpisodeVisualizer.setVisibility(false);
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    
    //Toggle button
    let toggleButton = document.createElement('button');
    toggleButton.id = 'toggleButton';
    toggleButton.src = './assets/icons/icons8-arrow-24.png';
    dataDiv.append(toggleButton);
    toggleButton.innerHTML = '<img id="dataButtonImg" src="./assets/icons/logoDeroulantJaune.png" />';
    //Toggle button in JS because CSS is bad
    toggleButton.addEventListener(
      'mousedown',
      () => {
        if (contentMenuDiv.hidden == true) {
          contentMenuDiv.hidden = false; //Affiche la donnée
          document.getElementById('dataButtonImg').src = './assets/icons/logoCroixJaune.png';
        } else {
          contentMenuDiv.hidden = true; 
          document.getElementById('dataButtonImg').src = './assets/icons/logoDeroulantJaune.png';
        }
      },
      false
    );
  }

}