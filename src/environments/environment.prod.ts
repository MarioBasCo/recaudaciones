
const protocol = 'http://'
const domain = '127.0.0.1';
const port = ':8000';
const sufix = '/api';

export const environment = {
  production: true,
  baseUrl: `${protocol}${domain}${port}${sufix}`
};
