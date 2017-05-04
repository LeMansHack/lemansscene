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
    },
  },


  // Debugger
  'dbugger': {
    toggle: function(){
      dbugger.toggle();
    },
  },
};
