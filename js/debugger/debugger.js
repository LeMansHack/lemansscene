// Debugger!!!!!
var dbugger = {
  element: document.getElementById("dbugger"),

  inputmap: {
    'isPlaying': eventhandler.loop.toggle,
    'camera_rotation_x': eventhandler.camera.rotate.x,
    'camera_rotation_y': eventhandler.camera.rotate.y,
    'camera_rotation_z': eventhandler.camera.rotate.z,
    'camera_position_x': eventhandler.camera.move.x,
    'camera_position_y': eventhandler.camera.move.y,
    'camera_position_z': eventhandler.camera.move.z,
  },

  changeEventHandler: function(event){
    var targetId = event.target.id;
    var value = event.target.value;
    console.log('Changed: #'+targetId);

    if(this.inputmap[targetId]){
      this.inputmap[targetId](value);
    }
    if(document.getElementById(targetId+'_val')){
      if(log.most){
        console.log('Found value element: '+targetId+'_val');
        console.log(value);
      }
      document.getElementById(targetId+'_val').innerHTML = value;
    }
  },

  toggleSection: function(event){
    var section = event.target.parentElement;
    if(section.hasAttribute("data-state")){
      if(section.getAttribute("data-state") == "open"){section.setAttribute("data-state", "closed");}else{section.setAttribute("data-state", "open");}
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
    document.getElementById('camera_rotation_x').value          = camera.rotation.x;
    document.getElementById('camera_rotation_x_val').innerHTML  = camera.rotation.x;
    document.getElementById('camera_rotation_y').value          = camera.rotation.y;
    document.getElementById('camera_rotation_y_val').innerHTML  = camera.rotation.y;
    document.getElementById('camera_rotation_z').value          = camera.rotation.z;
    document.getElementById('camera_rotation_z_val').innerHTML  = camera.rotation.z;

    document.getElementById('camera_position_x').value          = camera.position.x;
    document.getElementById('camera_position_x_val').innerHTML  = camera.position.x;
    document.getElementById('camera_position_y').value          = camera.position.y;
    document.getElementById('camera_position_y_val').innerHTML  = camera.position.y;
    document.getElementById('camera_position_z').value          = camera.position.z;
    document.getElementById('camera_position_z_val').innerHTML  = camera.position.z;

  },
};

dbugger.init = function(){
  dbugger.setDefaults();
  dbugger.readySections();

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

dbugger.readySections = function(){
  var sections = document.getElementsByClassName('sectionheader');
  var sectionslength = sections.length;
  if(sectionslength > 0){
    for(var z = 0; z < sectionslength; z++) {
      var section = sections[z];
      section.onclick=dbugger.toggleSection.bind(dbugger)
    }
  }
};
