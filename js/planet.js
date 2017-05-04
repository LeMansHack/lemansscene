// Script for the planet object!
// The Planet
var planet = {
  'threejsObj' : {},  // Will contain the Three Js Object after init()
  'radius' : 5.5,     // Planet Radius. Duh..
  'rotation': {
    'speed': 0.002,   // Rotation Speed
    'axis': 'z',      // Axis to rotate around
    'x': 0,           //Initial Rotation Values
    'y': 0,           //These will set the rotation of the threeJs object.
    'z': 0,           //Use this.threejsObj.rotation.z for getting and setting
  },
  init: function(){
    var geometry = new THREE.SphereGeometry( planet.radius, 32, 32 );
    var material = new THREE.MeshPhongMaterial( { color: colors.materials.grass, specular: colors.speculars.grass, shininess: 5, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    this.threejsObj = new THREE.Mesh( geometry, material );
    this.threejsObj.position.set(0,0,0);
    this.threejsObj.rotation.x = this.rotation.x;
    this.threejsObj.rotation.y = this.rotation.y;
    this.threejsObj.rotation.z = this.rotation.z;
    helper.messUpObjVertices(this.threejsObj);
    return this.threejsObj;
  },
  // Update function for the planet
  update: function(dt){
    // rotate!
    this.threejsObj.rotation[this.rotation.axis] += this.rotation.speed;
  },
};
