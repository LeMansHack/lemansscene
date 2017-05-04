// Script for spawning object in the scene
var Spawner = function(){
  var that = this;
  this.objects = [];

  this.update = function(dt){
    if(Math.random() < 0.01){
      // this.spawnSquare();
    }
    // Updates all the spawned in objects
    var objectslength = this.objects.length;
    if(objectslength > 0){
      for (var i = objectslength-1; i >= 0; i--) {
        this.objects[i].update(dt);
      }
    }
  };

  this.spawnTree = function(){
    var spawnpos = this.getNewSpawnPosition();
    this.objects.push(new Tree(spawnpos));
  };

  // Spawnposition!
  this.getNewSpawnPosition = function(){
    spawnpos = {};
    spawnpos.x = 0;
    spawnpos.y = 5;
    spawnpos.z = 0;
    return spawnpos;
  };
};
