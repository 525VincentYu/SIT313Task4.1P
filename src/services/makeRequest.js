import axios from 'axios';

//connection create
const api = axios.create({
  baseURL: 'http://localhost:3004',
  withCredentials: true,
});

export function makeRequest(url, options) {
  return api(url, options)
    .then((res) => res.data)
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? 'Error')
    );
}
