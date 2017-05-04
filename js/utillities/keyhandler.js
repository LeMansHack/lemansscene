// Handling keyboardinput!!!
// Key handler handles keyboard inputs and can map these to the eventhandler or WAHTEVER
var keyhandler = {
    keymap: {
      's':          eventhandler.sayhi, // Say "Hi" when the 's' key is pressed
      'ArrowUp':    eventhandler.movePlanet.up,
      'ArrowRight': eventhandler.movePlanet.right,
      'ArrowDown':  eventhandler.movePlanet.down,
      'ArrowLeft':  eventhandler.movePlanet.left,
      'PageUp':     eventhandler.movePlanet.away,
      'PageDown':   eventhandler.movePlanet.closer,
    },
    // On the keydown event - Trigger a key event if it is mapped to something in this.keymap
    keyevent: function(key){
      if(this.keymap[key]){
        this.keymap[key]();   // Fire the keymaps function
      }else{
        console.log('Pressed "'+key+'" but nothing is mapped to it.');
      }
    },
};

document.addEventListener('keydown', function(e){
  keyhandler.keyevent(e.key); // Pass the key to the keyhandlers keyevent function
});
