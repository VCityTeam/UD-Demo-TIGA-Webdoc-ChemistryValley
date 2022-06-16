/** @format */

import { Widgets } from 'ud-viz';

import './Help.css';

/**
 * adds an "HelpWindow" window to show control of the camera that can be open/closed with a button
 * simply include this file in the html, no need to instanciate anything in main.js
 */
export class HelpWindow extends Widgets.Components.ModuleView {
  constructor() {
    super();
    // Create DOM element
    let helpDiv = document.createElement('div');
    helpDiv.id = 'helpWindow';
    helpDiv.style.display = 'block';
    document.getElementById('webgl_View3D').append(helpDiv);

    // Create HMTL div whit content
    document.getElementById('helpWindow').innerHTML =
      '<h1>Bienvenue sur la carte interactive de la Vallée de la Chimie </h1>\
         <h3 id="theme">La Vallée de la chimie de l’intérieur</h3>\
         <p>Le panneau à gauche de la carte vous permet de découvrir ce territoire à travers différentes thématiques sur celle-ci. Des micro-trottoires et des vidéos de travailleurs de la vallée sont disposés dans la carte interactive afin de mieux découvrir cet espace. </p>\
         <h3 id="data">Les données de la Vallée de la chimie</h3>\
         <p>Le panneau de droite permet de visualiser la vallée à travers des données urbaines. L’indice atmosphérique ou le réseau de transports en communs vous permetterons de découvrir ce territoire d’une autre manière</p>\
         <h3 id="controle">Les contrôles de la caméra</h3>\
         <ul>\
            <li>Clique-gauche: translation de la camera (drag)</li>\
            <li>Clique-droit: camera translation (pan)</li>\
            <li>Ctrl + Clique-gauche: rotation de la camera (orbit)</li>\
            <li>Espace / Clique-molette: zoom sur une zone</li>\
            <li>Molette: zoom </li>\
         </ul>\
         <h3 id="partenaire">Les dessous de la carte</h3>\
         <p>Projet s’appuyant sur la plateforme de recherche du LIRIS <a href="https://github.com/VCityTeam/UD-SV">UD-SV</a>. Micro-trottoirs réalisés par <a href="https://www.tuba-lyon.com/">Tubà</a>. Vidéos réalisées par <a href="https://www.interfora-ifaip.fr/">Interfora</a>. Les données sont issues de <a href="https://data.grandlyon.com/">data.grandlyon.com</a>.</p>\
         <button id="CloseButton">Fermer</button>\
        '; 
    // Close the window...when close button is hit
    document.getElementById('CloseButton').addEventListener(
      'mousedown',
      () => {
        this.disableView();
      },
      false
    );
    return document.getElementById('CloseButton'); 
  }

  /////// MODULE VIEW MANAGEMENT
  enableView() {
    document
      .getElementById('helpWindow')
      .style.setProperty('display', 'block');
  }

  disableView() {
    document.getElementById('helpWindow').style.setProperty('display', 'none');
  }
}