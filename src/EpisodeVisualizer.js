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
   * @param {ArrayEpisodeContent} listContents list of Episode content object
   */
  constructor(name, view3D = new udviz.Views.View3D(), listContents) {
    this.name = name;
    this.view3D = view3D;

    //TO-DO create a list of content of your episode / maybe should be a class
    this.pictureObjects = []; 

    //Pins sprite ton point on a center of interest
    this.pinsSprite = [];
      
    //List of content 
    this.listContents = listContents;

    this.visibility = false;
  }

  /**
     * Function who add Sprite object in the scene to create Pins and 
     * @param {THREE.Vector3} position coordinate of your pins in ud-viz scene
    */
  createPin(episodeContent, imgThumbnail){
    let pictureTexture;
    // if (lock)
    //   pictureTexture = new THREE.TextureLoader().load(imageSrcLock);
    // else
    //   pictureTexture = new THREE.TextureLoader().load(imageSrc);
    pictureTexture = new THREE.TextureLoader().load(imgThumbnail);
    //Pins object
    const pinsTexture = new THREE.TextureLoader().load('./assets/img/1200px-Google_Maps_pin.svg.png');
    const pinsMaterial = new THREE.SpriteMaterial( { map: pinsTexture, sizeAttenuation : false  } );
    const pinsSprite = new THREE.Sprite( pinsMaterial );
    const scale = 10000;
    pinsSprite.position.set(episodeContent.position.x, episodeContent.position.y, episodeContent.position.z); 
    pinsSprite.scale.set(60/scale, 100 / scale, 1/scale );
    pinsSprite.updateMatrixWorld();
    pinsSprite.name = this.name;

    //Picture on the top
    const pictureMaterial = new THREE.SpriteMaterial( { map: pictureTexture, sizeAttenuation : true  } );
    const pictureSprite = new THREE.Sprite( pictureMaterial );
    pictureSprite.userData = { Episodecontent: episodeContent };

    // pictureSprite.

    pictureSprite.position.set(pinsSprite.position.x, pinsSprite.position.y, pinsSprite.position.z + 230); 
    
    pictureSprite.scale.set(300 / 1, 250 / 1, 10 / 1);
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
    video.id = 'video-content';
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
      let pinObjets = this.createPin(element, element.imgThumbnail);
      this.visibility = visibility;
      pinObjets[0].visible = visibility;
      pinObjets[1].visible = visibility;
      this.pictureObjects.push(pinObjets[0]);
      this.pinsSprite.push(pinObjets[1]);
    }
  }
    
  /////// GETTER & SETTER
  getPinsObject(){
    return this.pictureObjects;
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
    // this.pictureObjects.forEach(element => {
    //   element.visible = visibility;
      
    // });
    for (let i = 0 ; i < this.pictureObjects.length; i++){
      this.pictureObjects[i].visible = visibility;
      this.listContents[i].lock = !visibility;
    }
    this.pinsSprite.forEach(element => {
      element.visible = visibility;
    });
  }
}