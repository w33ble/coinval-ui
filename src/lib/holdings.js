import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
});

export const getHoldings = () => instance.get('/holdings').then(({ data }) => data);

export const getHolding = id => instance.get(`/holdings/${id}`).then(({ data }) => data);
