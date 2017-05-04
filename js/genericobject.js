// The generic object object for other sceneobjects to inherit from.
function GenericObject(args){
  this.args = args;
  this.isAlive = false;
  this.threejsObj = false;
  this.age = 0;
  this.position = {
    x: 0,
    y: 7,
    z: 0,
  };
  this.rotation = {
    x: 0,
    y: 0,
    z: 0,
  };
  this. rotationspeed = {
    x: 0,
    y: 0,
    z: 0.004,
  };
  this.construct = function(){
    this.rotation.x = planet.threejsObj.rotation.x;
    this.rotation.y = planet.threejsObj.rotation.y;
    this.rotation.z = planet.threejsObj.rotation.z;
    this.init();
    delete this.args;
  };
  this.init = function(){console.log('Generic Init');}; // Should be overwritten in the objects class
  this.afterinit = function(){
    scene.add(this.threejsObj);
    this.isAlive = true;
  };
  this.update = function(dt){
    if(this.isAlive){
      this.age += dt;
      if(this.threejsObj){
        this.threejsObj.rotation.x += this.rotationspeed.x;
        this.threejsObj.rotation.y += this.rotationspeed.y;
        this.threejsObj.rotation.z += this.rotationspeed.z;

        this.threejsObj.position.x = this.position.x;
        this.threejsObj.position.y = this.position.y;
        this.threejsObj.position.z = this.position.z;
      }
    }
  };
}
