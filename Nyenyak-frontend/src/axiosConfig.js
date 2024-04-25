// axiosConfig.js

import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://nyenyak-project-dev.et.r.appspot.com',
  baseURL: 'http://localhost:8080',
});

export default instance;