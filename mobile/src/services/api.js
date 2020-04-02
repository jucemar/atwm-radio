import axios from 'axios';

export const ioUrl = 'http://4407eb02.ngrok.io';

export const api = axios.create({ baseURL: ioUrl + '/api' });
