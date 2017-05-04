// Script for the planet object!
// The Planet
var planet = {
  'threejsObj' : {},  // Will contain the Three Js Object after init()
  'radius' : 5.5,     // Planet Radius. Duh..
  'rotation': {
    'speed': 0.002,   // Rotation Speed
    'axis': 'z',      // Axis to rotate around
    'x': 0,           // Initial Rotation Values
    'y': 0,           // These will set the rotation of the threeJs object.
    'z': 0,           // Use this.threejsObj.rotation.z for getting and setting
  },
  'position': {
    'x': 0,           // Initial Position Values
    'y': 0,           // These will set the position of the threeJs object.
    'z': 0,           // Use this.threejsObj.position.z for getting and setting
  },
  'mess': {
    'amount': 0.02,   // How much the vertices should differ
  },
  init: function(){
    var geometry = new THREE.SphereGeometry( planet.radius, 32, 32 );
    var material = new THREE.MeshPhongMaterial( { color: colors.materials.grass, specular: colors.speculars.grass, shininess: 5, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    this.threejsObj = new THREE.Mesh( geometry, material );
    this.threejsObj.position.set(this.position.x, this.position.y, this.position.z);
    delete this.position; // Remove initial values
    this.threejsObj.rotation.x = this.rotation.x;
    this.threejsObj.rotation.y = this.rotation.y;
    this.threejsObj.rotation.z = this.rotation.z;
    delete this.rotation.x; // Remove initial values
    delete this.rotation.y; // Remove initial values
    delete this.rotation.z; // Remove initial values

    this.messup();
    return this.threejsObj;
  },
  // Update function for the planet
  update: function(dt){
    // rotate!
    this.threejsObj.rotation[this.rotation.axis] += this.rotation.speed;
  },
  messup: function(){
    helper.messUpObjVertices(this.threejsObj, this.mess.amount);
  },
};
