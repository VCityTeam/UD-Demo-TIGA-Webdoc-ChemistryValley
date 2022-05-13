import '../src/episode.css';
import * as THREE from 'three';
import * as udviz from 'ud-viz';
import { View3D } from 'ud-viz/src/Views/Views';
import { forEach } from 'vis-util';

/**
 * Class to create an episode with all his content materialized in ud-viz scene
 * 
 */
export class EpisodeVisualizer { 
  /**
   * Create an episode
   * 
   * @param {string} name name of your episode
   * @param {View3D} view3D the view where you put all your content 
   * @param {Array} listContents list of JSON data of your episode
   */
  constructor(name, view3D = new udviz.Views.View3D(), listContents) {
    this.name = name;
    this.view3D = view3D;

    //TO-DO create a list of content of your episode / maybe should be a class
    this.pinsObject = []; 

    //Pins sprite ton point on a center of interest
    this.pinsSprite = [];
      
    //List of content 
    this.listContents = listContents;

    this.visibility = false;
  }

  /**
     * Function who add Sprite object in the scene to create Pins and 
     * @param {THREE.Vector3} position coordinate of your pins in ud-viz scene
     * @param {string} imageSrc path to the image source unlock
     * @param {string} imageSrcLock path to the image source unlock
     * @param {boolean} lock lock or unlock pins
    */
  createPin(episodeContent,imageSrc,imageSrcLock, lock){
    let colorLock = 'rgb(255,255,255)';
    let pictureTexture;
    if (lock)
      pictureTexture = new THREE.TextureLoader().load(imageSrcLock);
    else
      pictureTexture = new THREE.TextureLoader().load(imageSrc);
      
    //Pins object
    const pinsTexture = new THREE.TextureLoader().load('./assets/img/1200px-Google_Maps_pin.svg.png');
    const pinsMaterial = new THREE.SpriteMaterial( { map: pinsTexture, color: 'rgb(255, 255, 255)', sizeAttenuation : true  } );
    const pinsSprite = new THREE.Sprite( pinsMaterial );
        
    pinsSprite.position.set(episodeContent.position.x, episodeContent.position.y, episodeContent.position.z); 
    pinsSprite.scale.set(60, 100, 1 );
    pinsSprite.updateMatrixWorld();
    pinsSprite.name = this.name;

    //Picture on the top
    const pictureMaterial = new THREE.SpriteMaterial( { map: pictureTexture, color: colorLock, sizeAttenuation : true  } );
    const pictureSprite = new THREE.Sprite( pictureMaterial );
    pictureSprite.userData = { Episodecontent: episodeContent };

    // pictureSprite.

    pictureSprite.position.set(pinsSprite.position.x, pinsSprite.position.y, pinsSprite.position.z + 230); 
    const scale = 1;
    pictureSprite.scale.set(300 / scale, 250 / scale, 10 / scale);
    pictureSprite.updateMatrixWorld();
    pictureSprite.name = this.name;
          
    //Add pins object in the scene
    this.view3D.getScene().add(pinsSprite);
    this.view3D.getScene().add(pictureSprite);

    return [pictureSprite, pinsSprite];    
  }

  // Create HMTL div to visualize details of the episode container
  constructHtml(){
    let episodeDiv = document.createElement('div');
    episodeDiv.id = 'episodeWindow';
    episodeDiv.style.display = 'block';
    document.getElementById('webgl_View3D').append(episodeDiv);

    document.getElementById('episodeWindow').innerHTML = 
      '<div id="_window_document2-inspector" class="episode" style="left: 10px; right: 10px; top: 10px; width: 650px; z-index: 107;">\
        <div class="episode-header" id="_window_header_document2-inspector">\
          <button class="episode-close-button" id="WindowCloseButton">Close</button>\
        </div>\
        <div class="episode-content" id="_window_content_document2-inspector">\
          <div class="episode-inner-content" id="_window_inner_content_document2-inspector">\
          <img class="inspector-doc-img" id="image-content" src="./../assets/img/Episode1_1_layout.PNG" alt="Document image"\
           id="" title="CTRL + Click to open the image">\
            <div class="inspector-details spoiler-box" style="max-height: 250px; overflow-y: auto;">\
              <p class="inspector-field-title" id="resume">Antoine opérateur dans la chimie</p>\
            </div>\
          </div>\
          <div data-ext-container="panel" data-ext-container-default="div" data-ext-class="box-section">\
          <button class="episode-details-button" id="WindowDetailsButton">Details</button>\
          </div>\
        </div>\
      </div>\
      ';
    //https://www.derrierelesfumees.com/_Contenusdlf/Episodes/Episodes01/index.html
    // Close the window...when close button is hit
    document.getElementById('WindowCloseButton').addEventListener(
      'mousedown',
      () => {
        this.disableView('episodeWindow');
      },
      false
    );
  }

  // Create HMTL div to visualize details of the episode container
  constructHtmlVideos(){
    let episodeDiv = document.createElement('div');
    episodeDiv.id = 'episodeWindowVideo';
    episodeDiv.style.display = 'block';
    document.getElementById('webgl_View3D').append(episodeDiv);

    document.getElementById('episodeWindowVideo').innerHTML = 
      '<div id="_window_document3-inspector" class="episode" style="left: 10px; right: 10px; top: 10px; width: 650px; z-index: 107;">\
        <div class="episode-header" id="_window_header_document3-inspector">\
          <button class="episode-close-button" id="WindowCloseButtonVideo">Close</button>\
        </div>\
        <div class="episode-content" id="_window_content_document3-inspector">\
          <div class="episode-inner-content" id="_window_inner_content_document2-inspector">\
          <video id="video-content" src="./../assets/SoireeDeLaChimie-1.m4v" width=640  height=480 controls ">\
            <div class="inspector-details spoiler-box" style="max-height: 250px; overflow-y: auto;">\
              <p class="inspector-field-title" id="resume">Antoine opérateur dans la chimie</p>\
            </div>\
          </div>\
          <div data-ext-container="panel" data-ext-container-default="div" data-ext-class="box-section">\
          <button class="episode-details-button" id="WindowDetailsButtonVideo">Details</button>\
          </div>\
        </div>\
      </div>\
      ';
    // Close the window...when close button is hit
    document.getElementById('WindowCloseButtonVideo').addEventListener(
      'mousedown',
      () => {
        this.disableView('episodeWindowVideo');
      },
      false
    );
  }


  /**
     * Method to construct all the content of an episode 
  */
  constructAllContent(visibility, videos){
    for (let index = 0; index < this.listContents.length; index++) {
      const element = this.listContents[index];
      let pinObjets = this.createPin(element, element.imgUnLock, element.imgLock, element.lock);
      this.visibility = visibility;
      pinObjets[0].visible = visibility;
      pinObjets[1].visible = visibility;
      this.pinsObject.push(pinObjets[0]);
      this.pinsSprite.push(pinObjets[1]);
    }
    if (videos){
      this.constructHtmlVideos();
    }else{
      this.constructHtml();
    }
  }
    
  /////// GETTER & SETTER
  getPinsObject(){
    return this.pinsObject;
  }

  /////// MODULE VIEW MANAGEMENT
  enableView() {
    document
      .getElementById('episodeWindow')
      .style.setProperty('display', 'block');
  }

  disableView(elementId) {
    document.getElementById(elementId).style.setProperty('display', 'none');
  }

  setVisibility(visibility = Boolean){
    this.visibility = visibility;
    this.pinsObject.forEach(element => {
      element.visible = visibility;
    });
    this.pinsSprite.forEach(element => {
      element.visible = visibility;
    });
  }
}