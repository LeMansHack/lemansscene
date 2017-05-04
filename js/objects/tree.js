// A tree!!!!!
function Tree(){
  GenericObject.call(this);
  this.init = function(){
    console.log('Im a tree and I init!');
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    this.threejsObj = cube;
    this.threejsObj.position.x = this.position.x;
    this.threejsObj.position.y = this.position.y;
    this.threejsObj.position.z = this.position.z;
    this.afterinit();
  };
  this.construct();
}
