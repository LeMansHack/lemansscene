var colors = {
  'lights': {
    'sun': 0xfff200,
    'ambient': 0x00a1ff,
  },
  'materials': {
    'ground': 0xfff0a5,
    'grass': 0x00ffb2,
    'sky': 0x1111ee,
  },
  'speculars':{
    'ground': 0xffffff,
    'grass': 0xff00a1,
    'sky': 0xffffff,
  },

    objects: {

      tree: {
        log: {
          color: 0x734021,
          specular: 0x000000,
        },
        leaves: {
          color: 0x33ff66,
          specular: 0x000000,
          colors: [
            0xff0000,
            0x00ff00,
            0x0000ff,
            0xffff00,
            0x00ffff,
            0xff00ff,
            0x123456,
            0x000000,
          ],
        },
      },

      cloud: {
          normal: {
            color: 0xFFFFFF,
            specular: 0x000000,
          },
        },
    }
  };
