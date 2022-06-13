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
  constructHtmlVideos(){
    // Interactive content HMTL
    let divInteractiveContent = document.createElement('div');
    divInteractiveContent.id = 'episodeWindowVideo';
    document.getElementById('webgl_View3D').append(divInteractiveContent);
    divInteractiveContent.innerHTML = 
      '<h1 id="resumeVideo"></h1>\
      <button id="WindowCloseButtonVideo"><img src="./assets/icons/logoCroixRouge.png" /></button>\
      ';

    let video = document.createElement('video');
    video.setAttribute('controls','controls');
    divInteractiveContent.append(video);
    document.getElementById('WindowCloseButtonVideo').addEventListener(
      'mousedown',
      () => {
        this.disableView('episodeWindowVideo');
        divInteractiveContent.hidden = true;
        // this.image.src = '';
        video.src = '';
      },
      false
    );
    divInteractiveContent.hidden = true;
  }


  /**
     * Method to construct all the content of an episode 
  */
  constructAllContent(visibility){
    for (let index = 0; index < this.listContents.length; index++) {
      const element = this.listContents[index];
      let pinObjets = this.createPin(element, element.imgThumbnail, element.imgContent, element.lock);
      this.visibility = visibility;
      pinObjets[0].visible = visibility;
      pinObjets[1].visible = visibility;
      this.pinsObject.push(pinObjets[0]);
      this.pinsSprite.push(pinObjets[1]);
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