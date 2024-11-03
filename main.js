import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

let scene, camera, renderer, text, light;

function init() {
  // Create scene
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById('scene-container').appendChild(renderer.domElement);

  // Add light
  light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(0, 10, 10);
  light.castShadow = true;
  scene.add(light);

  // Add ground plane for shadow
  const planeGeometry = new THREE.PlaneGeometry(20, 20);
  const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -2;
  plane.receiveShadow = true;
  scene.add(plane);

  // Load font and create text
  const loader = new FontLoader();
  loader.load('path/to/font.json', (font) => {
    const geometry = new TextGeometry('I AM TREVOR NYABUTO', {
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5
    });
    
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    text = new THREE.Mesh(geometry, material);
    text.castShadow = true;
    text.position.set(-2, 0, 0);
    scene.add(text);
  });

  camera.position.z = 5;

  // Add mouse move event listener
  document.addEventListener('mousemove', onMouseMove);

  animate();
}

function onMouseMove(event) {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

  if (text) {
    // Move text slightly based on mouse position
    text.rotation.x = mouseY * 0.1;
    text.rotation.y = mouseX * 0.1;

    // Move light to create dynamic shadow
    light.position.x = mouseX * 5;
    light.position.z = 10 + mouseY * 5;
  }
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();
