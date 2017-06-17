// Script that syncs with the live data
var address = 'http://192.168.1.34:3000';
var livedata;

var sync = {
  updaterate: 5, // In seconds
  timesincelastupdate: 0,
  isPulling: false,
  update: function(dt){
    this.timesincelastupdate += dt;
    if(this.timesincelastupdate > this.updaterate){
      console.log('Sync Update');
      // Reset timer
      this.timesincelastupdate = 0;

      // Set time
      t = new Date();
      eventhandler.time.h( t.getHours() );

      // Pull Data
      if(!this.isPulling){
        this.pullData();
      }
    }
  },
  pullData: function(){
    syncobj = this;
    syncobj.isPulling = true;
    axios.get(address)
      .then(function (response) {
        console.log(response);
        livedata = response.data;
        syncobj.isPulling = false;
      })
      .catch(function (error) {
        console.log(error);
        syncobj.isPulling = false;
      });
  }
};
