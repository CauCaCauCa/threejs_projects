import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'

// scene
const scene = new THREE.Scene()
// camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5
// renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
//  control - interac with client
const controls = new OrbitControls(camera, renderer.domElement)


// create Object
var geometry = new THREE.SphereGeometry(2, 60, 60)

// create surface moon
var textureURL = "image/moon1.jpg"
var displacementURL = "image/moon2.jpg"
var worldURL = "image/world.jpg"

var textureLoader = new THREE.TextureLoader()
var texture = textureLoader.load(textureURL)
var displacementMap = textureLoader.load(displacementURL)
var worldTexture = textureLoader.load(worldURL)


var material = new THREE.MeshPhongMaterial(
    {
        color: 0xffffff,
        map: texture,
        displacementMap: displacementMap,
        displacementScale: 0.06,
        bumpMap: displacementMap,
        bumpScale: 0.04,
        reflectivity: 0,
        shininess: 0
    }

)
var moon = new THREE.Mesh(geometry, material)
scene.add(moon)

// create enviroment background
var worldGeometry = new THREE.SphereGeometry(1000, 60, 60);
var worldMaterial = new THREE.MeshBasicMaterial(
    {
        color: 0xffffff,
        map: worldTexture,
        side: THREE.BackSide
    }
)
var world = new THREE.Mesh(worldGeometry, worldMaterial)
scene.add(world)

// create ambientLight for scene
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// create DirectionalLight
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

//  create HemisphereLight
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x003300, 0.5);
scene.add(hemisphereLight);

// ******** Call function to Run ********//

animate() // :))

// ******** Function ********//

window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)

function animate() {
    requestAnimationFrame(animate)
    moon.rotation.x += 0.0005
    moon.rotation.y += 0.0005
    world.rotation.y += 0.0001
    world.rotation.x += 0.0005
    controls.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}