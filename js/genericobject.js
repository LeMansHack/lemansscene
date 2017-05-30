// The generic object object for other sceneobjects to inherit from.
function GenericObject(args){
  this.isAlive = false;
  this.threejsObj = false;
  this.age = 0;
  this.planetrotationoffset = {
    x: 0,
    y: 0,
    z: 0,
  };
  this.initials = {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    }
  };
  this.rotationspeed = {
    x: 0,
    y: 0,
    z: 0,
  };

  this.construct = function(args){
    this.args = args;
    this.initials.rotation.y = helper.degToRad( helper.randBetween( 360 ) );
    this.initials.rotation.x = this.getSpawnlocation();

    for (var attrname in args) { this[attrname] = args[attrname]; }
    this.init();
    delete this.args;
  };

  this.init = function(){
    console.log('Generic Init');

  }; // Should be overwritten in the objects class

  this.afterinit = function(){
    this.isAlive = true;


    delete this.initials; // Remove initial values
  };

  this.update = function(dt){
    if(this.isAlive){
      this.age += dt;
    }
  };

  this.getSpawnlocation = function(){
    var r = helper.randBetween(360,0,false);

    while(!this.isValidSpawn(r)){
      r = helper.randBetween(360,0,false);
    }
    console.log('Found point!');
    console.log(r);
    return helper.degToRad(r);
  };

  this.isValidSpawn = function(r){
    if(
      ( r < 20 ) ||
      ( r > 80  && r < 100 ) ||
      ( r > 260 && r < 280 ) ||
      ( r > 160 && r < 200 ) ||
      ( r > 340 )
    ){
      return false;
    }
    return true;
  };

}
