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
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are ScoutPit, an expert car finder. You help users discover super rare or super common cars. Provide detailed info on models, history, production years, rarity, and where to find them. Use current data trends."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });
  
    const data = await response.json();
    return data.choices[0].message.content;
  }
  