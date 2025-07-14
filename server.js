import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/", (req, res) => {
  res.send("✅ ScoutPit backend is live");
});

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are ScoutPit, an expert car finder. You help users discover super rare or super common cars. Provide detailed info on models, history, production years, rarity, and where to find them. Use current data trends."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ response: reply });
  } catch (error) {
    console.error("❌ OpenAI error:", error.message);
    res.status(500).json({ error: "OpenAI request failed" });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
