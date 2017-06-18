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
  updaterate: 3, // In seconds
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
    this.updateUI();
  },
  updateCars: function(){
    if( spawner.cars.length < 1 ){
      for (var i = 0; i < 6; i++) {
        spawner.spawnCar( {ranking: livedata.cars[i].ranking, category: livedata.cars[i].category} );
      }
    }
    for (var i = 0; i < 6; i++) {
      spawner.cars[i].newRanking( livedata.cars[i].ranking );
    }
  },
  updateWind: function(){
    direction = livedata.track.weather.windDirection;
    direction = helper.degToRad(direction);  // Convert to radians

    // Calculate normalized vector 2 from rotation
    var ca = Math.cos( direction );
    var sa = Math.sin( direction );
    livedata.wind = {
      speed: livedata.track.weather.windSpeed,
      direction: {
        a: ca*1 - sa*0,
        b: sa*1 + ca*0,
      },
    };
  },
  updateUI: function(){
    var rt = new Date(livedata.track.remainingTimeInSeconds * 1000).toISOString().substr(11, 8);
    console.log(rt);
    eventhandler.ui.updateTimer(rt);
    var flags = {
      2: 'green',
      3: 'red',
      4: 'checkered',
      5: 'yellow',
      6: 'yellow',
    };
    if(livedata.track.safetyCar === true){
      eventhandler.ui.updateFlag( 'yellow' );
    }else{
      eventhandler.ui.updateFlag( flags[livedata.track.flag] );
    }
    eventhandler.ui.updateSC( livedata.track.safetyCar );
    var scoreHTML = '';
    carslength = spawner.cars.length;
    for (var i = 0; i < carslength; i++) {
      var c = {
        category: livedata.cars[i].category,
        ranking: livedata.cars[i].ranking,
        driver: livedata.cars[i].pilot.firstName+' '+livedata.cars[i].pilot.lastName,
        number: livedata.cars[i].number,
        laps: livedata.cars[i].laps,
        status: livedata.cars[i].driverStatus,
        classpos: livedata.cars[i].categoryPosition,
      };
      var st = {
        2: 'RUN',
        3: 'OUT',
        4: 'IN',
      };
      var html = '<div class="scorecard" data-category="'+c.category+'" data-status="'+st[c.status]+'">';
      html += '<span class="label ranking">'+c.ranking+'</span>';
      html += '<span class="label driver">'+c.driver+'</span>';
      html += '<span class="label number">'+c.number+'</span>';
      html += '<span class="label laps">'+c.laps+'</span>';
      html += '<span class="label status">'+st[c.status]+'</span>';
      html += '<span class="label classpos">'+c.classpos+'</span>';
      html += '</div>';
      scoreHTML += html;
    }
    eventhandler.ui.updateScore( scoreHTML );
  },
};
sync.init();
