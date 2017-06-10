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


var ambientlight = {
  h: 0,
  init: function(){
    this.h = time.h;
    this.threejsLight = new THREE.AmbientLight( this.getColor( this.h ) ); // soft white light
    return this.threejsLight;
  },
  update: function(){
    if(this.h !== time.h ){
      console.log('Time changed');
      this.h = time.h;
      this.setColor();
    }
  },
  getColor: function( h ){
    var k = 0;
    for (var key in colors.lights.ambient) {
      if( h >= key ){
        k = colors.lights.ambient[key];
      }
    }
    return k;
  },
  setColor: function(){
    var c = this.getColor( this.h );
    this.threejsLight.color.setHex( c );
  },
};


// sunlight
var sun = {
  position: {
    x: 0,
    y: 0,
    z: -50,
  },
  distFromCenter: planet.radius * 19.58, // 107.703
  vector2: {
    a: this.distFromCenter * -1,
    b: 0,
  },
  h: 0,
  init: function(){
    this.h = time.h;
    this.position = this.calcPosition( this.h );

    sunlight = new THREE.PointLight( this.getColor( this.h ), 1, 0 ); // Sun light.
    sunlight.castShadow = true;
    sunlight.shadow.mapSize.width   = 512*2;  // default
    sunlight.shadow.mapSize.height  = 512*2; // default
    sunlight.position.set( this.position.x, this.position.y, this.position.z );
    sun.threejsLight = sunlight;
    return sun.threejsLight;
  },
  update: function(){
    if(this.h !== time.h ){
      this.h = time.h;
      this.setColor();
      this.position = this.calcPosition( this.h );
      this.threejsLight.position.set( this.position.x, this.position.y, this.position.z );
      if(moon){
        moon.update();
      }
    }
  },
  getColor: function( h ){
    var k = 0;
    for (var key in colors.lights.sun) {
      if( h >= key ){
        k = colors.lights.sun[key];
      }
    }
    return k;
  },
  setColor: function(){
    var c = this.getColor( this.h );
    this.threejsLight.color.setHex( c );
  },
  calcPosition: function( h ){
    var pos = {x:0,y:0,z:this.position.z}; // Object for containing the postion in 3d space
    var rotation = ( this.h / 24 ) * 360;  // Current time in degrees.
    rotation += 90;                        // Add 90 deg to place midnight at 90 deg (down)
    rotation = rotation % 360;             // Modular 360

    // console.log('Its '+time.h+':'+time.m+' o\'clock so sun rotation is '+rotation);
    rotation = helper.degToRad(rotation);  // Convert to radians

    // Calculate normalized vector 2 from rotation
    var ca = Math.cos(rotation);
    var sa = Math.sin(rotation);
    this.vector2.a = ca*1 - sa*0;
    this.vector2.b = sa*1 + ca*0;
    // Scale vector
    pos.x = this.vector2.a * this.distFromCenter;
    pos.y = this.vector2.b * this.distFromCenter;
    return pos;
  },
};

// moonlight
var moon = {
  vector2: {a:0,b:0},
  distFromCenter: sun.distFromCenter,
  init: function(){
    this.position = this.calcPosition( this.h );
    moonlight = new THREE.PointLight( this.getColor( this.h ), 1, 0 ); // Sun light.
    moonlight.castShadow = true;
    moonlight.shadow.mapSize.width   = 512*2;  // default
    moonlight.shadow.mapSize.height  = 512*2; // default
    moonlight.position.set( this.position.x, this.position.y, this.position.z );
    moon.threejsLight = moonlight;
    return moon.threejsLight;
  },
  update: function(){
      this.setColor();
      this.position = this.calcPosition( this.h );
      this.threejsLight.position.set( this.position.x, this.position.y, this.position.z );
  },
  getColor: function( h ){
    var k = 0;
    for (var key in colors.lights.moon) {
      if( h >= key ){
        k = colors.lights.moon[key];
      }
    }
    return k;
  },
  setColor: function(){
    var c = this.getColor( this.h );
    this.threejsLight.color.setHex( c );
  },
  calcPosition: function( h ){
    var pos = {x:0,y:0,z:sun.position.z}; // Object for containing the postion in 3d space
    var rotation = sun.rotation + 180;  // Current time in degrees.
    rotation += 90;                        // Add 90 deg to place midnight at 90 deg (down)
    rotation = rotation % 360;             // Modular 360

    // console.log('Its '+time.h+':'+time.m+' o\'clock so sun rotation is '+rotation);
    rotation = helper.degToRad(rotation);  // Convert to radians

    // Calculate normalized vector 2 from rotation
    var ca = Math.cos(rotation);
    var sa = Math.sin(rotation);
    this.vector2.a = ca*1 - sa*0;
    this.vector2.b = sa*1 + ca*0;
    // Scale vector
    pos.x = this.vector2.a * this.distFromCenter;
    pos.y = this.vector2.b * this.distFromCenter;
    return pos;
  },
};
