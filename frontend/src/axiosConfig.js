import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://nyenyak-web-project.et.r.appspot.com'
});

export default instance;