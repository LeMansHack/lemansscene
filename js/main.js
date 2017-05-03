console.log('Main.js firing');

var now, dt,
    last = timestamp();
var scene;
var camera;
var renderer;

var Planet = function(){
  threejsObj = {};
};
var planet = new Planet();




document.addEventListener('DOMContentLoaded', visualsIni);

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

function nextframe(time){
  document.getElementById('timestamp').innerHTML = '<span>'+time+'</span>';
  now   = timestamp();
  dt = Math.min(1, (now - last) / 1000);   // duration capped at 1.0 seconds
  update(dt);
  render(dt);
  last = now;

  window.requestAnimationFrame(nextframe);
}

function update(dt){
  document.getElementById('dt').innerHTML = '<span>'+dt+'</span>';
  var fps = dtToFps(dt);
  document.getElementById('fps').innerHTML = '<span>'+fps+'</span>';
  updatePlanet(dt);
}
function render(dt) {
	renderer.render( scene, camera );
}

function newplanetObj(){
  var geometry = new THREE.SphereGeometry( 5, 32, 32 );
  var material = new THREE.MeshPhongMaterial( { color: 0x33BB33, specular: 0xffffff, shininess: 20, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
  planetObj = new THREE.Mesh( geometry, material );
  planetObj.position.set(0,-4,0);
  return planetObj;
}
function updatePlanet(dt){
  planet.threejsObj.rotation.z += 0.004;
}

function setLight(){
  console.log('Add Light');
  var light = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( light );
  var sunlight = new THREE.PointLight( 0xff0000, 1, 10000 );
  sunlight.position.set( 0, 100, -10 );
  scene.add( sunlight );
}

function getObjVertices(obj){
  var vertices = [];
  for (var i = 0; i < obj.geometry.vertices.length; i++)
  {
      var v = obj.geometry.vertices[i];
      vertices.push(v);
  }
  return vertices;
}

function messUpObjVertices(obj){
  for (var i = 0; i < obj.geometry.vertices.length; i++)
  {
      var v = obj.geometry.vertices[i];
      var scalemodifier = 0.1; // Determines how much to scalevectors. must be ]0-1[
      var scale = (Math.random()*scalemodifier)+(1-scalemodifier);
      v = scaleVector3(v, scale);
      obj.geometry.vertices[i] = v;
  }
}

function scaleVector3(v, scale){
  console.log('About to scale vector by scale: '+scale);
  v.x = v.x*scale;
  v.y = v.y*scale;
  v.z = v.z*scale;
  return v;
}

function dtToFps(dt){
  var fps = Math.floor(1000/dt);
  return fps;
}
