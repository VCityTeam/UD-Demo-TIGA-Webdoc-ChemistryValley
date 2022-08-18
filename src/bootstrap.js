/** @format */

import * as udviz from 'ud-viz';
import '../node_modules/itowns/dist/itowns_widgets.js';
import '../assets/css/styles.css';
import { HelpWindow } from '../src/Help';
import { MultiMediaVisualizer } from './MultiMediaVisualizer';
import { MultiMediaObject } from '../src/MultiMediaObject';
import { DataWindow } from './DataWindow';
import { EpisodeWindow } from './EpisodeWindow';
import { Navigation } from './Navigation';


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
    udviz.Game.Components.THREEUtils.addEquiRectangularMap(
      './assets/img/sky.jpg',
      view3D.getRenderer(),
      view3D.getScene()
    );

    const scene3D = view3D.getScene();

    //Lighting
    const directionalLight = new udviz.THREE.DirectionalLight(0xffffff, 0.7);
    const ambientLight = new udviz.THREE.AmbientLight(0xffffff, 0.7);
    udviz.Game.Components.THREEUtils.addLights(view3D.getScene());
    udviz.Game.Components.THREEUtils.bindLightTransform(
      10,
      Math.PI / 4,
      Math.PI / 4,
      view3D.getScene(),
      directionalLight,
      ambientLight
    );

    // Initialize itowns view to have a better view on the Chemistry Valley
    view3D.getCamera().position.set(1842602.2358639822, 5163108.602663754, 1584.6026942525132);
    view3D.getCamera().rotation.set(1.0619838785677609,-0.3043337605398328, -0.16561814175954986);

    // Clamp camera
    view3D.itownsView.controls.minZenithAngle = 40;
    view3D.itownsView.controls.maxZenithAngle = 180;
    view3D.itownsView.controls.maxAltitude = 6000;
    view3D.itownsView.controls.groundLevel = 500;
    view3D.itownsView.controls.handleCollision = true;

    //Help module
    const help = new HelpWindow();

    const navigation = new Navigation(view3D);

    //Content episode Observatory
    let content_1 = new MultiMediaObject(configEpisode['episode-1-data']['content-1'], false);
    let content_2 = new MultiMediaObject(configEpisode['episode-1-data']['content-2'], false);
    let content_3 = new MultiMediaObject(configEpisode['episode-1-data']['content-3'], false);
    let content_4 = new MultiMediaObject(configEpisode['episode-1-data']['content-4'], false);

    let questions = configEpisode['questions'];
    let listQuestionObjects = [];
    for (let question of questions){
      let listQ = [];
      for ( let answer of question){
        listQ.push(new MultiMediaObject(answer, true));
      }
      listQuestionObjects.push(listQ);
    }

    /* ---- Visualizer object ---- */
    //Questions
    let multiMediaVisualizerList = [];
    let pictureObjects = [];
    for (let questionObject of listQuestionObjects){
      const questionVizu = new MultiMediaVisualizer('episode_1', view3D, questionObject);  
      questionVizu.constructAllContent(false);
      multiMediaVisualizerList.push(questionVizu);
      Array.prototype.push.apply(pictureObjects, questionVizu.pictureObjects);
    }

    //Observatory 
    let listContentsObservatory = [content_1, content_2, content_3, content_4];
    const observatory = new MultiMediaVisualizer('Observatory', view3D, listContentsObservatory);  
    observatory.constructAllContent(false);
    Array.prototype.push.apply(pictureObjects, observatory.pictureObjects);
    observatory.constructHtmlVideos();

    /* ---- UI ---- */
    //Content menu
    const contentMenu = new DataWindow(view3D, observatory);
    contentMenu.constructMenu('_moduleID', '_modulename');

    //Question answer menu
    const questionMenu = new EpisodeWindow(view3D, multiMediaVisualizerList);
    questionMenu.constructMenu('_moduleID', '_modulename');

    view3D.html().addEventListener( 'click', onDocumentMouseClick );

    ////--------------------------------DataGrandLyon Layers--------------------------------///
    const busSource = new udviz.itowns.FileSource({
      url: 'https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=tcl_sytral.tcllignebus_2_0_0&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:3946&startIndex=0&count=100',
      crs: 'EPSG:3946',
      format: 'application/json',
    });

    // Create a ColorLayer for the Ariege area
    const busLayer = new udviz.itowns.ColorLayer('bus', {
      name: 'LineBus',
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
    const trekkeSource = new udviz.itowns.FileSource({
      url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=evg_esp_veg.envpdiprboucle&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:3946&startIndex=0&count=100',
      crs: 'EPSG:3946',
      format: 'application/json',
    });

    const trekkeLayer = new udviz.itowns.ColorLayer('trekke', {
      name: 'trekke',
      transparent: true,
      source: trekkeSource,
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

    view3D.getItownsView().addLayer(trekkeLayer);

    ////--- Create a ColorLayer for Natural sources ---////
    const naturalSpacesSource = new udviz.itowns.FileSource({
      url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=evg_esp_veg.envens&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:3946&startIndex=0&count=100',
      crs: 'EPSG:3946',
      format: 'application/json',
    });
      // Create a ColorLayer for the Ariege area
    const naturalSpacesLayer = new udviz.itowns.ColorLayer('naturalSpaces', {
      name: 'naturalSpaces',
      transparent: true,
      source: naturalSpacesSource,
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
    naturalSpacesLayer.visible = false;
    view3D.getItownsView().addLayer(naturalSpacesLayer);


    ////--- Residence layer ---////
    //   url: 'https://download.data.grandlyon.com/wms/grandlyon',
    const residenceSource = new udviz.itowns.FileSource({
      url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=adr_voie_lieu.adrresidence&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:3946&startIndex=0&count=100',
      crs: 'EPSG:3946',
      format: 'application/json',
    });

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

    ////--- WMS indice atmo ---////
    let wmsAtmoSource = new udviz.itowns.WMSSource({
      extent: view3D.extent,
      name: 'NO2_moyan_2021',
      url: 'https://sig.atmo-auvergnerhonealpes.fr/geoserver/mod_aura_region_2021/wms',
      version: '1.3.0',
      projection: 'EPSG:3946',
      format: 'image/jpeg',
    });

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

    ////--- Radonnee layer ---////
    const cheminRandonneeSource = new udviz.itowns.FileSource({
      url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=evg_esp_veg.envpdiprboucle&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:3946&startIndex=0&count=100',
      crs: 'EPSG:3946',
      format: 'application/json',
    });
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
    view3D.getItownsView().addLayer(cheminrandonneeLayer);

    ////--- WFS city name source ---////
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


    //Video of introduction
    let divIntro = document.createElement('div');
    divIntro.id = 'intro';
    document.getElementById('webgl_View3D').appendChild(divIntro);
    
    let videoIntro = document.createElement('video');
    videoIntro.src = './../Générique Dlf.m4v';
    videoIntro.setAttribute('controls','controls');
    divIntro.appendChild(videoIntro);
    videoIntro.autoplay = true;

    let buttonIntro = document.createElement('button');
    buttonIntro.textContent = 'Passer l’into';
    divIntro.appendChild(buttonIntro);

    buttonIntro.addEventListener(
      'mousedown',
      () => { divIntro.remove(); });

    videoIntro.onended = ()=>{
      divIntro.remove();
    };


    //Event to display multimedia content
    function onDocumentMouseClick( event ) {    
      event.preventDefault(); 

      let raycaster =  new udviz.THREE.Raycaster();
      let mouse3D = new udviz.THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   
        -( event.clientY / window.innerHeight ) * 2 + 1,  
        0.5 );                                        
      raycaster.setFromCamera( mouse3D, view3D.getCamera() );
     
      let intersects = raycaster.intersectObjects( pictureObjects );

      if ( intersects.length > 0 ){
        intersects.forEach(elementIntersect => {
          //check visibility to not intersect with hidden object
          if(elementIntersect.object.visible == true){
            let multimediaObject = elementIntersect.object.userData.multimediaObject;
            document.getElementById('resumeVideo').textContent = multimediaObject.text;
            document.getElementById('episodeWindowVideo').hidden = false;
            document.getElementById('episodeWindowVideo').style.display = 'block';

            // Check if the multimedia is a video or not and change integration
            if (multimediaObject.isVideo){             
              document.getElementById('video-content').hidden = false;
              document.getElementById('video-content').src = multimediaObject.imgContent;
              
            }else{
              document.getElementById('video-content').hidden = true;
              document.getElementById('img-content').src = multimediaObject.imgContent;
            }
            //Change color when the multimedia is consume 
            elementIntersect.object.material.color.setRGB(0.3, 0.3, 0.3);
          }
        });
      }
    }
  });
});