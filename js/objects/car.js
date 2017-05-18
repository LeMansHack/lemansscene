// A Car!!!!!
function Car(){
  this.data = {
    pilot: {
      "lastName": "",
      "firstName": "DAVIDSON A.",
      "country": "",
      "birthday": "",
      "picture": "",
      "site": "",
      "facebook": "",
      "twitter": ""
    },
    driverStatus:           "Run",
    laps:                   27,
    time:                   "1493977541503",
    timeDifference:         "",
    bestTimeInMiliseconds:  115233,
    lastTimeInMiliseconds:  121987,
    pits:                   3,
    averageSpeed:           218.8,
    tires:                  "M",
    wec:                    false,
    d1l1:                   null,
    d1l2:                   null,
    d2l1:                   null,
    d2l2:                   null,
    avg:                    null,
    team:                   "Toyota Gazoo Racing",
    number:                 8,
    category:               "LMP1",
    carBrand:               "",
    carName:                "Toyota TS050 - Hybrid",
    position:               {
      "percent": 1,
      "sector": 1,
      "timestamp": "1493977793000"
    },
    ranking:           1,
    categoryPosition:  1,
    sector:            1,
    currentSector1:    "33.663",
    currentSector2:    "57.933",
    currentSector3:    "30.391",
    bestSector1:       "33.088",
    bestSector2:       "52.525",
    bestSector3:       "29.576",
  };

  this.threejsObj = false;
  this.color      = 0xff00ff;
  this.wheelColor = 0x333344;
  this.specular   = 0x000000;

  this.geometrySettings = {
    body: {
      w: 0.4,
      h: 0.2,
      l: 0.6,
    },
    roof: { // Roof sizes er relative to body sizes
      w: 1,
      h: 0.5,
      l: 0.5,
      offsetL: 0.2,
    },
    wheels:{ // Wheel sizes er relative to body sizes
      w: 0.8,
      d: 0.5, // Wheel diamiter
      position: {
        front: 0.8,
        back:  0.1,
      },
    },
  };

  this.buildCar = function(){
    // Calculate sizes and positions for carparts
    var carsizes = {
      body: {
        w: this.geometrySettings.body.w,
        h: this.geometrySettings.body.h,
        l: this.geometrySettings.body.l,
      },
      roof: { // Roof sizes er relative to body sizes
        w: this.geometrySettings.body.w * this.geometrySettings.roof.w,
        h: this.geometrySettings.body.h * this.geometrySettings.roof.h,
        l: this.geometrySettings.body.l * this.geometrySettings.roof.l,
        offsetL: this.geometrySettings.body.l * this.geometrySettings.roof.offsetL,
      },
      wheels:{ // Wheel sizes er relative to body sizes
        w: this.geometrySettings.body.w * this.geometrySettings.wheels.w,
        d: this.geometrySettings.body.h * this.geometrySettings.wheels.d, // Wheel diamiter
        position: {
          front: this.geometrySettings.body.l * this.geometrySettings.wheels.position.front,
          back:  this.geometrySettings.body.l * this.geometrySettings.wheels.position.back,
        },
      },
    };
    console.log(carsizes);
    // Body
    var bodygeo = new THREE.BoxGeometry( carsizes.body.w, carsizes.body.h, carsizes.body.l );
    var bodymat = new THREE.MeshPhongMaterial( { color: this.color, specular: this.specular, shininess: 2, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    var body = new THREE.Mesh( bodygeo, bodymat );
    body.geometry.translate(0,planet.radius + carsizes.wheels.d,0);
    console.log('Placing body on:');
    console.log(planet.radius + carsizes.wheels.d);
    body.castShadow = true;

    // Roof
    var roofgeo = new THREE.BoxGeometry(
      carsizes.roof.w,
      carsizes.roof.h,
      carsizes.roof.l
    );
    var roofmat = new THREE.MeshPhongMaterial( { color: this.color, specular: this.specular, shininess: 2, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    var roof = new THREE.Mesh( roofgeo, roofmat );
    roof.geometry.translate(
      0,
      planet.radius + carsizes.body.h + carsizes.wheels.d,  // Place roof on top of body on top of wheels on top of planet
      carsizes.roof.offsetL                                 // Offset roof backwards
    );
    console.log('Placing roof on:');
    console.log(planet.radius + carsizes.body.h + carsizes.wheels.d);
    roof.castShadow = true;

    // Wheels
    var wheelgeo = new THREE.BoxGeometry(
      carsizes.wheels.w,
      carsizes.wheels.d,
      carsizes.wheels.d
    );
    var wheelmat = new THREE.MeshPhongMaterial( { color: this.wheelColor, specular: this.specular, shininess: 2, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    // Front wheels
    var wheelFront = new THREE.Mesh( wheelgeo, wheelmat );
    wheelFront.geometry.translate(
      0,
      planet.radius,
      ( -carsizes.body.l / 2 ) + carsizes.wheels.position.front       // Position wheels from back of car
    );
    wheelFront.castShadow = true;
    // Back wheels
    var wheelBack = new THREE.Mesh( wheelgeo, wheelmat );
    wheelBack.geometry.translate(
      0,
      planet.radius,
      0
      // ( -carsizes.body.l / 2 ) + carsizes.wheels.position.back       // Position wheels from back of car
    );
    console.log('Placing wheels on:');
    console.log(planet.radius);
    wheelBack.castShadow = true;

    body.add(roof);
    body.add(wheelBack);
    body.add(wheelFront);

    return body;
  };
  this.init = function(){
    this.threejsObj = this.buildCar();
    scene.add(this.threejsObj);
  };
  this.init();
}
