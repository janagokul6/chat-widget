(function() {
    // Create the chat widget button
    const widgetButton = document.createElement('div');
    widgetButton.style.position = 'fixed';
    widgetButton.style.bottom = '20px';
    widgetButton.style.right = '20px';
    widgetButton.style.width = '50px';
    widgetButton.style.height = '50px';
    widgetButton.style.backgroundColor = '#00aaff';
    widgetButton.style.borderRadius = '50%';
    widgetButton.style.textAlign = 'center';
    widgetButton.style.color = '#fff';
    widgetButton.style.fontSize = '24px';
    widgetButton.style.cursor = 'pointer';
    widgetButton.innerHTML = '💬';
    
    // Append the widget to the body
    document.body.appendChild(widgetButton);

    // Create the chat window (initially hidden)
    const chatWindow = document.createElement('div');
    chatWindow.style.position = 'fixed';
    chatWindow.style.bottom = '80px';
    chatWindow.style.right = '20px';
    chatWindow.style.width = '300px';
    chatWindow.style.height = '400px';
    chatWindow.style.backgroundColor = '#fff';
    chatWindow.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    chatWindow.style.borderRadius = '8px';
    chatWindow.style.display = 'none';  // Hide it initially

    // Add a header
    const header = document.createElement('div');
    header.style.backgroundColor = '#00aaff';
    header.style.color = '#fff';
    header.style.padding = '10px';
    header.style.borderTopLeftRadius = '8px';
    header.style.borderTopRightRadius = '8px';
    header.innerHTML = 'Chat with us';
    chatWindow.appendChild(header);

    // Add chat content area
    const chatContent = document.createElement('div');
    chatContent.style.padding = '10px';
    chatContent.style.height = 'calc(100% - 60px)';
    chatContent.style.overflowY = 'auto';
    chatWindow.appendChild(chatContent);

    // Add an input area for typing messages
    const inputArea = document.createElement('div');
    inputArea.style.position = 'absolute';
    inputArea.style.bottom = '0';
    inputArea.style.width = '100%';
    inputArea.style.backgroundColor = '#f5f5f5';
    inputArea.style.padding = '10px';
    chatWindow.appendChild(inputArea);

    const inputField = document.createElement('input');
    inputField.style.width = 'calc(100% - 50px)';
    inputField.style.padding = '8px';
    inputField.setAttribute('placeholder', 'Type a message...');
    inputArea.appendChild(inputField);

    const sendButton = document.createElement('button');
    sendButton.innerHTML = 'Send';
    sendButton.style.padding = '8px';
    sendButton.style.marginLeft = '5px';
    sendButton.style.backgroundColor = '#00aaff';
    sendButton.style.color = '#fff';
    sendButton.style.border = 'none';
    sendButton.style.cursor = 'pointer';
    inputArea.appendChild(sendButton);

    // Append the chat window to the body
    document.body.appendChild(chatWindow);

    // WebSocket or HTTP setup (for example purposes, using WebSocket)
    const socket = new WebSocket('wss://yourserver.com/chat'); // Replace with your WebSocket server URL

    socket.onopen = function() {
        console.log('Connected to chat server.');
    };

    socket.onmessage = function(event) {
        const message = JSON.parse(event.data);
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${message.sender}</strong>: ${message.text}`;
        chatContent.appendChild(messageElement);
        chatContent.scrollTop = chatContent.scrollHeight; // Auto-scroll to the bottom
    };

    // Open/Close the chat window
    widgetButton.addEventListener('click', function() {
        if (chatWindow.style.display === 'none') {
            chatWindow.style.display = 'block';
        } else {
            chatWindow.style.display = 'none';
        }
    });

    // Send a message when the "Send" button is clicked
    sendButton.addEventListener('click', function() {
        const message = inputField.value;
        if (message) {
            const messageObject = {
                sender: 'user',
                text: message
            };
            socket.send(JSON.stringify(messageObject));  // Send message to the server
            inputField.value = '';  // Clear the input field
        }
    });
})();
