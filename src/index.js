import * as dotenv from 'dotenv';
import joinImages from 'join-images';
import { join } from 'path';
import apiInstance from './request.js';

dotenv.config();
const {
    CAT_GREETING: greeting,
    CAT_WIDTH: width,
    CAT_WHO: who,
    CAT_DIRECTION: direction
} = process.env;

try {
    const firstRes = await apiInstance.get(greeting);
    console.log('Received first response with status: ', firstRes.status);

    const secondRes = await apiInstance.get(who);
    console.log('Received second response with status: ', secondRes.status);

    const destinationPath = join(process.cwd(), `/img/cat-card-${Date.now()}.jpg`);

    joinImages.default([ 
        { src: Buffer.from(firstRes.data, 'binary'), x: 0, y: 0 }, 
        { src: Buffer.from(secondRes.data, 'binary'), x: width, y: 0 }
    ], { direction }).then(img => {
        img.toFile(destinationPath);
        console.log("The file was saved!");
    });
} catch (error) {
    console.error(error);
}
