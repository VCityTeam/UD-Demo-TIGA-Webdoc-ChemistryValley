/** @format */

import * as udviz from 'ud-viz';
import { HelpWindow } from '../src/Help';
import { EpisodeVisualizer } from '../src/EpisodeVisualizer';

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

  //Help module
  const help = new HelpWindow();

  const center = view3D.getExtent().center();
  const positionPins_1 = new udviz.THREE.Vector3(1843554.77, 5165405.73, 220);
  const positionPins_2 = new udviz.THREE.Vector3(1844804.07, 5168372.18, 260); 
  const positionPins_3 = new udviz.THREE.Vector3(1843470.01, 5164312.59, 260);

  //Test d'un episode visualizer
  const episode_1 = new EpisodeVisualizer('episode_1', view3D);  
  episode_1.createPin(positionPins_1,"../assets/img/Episode1_1.png","../assets/img/Episode1_1_lock.png",false);
  episode_1.createPin(positionPins_2,"../assets/img/Episode1_2.png","../assets/img/Episode1_2_lock.png",true);
  episode_1.createPin(positionPins_3,"../assets/img/Episode1_3.png","../assets/img/Episode1_3_lock.png",true);
  episode_1.constructHtml();

  //Div of the episode build
  let divEpisode = document.getElementById('episodeWindow');
  divEpisode.style.setProperty('display','none');

  //TO-DO make a list of object clickable
  let listPins = episode_1.getPinsObject();

  view3D.html().addEventListener( 'click', onDocumentMouseClick );
  view3D.html().addEventListener( 'pointermove', onDocumentMouseLeave );

  /* --------------------------------- EVENT --------------------------------- */

  //Show episode div
  function onDocumentMouseClick( event ) {    
    event.preventDefault();
    let mouse3D = new udviz.THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   
                            -( event.clientY / window.innerHeight ) * 2 + 1,  
                            0.5 );     
                                            
    let raycaster =  new udviz.THREE.Raycaster();                                        
    raycaster.setFromCamera( mouse3D, view3D.getCamera());

    //All objects hits
    let intersects = raycaster.intersectObjects( view3D.getScene().children ); 
    if ( intersects.length > 0 ) {
      if (!intersects[ 0 ].object.userData.LOCK){
          divEpisode.style.setProperty('display','block');
          //window.open("https://www.derrierelesfumees.com/_Contenusdlf/Episodes/Episodes01/index.html")
      }
    }
  }

  //Highlight
  function onDocumentMouseLeave( event ) {    
    event.preventDefault();
    let mouse3D = new udviz.THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   
                            -( event.clientY / window.innerHeight ) * 2 + 1,  
                            0.5 );     
                                            
    let raycaster =  new udviz.THREE.Raycaster();                                        
    raycaster.setFromCamera( mouse3D, view3D.getCamera());

    //All objects hits
    let intersects = raycaster.intersectObjects( view3D.getScene().children ); 
    if ( intersects.length > 0 ) {
      if (!intersects[ 0 ].object.userData.LOCK){
          intersects[ 0 ].object.material.color.set("rgb(200, 200, 200)");
          intersects[ 0 ].object.updateMatrixWorld();
      }else {
        listPins.material.color.set("rgb(255, 255, 255)");
      }
    }
  }
});