// DOCUMETANÇÃO: https://apifeeddevagas.docs.apiary.io/#reference/0/feed-de-vagas/feed-de-vagas


var request = new XMLHttpRequest();

request.open('GET', 'https://private-anon-361ec80d23-apifeeddevagas.apiary-mock.com/api/v1/vacancy_feed.json');

request.setRequestHeader('Authorization', 'Bearer <auth_token>');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    
    var data = JSON.parse(this.responseText);

    console.log(data)

    // console.log('Status:', this.status);
    // console.log('Headers:', this.getAllResponseHeaders());
    // console.log('Body:', this.responseText);
  }
};

request.send();