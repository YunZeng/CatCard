import axios from 'axios';
import _ from 'lodash';

const {
    CAT_WIDTH: width,
    CAT_HEIGHT: height,
    CAT_COLOR: color,
    CAT_SIZE: size
} = process.env;

const queryParams = { width, height, color, size };

const baseURL = 'https://cataas.com/cat/says/';
const apiInstance = axios.create({ baseURL });

apiInstance.interceptors.request.use((config) => {
     _.set(config, 'params', { ...queryParams });
     _.set(config, 'responseType', 'arraybuffer');
     _.set(config, 'responseEncoding', 'binary');

    return config;
    }, (error) => {
        return Promise.reject(error);
});

export default apiInstance;