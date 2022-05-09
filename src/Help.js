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
      '<a href="https://github.com/VCityTeam/UD-Viz/blob/master/Doc/User/ContributeData.md">Tutoriel</a>\
         <h3>Control de la camera:</h3>\
         <ul>\
            <li>Click-gauche: translation de la camera (drag)</li>\
            <li>Click-droit: camera translation (pan)</li>\
            <li>Ctrl + Click-gauche: rotation de la camera (orbit)</li>\
            <li>Espace / Click-molette: zoom sur une zone</li>\
            <li>Molette: zoom </li>\
         </ul>\
         <button id="CloseButton">Close</button>\
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