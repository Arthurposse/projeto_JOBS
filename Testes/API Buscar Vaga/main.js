const apiKey = 'YOUR_API_KEY';
const query = 'data scientist';
// const location = 'new york';

const url = `https://public.api.careerjet.net/search?apikey=${apiKey}&keywords=${query}&sort=salary`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });