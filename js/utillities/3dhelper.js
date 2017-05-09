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
    .to({x:tweenpoints.tos.x, y:tweenpoints.tos.y, z:tweenpoints.tos.z}, 100, createjs.Ease.linear)
    .to({x:tweenpoints.froms.x, y:tweenpoints.froms.y, z:tweenpoints.froms.z}, 200, createjs.Ease.linear);
  },
};
