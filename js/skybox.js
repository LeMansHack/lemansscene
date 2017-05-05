// SKY BOX!
var skybox = {
  'threejsObj': {},
  'radius': 70,
  'rotationspeed': {
    'x': 0,
    'y': 0.001,
    'z': 0,
  },
  init: function(){
    var geometry = new THREE.SphereGeometry( skybox.radius, 32, 32 );
    var material = new THREE.MeshPhongMaterial( { color: colors.materials.sky, specular: colors.speculars.sky, shininess: 2, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading, side: THREE.BackSide } );
    this.threejsObj = new THREE.Mesh( geometry, material );
    this.threejsObj.position.set(0,0,0);
    return this.threejsObj;
  },
  update: function(dt){
    if(this.rotationspeed){
      this.threejsObj.rotation.x += this.rotationspeed.x;
      this.threejsObj.rotation.y += this.rotationspeed.y;
      this.threejsObj.rotation.z += this.rotationspeed.z;
    }
  },
};
