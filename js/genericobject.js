// The generic object object for other sceneobjects to inherit from.
function GenericObject(){
  this.threejsObj = false;
  this.position = {
    x: 0,
    y: 0,
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
  this.update = function(dt){
    if(this.threejsObj){
      this.threejsObj.rotation.x += this.rotationspeed.x;
      this.threejsObj.rotation.y += this.rotationspeed.y;
      this.threejsObj.rotation.z += this.rotationspeed.z;

      this.threejsObj.position.x = this.position.x;
      this.threejsObj.position.y = this.position.y;
      this.threejsObj.position.z = this.position.z;
    }
  };
}
