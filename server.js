import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Add this route for Render health check
app.get("/", (req, res) => {
  res.send("✅ ScoutPit backend is live");
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/ask', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (err) {
    console.error("❌ API Error:", err);
    res.status(500).json({ reply: "Something went wrong with the AI." });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
