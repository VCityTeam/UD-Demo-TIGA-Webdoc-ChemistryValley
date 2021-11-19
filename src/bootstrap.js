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
  iframe_Episode_1.src = 'https://www.interland.info/wp-content/uploads/2018/03/VM-vallee-de-la-Chimie-7.jpg';
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
  iframe_Episode_2.src = 'https://ud-viz.vcityliris.data.alpha.grandlyon.com/examples/AllWidget/example.html';
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
  
  view3D.appendBillboard(billboard_Episode_1);
  view3D.appendBillboard(billboard_Episode_2);
  console.log(billboard_Episode_1.getCss3DObject());
  
});