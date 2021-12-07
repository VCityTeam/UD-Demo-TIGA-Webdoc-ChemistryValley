import '../src/episode.css'
import * as THREE from 'three';
import * as udviz from 'ud-viz';

export class EpisodeVisualizer { 
    constructor(name, view3D = new udviz.Views.View3D()) {
        this.name = name;
        this.view3D = view3D;

         this.pinsObject = new THREE.Sprite();    
         //let windows = new udviz.Widgets.DocumentVisualizerWindow();  
    }

    //Create Pins
    createPin(position,imageSrc, lock){
      let colorLock = "rgb(255,255,255)";

      if (lock)
        colorLock = "rgb(100,100,100)";

      //Pins
        const pinsTexture = new THREE.TextureLoader().load('../assets/img/1200px-Google_Maps_pin.svg.png');
        const pinsMaterial = new THREE.SpriteMaterial( { map: pinsTexture, color: "rgb(255, 255, 255)"  } );
        const pinsSprite = new THREE.Sprite( pinsMaterial );
        
        pinsSprite.position.set(position.x, position.y, position.z); 
        pinsSprite.scale.set(60,100,1);
        pinsSprite.updateMatrixWorld();
        pinsSprite.name = this.name;

      //Picture on the top
        const pictureTexture = new THREE.TextureLoader().load(imageSrc);
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


    getPinsObject(){
        return this.pinsObject;
    }

    constructHtml(){
      let episodeDiv = document.createElement('div');
      episodeDiv.id = 'episodeWindow';
      episodeDiv.style.display = "block"
      document.getElementById('webgl_View3D').append(episodeDiv);

      // Create HMTL
      document.getElementById('episodeWindow').innerHTML = 
      '<div id="_window_document2-inspector" class="window" style="left: 325px; right: 10px; top: 230px; width: 390px; z-index: 107;">\
        <div class="window-header" id="_window_header_document2-inspector">\
          <h1 class="window-title" id="_window_header_title_document2-inspector">Episode 1</h1>\
          <button id="CloseButton">Close</button>\
        </div>\
        <div class="window-content" id="_window_content_document2-inspector">\
          <div class="window-inner-content" id="_window_inner_content_document2-inspector">\
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
      document.getElementById('CloseButton').addEventListener(
        'mousedown',
        () => {
          this.disableView();
        },
        false
      );
      //episodeDiv.hidden = true;
      return document.getElementById('CloseButton');
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