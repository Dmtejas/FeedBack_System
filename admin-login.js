// Admin Login Authentication
const loginForm = document.getElementById('admin-login-form');
const errorMessage = document.getElementById('error-message');

// Dummy credentials for demonstration
const adminCredentials = {
  "teacher-feedback": { username: "teacherAdmin", password: "teacher123" },
  "product-review": { username: "productAdmin", password: "product123" },
  "service-evaluation": { username: "serviceAdmin", password: "service123" },
  "event-feedback": { username: "eventAdmin", password: "event123" },
  "website-ux": { username: "uxAdmin", password: "ux123" },
  "support-quality": { username: "supportAdmin", password: "support123" },
  "facility-feedback": { username: "facilityAdmin", password: "facility123" }
};

loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission

  const category = document.getElementById('category').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Check if the category is selected and credentials match
  if (
    adminCredentials[category] &&
    adminCredentials[category].username === username &&
    adminCredentials[category].password === password
  ) {
    alert(`Login successful for ${category}!`);
    window.location.href = `${category}-dashboard.html`; // Redirect to category-specific dashboard
  } else {
    errorMessage.textContent = 'Invalid username, password, or category.';
    errorMessage.style.display = 'block';
  }
});