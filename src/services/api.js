import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dungeons-and-dragon-api.herokuapp.com/api/v1',
});

export default api;
