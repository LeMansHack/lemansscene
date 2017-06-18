var ui = {
  updateTimer: function( remainingTime ){
    document.getElementById('ui_countdown').innerHTML = remainingTime;
  },
  updateFlag: function( flag ){
    document.getElementById('ui_flag').setAttribute('data-color', flag);
  },
  updateScore: function( score ){
    document.getElementById('score').innerHTML = score;
  },
};
