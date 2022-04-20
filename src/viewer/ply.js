import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
export default function Ply() {
    var container, stats;
    var camera, scene, renderer;
    
    init();
    animate();
    
    function init() {
      container = document.createElement("div");
      document.body.appendChild(container);
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      );
      camera.position.set(3, 0.15, 3);
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      // PLY file
      var loader = new PLYLoader();
      loader.load("2022-04-07-Test-HD.ply", function(geometry) {
        geometry.computeVertexNormals();
    
        var material = new THREE.MeshStandardMaterial({
          wireframe: true
        });
        var mesh = new THREE.Mesh(geometry, material);
    
        mesh.rotateX(-Math.PI / 2)
        scene.add(mesh)
      });
      // Lights
      scene.add(new THREE.HemisphereLight(0xffffff, 0x111122));
      // renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);
      let control = new OrbitControls(camera, renderer.domElement);
      // stats
      stats = new Stats();
      container.appendChild(stats.dom);
    }
    
    
    function animate() {
      requestAnimationFrame(animate);
      render();
      stats.update();
    }
    
    function render() {
      renderer.render(scene, camera);
    }

}

