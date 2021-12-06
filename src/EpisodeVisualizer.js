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

    get innerContentHtml() {
        return /*html*/ `
          <div class="episode">
            <h3 class="section-title">Title: <span id="${this.docTitleId}"></span></h3>
            <div>
              <img class="inspector-doc-img" src="../assets/img/Alchimie_Vallée.JPG" alt="Document image"
                id="Test" title="CTRL + Click to open the image">
              <input type="checkbox" class="spoiler-check" id="doc-details-spoiler" checked>
              <label for="doc-details-spoiler" class="subsection-title">Details</label>
              </div>
            </div>
          </div>
          <div data-ext-container="panel"
            data-ext-container-default="div"
            data-ext-class="box-section">
          </div>
        `;
    }
}