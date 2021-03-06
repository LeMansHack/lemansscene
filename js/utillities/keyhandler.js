// Handling keyboardinput!!!
// Key handler handles keyboard inputs and can map these to the eventhandler or WAHTEVER
var keyhandler = {
    keymap: {
      'Escape':     eventhandler.loop.toggle,
      // 'ArrowUp':    eventhandler.planet.move.up,
      // 'ArrowRight': eventhandler.planet.move.right,
      // 'ArrowDown':  eventhandler.planet.move.down,
      // 'ArrowLeft':  eventhandler.planet.move.left,
      // 'PageUp':     eventhandler.planet.move.away,
      // 'PageDown':   eventhandler.planet.move.closer,
      '.':          eventhandler.planet.mess.more,
      ',':          eventhandler.planet.mess.less,
      ' ':          eventhandler.dbugger.toggle,
      'p':          eventhandler.planet.pulse,
      '1':          eventhandler.spawner.spawn.tree,
      '2':          eventhandler.spawner.spawn.cloud,
      '3':          eventhandler.spawner.spawn.cloudHigh,
      '4':          eventhandler.spawner.spawn.stone,
      '5':          eventhandler.spawner.spawn.car,
    },
    // On the keydown event - Trigger a key event if it is mapped to something in this.keymap
    keyevent: function(key){
      if(this.keymap[key]){
        this.keymap[key]();   // Fire the keymaps function
      }else{
        if(log.most){
          console.log('Pressed "'+key+'" but nothing is mapped to it.');
        }
      }
    },
};

document.addEventListener('keydown', function(e){
  keyhandler.keyevent(e.key); // Pass the key to the keyhandlers keyevent function
});
