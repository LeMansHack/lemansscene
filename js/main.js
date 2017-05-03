// Primary Script for the LeMansHack Visuals Project
console.log('Main.js firing'); // Woo!

var now, dt,
    last = timestamp(); // Vars for timemanagement
var scene;              // The Three.js Scene
var camera;             // The Three.js Camera
var renderer;           // The Three.js Renderer
var spawner;            // The scene spawner. It spawns stuff

// The Planet - Gets a three.js object on init
var planet = {
  'threejsObj' : {},
  'radius' : 5.5,
};
var skybox = {
  'radius': 70,
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

  skybox.threejsObj = setSkybox();
  scene.add( skybox.threejsObj );

  planet.threejsObj = newplanetObj();
  scene.add( planet.threejsObj );
  messUpObjVertices(planet.threejsObj);

  spawner = new Spawner();

  window.requestAnimationFrame(nextframe);
}

// Returns current time
function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

// The LOOP
function nextframe(time){
  document.getElementById('timestamp').innerHTML = '<span>'+time+'</span>';
  now   = timestamp();
  dt = Math.min(1, (now - last) / 1000);   // duration capped at 1.0 seconds
  update(dt);
  render(dt);
  last = now;

  window.requestAnimationFrame(nextframe);
}

// The loope MAIN update function
function update(dt){
  document.getElementById('dt').innerHTML = '<span>'+dt+'</span>';
  var fps = dtToFps(dt);
  document.getElementById('fps').innerHTML = '<span>'+fps+'</span>';
  updatePlanet(dt); // Updates the planet (eg.rotation)
  spawner.update(dt);
}

// The loops MAIN render function. All other render functions should be run here.
function render(dt) {
	renderer.render( scene, camera );
}
// Creates the planet object
function newplanetObj(){
  var geometry = new THREE.SphereGeometry( planet.radius, 32, 32 );
  var material = new THREE.MeshPhongMaterial( { color: colors.materials.grass, specular: colors.speculars.grass, shininess: 5, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
  console.log(colors);
  planetObj = new THREE.Mesh( geometry, material );
  planetObj.position.set(0,0,0);
  planetObj.rotation.z += 1;
  return planetObj;
}
function setSkybox(){
  var geometry = new THREE.SphereGeometry( skybox.radius, 32, 32 );
  var material = new THREE.MeshPhongMaterial( { color: colors.materials.sky, specular: colors.speculars.sky, shininess: 20, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading, side: THREE.BackSide } );
  skyboxObj = new THREE.Mesh( geometry, material );
  skyboxObj.position.set(0,0,0);
  return skyboxObj;
}
// Update function for the planet
function updatePlanet(dt){
  // planet.threejsObj.rotation.x += 0.004; // Rotate towards cam
  planet.threejsObj.rotation.z += 0.004;    // Rotate counter clockwise
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
// Returns an array of vertices for a three object that has geometry
function getObjVertices(obj){
  var vertices = [];
  for (var i = 0; i < obj.geometry.vertices.length; i++)
  {
      var v = obj.geometry.vertices[i];
      vertices.push(v);
  }
  return vertices;
}
// Takes a three object and loops through all its vertices and scales them each on random by a little bit
function messUpObjVertices(obj){
  for (var i = 0; i < obj.geometry.vertices.length; i++)
  {
      var v = obj.geometry.vertices[i];     // The current vertice
      var scalemodifier = 0.1;              // Determines how much to scalevectors. must be ]0-1[
      var scale = (Math.random()*scalemodifier)+(1-scalemodifier); // Generates the scale. Will be ]0-2[
      v = scaleVector3(v, scale);           // Scales the vector
      obj.geometry.vertices[i] = v;
  }
}
// Up- or down scales a vector three and returns it
function scaleVector3(v, scale){
  // console.log('About to scale vector by scale: '+scale);
  v.x = v.x*scale;
  v.y = v.y*scale;
  v.z = v.z*scale;
  return v;
}
// Function to get the current framerate based on the deltatime
function dtToFps(dt){
  var fps = Math.floor(1000/dt);
  return fps;
}
