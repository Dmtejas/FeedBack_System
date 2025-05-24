// Chatbot Toggle
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.querySelector('.chatbot-messages');
const chatbotSend = document.getElementById('chatbot-send');

chatbotToggle.addEventListener('click', () => {
  chatbot.style.display = 'block';
});

chatbotClose.addEventListener('click', () => {
  chatbot.style.display = 'none';
});

chatbotSend.addEventListener('click', () => {
  const userMessage = chatbotInput.value.trim();
  if (userMessage) {
    const userBubble = document.createElement('p');
    userBubble.textContent = `You: ${userMessage}`;
    chatbotMessages.appendChild(userBubble);

    // Simulate chatbot response
    const botBubble = document.createElement('p');
    botBubble.textContent = 'Chatbot: Thank you for your message!';
    chatbotMessages.appendChild(botBubble);

    chatbotInput.value = '';
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
});