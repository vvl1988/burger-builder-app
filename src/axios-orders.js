import axios from 'axios';
import {FIRE_BASE_URL} from './constant';

const instance = axios.create({
    baseURL: FIRE_BASE_URL
});

export default instance;