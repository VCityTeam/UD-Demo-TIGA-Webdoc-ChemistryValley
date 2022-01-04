import '../src/episode.css'
import { EpisodeContent } from '../src/EpisodeContent';
import * as THREE from 'three';
import * as udviz from 'ud-viz';
import { View3D } from 'ud-viz/src/Views/Views';

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
   * @param {JSON} episodeConfig JSON data of your episode
   */
    constructor(name, view3D = new udviz.Views.View3D(), episodeConfig) {
      this.name = name;
      this.view3D = view3D;

      //TO-DO create a list of content of your episode / maybe should be a class
      this.pinsObject = new THREE.Sprite(); 
      
      //Data of episode
      this.content_1 = new EpisodeContent(episodeConfig['content-1']);
    }

    /**
     * Function who add Sprite object in the scene to create Pins and 
     * @param {THREE.Vector3} position coordinate of your pins in ud-viz scene
     * @param {string} imageSrc path to the image source unlock
     * @param {string} imageSrcLock path to the image source unlock
     * @param {boolean} lock lock or unlock pins
    */
    createPin(position,imageSrc,imageSrcLock, lock){
      let colorLock = "rgb(255,255,255)";
      let pictureTexture;

      if (lock)
        pictureTexture = new THREE.TextureLoader().load(imageSrcLock);
      else
        pictureTexture = new THREE.TextureLoader().load(imageSrc);
      
      //Pins object
        const pinsTexture = new THREE.TextureLoader().load('../assets/img/1200px-Google_Maps_pin.svg.png');
        const pinsMaterial = new THREE.SpriteMaterial( { map: pinsTexture, color: "rgb(255, 255, 255)"  } );
        const pinsSprite = new THREE.Sprite( pinsMaterial );
        
        pinsSprite.position.set(position.x, position.y, position.z); 
        pinsSprite.scale.set(60,100,1);
        pinsSprite.updateMatrixWorld();
        pinsSprite.name = this.name;

      //Picture on the top
        const pictureMaterial = new THREE.SpriteMaterial( { map: pictureTexture, color: colorLock  } );
        const pictureSprite = new THREE.Sprite( pictureMaterial );
        pictureSprite.userData = { LOCK: lock };

        pictureSprite.position.set(pinsSprite.position.x, pinsSprite.position.y, pinsSprite.position.z + 230); 
        pictureSprite.scale.set(300,300,1);
        pictureSprite.updateMatrixWorld();
        pictureSprite.name = this.name;
          
      //Add pins object in the scene
        this.view3D.getScene().add(pinsSprite);
        this.view3D.getScene().add(pictureSprite);

        this.pinsObject = pinsSprite;
        
    }

    // Create HMTL div to visualize details of the episode container
    constructHtml(){
      let episodeDiv = document.createElement('div');
      episodeDiv.id = 'episodeWindow';
      episodeDiv.style.display = "block"
      document.getElementById('webgl_View3D').append(episodeDiv);

      document.getElementById('episodeWindow').innerHTML = 
      '<div id="_window_document2-inspector" class="episode" style="left: 325px; right: 10px; top: 230px; width: 390px; z-index: 107;">\
        <div class="episode-header" id="_window_header_document2-inspector">\
          <h1 class="episode-title" id="_window_header_title_document2-inspector">Episode 1</h1>\
          <button class="episode-close-button" id="WindowCloseButton">Close</button>\
        </div>\
        <div class="episode-content" id="_window_content_document2-inspector">\
          <div class="episode-inner-content" id="_window_inner_content_document2-inspector">\
          <img class="inspector-doc-img" src="../assets/img/Episode1_1_layout.PNG" alt="Document image"\
          id="" title="CTRL + Click to open the image">\
            <div class="inspector-details spoiler-box" style="max-height: 250px; overflow-y: auto;">\
              <p class="inspector-field-title">Vallée de la chimie, ma vie, mon job</p>\
              <p class="inspector-field" id="_window_document2-inspector_desc"> 60 000 000 Views</p>\
              <p class="inspector-field-title">Antoine opérateur dans la chimie</p>\
            </div>\
          </div>\
          <div data-ext-container="panel" data-ext-container-default="div" data-ext-class="box-section">\
          </div>\
        </div>\
      </div>\
      ';

      // Close the window...when close button is hit
      document.getElementById('WindowCloseButton').addEventListener(
        'mousedown',
        () => {
          this.disableView();
        },
        false
      );
      return document.getElementById('WindowCloseButton');
    } 

    /**
     * Method to construct all the content of an episode 
     */
    constructAllContent(){
      this.createPin(this.content_1.position,this.content_1.imgUnLock,this.content_1.imgLock,false);

      this.constructHtml();
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

    disableView() {
      document.getElementById('episodeWindow').style.setProperty('display', 'none');
    }
}