const chatContainer = document.querySelector(".chat-container");
const inputField = document.querySelector("input");
const sendBtn = document.querySelector(".send-btn");

function appendMessage(role, text) {
  const messageEl = document.createElement("div");
  messageEl.className = `message ${role}`;
  messageEl.innerText = text;
  chatContainer.appendChild(messageEl);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage() {
  const userInput = inputField.value.trim();
  if (!userInput) return;

  appendMessage("user", userInput);
  inputField.value = "";

  appendMessage("assistant", "Thinking...");

  try {
    const response = await fetch("http://localhost:10000/api/chat", { // ✅ added full backend path
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    console.log("🔥 OpenAI data:", data);

    const reply = data.response || "Sorry, I couldn't find anything.";

    document.querySelector(".message.assistant:last-child").remove();
    appendMessage("assistant", reply);
  } catch (err) {
    console.error("❌ Error talking to server:", err);
    document.querySelector(".message.assistant:last-child").remove();
    appendMessage("assistant", "Error getting response. Try again later.");
  }
}

sendBtn.addEventListener("click", sendMessage);
