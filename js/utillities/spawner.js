// Script for spawning object in the scene
var Spawner = function(){
  var that = this;
  this.objects = [];
  this.cars    = [];

  this.update = function(dt){
    if(Math.random() < 0.002){
      // this.spawnSquare();
    }
    // Updates all the spawned in objects
    var objectslength = this.objects.length;
    if(objectslength > 0){
      for (var i = objectslength-1; i >= 0; i--) {
        this.objects[i].update(dt);
      }
    }

    // Updates all the spawned in cars
    var carslength = this.cars.length;
    if(carslength > 0){
      for (var i = carslength-1; i >= 0; i--) {
        this.cars[i].update(dt);
      }
    }
  };

  this.spawnTree = function(args){
    this.objects.push(new Tree(args));
  };
  this.spawnCloud = function(args){
    this.objects.push(new Cloud(args));
  };
  this.spawnCloudHigh = function(args){
    this.objects.push(new CloudHigh(args));
  };
  this.spawnStone = function(args){
    this.objects.push(new Stone(args));
  };

  this.spawnCar = function(args){
    this.cars.push(new Car(args));
  };
};
