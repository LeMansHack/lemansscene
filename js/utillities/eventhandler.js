// Eventhandler!
var eventhandler = {
  // Simple test event!
  sayhi: function(){
    console.log('Hi!');
  },
  'movePlanet': {
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
  'loop': {
    toggle: function(){
      if(!isPlaying){
        window.requestAnimationFrame(nextframe);
      }
      isPlaying = !isPlaying;
    },
  },
};
