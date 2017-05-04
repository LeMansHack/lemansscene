// Debugger!!!!!
var dbugger = {
  element: document.getElementById("dbugger"),

  inputmap: {
    'isPlaying': eventhandler.loop.toggle,
    'camera_rotation_x': eventhandler.camera.rotate.x,
    'camera_rotation_y': eventhandler.camera.rotate.y,
    'camera_rotation_z': eventhandler.camera.rotate.z,
  },

  changeEventHandler: function(event){
    var targetId = event.target.id;
    var value = event.target.value;
    console.log('Changed: #'+targetId);

    if(this.inputmap[targetId]){
      this.inputmap[targetId](value);
    }
  },


  toggle: function(){
    if(this.element.getAttribute('data-state') == 'open'){
      this.element.setAttribute('data-state', 'closed');
    }else{
      this.element.setAttribute('data-state', 'open');
    }
  },

  setDefaults: function(){
    document.getElementById('camera_rotation_x').value = camera.rotation.x;
    document.getElementById('camera_rotation_y').value = camera.rotation.y;
    document.getElementById('camera_rotation_z').value = camera.rotation.z;
  },
};

dbugger.init = function(){
  dbugger.setDefaults();

  var inputs = document.getElementsByTagName('input');
  var inputslength = inputs.length;
  if(inputslength > 0){
    for(var z = 0; z < inputslength; z++) {
      var elem = inputs[z];
      elem.onchange=dbugger.changeEventHandler.bind(dbugger);
    }
  }
  var buttons = document.getElementsByTagName('button');
  var buttonslength = buttons.length;
  if(buttonslength > 0){
    for(var z = 0; z < buttonslength; z++) {
      var button = buttons[z];
      button.onclick=dbugger.changeEventHandler.bind(dbugger);
    }
  }
};
