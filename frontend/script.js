// Sidebar toggle
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const body = document.body;

if (hamburger && sidebar) {
  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    body.classList.toggle('sidebar-active');
  });
}

// Theme toggle
const toggleThemeBtn = document.getElementById('toggle-theme');
if (toggleThemeBtn) {
  toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    // Save preference
    if(document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}

// On page load, apply saved theme
if(localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}

// Search functionality
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const categoryCards = document.querySelectorAll('.category-card');

searchButton?.addEventListener('click', () => {
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

exploreCategoriesBtn?.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default anchor behavior
  categoriesSection.classList.add('visible'); // Only show categories with animation
  // categoriesSection.scrollIntoView({ behavior: 'smooth' });
});

// --- UNIVERSAL FEEDBACK FORM HANDLER FOR ALL CATEGORIES ---

const feedbackForms = [
  { id: 'teacher-feedback-form', category: 'Teacher Feedback' },
  { id: 'product-review-form', category: 'Product Review' },
  { id: 'service-evaluation-form', category: 'Service Evaluation' },
  { id: 'event-feedback-form', category: 'Event Feedback' }
];

feedbackForms.forEach(({ id, category }) => {
  const form = document.getElementById(id);
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      data.category = category;

      fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(response => {
          if (response.message) {
            alert('Thank you for your feedback!');
            form.reset();
          } else {
            alert(response.error || 'Submission failed');
          }
        })
        .catch(() => {
          alert('Network error. Please try again.');
        });
    });
  }
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
