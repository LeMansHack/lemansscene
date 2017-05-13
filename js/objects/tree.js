// A tree!!!!!
function Tree(args){
  GenericObject.call(this);
  this.init = function(){
    var geometry = new THREE.BoxGeometry( 0.2, 2, 0.2 );
    var material = new THREE.MeshPhongMaterial( { color: 0x734021, specular: 0x000000, shininess: 2, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    var log = new THREE.Mesh( geometry, material );
    log.geometry.translate(0,planet.radius,0);

    var lgeometry = new THREE.BoxGeometry( 1, 1, 1 );
    var lmaterial = new THREE.MeshPhongMaterial( { color: 0x33ff66, specular: 0x000000, shininess: 2, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    var leaves = new THREE.Mesh( lgeometry, lmaterial );
    leaves.geometry.translate(0,planet.radius+1,0);

    log.add(leaves);
    this.threejsObj = log;
    planet.threejsObj.add(this.threejsObj);

    this.threejsObj.position.x = this.initials.position.x;
    this.threejsObj.position.y = this.initials.position.y;
    this.threejsObj.position.z = this.initials.position.z;
    this.threejsObj.rotation.x = this.initials.rotation.x;
    this.threejsObj.rotation.y = this.initials.rotation.y;
    this.threejsObj.rotation.z = this.initials.rotation.z;
    this.afterinit();
  };
  this.construct(args);
}
