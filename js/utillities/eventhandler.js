// Eventhandler!
var eventhandler = {
  // Simple test event!
  sayhi: function(){
    console.log('Hi!');
  },


  // Events fot the planet obj
  'planet': {
    'mess': {
      more: function(){
        planet.mess.amount += 0.01;
        planet.messup();
      },
      less: function(){
        planet.mess.amount -= 0.01;
        planet.messup();
      },
    },
    pulse: function(){
      helper.pulseVertices(planet.threejsObj);
    },

    // Move it around! Yay
    'move': {
      up: function(){
        planet.threejsObj.position.y += 0.5;
      },
      right: function(){
        planet.threejsObj.position.x += 0.5;
      },
      down: function(){
        planet.threejsObj.position.y -= 0.5;
      },
      left: function(){
        planet.threejsObj.position.x -= 0.5;
      },
      away: function(){
        planet.threejsObj.position.z -= 0.5;
      },
      closer: function(){
        planet.threejsObj.position.z += 0.5;
      },
    },
  },


  // CAMERA !!
  'camera': {
    'rotate': {
      x: function(val){
        camera.rotation.x = val;
      },
      y: function(val){
        camera.rotation.y = val;
      },
      z: function(val){
        camera.rotation.z = val;
      },
    },
    'move': {
      x: function(val){
        camera.position.x = val;
      },
      y: function(val){
        camera.position.y = val;
      },
      z: function(val){
        camera.position.z = val;
      },
    },
  },


  'time': {
    h: function(h){
      time.h = h;
    },
  },

  'ui': {
    updateTimer: function(time){
      ui.updateTimer(time);
    },
  },

  // Events for the "Game" loop itself
  'loop': {
    // Toggles the loop on/off
    toggle: function(){
      if(!isPlaying){
        window.requestAnimationFrame(nextframe);
      }
      isPlaying = !isPlaying;
    },
  },


  // Spawner
  'spawner':{
    'spawn': {
      tree: function(){
        spawner.spawnTree();
      },
      cloud: function(){
        spawner.spawnCloud();
      },
      cloudHigh: function(){
        spawner.spawnCloudHigh();
      },
      stone: function(){
        spawner.spawnStone();
      },
      car: function(){
        spawner.spawnCar();
      },
    },
  },


  // Debugger
  'dbugger': {
    toggle: function(){
      dbugger.toggle();
    },
  },
};
