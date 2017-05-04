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
  messUpObjVertices: function(obj){
    for (var i = 0; i < obj.geometry.vertices.length; i++)
    {
        var v = obj.geometry.vertices[i];     // The current vertice
        var scalemodifier = 0.1;              // Determines how much to scalevectors. must be ]0-1[
        var scale = (Math.random()*scalemodifier)+(1-scalemodifier); // Generates the scale. Will be ]0-2[
        v = this.scaleVector3(v, scale);           // Scales the vector
        obj.geometry.vertices[i] = v;
    }
  },
  // Up- or down scales a vector three and returns it
  scaleVector3: function(v, scale){
    // console.log('About to scale vector by scale: '+scale);
    v.x = v.x*scale;
    v.y = v.y*scale;
    v.z = v.z*scale;
    return v;
  }
};
