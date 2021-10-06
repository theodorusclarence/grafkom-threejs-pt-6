/// <reference types="three" />

let scene, camera, renderer, cube; // set up the environment - // initiallize scene, camera, objects and renderer
let sphere, torus;

function createCube() {
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  cube.position.x = -4.5;
  cube.position.y = -2.5;
  scene.add(cube);
}

function createSphere() {
  let geometry = new THREE.SphereGeometry(1, 32, 32);
  let material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true,
  });
  sphere = new THREE.Mesh(geometry, material);
  sphere.position.x = -2;
  sphere.position.y = -2.5;
  scene.add(sphere);
}

function createTorus() {
  let geometry = new THREE.TorusGeometry(1, 0.5, 16, 100);
  let material = new THREE.MeshDepthMaterial();
  torus = new THREE.Mesh(geometry, material);
  scene.add(torus);
}

function init() {
  // 1. create the scene
  scene = new THREE.Scene();

  // 2. create and locate the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.x = 1;
  camera.position.z = 5;

  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, 10);
  scene.add(light);

  // 3. create an locate the object on the scene
  createCube();
  createSphere();
  createTorus();

  // 4. create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
} // main animation loop - calls 50-60 in a second.

let speed = 0.1;
function mainLoop() {
  [sphere, cube].forEach((obj) => (obj.rotation.z += 0.05));
  torus.rotation.y += speed / 10;

  const currentPos = torus.position.x;

  if (currentPos >= 5 || currentPos <= -3) speed = -speed;
  torus.position.x += speed;

  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
}

init();
mainLoop();
