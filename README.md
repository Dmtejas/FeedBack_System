# Feedback System

A modern, full-stack feedback platform for collecting, analyzing, and visualizing feedback across multiple categories (Teacher, Product, Service, Event). Features include sentiment analysis, admin dashboard with charts, authentication, and a user-friendly interface.

---

## Features

- **Multi-category Feedback:** Collects feedback for teachers, products, services, and events.
- **Sentiment Analysis:** Automatically analyzes and displays sentiment of user comments.
- **Admin Dashboard:** Visualizes feedback with pie charts, trend lines, and statistics.
- **Authentication:** Secure login and signup for users and admins.
- **Responsive UI:** Clean, modern design with chatbot support.
- **Data Export:** (Optional) Export feedback for offline analysis.

---

## Tech Stack

- **Frontend:** HTML, CSS (custom, Chart.js), JavaScript
- **Backend:** Node.js, Express, Mongoose, Sentiment
- **Database:** MongoDB

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/feedback-system.git
cd feedback-system
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `backend` directory with your MongoDB URI and any secrets:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the backend server

```sh
cd backend
node server.js
```

### 5. Open the frontend

Open `frontend/index.html` in your browser, or serve the frontend via the backend server (recommended for full functionality):

```
http://localhost:5000/
```

---

## Project Structure

```
backend/
  models/
  routes/
  server.js
  .env
frontend/
  index.html
  home.html
  login.html
  signup.html
  admin-dashboard.html
  style.css
  welcome.css
  script.js
.gitignore
README.md
```

---

## Customization

- **Change background images** in `welcome.css` for a different look.
- **Add more feedback categories** by updating models and routes.
- **Enhance analytics** in the dashboard as needed.

---

## License

MIT

---

**Made with ❤️ for better feedback and continuous improvement!**