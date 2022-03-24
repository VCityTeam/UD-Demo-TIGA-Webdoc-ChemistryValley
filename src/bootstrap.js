/** @format */

import * as udviz from 'ud-viz';
import { HelpWindow } from '../src/Help';
import { EpisodeVisualizer } from '../src/EpisodeVisualizer';
import { EpisodeContent } from '../src/EpisodeContent';
import { DocumentContent } from '../src/DocumentContent';
import 'itowns/examples/js/plugins/FeatureToolTip.js';

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

    //Content episode visualizer
    let content_1 = new EpisodeContent(configEpisode['episode-1-data']['content-1']);
    let content_2 = new EpisodeContent(configEpisode['episode-1-data']['content-2']);
    let content_3 = new EpisodeContent(configEpisode['episode-1-data']['content-3']);
    let content_4 = new EpisodeContent(configEpisode['episode-1-data']['content-4']);

    let content_INA = new EpisodeContent(configEpisode['episode-1-data']['content-5']);

    let listContentsObservatoire = [content_1,content_2,content_3, content_4];
    const observatoire = new EpisodeVisualizer('episode_1', view3D, listContentsObservatoire);  
    observatoire.constructAllContent(false, true);

    let listContentsArchive = [content_INA];
    const archive = new EpisodeVisualizer('episode_1', view3D, listContentsArchive);  
    archive.constructAllContent(true, false);

    //Content menu
    const contentMenu = new DocumentContent(view3D, observatoire.pinsObject);
    contentMenu.constructMenu('_moduleID', '_modulename');

    //Div of the episode build
    let divEpisode = document.getElementById('episodeWindow');
    divEpisode.style.setProperty('display','none');

    view3D.html().addEventListener( 'click', onDocumentMouseClick );
    //view3D.html().addEventListener( 'pointermove', onDocumentMouseLeave );

    //Compass img element
    const compass = document.createElement('img');
    compass.src = './assets/img/compass.png';
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
    
    ////---DataGrandLyon Layers---///
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
          color: 'red',
        },
      }),
    });

    // Add the Ariege ColorLayer to the view and grant it a tooltip
    busLayer.visible = false;
    view3D.getItownsView().addLayer(busLayer);

    ////---randonnée layers---///
    const randoSource = new udviz.itowns.FileSource({
      url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=evg_esp_veg.envpdiprboucle&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:3946&startIndex=0&count=100',
      crs: 'EPSG:3946',
      format: 'application/json',
    });

    // Create a ColorLayer for the Ariege area
    const randoLayer = new udviz.itowns.ColorLayer('rando', {
      name: 'randonne',
      transparent: true,
      source: randoSource,
      style: new udviz.itowns.Style({
        fill: {
          color: 'green',
          opacity: 0.5,
        },
        stroke: {
          color: 'green',
        },
      }),
    });

    view3D.getItownsView().addLayer(randoLayer);

    //--------------------------------------------------------- Create a ColorLayer for Natural sources ---------------------------------------------------------
    const espaceNaturelSource = new udviz.itowns.FileSource({
      url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=evg_esp_veg.envens&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:3946&startIndex=0&count=100',
      crs: 'EPSG:3946',
      format: 'application/json',
    });
      // Create a ColorLayer for the Ariege area
    const espaceNaturelLayer = new udviz.itowns.ColorLayer('espaceNaturel', {
      name: 'espaceNaturel',
      transparent: true,
      source: espaceNaturelSource,
      style: new udviz.itowns.Style({
        fill: {
          color: 'green',
          opacity: 0.5,
        },
        stroke: {
          color: 'black',
          opacity:0.2
        },
      }),
    });
    espaceNaturelLayer.visible = false;
    view3D.getItownsView().addLayer(espaceNaturelLayer);


    //--------------------------------------------------------- Create a ColorLayer for Residence ---------------------------------------------------------
    // const residenceSource = new udviz.itowns.FileSource({
    //   url: 'https://download.data.grandlyon.com/wms/grandlyon',
    const residenceSource = new udviz.itowns.FileSource({
      url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=adr_voie_lieu.adrresidence&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:3946&startIndex=0&count=100',
      crs: 'EPSG:3946',
      format: 'application/json',
    });

    // Create a ColorLayer for the Ariege area
    const residenceLayer = new udviz.itowns.ColorLayer('residence', {
      name: 'residence',
      transparent: true,
      source: residenceSource,
      style: new udviz.itowns.Style({
        fill: {
          color: 'yellow',
          opacity: 0.5,
        },
        stroke: {
          color: 'black',
        },
      }),
    });
    residenceLayer.visible = false;
    view3D.getItownsView().addLayer(residenceLayer);

    // //--------------------------------------------------------- WMS indice atmo ---------------------------------------------------------
    let wmsAtmoSource = new udviz.itowns.WMSSource({
      extent: view3D.extent,
      name: 'mod_aura_2016_no2_moyan',
      url: 'https://sig.atmo-auvergnerhonealpes.fr/geoserver/mod_aura_region_2016/wms',
      version: '1.3.0',
      projection: 'EPSG:3946',
      format: 'image/jpeg',
    });

    // Add a WMS imagery layer
    let wmsImageryLayer = new udviz.itowns.ColorLayer(
      'indiceAtmo',
      {
        updateStrategy: {
          type: udviz.itowns.STRATEGY_DICHOTOMY,
          options: {},
        },
        source: wmsAtmoSource,
        transparent: true,
      }
    );
    
    wmsImageryLayer.visible = false;
    view3D.getItownsView().addLayer(wmsImageryLayer);

    //--------------------------------------------------------- Create a ColorLayer for randonnée ---------------------------------------------------------
    const cheminRandonneeSource = new udviz.itowns.FileSource({
      url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=evg_esp_veg.envpdiprboucle&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:3946&startIndex=0&count=100',
      crs: 'EPSG:3946',
      format: 'application/json',
    });
      // Create a ColorLayer for the Ariege area
    const cheminrandonneeLayer = new udviz.itowns.ColorLayer('cheminrandonne', {
      name: 'randonnee',
      transparent: true,
      source: cheminRandonneeSource,
      style: new udviz.itowns.Style({
        fill: {
          color: 'green',
          opacity: 0.5,
        },
        stroke: {
          color: 'black',
          opacity:0.2
        },
      }),
    });
    //cheminrandonneeLayer.visible = false;
    view3D.getItownsView().addLayer(cheminrandonneeLayer);

    //--------------------------------------------------------- WFS city name source ---------------------------------------------------------
    let wfsCartoSource = new udviz.itowns.WFSSource({
      url: 'https://wxs.ign.fr/cartovecto/geoportail/wfs?',
      version: '2.0.0',
      typeName: 'BDCARTO_BDD_WLD_WGS84G:zone_habitat_mairie',
      crs: 'EPSG:3946',
      ipr: 'IGN',
      format: 'application/json',
    });

    let wfsCartoStyle = new udviz.itowns.Style({
      zoom: { min: 0, max: 20 },
      text: {
        field: '{toponyme}',
        color: 'white',
        transform: 'uppercase',
        size: 15,
        haloColor: 'rgba(20,20,20, 0.8)',
        haloWidth: 3,
      },
    });

    let wfsCartoLayer = new udviz.itowns.LabelLayer('wfsCarto', {
      source: wfsCartoSource,
      style: wfsCartoStyle,
    });

    view3D.getItownsView().addLayer(wfsCartoLayer);


    /* --------------------------------- EVENT --------------------------------- */

    //Show episode div
    function onDocumentMouseClick( event ) {    
      event.preventDefault(); 
      let intersects = view3D.getItownsView().pickObjectsAt(event, 1, view3D.getScene());

      if ( intersects.length > 0 && intersects[ 0 ].object.name == 'episode_1') {
        let episodeContent = intersects[ 0 ].object.userData.Episodecontent;

        if (!episodeContent.lock){
          divEpisode.style.setProperty('display','block');
          document.getElementById('resume').textContent = episodeContent.text;
          document.getElementById('image-content').src = episodeContent.imgUnLock;
          //Details button
          document.getElementById('WindowDetailsButton').addEventListener(
            'mousedown',
            () => {
              window.open(episodeContent.src,'EpisodeContent').focus();
            },
            false
          );
        } // display the content in a div if the content is'nt lock
      }
    }

    console.log(view3D.layerManager.getLayers());

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