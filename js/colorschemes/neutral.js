var colors = {
  lights: {
    sun: {
      0:  0x333333,
      4:  0x666666,
      8:  0x999999,
      12: 0xcccccc,
      18: 0x999999,
      21: 0x666666,
      23:  0x333333,
    },
    moon: {
      0:  0x999999,
      4:  0x666666,
      8:  0x444444,
      12: 0x000000,
      18: 0x444444,
      21: 0x666666,
    },
    ambient: {
      0:  {
        r:60/256,
        g:76/256,
        b:102/256,
      },
      4:  {
        r:84/256,
        g:91/256,
        b:102/256,
      },
      8:  {
        r:234/256,
        g:233/256,
        b:175/256,
      },
      12: {
        r:247/256,
        g:228/256,
        b:153/256,
      },
      18: {
        r:234/256,
        g:206/256,
        b:171/256,
      },
      21: {
        r:95/256,
        g:156/256,
        b:154/256,
      },
      22: {
        r:60/256,
        g:76/256,
        b:102/256,
      },
    },
  },
  materials: {
    ground: 0xfff0a5,
    grass: 0x478750,
    sky: 0x0277b5,
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
          0xd05286,
          0x3395a9,
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
