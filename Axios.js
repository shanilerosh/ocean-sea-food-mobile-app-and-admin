const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://10.0.2.2:1234/api/v1',
});

export default instance;
