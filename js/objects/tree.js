// A tree!!!!!
function Tree(args){
  GenericObject.call(this);
  this.colors = {
    log: {
      color: 0x734021,
      specular: 0x000000,
    },
    leaves: {
      color: 0x33ff66,
      specular: 0x000000,
      colors: [
        0xff0000,
        0x00ff00,
        0x0000ff,
        0xffff00,
        0x00ffff,
        0xff00ff,
        0x123456,
        0x000000,
      ],
    },
  };
  var c = helper.randBetween(this.colors.leaves.colors.length, 1);
  this.colors.leaves.color = this.colors.leaves.colors[c-1];

  if(typeof args !== 'undefined'){
    if(typeof args.color !== 'undefined'){
      this.colors.leaves.color = args.color;
    }
    if(typeof args.rotation !== 'undefined'){
      if(typeof args.rotation.x !== 'undefined'){
        this.initials.rotation.x = helper.degToRad(args.rotation.x);
      }
      if(typeof args.rotation.y !== 'undefined'){
        this.initials.rotation.y = helper.degToRad(args.rotation.y);
      }
      if(typeof args.rotation.z !== 'undefined'){
        this.initials.rotation.z = helper.degToRad(args.rotation.z);
      }
    }
  }
  this.init = function(){
    var geometry = new THREE.BoxGeometry( 0.2, 2, 0.2 );
    var material = new THREE.MeshPhongMaterial( { color: this.colors.log.color, specular: this.colors.log.specular, shininess: 2, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    var log = new THREE.Mesh( geometry, material );
    log.geometry.translate(0,planet.radius,0);
    log.castShadow = true;

    var lgeometry = new THREE.BoxGeometry( 1, 1, 1 );
    var lmaterial = new THREE.MeshPhongMaterial( { color: this.colors.leaves.color, specular: this.colors.leaves.color, shininess: 2, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    var leaves = new THREE.Mesh( lgeometry, lmaterial );
    leaves.geometry.translate(0,planet.radius+1,0);
    leaves.castShadow = true;

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
