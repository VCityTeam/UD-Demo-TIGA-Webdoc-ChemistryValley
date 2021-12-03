import '../node_modules/ud-viz/src/Widgets/DocumentVisualizer/View/DocumentVisualizer.css'
import * as THREE from 'three';
import * as udviz from 'ud-viz';

export class EpisodeVisualizer { 
    constructor(name, src, view3D = new udviz.Views.View3D()) {
        this.name = name;
        this.src = src;
        this.view3D = view3D;

         this.pinsObject = new THREE.Sprite();       
    }

    //Create Pins
    createPin(position){
        const pinsTexture = new THREE.TextureLoader().load(this.src);
        const pinsMaterial = new THREE.SpriteMaterial( { map: pinsTexture, color: "rgb(255, 255, 255)"  } );
        const pinsSprite = new THREE.Sprite( pinsMaterial );

        pinsSprite.position.set(position.x + 800, position.y + 800, 600); 
        pinsSprite.scale.set(160,300,1);
        pinsSprite.updateMatrixWorld();
        pinsSprite.name = this.name;

        //Add pins object in the scene
        this.view3D.getScene().add(pinsSprite);

        this.pinsObject = pinsSprite;
        
    }


    getPinsObject(){
        return this.pinsObject;
    }

    get innerContentHtml() {
        return /*html*/ `
          <div class="window">
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

    windowCreated() {
    this.window.style.left = 'unset';
    this.window.style.right = '10px';
    this.window.style.top = '10px';
    this.window.style.width = '390px';
    }
}