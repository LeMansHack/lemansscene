// Script for spawning object in the scene
var Spawner = function(){
  var that = this;
  this.objects = [];

  this.update = function(dt){
    if(Math.random() < 0.01){
      this.spawnSquare();
    }
    // Updates all the spawned in objects
    var objectslength = this.objects.length;
    if(objectslength > 0){
      for (var i = objectslength-1; i >= 0; i--) {
        this.objects[i].update(dt);
      }
    }
  };

  this.spawnSquare = function(){
    // console.log('Sup?');
  };
};
