// Script for adding 3D specific helpers
var helper = {
  // Returns an array of vertices for a three object that has geometry
  getObjVertices: function(obj){
    var vertices = [];
    for (var i = 0; i < obj.geometry.vertices.length; i++)
    {
        var v = obj.geometry.vertices[i];
        vertices.push(v);
    }
    return vertices;
  },
  // Takes a three object and loops through all its vertices and scales them each on random by a little bit
  messUpObjVertices: function(obj, scalemodifier){
    // scalemodifier Determines how much to scalevectors. must be ]0-1[
    if(!obj.geometry.originalvertices){
      obj.geometry.originalvertices = JSON.parse(JSON.stringify(obj.geometry.vertices)); // Get a copy of the original vertices to work from
    }
    obj.geometry.dynamic = true;
    for (var i = 0; i < obj.geometry.vertices.length; i++)
    {
        var scale = (Math.random()*scalemodifier)+(1-scalemodifier); // Generates the scale. Will be ]0-2[
        var v = {'x': obj.geometry.originalvertices[i].x, 'y': obj.geometry.originalvertices[i].y, 'z': obj.geometry.originalvertices[i].z};
        v = this.scaleVector3(v, scale);           // Scales the vector
        obj.geometry.vertices[i].x = v.x;
        obj.geometry.vertices[i].y = v.y;
        obj.geometry.vertices[i].z = v.z;
    }
    obj.geometry.verticesNeedUpdate = true;
  },
  // Up- or down scales a vector three and returns it
  scaleVector3: function(v, scale){
    // console.log('About to scale vector by scale: '+scale);
    v.x = v.x*scale;
    v.y = v.y*scale;
    v.z = v.z*scale;
    return v;
  },

  pulseVertices: function(obj){
    var vertices = helper.getObjVertices(obj);
    obj.updateGeometry = true;
    vertices.map(function(v){helper.pulseVector3(v, (1+(Math.random()/10)));});
  },
  pulseVector3: function(v, scale){
    var tweenpoints = {
      froms: {
        x: v.x,
        y: v.y,
        z: v.z,
      },
      tos: {
        x: v.x * scale,
        y: v.y * scale,
        z: v.z * scale,
      },
    };
    createjs.Tween.get(v)
    .to({x:tweenpoints.tos.x, y:tweenpoints.tos.y, z:tweenpoints.tos.z}, 60, createjs.Ease.powIn)
    .to({x:tweenpoints.froms.x, y:tweenpoints.froms.y, z:tweenpoints.froms.z}, 220, createjs.Ease.powIn);
  },
  normalizeVector3: function(v){
    var vlength = Math.sqrt((v.x * v.x) + (v.y * v.y) + (v.z * v.z));
    var newv = {
      x: v.x/vlength,
      y: v.y/vlength,
      z: v.z/vlength,
    };
    return newv;
  },
  rotationToPosition: function(r){
    r = (r===0)?4:r;
    var pos = 0;
    if(r <= 1){
      pos = 1 - r;
    }else if (r > 1 && r <= 2) {
      pos = (r - 1) * -1;
    }else if (r > 2 && r <= 3) {
      pos = (1 - (r - 2)) * -1;
    }else{
      pos = r - 3;
    }
    return pos;
  },
  degToRad: function(d){
    r = d * (Math.PI/180);
    return r;
  },
  radToDeg: function(r){
    d = r * (180/Math.PI);
    return d;
  },
  randBetween: function(max,min){
    min = (typeof min !== "undefined")?min:0;
    return Math.floor(Math.random() * (max - min)) + min;
  },
};
