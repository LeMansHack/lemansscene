// Primary Script for the LeMansHack Visuals Project
console.log('Main.js firing'); // Woo!

var now, dt,
    last = timestamp(); // Vars for timemanagement
var scene;              // The Three.js Scene
var camera;             // The Three.js Camera
var renderer;           // The Three.js Renderer

var Planet = function(){ // The Planet - Gets a three.js object on init
  threejsObj = {};
};
var planet = new Planet(); // Instantiates the planet Object globally



// When stuff is ready - Start the Scene!
document.addEventListener('DOMContentLoaded', visualsIni);

// Main INIT function. Set up stuff and starts the loop
function visualsIni(){
  console.log('sceneIni() : DOM Loaded');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer();

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  camera.position.z = 5;

  setLight();

  planet.threejsObj = newplanetObj();
  scene.add( planet.threejsObj );
  console.log(getObjVertices(planet.threejsObj));
  messUpObjVertices(planet.threejsObj);
  console.log(getObjVertices(planet.threejsObj));

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
}

// The loops MAIN render function. All other render functions should be run here.
function render(dt) {
	renderer.render( scene, camera );
}
// Creates the planet object
function newplanetObj(){
  var geometry = new THREE.SphereGeometry( 5, 32, 32 );
  var material = new THREE.MeshPhongMaterial( { color: 0x33BB33, specular: 0xffffff, shininess: 20, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
  planetObj = new THREE.Mesh( geometry, material );
  planetObj.position.set(0,-4,0);
  return planetObj;
}
// Update function for the planet
function updatePlanet(dt){
  planet.threejsObj.rotation.z += 0.004;
}

// Sets the ligts for the scene - Needs a lot of work..
function setLight(){
  console.log('Add Light');
  var light = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( light );
  var sunlight = new THREE.PointLight( 0xff0000, 1, 10000 ); // Sun light.
  sunlight.position.set( 0, 100, -10 );
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
  console.log('About to scale vector by scale: '+scale);
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
