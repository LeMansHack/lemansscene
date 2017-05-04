// Handling keyboardinput!!!
// Key handler handles keyboard inputs and can map these to the eventhandler or WAHTEVER
var keyhandler = {
    keymap: {
      's': eventhandler.sayhi, // Say "Hi" when the 's' key is pressed
    },
    // On the keydown event - Trigger a key event if it is mapped to something in this.keymap
    keyevent: function(key){
      if(this.keymap[key]){
        this.keymap[key](); // Fire the keymaps function
      }
    },
};

document.addEventListener('keydown', function(e){
  keyhandler.keyevent(e.key); // Pass the key to the keyhandlers keyevent function
});
