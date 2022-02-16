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
    //view3D.html().addEventListener( 'pointermove', onDocumentMouseLeave );

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

    ////// LAYER CHOICE MODULE
    //const layerChoice = new udviz.Widgets.LayerChoice(view3D.layerManager);
    //new udviz.Templates.AllWidget().addModuleView('layerChoice', layerChoice);

    let color = new udviz.THREE.Color();

    function colorSurfaceBatiments() {
      return color.set(0x008000);
    }

    ////---DataGrandLyon Layers---////
    const bruitSource = new udviz.itowns.WFSSource({
      url: 'https://download.data.grandlyon.com/wfs/grandlyon?',
      protocol: 'wms',
      version: '1.3.0',
      id: 'bruit',
      typeName: 'ind_ln_p',
      crs: 'EPSG:3946',
      extent: view3D.extent,
      format: 'PNG',
    });
      
    const bruitLayer = new udviz.itowns.GeometryLayer('Bruit', new udviz.THREE.Group(), {
      update: udviz.itowns.FeatureProcessing.update,
      convert: udviz.itowns.Feature2Mesh.convert(),
      source: bruitSource,
      style: new udviz.itowns.Style({
        fill:{
          base_altitude: 170.1,
        }
      })
    });
    view3D.getItownsView().addLayer(bruitLayer);
    
    const espaceVegetaliseSource = new udviz.itowns.WFSSource({
      url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=evg_esp_veg.occlieneva2009&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:3946&startIndex=0&count=100',
      protocol: 'wfs',
      version: '2.0.0',
      id: 'vegetaliser',
      typeName: 'evg_esp_veg.occlieneva2009',
      crs: 'EPSG:3946',
      extent: view3D.extent,
      format: 'geojson',
    });
      
    const espaceVegetaliseLayer = new udviz.itowns.GeometryLayer('Vegetalise', new udviz.THREE.Group(), {
      update: udviz.itowns.FeatureProcessing.update,
      convert: udviz.itowns.Feature2Mesh.convert(),
      source: espaceVegetaliseSource,
      style: new udviz.itowns.Style({
        fill:{
          base_altitude: 170.1,
          color: colorSurfaceBatiments,
        }
      })
    });
    // Add the Ariege ColorLayer to the view and grant it a tooltip
    view3D.getItownsView().addLayer(espaceVegetaliseLayer);

    //
    const busSource = new udviz.itowns.FileSource({
      url: 'https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=tcl_sytral.tcllignebus_2_0_0&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:3946&startIndex=0&count=100',
      crs: 'EPSG:3946',
      format: 'application/json',
    });
      // Create a ColorLayer for the Ariege area
    const busLayer = new udviz.itowns.ColorLayer('bus', {
      name: 'LigneBus',
      transparent: true,
      source: busSource,
      style: new udviz.itowns.Style({
        fill: {
          color: 'yellow',
          opacity: 0.5,
        },
        stroke: {
          color: 'white',
        },
      }),
    });
      // Add the Ariege ColorLayer to the view and grant it a tooltip
    view3D.getItownsView().addLayer(busLayer);

    /* --------------------------------- EVENT --------------------------------- */

    //Show episode div
    function onDocumentMouseClick( event ) {    
      event.preventDefault(); 
      let intersects = view3D.getItownsView().pickObjectsAt(event, 1, view3D.getScene());

      if ( intersects.length > 0 && intersects[ 0 ].object.name == 'episode_1') {
        let episodeContent = intersects[ 0 ].object.userData.Episodecontent;

        if (!episodeContent.lock){
          divEpisode.style.setProperty('display','block');
          document.getElementById('first-title').textContent = episodeContent.text;
          document.getElementById('image-content').src = episodeContent.imgUnLock;
          console.log(episodeContent.imgUnLock);
        } // display the content in a div if the content is'nt lock
      }
    }

    //Highlight
    // function onDocumentMouseLeave( event ) {    
    //   event.preventDefault();
    //   let intersects = view3D.getItownsView().pickObjectsAt(event, 1, view3D.getScene());

    //   if ( intersects.length > 0 && intersects[ 0 ].object.name == 'episode_1') {
    //     if (!intersects[ 0 ].object.userData.LOCK){ // if the content isnt lock 
    //       intersects[ 0 ].object.material.color.set('rgb(200, 200, 200)'); // Gray
    //       intersects[ 0 ].object.updateMatrixWorld();
    //     }else {
    //       listPins.material.color.set('rgb(255, 255, 255)'); // White
    //     }
    //   }
    // }
  });
});