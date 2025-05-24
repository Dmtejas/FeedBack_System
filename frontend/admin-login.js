// Admin Login Authentication
const loginForm = document.getElementById('admin-login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission

  const category = document.getElementById('category').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, category })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        window.location.href = 'admin-dashboard.html';
      } else {
        errorMessage.textContent = data.error || 'Login failed';
        errorMessage.style.display = 'block';
      }
    })
    .catch(() => {
      errorMessage.textContent = 'Network error. Please try again.';
      errorMessage.style.display = 'block';
    });
});