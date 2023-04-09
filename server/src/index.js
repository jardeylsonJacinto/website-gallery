import { ChatGPTAPIBrowser } from 'chatgpt';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

async function chatgptFunction(content) {
  try {
      const api = new ChatGPTAPIBrowser({
          email: "YOUR_CHATGPT_EMAIL_ADDRESS",
          password: "YOUR_CHATGPT_PASSWORD",
      });
      await api.initSession();

      // sends the instruction for the domain name to ChatGPT
      const getDomainName = await api.sendMessage(
          `Can you generate a domain name for a website about: ${content}`
      );
      let domainName = getDomainName.response;

      // sends the instruction for the prompt to ChatGPT
      const generatePrompt = await api.sendMessage(
          `I have a website for ${content}, and I want to generate a logo for it, can you generate a prompt for dall-e for me? make it long like 50 words, you don't need to tell me why you generated the prompt`
      );
      const diffusionPrompt = generatePrompt.response;

      console.log({ domainName, diffusionPrompt });
  } catch (err) {
      console.error(err);
  }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/api', ( req, res ) => {
  res.json({ message: "Hello world", });
});

app.post("/api", async (req, res) => {
  const { prompt } = req.body;
  const result = await chatgptFunction(prompt);
  res.json({ message: "Retrieved successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
})