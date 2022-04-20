import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import Stats from 'three/examples/jsm/libs/stats.module'


export default function Stl() {

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff);
    // scene.add(new THREE.AxesHelper(5))

    // const light = new THREE.SpotLight()
    // light.position.set(20, 20, 20)
    // scene.add(light)
    
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    )
    camera.position.set(3, 0.15, 3);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    
    const controls = new OrbitControls(camera, renderer.domElement)
    // controls.enableDamping = true
    
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
       
        metalness: 0.25,
        roughness: 0.1,
        opacity: 1.0,
        transparent: true,
        transmission: 0.99,
        clearcoat: 1.0,
        clearcoatRoughness: 0.25
    })
    
    const loader = new STLLoader()
    loader.load(
        '2022-04-07-Test-HD.stl',
        
        function (geometry) {
        
            var material = new THREE.MeshStandardMaterial({
                wireframe: true
              });
              
              const mesh = new THREE.Mesh(geometry, material)


            mesh.rotateX(-Math.PI / 2)
            scene.add(mesh)
            scene.add(new THREE.HemisphereLight(0x8E7CC3, 0x111122));
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )
  
    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    }
    
    const stats = Stats()
    document.body.appendChild(stats.dom)
    
    function animate() {
        requestAnimationFrame(animate)
        controls.update()
        render()
        stats.update()
    }
    
    function render() {
        renderer.render(scene, camera)
    }
    
    animate()
}

