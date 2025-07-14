function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if (message === "") return;
  
    addMessage("user", message);
    input.value = "";
  
    askScoutPit(message).then((response) => {
      addMessage("bot", response);
    }).catch(() => {
      addMessage("bot", "❌ Sorry, something went wrong fetching data.");
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
  
  async function askScoutPit(prompt) {
    const response = await fetch("https://scoutpit-backend.onrender.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });
  
    const data = await response.json();
    return data.response;
  }
  