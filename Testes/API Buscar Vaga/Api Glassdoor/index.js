require('dotenv').config();
const axios = require('axios');

const searchJobs = async (query) => {
  const url = `https://api.glassdoor.com/api/api.htm?v=1&t.p=131221&t.k=${process.env.GLASSDOOR_API_KEY}&t.f.jobs=true&t.f.k=1156&t.f.locId=1156&t.f.ml=true&t.f.jt=0&q=${query}&jsonp=callback`;
  const response = await axios.get(url);
  return response.data;
};

const generateToken = async () => {
  const url = 'https://api.glassdoor.com/api/api.htm';
  const response = await axios.post(url, new URLSearchParams({
    't[p]': '1',
    't[k]': process.env.GLASSDOOR_API_KEY,
    't[d]': '1',
    't[s]': 't',
    't[dev_key]': process.env.GLASSDOOR_API_KEY,
    't[format]': 'json',
    v: '1',
    't[jt]': '0',
    't[pn]': '1',
    't[ps]': '100',
    't[remote_ip]': '123.456.789.012',
  }));
  return response.data;
};

const query = 'software engineer';

searchJobs(query)
  .then((data) => {
    console.log('Search results:', data);
  })
  .catch((error) => {
    console.error('Error searching jobs:', error);
  });

generateToken()
  .then((data) => {
    console.log('Token:', data.response.header.session.session_id);
  })
  .catch((error) => {
    console.error('Error generating token:', error);
  });