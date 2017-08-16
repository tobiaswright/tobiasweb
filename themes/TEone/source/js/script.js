

const placefeed = (data)  => {
  let medium = document.getElementById('medium');

  data.forEach(function(i) {
    let li = document.createElement('li');      
    li.innerHTML = `<h3><a target=_blank href="${i.primaryLink}>">${i.title}</a></h3><div class='text-muted'>${i.publishDate}</div>`;
    medium.appendChild( li )
  });
}

fetch('https://tobiasweb.azurewebsites.net/api/mediumRSS?code=qmThz3oOLpCRMzVKx4a9lO9VBGqUXsL96uMPl7ZmaD/UhxPtnkb5Zw==')
.then(function(response) {
  response.json()
  .then(function(data) {  
    placefeed(data);
  });  
})