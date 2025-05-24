# Feedback System

Welcome to the **Feedback System**! This project is designed to collect and manage feedback from users across various categories, providing a platform for improvement and better experiences.

## Features

- **Welcome Page**: A minimal and user-friendly landing page with a motivational quote and navigation options.
- **Sign-Up and Login**: Secure user authentication with persistent storage using `localStorage`.
- **Category-Based Feedback**: Feedback forms tailored to specific categories like Teacher Feedback, Product Review, Service Evaluation, and more.
- **Admin Login**: Category-specific admin authentication to manage feedback.
- **Chatbot Integration**: A simple chatbot to assist users with queries.
- **Responsive Design**: Fully responsive and works seamlessly on desktop and mobile devices.

## Pages

1. **Welcome Page (`index.html`)**:
   - A minimal landing page with a quote, description, and navigation buttons for Sign-Up and Login.
   - Includes a chatbot for user assistance.

2. **Home Page (`home.html`)**:
   - The main dashboard for users after logging in.
   - Provides access to feedback categories, statistics, and other features.

3. **Sign-Up Page (`signup.html`)**:
   - Allows users to register with their name, email, and password.
   - Validates input and stores user data securely in `localStorage`.

4. **Login Page (`login.html`)**:
   - Authenticates users with their email and password.
   - Redirects to the home page upon successful login.

5. **Admin Login Page (`admin-login.html`)**:
   - Category-specific admin authentication.
   - Redirects to category-specific dashboards for managing feedback.

6. **Feedback Forms**:
   - Separate feedback forms for each category (e.g., Teacher Feedback, Product Review).
   - Each form is styled and scoped to its respective category.

## Technologies Used

- **HTML5**: For structuring the web pages.
- **CSS3**: For styling and responsive design.
- **JavaScript**: For interactivity, authentication, and chatbot functionality.
- **LocalStorage**: For persistent storage of user data.

## How to Run the Project

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>