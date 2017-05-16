// A Cloud!!!!!
function Cloud(args){
  GenericObject.call(this);
  this.colors = {
    normal: {
      color: 0xFFFFFF,
      specular: 0x000000,
    },
  };
  this.translate = {
    y: 0,
  };
  this.altitudes = {
    min: 2.2,
    max: 2.6,
  };
  this.parts = {
    amount: 4,
    radius: 0,
    size: {
      min: 0.2,
      max: 0.8,
    },
    offset: {
      min: 0.1,
      max: 0.5,
    }
  };
  this.init = function(){

    for (var i = 0; i < this.parts.amount; i++) {
      var part = this.makePart();
      if(!this.threejsObj){
        var tranY = planet.radius + helper.randBetween( this.altitudes.max, this.altitudes.min );
        this.translate.y = tranY;
        part.geometry.translate( 0, tranY, 0 );
        this.threejsObj = part;
      }else{
        var offset = {
          x: helper.randBetween( this.parts.offset.max, this.parts.offset.min, false ),
          y: helper.randBetween( this.parts.offset.max, this.parts.offset.min, false ),
          z: helper.randBetween( this.parts.offset.max, this.parts.offset.min, false ),
        };
        part.geometry.translate( offset.x, offset.y+this.translate.y, offset.z );
        part.rotation.y =  helper.randBetween( 4, 0, false );
        this.threejsObj.add(part);
      }
    }
    planet.threejsObj.add(this.threejsObj);

    this.threejsObj.rotation.x = helper.randBetween(360);
    this.threejsObj.rotation.y = helper.randBetween(360);
    this.threejsObj.rotation.z = helper.randBetween(360);
    this.afterinit();
  };
  this.makePart = function(){
    var r = helper.randBetween(this.parts.size.max, this.parts.size.min, false );
    var geometry = new THREE.SphereGeometry( r, 5, 5 );
    var material = new THREE.MeshPhongMaterial( { color: this.colors.normal.color, specular: this.colors.normal.specular, shininess: 2, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    var part = new THREE.Mesh( geometry, material );

    return part;
  };
  this.construct(args);
}
