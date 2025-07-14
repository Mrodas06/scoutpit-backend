function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if (message === "") return;
  
    addMessage("user", message);
    input.value = "";
  
    fetch('http://localhost:3001/ask', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: message })
    })
    .then(res => res.json())
    .then(data => {
      addMessage("bot", data.reply);
    })
    .catch(err => {
      console.error("❌ Error:", err);
      addMessage("bot", "❌ Couldn't reach the AI. Try again later.");
    });
  }
  
  function addMessage(sender, text) {
    const chatBox = document.getElementById("chatBox");
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  