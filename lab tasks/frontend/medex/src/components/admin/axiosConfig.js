import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

instance.interceptors.request.use(function (config) {
  const admin = localStorage.getItem('admin');
  if(admin)
    config.headers.Authorization =  admin;
  const user = localStorage.getItem('user');
  if(user)
    config.headers.Authorization =  user;
    // console.log( config.headers.Authorization);
    // console.log("intercepted");
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
export default instance;