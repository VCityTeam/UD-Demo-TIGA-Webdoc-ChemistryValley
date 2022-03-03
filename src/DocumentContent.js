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
            <li><button id="buttondonnée"><h3>Lignes de bus du réseau Transports en Commun Lyonnais</h3><p>Données provenant de la base géographique et topologique TCL SYTRAL.</p></button>\
            <li><button><h3>Résidences de la Métropole de Lyon</h3><p>Emprise des bâtiments d habitation multiple, verticale, portant un nom qui commence généralement par le mot Résidence, et groupes d habitations horizontales qui seront classés ultérieurement en Lotissement.</p></li>\
            <li><button><h3>Observatoire - Vallée de la Chimie : </h3><p>Information sur la donnée plus précise comme par exemple ça</p></li>\
            <li><button><h3>Métier de la vallée de la chimie</h3><p>Fiches métiers présentant les différents </p></<button></li>\
            <li><button><h3>Espaces naturels sensibles de la Métropole de Lyon</h3><p>Périmètre issus de la révision de l inventaire des espaces naturels sensible du Département du Rhône en 2013. Donnée saisie sur la base de l orthophoto IGN 2011.</p></<button></li>\
            <li><button><h3>Titre donnée</h3><p>Information sur la donnée plus précise comme par exemple ça</p></<button></li>\
            <li><button><h3>Titre donnée</h3><p>Information sur la donnée plus précise comme par exemple ça</p></<button></li>\
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