document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messagesContainer = document.getElementById('messages');
    
    // Get username
    const username = prompt('Enter your username:') || 'Anonymous';
    
    // Focus input field immediately
    messageInput.focus();
    
    function addMessage(content, isReceived) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isReceived ? 'received' : 'sent');
        messageElement.textContent = content;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function sendMessage() {
        const content = messageInput.value.trim();
        if (content) {
            // Add user's message
            addMessage(content, false);
            messageInput.value = '';
            messageInput.focus();
            
            // Add automated reply after 1 second
            setTimeout(() => {
                addMessage('This is an automated reply to: ' + content, true);
            }, 1000);
        }
    }
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Welcome message
    addMessage('Welcome to the chat, ' + username + '!', true);
});