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
   * @param {View3D} view3D the view where you put all your content 
   */
  constructor(view3D = new udviz.Views.View3D(), listContent) {
    this.view3D = view3D;

    //List of an Object content : must be a list of list
    this.listContent = listContent;
  }


  constructMenu(){
    let contentMenuDiv = document.createElement('div');
    contentMenuDiv.id = 'menu-document-content';
    document.getElementById('webgl_View3D').append(contentMenuDiv);


    document.getElementById('menu-document-content').innerHTML = 
        '<ul id="_all_menu_content">\
            <li><button id="buttonBus"><h3>Lignes de bus du réseau Transports en Commun Lyonnais</h3><p>Données provenant de la base géographique et topologique TCL SYTRAL.</p></button>\
            <li><button id="buttonObservatoire"><h3>Observatoire - Vallée de la Chimie : </h3><p>Information sur la donnée plus précise comme par exemple ça</p></li>\
            <li><button id="buttonMetier"><h3>Métier de la vallée de la chimie</h3><p>Fiches métiers présentant les différents </p></<button></li>\
            <li><button id="buttonEspace"><h3>Espaces naturels sensibles de la Métropole de Lyon</h3><p>Périmètre issus de la révision de l inventaire des espaces naturels sensible du Département du Rhône en 2013. Donnée saisie sur la base de l orthophoto IGN 2011.</p></<button></li>\
            <li><button id="buttonIndiceAtmo"><h3>Indice atmosphérique 2016</h3><p>Estimation des concentrations de dioxyde d azote, de particules PM10 et PM2.5 par maille de 10m et d ozone par maille de 1km sur la région Auvergne - Rhône-Alpes pour l année 2016. Statistiques selon la réglementation en vigueur pour chaque polluant.</p></<button></li>\
            <li></li>\
        </ul>\
       ';
    //TO-DO : Need to be generalize
    //Callback des bus 
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
    //Callback de l'observatoire
    document.getElementById('buttonObservatoire').addEventListener(
      'mousedown',
      () => {
        this.listContent.forEach(element => {
          if (!element.visible){

            element.visible = true;
          }else{
            element.visible = false;
          }
        });
        this.view3D.getItownsView().notifyChange();
      },
      false
    );

    //Callback des fiches métiers
    document.getElementById('buttonMetier').addEventListener(
      'mousedown',
      () => {
        //this.view3D.layerManager.getLayers()[3].visible = true;
      },
      false
    );

    //Callback des espace Naturel
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

    //Callback des indices atmo
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
    toggleButton.src = './../assets/icons/icons8-arrow-24.png';
    contentMenuDiv.append(toggleButton);
    toggleButton.innerHTML = '<img src="./../assets/icons/icons8-arrow-24.png" />';
    //Toggle button in JS because CSS is bad
    toggleButton.addEventListener(
      'mousedown',
      () => {
        let menuContent = document.getElementById('menu-document-content');
        if (menuContent.style.right.length == '0') {
          menuContent.style.right = '-260px';
        } else {
          menuContent.style.right = '0px';
        }
      },
      false
    );
  }

}