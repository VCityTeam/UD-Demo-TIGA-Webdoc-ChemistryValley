import { Widgets } from 'ud-viz';
import * as THREE from 'three';
import '../assets/css/slider.css';
// import { Widgets } from 'ud-viz';

export class Navigation extends Widgets.Components.ModuleView {
  constructor(view3D) {
    super();

    let scene3D =  view3D.getScene();
    // Zoom UI
    let zoomDiv = document.createElement('nav');
    zoomDiv.className = 'slidecontainer';
    zoomDiv.innerHTML = 
        '<h2>Zoom</h2>\
        <h3 id="zoomMoins">-</h3>\
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange">\
        <h3 id="zoomPlus">+</h3>\
        <img src="./assets/img/compass.png" id="compass" style="transform: rotate(-43.4214deg);">';
    document.getElementById('root_View3D').append(zoomDiv);

    let rangeslider = document.getElementById('myRange');
    // Update the current slider value (each time you drag the slider handle)
    let lastValue = 50;
    rangeslider.oninput = function() {
      let scaleZoom = 50;
      if (lastValue < this.value){
        scaleZoom = 100;
      }else{
        scaleZoom = -100;
      }
      let direction = new THREE.Vector3();
      view3D.getCamera().getWorldDirection(direction);
      let camera = view3D.getCamera().position;
          
      direction =  new THREE.Vector3(direction.x * scaleZoom, direction.y * scaleZoom, direction.z * scaleZoom);
      camera.set(camera.x + direction.x, camera.y + direction.y, camera.z + direction.z);
      lastValue = this.value;
    };

    //Compass update with camera
    var dir = new THREE.Vector3();
    var sph = new THREE.Spherical();
    view3D.getRenderer().setAnimationLoop(() => {
      //Get z rotation of the camera and convert in degree
      document.getElementById('compass').style.transform = `rotate(${THREE.Math.radToDeg(view3D.getCamera().rotation.z)}deg)`;
    });
  }
}