import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily for safety
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not defined. AI functionality will fallback to a demo response.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// AI Chatbot endpoint proxying safely to Gemini
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a simulated high-quality mock response if no key is set yet
      return res.json({
        text: `Hello! I would love to assist you with your financial planning or mortgage questions for BrightR Financial Australia. (Note: Please set your GEMINI_API_KEY in Secrets for live AI responses). For example, our borrowing capacity is calculated based on monthly income and expenses, and we offer complimentary retirement health scores!`,
        suggestedActions: ["Tell me about home loans", "Retirement Score Quiz", "Book Consultation with Anita"]
      });
    }

    const ai = getGeminiClient();

    // Prepare system instructions with all credentials, details of Anita and BrightR Financial
    const systemInstruction = `You are "BrightR Financial AI" - the world-class interactive financial advisor assistant for BrightR Financial Australia based in South Yarra, Melbourne.
Your role is to build trust seamlessly, capture prospective client leads, answer questions with professional Australian financial planning etiquette, and encourage users to book a consultation with managed director, senior planner and mortgage broker Anita Fasciani.

Key facts about BrightR Financial:
- Managing Director & Founder: Anita Fasciani (Senior Financial Planner and Mortgage Broker).
- Heritage: Anita began her financial planning career with CBA in 2008. In 2011, she joined CF Wealth, the strategic planning firm established by her mother Josephine Fasciani and partner Selwyn Cohen. She rebranded/established BrightR Financial to offer holistic support including mortgage broking.
- Office: Suite 29, Level 3, 25 Claremont St, South Yarra VIC 3141
- Phone: (03) 9826 2633
- Email: anita@brightrfinancial.com.au
- Core Services: Financial Planning (wealth building, superannuation, retirement transition), Mortgage Broking (first home buyer, refinancing, investor loans), and Aged Care Advice (navigating placement fees RAD/DAP, maximize pensioner entitlements).

Tone and Voice:
- High-end corporate but warm, approachable, empathetic, and exceptionally expert.
- Similar to JP Morgan / Morgan Stanley Private Wealth advisors or top Australian family office planners.
- Use Australian terminology (e.g., Super, Superannuation, Rad, Dap, Aged Care, Offset Account, First Home Owner Grant).
- Keep answers structured with bullets for high readability.
- When answering or calculating, end with a natural call to action to calculate or schedule a face-to-face/Zoom chat with Anita.
- Keep answers relatively concise (under 250 words) so they look great on both mobile chat widgets and desktop interfaces.

IMPORTANT: Always respond with a valid JSON object matching the following structure:
{
  "text": "Answer goes here in rich Markdown format.",
  "suggestedActions": ["Action Choice 1", "Action Choice 2", "Action Choice 3"]
}
Format all JSON responses perfectly so they can be parsed. Do not wrap the JSON inside markdown code blocks, or if you do, ensure you don't break parsing. Highly prefer plain JSON string output!`;

    // Map history to the required parts/contents structure
    // Since we are using standard generateContent with history as part of standard chat format
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        contents.push({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: typeof h.text === 'string' ? h.text : JSON.stringify(h) }]
        });
      }
    }
    
    // Append the current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const replyText = response.text || "{}";
    
    try {
      const parsed = JSON.parse(replyText.trim());
      res.json(parsed);
    } catch (parseError) {
      // Fallback if model fails to output clean JSON
      res.json({
        text: replyText,
        suggestedActions: ["Aged Care Entitlements", "Mortgage Interest Rates", "Book with Anita"]
      });
    }
  } catch (error: any) {
    console.error("Gemini API Error in server:", error);
    res.status(500).json({ error: "Sorry, I had trouble processing that. Please try again or call (03) 9826 2633." });
  }
});

// Server-side Speech / Waveform Generation
app.post("/api/ai/tts", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({ demo: true }); // Return mock speech fallback
    }

    const ai = getGeminiClient();
    const cleanText = text.replace(/[*#`_\[\]]/g, ''); // strip markdown syntax for cleaner speech

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Read this professionally and warmly as an expert wealth advisor: ${cleanText}` }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Kore is professional and friendly
          }
        }
      }
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      res.json({ audio: base64Audio });
    } else {
      res.json({ demo: true });
    }
  } catch (error) {
    console.error("TTS Server Error:", error);
    res.json({ demo: true });
  }
});

// Vite middleware configuration for serving the client-side SPA
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BrightR Financial Server running on http://localhost:${PORT}`);
  });
}

setupVite().catch((error) => {
  console.error("Failed to start server:", error);
});
