// Script that syncs with the live data
var address = 'http://192.168.1.34:3000';
var livedata = {
  cars: [],
};

var sync = {
  updaterate: 5, // In seconds
  timesincelastupdate: 0,
  isPulling: false,
  displayNumberOfCars: 3,
  init: function(){
    this.pullData();
  },
  update: function(dt){
    this.timesincelastupdate += dt;
    if(this.timesincelastupdate > this.updaterate){
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
  pullData: function(callback){
    console.log('Pulling data...');
    syncobj = this;
    syncobj.isPulling = true;
    axios.get(address)
      .then(function (response) {
        response.data.cars = (response.data.cars.length > 0)?response.data.cars:livedata.cars;
        livedata = response.data;
        syncobj.isPulling = false;
        syncobj.updatedData();
      })
      .catch(function (error) {
        console.log(error);
        syncobj.isPulling = false;
      });
  },
  updatedData: function(){
    this.updateCars();
  },
  updateCars: function(){
    if( spawner.cars.length < 1 ){
      spawner.spawnCar( {number: livedata.cars[0].number, ranking: livedata.cars[0].ranking} );
      spawner.spawnCar( {number: livedata.cars[1].number, ranking: livedata.cars[1].ranking} );
      spawner.spawnCar( {number: livedata.cars[2].number, ranking: livedata.cars[2].ranking} );
    }
    for (var i = 0; i < 3; i++) {
      spawner.cars[i].newRanking( livedata.cars[i].ranking );
    }

  },
};
sync.init();
