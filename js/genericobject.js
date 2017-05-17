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
      x: helper.randBetween(4,0,false),
      y: helper.randBetween(4,0,false),
      z: helper.randBetween(4,0,false),
    }
  };
  this.rotationspeed = {
    x: 0,
    y: 0,
    z: 0,
  };
  this.construct = function(args){
    this.args = args;
    for (var attrname in args) { this[attrname] = args[attrname]; }
    this.init();
    delete this.args;
  };
  this.init = function(){console.log('Generic Init');}; // Should be overwritten in the objects class
  this.afterinit = function(){
    this.isAlive = true;
    delete this.initials; // Remove initial values
  };
  this.update = function(dt){
    if(this.isAlive){
      this.age += dt;
    }
  };
}
