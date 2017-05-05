// Primary Script for the LeMansHack Visuals Project
console.log('Main.js firing'); // Woo!

var now, dt,
    last = timestamp(); // Vars for timemanagement
var isPlaying = true;   // Whether loop is going or not
var scene;              // The Three.js Scene
var camera;             // The Three.js Camera
var renderer;           // The Three.js Renderer
var spawner;            // The scene spawner. It spawns stuff

var log = {
  'some': true,
  'most': true,
  'all':  false,
};

var sun = {
  'position': {
    'x': -40,
    'y': 100,
    'z': -50,
  },
};
console.log(planet);


// When stuff is ready - Start the Scene!
document.addEventListener('DOMContentLoaded', visualsIni);

// Main INIT function. Set up stuff and starts the loop
function visualsIni(){
  console.log('sceneIni() : DOM Loaded');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.y = 5;
  camera.position.z = 5;
  renderer = new THREE.WebGLRenderer();

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  camera.position.z = 5;

  setLight();

  scene.add( skybox.init() );
  scene.add( planet.init() );

  spawner = new Spawner();
  dbugger.init();
  window.requestAnimationFrame(nextframe);
}

// Returns current time
function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

// The LOOP
function nextframe(time){
  now   = timestamp();
  dt = Math.min(1, (now - last) / 1000);   // duration capped at 1.0 seconds
  update(dt);
  render(dt);
  last = now;
  if(isPlaying){
    window.requestAnimationFrame(nextframe);
  }
}

// The loope MAIN update function
function update(dt){
  if(planet){
    planet.update(dt); // Updates the planet (eg.rotation)
  }
  if(skybox){
    skybox.update(dt); // Updates the planet (eg.rotation)
  }
  if(spawner){
    spawner.update(dt);
  }
}

// The loops MAIN render function. All other render functions should be run here.
function render(dt) {
	renderer.render( scene, camera );
}

// Sets the ligts for the scene - Needs a lot of work..
function setLight(){
  console.log('Add Light');
  var light = new THREE.AmbientLight( colors.lights.ambient ); // soft white light
  scene.add( light );

  var sunlight = new THREE.PointLight( colors.lights.sun, 1, 0 ); // Sun light.
  sunlight.position.set( sun.position.x, sun.position.y, sun.position.z );
  sun.threejsLight = sunlight;
  scene.add( sunlight );
}
// Function to get the current framerate based on the deltatime
function dtToFps(dt){
  var fps = Math.floor(1000/dt);
  return fps;
}
