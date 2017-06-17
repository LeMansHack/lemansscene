// Script that syncs with the live data
var address = 'http://192.168.1.34:3000';
var livedata = {
  cars: [],
  wind: {
    speed: 1,
    direction: {
      a: 1,
      b:1,
    },
  },
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
    this.updateWind();
  },
  updateCars: function(){
    if( spawner.cars.length < 1 ){
      for (var i = 0; i < 6; i++) {
        spawner.spawnCar( {number: livedata.cars[i].number, ranking: livedata.cars[i].ranking} );
      }
    }
    for (var i = 0; i < 6; i++) {
      spawner.cars[i].newRanking( livedata.cars[i].ranking );
    }

  },
  updateWind: function(){
    this.wind.speed = livedata.wheather.query.results.channel.wind.speed;
    direction = livedata.wheather.query.results.channel.wind.direction;
    direction = helper.degToRad(direction);  // Convert to radians

    // Calculate normalized vector 2 from rotation
    var ca = Math.cos( direction );
    var sa = Math.sin( direction );
    this.wind.direction.a = this.vector2.a = ca*1 - sa*0;
    this.wind.direction.b = this.vector2.b = sa*1 + ca*0;

  }
};
sync.init();
