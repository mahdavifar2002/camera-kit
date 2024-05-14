import fs from 'fs';
import path from 'path';

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'keys/privkey.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'keys/fullchain.pem')),
    },
    // Make sure the server is accessible over the local network
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        birthday: './lenses/birthday.html',
        earrings: './lenses/earrings.html',
        necklace: './lenses/necklace.html',
        watch: './lenses/watch.html',
        glasses: './lenses/glasses.html',
        shoes: './lenses/shoes.html',
        clothes: './lenses/clothes.html',
      },
    },
  },

};