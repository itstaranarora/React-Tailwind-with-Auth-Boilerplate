import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function setJwt(jwt) {
  axios.defaults.headers.authorization = `Bearer ${jwt}`;
}

axios.defaults.headers.common["Content-Type"] = "application/json";

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default http;
