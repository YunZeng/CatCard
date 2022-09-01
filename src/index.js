import * as dotenv from 'dotenv';
import axios from 'axios';
import mergeImg from'merge-img';
import { writeFile } from 'fs';
import { join } from 'path';
import Jimp from 'jimp';

dotenv.config();
const {
    CAT_GREETING: greeting,
    CAT_WHO: who,
    CAT_WIDTH: width,
    CAT_HEIGHT: height,
    CAT_COLOR: color,
    CAT_SIZE: size
} = process.env;

const baseURL = 'https://cataas.com/cat/says/';
const baseParams = { width, height, color, size};

try {
    const firstRes = await axios.get(baseURL + greeting, {
        params: {
            ...baseParams
        },
        responseType: 'arraybuffer',
        responseEncoding: 'binary'
    });
    console.log('Received first response with status: ', firstRes.status);

    const secondRes = await axios.get(baseURL + who, {
        params: {
            ...baseParams
        },
        responseType: 'arraybuffer',
        responseEncoding: 'binary'
    });
    console.log('Received second response with status: ', secondRes.status);

mergeImg([ 
    { src: Buffer.from(firstRes.data, 'binary'), x: 0, y:0 }, 
    { src: Buffer.from(secondRes.data, 'binary'), x: width, y: 0 }
  ]).then(img => {
    img.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
          if (err) {
            console.log(err)
          }

          const fileOut = join(process.cwd(), `/cat-card.jpg`);
          
          writeFile(fileOut, buffer, 'binary', (err) => { if(err) {
              console.log(err);
              return; 
          }
          
          console.log("The file was saved!"); });
        });
      }); 
} catch (error) {
    console.error(error);
}
// console.log(greeting, who, width, height, size, color)
