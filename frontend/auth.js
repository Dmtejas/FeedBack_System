
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

    if (password !== confirmPassword) {
      signupErrorMessage.textContent = 'Passwords do not match.';
      signupErrorMessage.style.display = 'block';
      return;
    }

    const data = { name, email, password };

    fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"  
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.message || "Signup failed");
          });
        }
        return res.json();
      })
      .then((result) => {
        alert("Sign-up successful! You can now log in.");
        window.location.href = "login.html";
      })
      .catch((error) => {
        signupErrorMessage.textContent = error.message;
        signupErrorMessage.style.display = "block";
      });
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

    const data = { email, password }

    fetch("http://localhost:5000/api/login", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(err => {
          throw new Error(err.message || "Login failed");
        });
      }
      return res.json()
    })
    .then(data => {
        console.log(data.message)
        alert('Logged in successfully')
        window.location.href = 'home.html';
    })
    .catch((err) => {
      loginErrorMessage.textContent = err.message;
      loginErrorMessage.style.display = 'block';
    })
    
  });
}