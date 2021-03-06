var colors = {
  lights: {
    sun: 0xffffff,
    ambient: 0xc37938,
  },
  materials: {
    ground: 0xfff0a5,
    grass: 0x478750,
    sky: 0x3c97ff,
  },
  speculars:{
    ground: 0xffffff,
    grass: 0x243e36,
    sky: 0x000000,
  },


  objects: {

    tree: {
      log: {
        color: 0xd1b853,
        specular: 0x000000,
      },
      leaves: {
        specular: 0x000000,
        colors: [
          0x478750,
          0xc2e285,
          0x243e36,
          0x7b2900,
          0x4c0000,
          0x614051,
          0xf88479,
        ],
      },
    },

    cloud: {
        normal: {
          color: 0xFFFFFF,
          specular: 0x000000,
        },
      },
    stone: {
        normal: {
          color: 0x333344,
          specular: 0x000000,
        },
      },
  }
};
