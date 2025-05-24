// Helper function to get users from localStorage
function getUsers() {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
}

// Helper function to save users to localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Sign-Up Form
const signupForm = document.getElementById('signup-form');
const signupErrorMessage = document.getElementById('signup-error-message');

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validate passwords match
    if (password !== confirmPassword) {
      signupErrorMessage.textContent = 'Passwords do not match.';
      signupErrorMessage.style.display = 'block';
      return;
    }

    // Get existing users from localStorage
    const users = getUsers();

    // Check if email already exists
    if (users.some((user) => user.email === email)) {
      signupErrorMessage.textContent = 'Email is already registered.';
      signupErrorMessage.style.display = 'block';
      return;
    }

    // Add new user to the list
    users.push({ name, email, password });
    saveUsers(users); // Save updated users to localStorage

    alert('Sign-up successful! You can now log in.');
    window.location.href = 'login.html';
  });
}

// Login Form
const loginForm = document.getElementById('login-form');
const loginErrorMessage = document.getElementById('login-error-message');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Get existing users from localStorage
    const users = getUsers();

    // Validate credentials
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      window.location.href = 'home.html'; // Redirect to the main page
    } else {
      loginErrorMessage.textContent = 'Invalid email or password.';
      loginErrorMessage.style.display = 'block';
    }
  });
}