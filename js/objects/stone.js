// A Stone!!!!!
function Stone(args){
  GenericObject.call(this);
  this.parts = {
    amount: 3,
    radius: {
      min: 0.2,
      max: 0.5,
    },
    offset: {
      min: 0,
      max: 0.2,
    },
    scale: {
      x: {
        min: 1,
        max: 1.4,
      },
      y: {
        min: 1,
        max: 1.2,
      },
      z: {
        min: 1,
        max: 1.4,
      },
    },
  };
  this.objs = [];
  this.init = function(){

    for (var i = 0; i < this.parts.amount; i++) {
      var part = this.makePart();
      if(!this.threejsObj){
        part.geometry.translate( 0, planet.radius, 0 );
        this.threejsObj = part;
      }else{
        var offset = {
          x: helper.randBetween( this.parts.offset.max, this.parts.offset.min, false ),
          y: helper.randBetween( this.parts.offset.max, this.parts.offset.min, false ),
          z: helper.randBetween( this.parts.offset.max, this.parts.offset.min, false ),
        };
        part.geometry.translate( offset.x,  offset.y + planet.radius, offset.z );
        part.rotation.y =  helper.randBetween( 4, 0, false );
        this.threejsObj.add(part);
      }
    }
    planet.threejsObj.add(this.threejsObj);
    
    this.threejsObj.rotation.order = "YXZ";
    this.threejsObj.rotation.x = this.initials.rotation.x;
    this.threejsObj.rotation.y = this.initials.rotation.y;
    this.threejsObj.rotation.z = this.initials.rotation.z;
    this.afterinit();
  };
  this.makePart = function(){
    var r = helper.randBetween(this.parts.radius.max, this.parts.radius.min, false );
    var geometry = new THREE.SphereGeometry( r, 5, 5 );
    var material = new THREE.MeshPhongMaterial( { color: colors.objects.stone.normal.color, specular: colors.objects.stone.normal.specular, shininess: 2, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    var part = new THREE.Mesh( geometry, material );
    var scale = {
      x: helper.randBetween(this.parts.scale.x.max, this.parts.scale.x.min, false),
      y: helper.randBetween(this.parts.scale.y.max, this.parts.scale.y.min, false),
      z: helper.randBetween(this.parts.scale.z.max, this.parts.scale.z.min, false),
    };
    part.scale.x = scale.x;
    // part.scale.y = scale.y;
    part.scale.z = scale.z;
    this.objs.push({r:r, scale:scale});

    return part;
  };
  this.construct(args);
}
