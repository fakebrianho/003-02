import './style.css'
import * as THREE from 'three'
import {
	addBoilerPlateMesh,
	addStandardMesh,
	addPlanet1,
	addPlanet2,
} from './addMeshes'
import { addLight } from './addLights'
import Model from './Model'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({ antialias: true })
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	100
)
camera.position.set(0, 0, 5)

const meshes = {}
const mixers = []
let tick = 0
const clock = new THREE.Clock()
const controls = new OrbitControls(camera, renderer.domElement)
init()
function init() {
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	//meshes
	meshes.default = addBoilerPlateMesh()
	meshes.standard = addStandardMesh()
	meshes.planet1 = addPlanet1()
	meshes.planet2 = addPlanet2()

	//lights
	meshes.defaultLight = addLight()

	//changes
	meshes.default.scale.set(2, 2, 2)

	//scene operations
	scene.add(meshes.default)
	scene.add(meshes.standard)
	scene.add(meshes.defaultLight)

	models()
	resize()
	animate()
}

function models() {
	const Flower = new Model({
		url: '/flowers.glb',
		meshes: meshes,
		name: 'flower',
		scene: scene,
		animationState: true,
		mixers: mixers,
		replace: true,
		scale: new THREE.Vector3(2, 2, 2),
		position: new THREE.Vector3(0, -0.8, 3),
	})
	Flower.init()
}

function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}

function animate() {
	requestAnimationFrame(animate)
	const delta = clock.getDelta()
	meshes.default.rotation.x += 0.01
	meshes.default.rotation.z += 0.01

	meshes.standard.rotation.x += 0.01
	meshes.standard.rotation.z += 0.01

	for (const mixer of mixers) {
		mixer.update(delta)
	}

	// meshes.default.scale.x += 0.01

	renderer.render(scene, camera)
}
