// Debugger!!!!!
var dbugger = {
  element: document.getElementById("dbugger"),

  inputmap: {
    'isPlaying': eventhandler.loop.toggle,
  },

  changeEventHandler: function(event){
    var targetId = event.target.id;
    console.log('Changed: #'+targetId);

    console.log(this);
    if(this.inputmap[targetId]){
      this.inputmap[targetId]();
    }
  },


  toggle: function(){
    if(this.element.getAttribute('data-state') == 'open'){
      this.element.setAttribute('data-state', 'closed');
    }else{
      this.element.setAttribute('data-state', 'open');
    }
  },
};


document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('input').onchange=dbugger.changeEventHandler.bind(dbugger);
    document.querySelector('button').onclick=dbugger.changeEventHandler.bind(dbugger);
},false);
