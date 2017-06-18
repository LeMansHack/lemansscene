// A Car!!!!!
function Car(args){
  this.number = args.number;
  this.ranking = args.ranking;
  this.threejsObj = false;
  this.color      = carcolors[this.number];
  this.wheelColor = 0x333344;
  this.specular   = 0xdddddd;
  this.audioFreqIndex = false;

  this.geometrySettings = {
    body: {
      w: 0.6,
      h: 0.22,
      l: 0.9,
    },
    roof: { // Roof sizes er relative to body sizes
      w: 1,
      h: 0.5,
      l: 0.5,
      offsetL: 0.1,
    },
    wheels:{ // Wheel sizes er relative to body sizes
      w: 0.9,
      d: 0.5, // Wheel diamiter
      position: {
        front: 0.8,
        back:  0.2,
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
    // Body
    var bodygeo = new THREE.BoxGeometry( carsizes.body.w, carsizes.body.h, carsizes.body.l );
    var bodymat = new THREE.MeshPhongMaterial( { color: this.color, specular: this.specular, shininess: 2, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
    var body = new THREE.Mesh( bodygeo, bodymat );
    body.geometry.translate(0,planet.radius + carsizes.wheels.d/2 + carsizes.body.h/2,0);
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
    roof.castShadow = true;

    // Wheels
    var wheelgeoFront = new THREE.BoxGeometry(
      carsizes.wheels.w,
      carsizes.wheels.d,
      carsizes.wheels.d
    );
    var wheelgeoBack = new THREE.BoxGeometry(
      carsizes.wheels.w,
      carsizes.wheels.d,
      carsizes.wheels.d
    );
    var wheelmat = new THREE.MeshPhongMaterial( { color: this.wheelColor, specular: this.specular, shininess: 2, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );

    var wheelFront = new THREE.Mesh( wheelgeoFront, wheelmat );
    var wheelBack = new THREE.Mesh( wheelgeoBack, wheelmat );
    wheelBack.geometry.translate(
      0,
      planet.radius,
      ( carsizes.body.l / 2) - carsizes.wheels.position.back       // Position wheels from back of car
    );
    wheelFront.geometry.translate(
      0,
      planet.radius,
      ( carsizes.body.l / 2) - carsizes.wheels.position.front       // Position wheels from back of car
    );
    wheelBack.castShadow = true;
    wheelFront.castShadow = true;

    body.add(roof);
    body.add(wheelBack);
    body.add(wheelFront);

    return body;
  };
  this.init = function(){
    this.threejsObj = this.buildCar();
    scene.add(this.threejsObj);
    this.driveIn( this.ranking );
  };
  this.update = function(){
    if(typeof audioFreq !== 'undefined'){
      if(this.audioFreqIndex === false){
        this.audioFreqIndex = Math.floor( helper.randBetween( 400, audioFreq.length ) );
      }
      if(this.audioFreqIndex){
        this.threejsObj.position.y = ( audioFreq[this.audioFreqIndex] / 500);
        // this.threejsObj.rotation.y = ( ( audioFreq[this.audioFreqIndex] - 128) / 1000);
        // this.threejsObj.rotation.z = ( ( audioFreq[this.audioFreqIndex] - 128) / 1000);
      }
    }
  };
  this.driveIn = function(){
    var carpos = this.threejsObj.rotation;
    this.threejsObj.rotation.x = helper.degToRad( (this.ranking * 12)+50 );
    var xtween = helper.degToRad( (this.ranking * 12)-12 );
    createjs.Tween.get( carpos )
    .to({x:xtween}, 400, createjs.Ease.powIn);
  };
  this.newRanking = function(newranking){
    var carpos = this.threejsObj.rotation;
    var xtween = helper.degToRad( (newranking * 12)-12 );
    if(newranking == this.ranking){

    }else if(newranking > this.ranking){
      createjs.Tween.get( carpos )
      .to({x:xtween}, 400, createjs.Ease.powIn);
    }else{
      var ztween = helper.degToRad( 8 );
      createjs.Tween.get( carpos )
      .to({z:ztween}, 200, createjs.Ease.powIn)
      .to({x:xtween}, 400, createjs.Ease.powIn)
      .to({z:0}, 200, createjs.Ease.powIn);
    }
  };
  this.init();
}
