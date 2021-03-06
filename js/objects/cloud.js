// A Cloud!!!!!
function Cloud(args){
  GenericObject.call(this);
  this.translate = {
    y: 0,
  };
  this.altitudes = {
    min: 3.2,
    max: 3.6,
  };
  this.parts = {
    amount: 4,
    radius: 0,
    size: {
      min: 0.15,
      max: 0.8,
    },
    offset: {
      min: 0.1,
      max: 0.5,
    }
  };

  this.rotationspeed = {
    scale: .01,
    x: Math.random(),
    y: Math.random(),
    z: Math.random(),
  };
  this.init = function(){

    for (var i = 0; i < this.parts.amount; i++) {
      var part = this.makePart();
      if(!this.threejsObj){
        var tranY = helper.randBetween( this.altitudes.max, this.altitudes.min, false );
        this.translate.y = planet.radius + tranY;
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

    this.threejsObj.rotation.x = this.initials.rotation.x;
    this.threejsObj.rotation.y = this.initials.rotation.y;
    this.threejsObj.rotation.z = this.initials.rotation.z;
    this.afterinit();
  };
  this.makePart = function(){
    var r = helper.randBetween(this.parts.size.max, this.parts.size.min, false );
    var geometry = new THREE.SphereGeometry( r, 5, 5 );
    var material = new THREE.MeshPhongMaterial( { color: colors.objects.cloud.normal.color, specular: colors.objects.cloud.normal.specular, shininess: 2, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    var part = new THREE.Mesh( geometry, material );

    return part;
  };
  this.update = function(dt){
    if(typeof livedata !== 'undefined' && typeof livedata.wind !== 'undefined'){
      this.threejsObj.rotation.x += this.rotationspeed.x * this.rotationspeed.scale * livedata.wind.direction.a * livedata.wind.speed * dt;
      this.threejsObj.rotation.z += this.rotationspeed.z * this.rotationspeed.scale * livedata.wind.speed * dt;
    }
  };
  this.construct(args);
}
