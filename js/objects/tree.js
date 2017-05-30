// A tree!!!!!
function Tree(args){
  GenericObject.call(this);

  var c = helper.randBetween(colors.objects.tree.leaves.colors.length, 1);
  colors.objects.tree.leaves.color = colors.objects.tree.leaves.colors[c-1];

  this.init = function(){
    var geometry = new THREE.BoxGeometry( 0.2, 2, 0.2 );
    var material = new THREE.MeshPhongMaterial( { color: colors.objects.tree.log.color, specular: colors.objects.tree.log.specular, shininess: 2, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    var log = new THREE.Mesh( geometry, material );
    log.castShadow = true;

    var lgeometry = new THREE.BoxGeometry( 1, 1, 1 );
    var lmaterial = new THREE.MeshPhongMaterial( { color: colors.objects.tree.leaves.color, specular: colors.objects.tree.leaves.color, shininess: 2, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    var leaves = new THREE.Mesh( lgeometry, lmaterial );
    leaves.castShadow = true;

    log.add(leaves);
    this.threejsObj = log;

    this.threejsObj.rotation.order = "YXZ";
    this.threejsObj.rotation.y = this.initials.rotation.y;
    this.threejsObj.rotation.x = this.initials.rotation.x;
    this.threejsObj.rotation.z = this.initials.rotation.z;

    log.geometry.translate(0,planet.radius,0);
    leaves.geometry.translate(0,planet.radius+1,0);
    planet.threejsObj.add(this.threejsObj);

    this.afterinit();
  };
  this.construct(args);
}
