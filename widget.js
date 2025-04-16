(function () {
  // Floating Chat Button
  const widgetButton = document.createElement("div");
  Object.assign(widgetButton.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "2em",
    height: "2em",
    backgroundColor: "#075E54",
    backgroundSize: "300%",
    backgroundPosition: "50%",
    borderRadius: "50%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "1.7em",
    cursor: "pointer",
    zIndex: "9999",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
    transition: "background-position 0.5s ease-in-out",
  });

  widgetButton.innerHTML = `
  <img src="https://wishgeekstechserve.s3.ap-southeast-2.amazonaws.com/conversation.png" alt="Chat" style="width: 50%; height:50%; object-fit: contain; background: none; border: none; filter: brightness(0) invert(1);">
`;

  document.body.appendChild(widgetButton);

  // Chat Window
  const chatWindow = document.createElement("div");
  Object.assign(chatWindow.style, {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "360px",
    height: "400px",
    backgroundColor: "#fff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
    borderRadius: "14px",
    overflow: "hidden",
    display: "none",
    flexDirection: "column",
    zIndex: "9999",
    border: "1px solid #ddd",
  });

  // Header
  const header = document.createElement("div");
  Object.assign(header.style, {
    backgroundColor: "#075E54",
    color: "white",
    padding: "14px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  });
  const profileImg = document.createElement("img");
  profileImg.src = "https://i.ibb.co/Yh4FQ6z/profile-avatar.png";
  Object.assign(profileImg.style, {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid white",
  });
  const profileInfo = document.createElement("div");
  profileInfo.innerHTML = `
        <div style="font-weight: 600; font-size: 16px;">WhatsBot</div>
        <div style="font-size: 12px; opacity: 0.8;">Online</div>
      `;
  header.appendChild(profileImg);
  header.appendChild(profileInfo);
  chatWindow.appendChild(header);

  // Chat Content
  const chatContent = document.createElement("div");
  Object.assign(chatContent.style, {
    flex: "1",
    padding: "16px 12px",
    backgroundColor: "#e5ddd5",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  });
  chatWindow.appendChild(chatContent);

  // Input Area
  const inputArea = document.createElement("div");
  Object.assign(inputArea.style, {
    padding: "10px",
    backgroundColor: "#f7f7f7",
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid #ddd",
    gap: "10px",
  });

  const emojiBtn = document.createElement("span");
  emojiBtn.textContent = "😊";
  Object.assign(emojiBtn.style, {
    cursor: "pointer",
    fontSize: "22px",
  });

  const inputField = document.createElement("input");
  inputField.setAttribute("placeholder", "Type a message...");
  Object.assign(inputField.style, {
    flex: "1",
    padding: "10px 14px",
    border: "1px solid #ccc",
    borderRadius: "20px",
    outline: "none",
    fontSize: "14px",
    backgroundColor: "#fff",
  });

  const sendButton = document.createElement("button");
  sendButton.innerHTML = "➤";
  Object.assign(sendButton.style, {
    backgroundColor: "#25D366",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "50%",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  });

  inputArea.appendChild(emojiBtn);
  inputArea.appendChild(inputField);
  inputArea.appendChild(sendButton);
  chatWindow.appendChild(inputArea);
  document.body.appendChild(chatWindow);

  // Emoji Box
  const emojiBox = document.createElement("div");
  Object.assign(emojiBox.style, {
    position: "fixed",
    bottom: "100px",
    right: "20px",
    zIndex: "10000",
    display: "none",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    padding: "10px",
  });

  const emojiPicker = document.createElement("emoji-picker");
  emojiBox.appendChild(emojiPicker);
  document.body.appendChild(emojiBox);

  // Toggle Chat
  widgetButton.addEventListener("click", () => {
    const isOpen = chatWindow.style.display === "flex";
    chatWindow.style.display = isOpen ? "none" : "flex";
    emojiBox.style.display = "none";
  });

  emojiBtn.addEventListener("click", () => {
    emojiBox.style.display =
      emojiBox.style.display === "none" ? "block" : "none";
  });

  emojiPicker.addEventListener("emoji-click", (event) => {
    inputField.value += event.detail.unicode;
    emojiBox.style.display = "none";
    inputField.focus();
  });

  // Avatars
  const userAvatar =
    "https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png";
  const botAvatar = "https://i.ibb.co/Yh4FQ6z/profile-avatar.png";

  // Message Bubbles
  function createMessageBubble(msg, sender = "user") {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "flex-start";
    wrapper.style.gap = "10px";
    wrapper.style.flexDirection = sender === "user" ? "row-reverse" : "row";

    const avatar = document.createElement("img");
    avatar.src = sender === "user" ? userAvatar : botAvatar;
    Object.assign(avatar.style, {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      objectFit: "cover",
    });

    const bubble = document.createElement("div");
    bubble.innerText = msg;
    Object.assign(bubble.style, {
      backgroundColor: sender === "user" ? "#dcf8c6" : "#fff",
      padding: "10px 14px",
      borderRadius: "14px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      maxWidth: "75%",
      fontSize: "14px",
    });

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    chatContent.appendChild(wrapper);
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement("div");
    typing.id = "typingIndicator";
    typing.innerText = "Typing...";
    Object.assign(typing.style, {
      alignSelf: "flex-start",
      background: "#ffffff",
      padding: "10px 14px",
      borderRadius: "14px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      fontSize: "14px",
      color: "#555",
      fontStyle: "italic",
    });
    chatContent.appendChild(typing);
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  function removeTyping() {
    const typing = document.getElementById("typingIndicator");
    if (typing) typing.remove();
  }

  function generateBotReply(msg) {
    const lower = msg.toLowerCase();
    if (lower.includes("hello") || lower.includes("hi")) {
      return "Hey there! 👋 How can I help you?";
    } else if (lower.includes("price") || lower.includes("cost")) {
      return "Our pricing starts from ₹999. Let me know your requirement!";
    } else if (lower.includes("help")) {
      return "Sure, I'm here to help. What do you need?";
    } else {
      return "Thanks for messaging! We'll respond shortly 😊";
    }
  }

  sendButton.addEventListener("click", () => {
    const message = inputField.value.trim();
    if (message) {
      createMessageBubble(message, "user");
      inputField.value = "";
      showTyping();
      setTimeout(() => {
        removeTyping();
        const reply = generateBotReply(message);
        createMessageBubble(reply, "bot");
      }, 1000);
    }
  });

  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendButton.click();
  });
})();
