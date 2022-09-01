import * as dotenv from 'dotenv';
import mergeImg from 'merge-img';
import { writeFile } from 'fs';
import { join } from 'path';
import Jimp from 'jimp';
import apiInstance from './request.js';

dotenv.config();
const {
    CAT_GREETING: greeting,
    CAT_WIDTH: width,
    CAT_WHO: who
} = process.env;

try {
    const firstRes = await apiInstance.get(greeting);
    console.log('Received first response with status: ', firstRes.status);

    const secondRes = await apiInstance.get(who);
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
