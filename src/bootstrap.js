/** @format */

import * as udviz from 'ud-viz';
import { View3D } from 'ud-viz/src/Views/Views';

//const app = new udviz.Views.View3D('../assets/config/config.json');

udviz.Components.SystemUtils.File.loadJSON(
  './assets/config/config.json'
).then(function (config) { 

  //Get extents coordinates
  let min_x = parseInt(config['extents']['min_x']);
  let max_x = parseInt(config['extents']['max_x']);
  let min_y = parseInt(config['extents']['min_y']);
  let max_y = parseInt(config['extents']['max_y']);
  const extent = new udviz.itowns.Extent(
    config['projection'],
    min_x,
    max_x,
    min_y,
    max_y
  );

  //pass the projection which was used to compute extent
  const view3D = new udviz.Views.View3D({
    itownsControls: true,
    config: config,
  });
  
  //pass the extent
  view3D.initItownsView(extent);

  //Setup skybox
  udviz.Game.Shared.Components.THREEUtils.addEquiRectangularMap(
    './assets/img/sky.jpg',
    view3D.getRenderer(),
    view3D.getScene()
  );

  const scene3D = view3D.getScene();

  //Lighting
  const { directionalLight, ambientLight } =
  udviz.Game.Shared.Components.THREEUtils.addLights(view3D.getScene());
  udviz.Game.Shared.Components.THREEUtils.bindLightTransform(
    10,
    Math.PI / 4,
    Math.PI / 4,
    view3D.getScene(),
    directionalLight
  );

  const center = view3D.getExtent().center();

  const iframe_Episode_1 = document.createElement('iframe');
  iframe_Episode_1.src = 'https://visite.interfora-connect.com/Visite/index.html';
  const billboard_Episode_1 = new udviz.Widgets.Billboard(
    iframe_Episode_1,
    new udviz.Game.Shared.Components.THREEUtils.Transform(
      new udviz.THREE.Vector3(center.x, center.y, 400),
      new udviz.THREE.Vector3(Math.PI * 0.5, Math.PI * 0.2, 0),
      new udviz.THREE.Vector3(20, 15, 20)
    ),
    80
  );

  const iframe_Episode_2 = document.createElement('iframe');
  iframe_Episode_2.src = 'https://visite.interfora-connect.com/Visite/index.html';
  const billboard_Episode_2 = new udviz.Widgets.Billboard(
    iframe_Episode_2,
    new udviz.Game.Shared.Components.THREEUtils.Transform(
      new udviz.THREE.Vector3(center.x + 800, center.y + 800, 600),
      new udviz.THREE.Vector3(Math.PI * 0.5, Math.PI * 0.2, 0),
      new udviz.THREE.Vector3(30, 25, 30)
    ),
    80
  );

  view3D.initCSS3D();
  
  // view3D.appendBillboard(billboard_Episode_1);
  // view3D.appendBillboard(billboard_Episode_2);
  
  //Pins episodes
  const pinsTexture = new udviz.THREE.TextureLoader().load( '../assets/img/1200px-Google_Maps_pin.svg.png' );
  const pinsMaterial = new udviz.THREE.SpriteMaterial( { map: pinsTexture } );
  const pinsSprite = new udviz.THREE.Sprite( pinsMaterial );
  pinsSprite.position.set(center.x + 800, center.y + 800, 600);
  pinsSprite.scale.set(200,300,1);
  pinsSprite.updateMatrixWorld();
  scene3D.add(pinsSprite);

  const geometry = new udviz.THREE.BoxGeometry( 300, 300, 300 );
  const material = new udviz.THREE.MeshBasicMaterial( {color: 0x00ff00} );
  const cube = new udviz.THREE.Mesh( geometry, material );
  cube.position.set(center.x + 800, center.y + 800, 600);
  cube.updateMatrixWorld();

  document.addEventListener( 'click', onDocumentMouseClick );

  const episode = document.createElement('div');
  episode.id = 'Episode 1';
  episode.src = 'https://visite.interfora-connect.com/Visite/index.html';
  episode.style.width = 80 * 30 + 'px';
  episode.style.height = 80 * 25 + 'px';

  

  //Select sprites
  function onDocumentMouseClick( event ) {    
    event.preventDefault();
    let mouse3D = new udviz.THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   
                            -( event.clientY / window.innerHeight ) * 2 + 1,  
                            0.5 );     
                                            
    let raycaster =  new udviz.THREE.Raycaster();                                        
    raycaster.setFromCamera( mouse3D, view3D.getCamera());

    //All objects hits
    let intersects = raycaster.intersectObjects( view3D.getScene().children ); 
    console.log(intersects);
    if ( intersects.length > 0 ) {
        intersects[ 0 ].object.scale.set(intersects[ 0 ].object.scale.x + 50, intersects[ 0 ].object.scale.y + 50,intersects[ 0 ].object.scale.z + 50);
        
        console.log(episode);
        intersects[ 0 ].object.updateMatrixWorld();
    }
}

  console.log(scene3D);
  
});