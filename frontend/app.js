const API_URL = "https://api.gabit.test.mdev.kz"; // URL backend через Traefik

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      document.getElementById('status').innerText = "Logged in!";
    } else {
      document.getElementById('status').innerText = data.message || "Login failed";
    }
  });
}

function whoAmI() {
  const token = localStorage.getItem('token');
  fetch(`${API_URL}/me`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('status').innerText = JSON.stringify(data);
  });
}

function showToken() {
  const token = localStorage.getItem('token');
  fetch(`${API_URL}/token`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('status').innerText = JSON.stringify(data);
  });
}

function logout() {
  localStorage.removeItem('token');
  document.getElementById('status').innerText = "Logged out";
}
