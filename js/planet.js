// Script for the planet object!
// The Planet
var planet = {
  'threejsObj' : {},  // Will contain the Three Js Object after init()
  'radius' : 5.5,     // Planet Radius. Duh..
  'initials': {
    'rotation': {
      'x': 1,           // Initial Rotation Values
      'y': 0,           // These will set the rotation of the threeJs object.
      'z': 0,           // Use this.threejsObj.rotation.z for getting and setting
    },
    'position': {
      'x': 0,           // Initial Position Values
      'y': 0,           // These will set the position of the threeJs object.
      'z': 0,           // Use this.threejsObj.position.z for getting and setting
    },
  },
  'rotation': {
    'speed': 0.004,   // Rotation Speed
    'axis': 'y',      // Axis to rotate around
  },
  'mess': {
    'amount': 0.02,   // How much the vertices should differ
  },
  init: function(){
    var geometry = new THREE.SphereGeometry( planet.radius, 44, 44 );
    var material = new THREE.MeshPhongMaterial( { color: colors.materials.grass, specular: colors.speculars.grass, shininess: 5, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    this.threejsObj = new THREE.Mesh( geometry, material );
    this.threejsObj.position.set(this.initials.position.x, this.initials.position.y, this.initials.position.z);
    this.threejsObj.rotation.x = this.initials.rotation.x;
    this.threejsObj.rotation.y = this.initials.rotation.y;
    this.threejsObj.rotation.z = this.initials.rotation.z;
    delete this.initials; // Remove initial values

    this.messup();
    return this.threejsObj;
  },
  // Update function for the planet
  update: function(dt){
    // rotate!
    if(this.threejsObj.updateGeometry){
      this.threejsObj.geometry.verticesNeedUpdate = true;
    }
    this.threejsObj.rotation[this.rotation.axis] += this.rotation.speed;
  },
  messup: function(){
    helper.messUpObjVertices(this.threejsObj, this.mess.amount);
  },
};
