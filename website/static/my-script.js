document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  
    // Chatbot logic (simple simulated AI response)
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (chatForm && chatInput && chatMessages) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;
  
        const userDiv = document.createElement('div');
        userDiv.className = 'flex justify-end space-x-2 items-start';
        userDiv.innerHTML = `
          <div class="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-xs break-words">${escapeHtml(message)}</div>
          <img src="https://placehold.co/40x40/png?text=You" class="w-10 h-10 rounded-full" alt="You" />
        `;
        chatMessages.appendChild(userDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
  
        chatInput.value = '';
        chatInput.disabled = true;
  
        setTimeout(() => {
          const aiResponse = generateAIResponse(message);
          const aiDiv = document.createElement('div');
          aiDiv.className = 'flex items-start space-x-2';
          aiDiv.innerHTML = `
            <img src="https://placehold.co/40x40/png?text=AI" class="w-10 h-10 rounded-full" alt="AI" />
            <div class="bg-blue-100 text-blue-900 rounded-lg px-4 py-2 max-w-xs break-words">${escapeHtml(aiResponse)}</div>
          `;
          chatMessages.appendChild(aiDiv);
          chatMessages.scrollTop = chatMessages.scrollHeight;
          chatInput.disabled = false;
          chatInput.focus();
        }, 1200);
      });
    }
  
    function escapeHtml(text) {
      return text.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      }[m]));
    }
  
    function generateAIResponse(message) {
      const msg = message.toLowerCase();
      if (msg.includes('appointment')) return 'You can book an appointment on the Appointments page.';
      if (msg.includes('symptom')) return 'Please describe your symptoms and I will try to help.';
      if (msg.includes('hello') || msg.includes('hi')) return 'Hello! How can I assist you today?';
      if (msg.includes('thank')) return 'You’re welcome!';
      return 'I am here to help with your healthcare queries.';
    }
  });
  