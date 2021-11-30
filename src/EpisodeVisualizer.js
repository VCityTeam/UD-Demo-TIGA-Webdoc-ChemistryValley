import '../node_modules/ud-viz/src/Widgets/DocumentVisualizer/View/DocumentVisualizer.css'
import * as THREE from 'three';
import * as udviz from 'ud-viz';

export class EpisodeVisualizer { 
    constructor(name, src, view3D = new udviz.Views.View3D()) {
        this.name = name;
        this.src = src;
        this.view3D = view3D;
                
    }

    //Create Pins
    createPin(position){
        const pinsTexture = new THREE.TextureLoader().load(this.src);
        const pinsMaterial = new THREE.SpriteMaterial( { map: pinsTexture } );
        const pinsSprite = new THREE.Sprite( pinsMaterial );

        pinsSprite.position.set(position.x + 800, position.y + 800, 600);
        pinsSprite.scale.set(200,300,1);
        pinsSprite.updateMatrixWorld();
        pinsSprite.name = this.name;

        //Add pins object in the scene
        this.view3D.getScene().add(pinsSprite);
    }
    
}