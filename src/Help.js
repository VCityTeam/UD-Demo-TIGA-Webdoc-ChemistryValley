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
    helpDiv.style.display = "block"
    document.getElementById('webgl_View3D').append(helpDiv);

    // Create HMTL div whit content
    document.getElementById('helpWindow').innerHTML =
      '<a href="https://github.com/VCityTeam/UD-Viz/blob/master/Doc/User/ContributeData.md">User Tutorial</a>\
         <h3>\
         </h3><h3>Camera key bindings:</h3>\
         <ul>\
            <li>Left-Click: camera translation (drag)</li>\
            <li>Right-Click: camera translation (pan)</li>\
            <li>Ctrl + Left-Click: camera rotation (orbit)</li>\
            <li>Spacebar / Wheel-Click: smart zoom</li>\
            <li>Mouse Wheel: zoom in/out</li>\
            <li>T: orient camera to a top view</li>\
            <li>Y: move camera to start position</li>\
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