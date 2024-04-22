document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var email = document.getElementById('mail').value;
    var password = document.getElementById('mp').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/signin');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      var response = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        document.getElementById('message').innerHTML = response.message;
      } else {
        document.getElementById('message').innerHTML = response.error;
      }
    };
    xhr.send(JSON.stringify({ email: email, password: password }));
  });