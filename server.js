const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fetch = require("node-fetch"); // ✅ still needed

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "OpenAI-Beta": "assistants=v2", // ✅ for sk-proj keys
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response from AI.";
    res.json({ response: reply });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ response: "⚠️ Failed to fetch data from AI." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

