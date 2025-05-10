// Sidebar toggle
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const body = document.body;

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  body.classList.toggle('sidebar-active');
});

// Theme toggle
const toggleTheme = document.getElementById('toggle-theme');
toggleTheme.addEventListener('click', () => {
  body.classList.toggle('dark');
});

// Search functionality
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const categoryCards = document.querySelectorAll('.category-card');

searchButton.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase();
  categoryCards.forEach((card) => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase();
    if (title.includes(query) || description.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// Show all categories with animation when "Explore Categories" is clicked
const exploreCategoriesBtn = document.querySelector('.cta-btn');
const categoriesSection = document.getElementById('categories');

exploreCategoriesBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the page from scrolling up
  categoriesSection.classList.add('visible'); // Add the "visible" class to trigger the animation
});

// Handle form submission
const feedbackForm = document.getElementById('teacher-feedback-form');

feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Collect form data
  const formData = new FormData(feedbackForm);
  const data = Object.fromEntries(formData.entries());

  // Display a success message
  alert('Thank you for your feedback!');

  // Optionally, log the data to the console (for testing purposes)
  console.log(data);

  // Reset the form
  feedbackForm.reset();
});

// Dynamic Quotes
const quotes = [
  "Your feedback shapes the future.",
  "Speak your mind, improve the world.",
  "Feedback is the breakfast of champions.",
  "Your voice matters, let it be heard.",
  "Together, we create better experiences."
];

document.addEventListener("DOMContentLoaded", () => {
  const quoteElement = document.getElementById('dynamic-quote');
  let currentQuoteIndex = 0;

  function updateQuote() {
    if (quoteElement) {
      quoteElement.textContent = quotes[currentQuoteIndex];
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length; // Cycle through quotes
    }
  }

  // Change the quote every 5 seconds
  setInterval(updateQuote, 5000);

  // Initialize the first quote
  updateQuote();
});
