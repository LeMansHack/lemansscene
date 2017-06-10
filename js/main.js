// Primary Script for the LeMansHack Visuals Project

var now, dt,
    last = timestamp(); // Vars for timemanagement
var isPlaying = true;   // Whether loop is going or not
var scene;              // The Three.js Scene
var camera;             // The Three.js Camera
var renderer;           // The Three.js Renderer
var spawner;            // The scene spawner. It spawns stuff
var cars = [];          // Array of cars

var time = {
  'd': new Date(),
};
time.h = time.d.getHours();
time.m = time.d.getMinutes();
time.s = time.d.getSeconds();

var log = {
  'some': true,
  'most': true,
  'all':  false,
};

// When stuff is ready - Start the Scene!
document.addEventListener('DOMContentLoaded', visualsIni);

// Main INIT function. Set up stuff and starts the loop
function visualsIni(){
  console.log('sceneIni() : DOM Loaded');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.y = 7;
  camera.position.z = 4;
  renderer = new THREE.WebGLRenderer();

  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap; // default THREE.PCFShadowMap
  document.body.appendChild( renderer.domElement );

  scene.add( skybox.init() );
  scene.add( ambientlight.init() );
  scene.add( sun.init() );
  scene.add( moon.init() );
  scene.add( planet.init() );

  spawner = new Spawner();
  dbugger.init();
  window.requestAnimationFrame(nextframe);

  if(true === true){
    for (var i = 0; i < 40; i++) {
      spawner.spawnTree(  );
    }
    for (var i = 0; i < 20; i++) {
      spawner.spawnCloud(  );
    }
    for (var i = 0; i < 20; i++) {
      spawner.spawnCloudHigh(  );
    }
    for (var i = 0; i < 20; i++) {
      spawner.spawnStone(  );
    }
    spawner.spawnCar(  );
  }
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
  // Updates the planet (eg.rotation)
  if(planet){ planet.update(dt); }
  // Updates the Skybox (eg.rotation)
  if(skybox){ skybox.update(dt);  }
  // Updates the Sun. (eg.rotation, color)
  if(sun){ sun.update(dt); }
  // Updates the Ambient Light. (eg. color)
  if(ambientlight){ ambientlight.update(dt); }
  // Update spawner object
  if(spawner){ spawner.update(dt); }
}

// The loops MAIN render function. All other render functions should be run here.
function render(dt) {
	renderer.render( scene, camera );
}

// Function to get the current framerate based on the deltatime
function dtToFps(dt){
  var fps = Math.floor(1000/dt);
  return fps;
}
