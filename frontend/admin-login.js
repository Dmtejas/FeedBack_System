// Admin Login
const loginForm = document.getElementById("admin-login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const category = document.getElementById("category").value;

  try {
    // 1️⃣ Login
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, category }),
    });

    const data = await res.json();

    if (!data.token) {
      errorMessage.textContent = data.error || "Login failed";
      errorMessage.style.display = "block";
      return;
    }

    // ✅ Save token and category
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("category", category);

    // ✅ Redirect to dashboard page
    window.location.href = "/admin-dashboard.html";

  } catch (err) {
    console.error(err);
    errorMessage.textContent = "Network or server error";
    errorMessage.style.display = "block";
  }
});
