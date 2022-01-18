/** @format */

import * as udviz from 'ud-viz';
import { HelpWindow } from '../src/Help';
import { EpisodeVisualizer } from '../src/EpisodeVisualizer';
import { EpisodeContent } from '../src/EpisodeContent';

udviz.Components.SystemUtils.File.loadJSON(
  './assets/config/config.json'
).then(function (config) { 

  //load episode config json - Good way to do it ?
  udviz.Components.SystemUtils.File.loadJSON(
    './assets/config/configEpisodes.json'
    ).then(function (configEpisode){

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
    const directionalLight = new udviz.THREE.DirectionalLight(0xffffff, 0.7);
    const ambientLight = new udviz.THREE.AmbientLight(0xffffff, 0.7);
    udviz.Game.Shared.Components.THREEUtils.addLights(view3D.getScene());
    udviz.Game.Shared.Components.THREEUtils.bindLightTransform(
      10,
      Math.PI / 4,
      Math.PI / 4,
      view3D.getScene(),
      directionalLight,
      ambientLight
    );

    //Help module
    const help = new HelpWindow();

    //Test episode visualizer
    let content_1 = new EpisodeContent(configEpisode['episode-1-data']['content-1']);
    let content_2 = new EpisodeContent(configEpisode['episode-1-data']['content-2']);
    let content_3 = new EpisodeContent(configEpisode['episode-1-data']['content-3']);
    let listContents = [content_1,content_2,content_3];

    const episode_1 = new EpisodeVisualizer('episode_1', view3D, listContents);  
    episode_1.constructAllContent();

    //Div of the episode build
    let divEpisode = document.getElementById('episodeWindow');
    divEpisode.style.setProperty('display','none');

    //TO-DO make a list of object clickable
    let listPins = episode_1.getPinsObject();

    view3D.html().addEventListener( 'click', onDocumentMouseClick );
    view3D.html().addEventListener( 'pointermove', onDocumentMouseLeave );

    //Compass img element
    const compass = document.createElement('img');
    compass.src = '../assets/img/compass.png';
    compass.id = 'compass';
    document.getElementById('webgl_View3D').appendChild(compass);

    //Compass update with camera
    var dir = new udviz.THREE.Vector3();
    var sph = new udviz.THREE.Spherical();
    view3D.getRenderer().setAnimationLoop(() => {
      view3D.getRenderer().render(scene3D, view3D.getCamera());
      view3D.getCamera().getWorldDirection(dir);
      sph.setFromVector3(dir);
      compass.style.transform = `rotate(${udviz.THREE.Math.radToDeg(sph.theta) - 180}deg)`;
    });

    /* --------------------------------- EVENT --------------------------------- */

    //Show episode div
    function onDocumentMouseClick( event ) {    
      event.preventDefault();
      let intersects = view3D.pickObjects(event);

      if ( intersects.length > 0 ) {
        if (!intersects[ 0 ].object.userData.LOCK) // display the content in a div if the content is'nt lock
            divEpisode.style.setProperty('display','block');
      }
    }

    //Highlight
    function onDocumentMouseLeave( event ) {    
      event.preventDefault();
      let intersects = view3D.pickObjects(event);

      if ( intersects.length > 0 ) {
        if (!intersects[ 0 ].object.userData.LOCK){ // if the content isnt lock 
            intersects[ 0 ].object.material.color.set("rgb(200, 200, 200)"); // Gray
            intersects[ 0 ].object.updateMatrixWorld();
        }else {
          listPins.material.color.set("rgb(255, 255, 255)"); // White
        }
      }
    }
  });
});