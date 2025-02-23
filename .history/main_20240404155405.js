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

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({ antialias: true })
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	100
)
camera.position.set(0, 0, 5)
// let mesh
const meshes = {}
let tick = 0
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
	scene.add(meshes.planet1)
	scene.add(meshes.planet2)
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
	})
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
	tick += 0.1

	meshes.default.rotation.x += 0.01
	meshes.default.rotation.z += 0.01

	meshes.standard.rotation.x += 0.01
	meshes.standard.rotation.z += 0.01
	meshes.standard.position.x = Math.sin(tick * 0.1) * 2
	meshes.standard.position.y = Math.cos(tick * 0.1) * 2
	meshes.default.position.x = Math.sin(tick * 0.4)
	meshes.default.position.y = Math.cos(tick * 0.4)
	meshes.planet2.position.x = Math.sin(tick * 0.2) * 3.5
	meshes.planet2.position.y = Math.cos(tick * 0.2) * 3.5
	// meshes.default.scale.x += 0.01

	renderer.render(scene, camera)
}
