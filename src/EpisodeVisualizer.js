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
        pinsSprite.scale.set(200,300,1);
        pinsSprite.updateMatrixWorld();
        pinsSprite.name = this.name;

        //Add pins object in the scene
        this.view3D.getScene().add(pinsSprite);

        this.pinsObject = pinsSprite;
        
    }

    getPinsObject(){
        return this.pinsObject;
    }

    get html(){
        return /*html*/ `
        <img id="../assets/img/Alchimie_Vallée.JPG"/>
        <div class="controls-panel">
            <button id="${this.closeButtonId}">Close</button>
            <div class="slider-container">
            <div class="slider-label">
                <label for="${this.opacitySliderId}">Opacity : </label>
                <output for="${this.opacitySliderId}" id="${this.opacityId}">1</output>
            </div>
            <input type="range" min="0" max="1" value="1" step="0.01" id="${this.opacitySliderId}">
            </div>
        </div>
        `;
    }
}