## Compass documentation
HTMLElement pointant vers le nord de la maquette numérique pour que l'utilisateur se repère plus facilement.
<p align="center">
  <img src="../assets/img/compass.png" alt="Home" height="90"/>
</p>

```javascript
    var dir = new udviz.THREE.Vector3();
    var sph = new udviz.THREE.Spherical();
    view3D.getRenderer().setAnimationLoop(() => {
      view3D.getRenderer().render(scene3D, view3D.getCamera());
      view3D.getCamera().getWorldDirection(dir);
      sph.setFromVector3(dir);
      compass.style.transform = `rotate(${udviz.THREE.Math.radToDeg(sph.theta) - 180}deg)`;
    });

```
