import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

// Initialize the standard server-side Google GenAI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// 1. Endpoint: AI Website Brief & Proposal Generator (Thinking Level: HIGH)
app.post("/api/generate-brief", async (req, res) => {
  try {
    const { name, phone, businessName, websiteType, budget, message } = req.body;

    if (!name || !businessName || !websiteType || !budget) {
      return res.status(400).json({ error: "Missing required contact details." });
    }

    const prompt = `You are the Lead Digital Solutions Architect of WEBZSTUDIO, a luxury digital agency and custom development studio.
Analyze this prospective client's input brief and custom requirements:
Client Name: ${name}
Phone/Contact: ${phone || "Not provided"}
Business Name: ${businessName}
Website Style/Type Requested: ${websiteType}
Budget Range Selected: ${budget}
Client Message & Vision: ${message || "Wants custom premium designs that align with WEBZSTUDIO's award-winning visual layouts."}

Generate an incredibly high-end, detailed client brief and technical proposal plan. Present your response as a valid JSON object. Do not include markdown wraps around the JSON object, just output raw JSON text that matches this structural schema exactly:
{
  "projectVision": "A beautiful, premium summary statement reflecting our excitement to craft an elite visual experience that transforms their digital presence.",
  "recommendedStack": ["Tech tool 1", "Tech tool 2", "Tech tool 3", "Tech tool 4"],
  "featureHighlights": [
    { "title": "Feature 1", "description": "Highly impactful feature explanation." },
    { "title": "Feature 2", "description": "Highly impactful conversion-oriented explanation." },
    { "title": "Feature 3", "description": "High-end visual addition (e.g., motion graphics)." }
  ],
  "investmentBreakdown": {
    "estimatedCost": "The estimated custom price within or surrounding their budget (e.g., ₹5,500, ₹9,000, ₹17,999, or custom if higher).",
    "deliveryTimeline": "E.g., 3-5 days, 7-10 days, or 2 weeks.",
    "pricingJustification": "Explain the luxury value, clean custom code, tailored animations, and high converting architecture."
  },
  "milestones": [
    { "phase": "Phase 1: Creative Discovery & Wireframes", "timeline": "Day 1-2" },
    { "phase": "Phase 2: Modern High-Fidelity UI Design", "timeline": "Day 3-4" },
    { "phase": "Phase 3: Pixel-Perfect Client-Responsive Engineering", "timeline": "Day 5-6" },
    { "phase": "Phase 4: Optimization, Lazy Loading & Premium Refinement", "timeline": "Day 7" }
  ],
  "conversionAdvice": "A tactical piece of advice for generating leads or customers specific to their business niche."
}

CRITICAL: Output ONLY valid JSON. Double-check all brackets and make sure values are clean strings with proper escape characters.`;

    // Always use the gemini-3.1-pro-preview model and set thinkingLevel to ThinkingLevel.HIGH. Do not set maxOutputTokens.
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
        responseMimeType: "application/json"
      },
    });

    const solutionText = response.text || "{}";
    try {
      const parsed = JSON.parse(solutionText);
      res.json(parsed);
    } catch (parseErr) {
      console.warn("Raw Gemini result failed to parse as JSON:", solutionText, parseErr);
      res.json({
        projectVision: `We are thrilled to partner with ${businessName} to engineer a luxury ${websiteType} platform designed to secure elite conversions.`,
        recommendedStack: ["React 19", "Vite & TS", "Tailwind v4", "Motion Layouts"],
        featureHighlights: [
          { title: "Dynamic Lead Capture", description: "Seamless interactive funnel optimizing conversions." },
          { title: "High-Status Animation", description: "Cinematic scroll gestures rendering fluid elements." },
          { title: "Premium Typography Stack", description: "Contrast and spacing inspired by Apple UI." }
        ],
        investmentBreakdown: {
          estimatedCost: budget,
          deliveryTimeline: "3 to 10 Business Days",
          pricingJustification: "Bespoke handcrafted engineering backed by dynamic analytics tracking and mobile alignment."
        },
        milestones: [
          { phase: "Brief Discovery", timeline: "Immediate" },
          { phase: "Bespoke Asset & Brand Design", timeline: "Days 1-3" },
          { phase: "Production Deployment", timeline: "Days 4-7" }
        ],
        conversionAdvice: "Enable a streamlined contact experience with active action buttons paired with WhatsApp triggers."
      });
    }
  } catch (error: any) {
    console.error("Proposal generator endpoint error:", error);
    res.status(500).json({ error: error?.message || "Internal Server Error in generating proposal." });
  }
});

// 2. Endpoint: AI Hero Image / Brand Asset Generator (gemini-3-pro-image-preview)
app.post("/api/generate-asset", async (req, res) => {
  try {
    const { prompt, size, aspectRatio } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "A descriptive prompt is required." });
    }

    const imageSize = size || "1K"; // 1K, 2K, 4K
    const imageAspect = aspectRatio || "16:9"; // 16:9, 1:1, etc.

    console.log(`Generating asset using gemini-3-pro-image-preview. Prompt: "${prompt}" size: ${imageSize}, aspect: ${imageAspect}`);

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: {
        parts: [
          {
            text: `${prompt}. Premium high-end visual asset. Ultra professional luxury style, minimalist modern wallpaper and graphic design. Clear sharp detail.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: imageAspect,
          imageSize: imageSize,
        },
      },
    });

    let base64Image = "";
    if (response?.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          base64Image = part.inlineData.data;
          break;
        }
      }
    }

    if (!base64Image) {
      return res.status(500).json({ error: "Failed to extract generated image bytes from Gemini response." });
    }

    res.json({
      success: true,
      imageUrl: `data:image/png;base64,${base64Image}`,
      size: imageSize,
      aspectRatio: imageAspect,
    });
  } catch (error: any) {
    console.error("Asset Generator Endpoint Error:", error);
    res.status(500).json({ error: error?.message || "Error generating agency branding asset." });
  }
});

// 3. Integrate full-stack Vite rendering engine
const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  // Setup Vite development server middleware
  createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  }).then((vite) => {
    app.use(vite.middlewares);
    console.log("Development environment loaded with Vite middleware.");
  });
} else {
  // Production static files serving
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// 4. Bind and Listen on correct container port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`WEBZSTUDIO luxury server active and serving on http://localhost:${PORT}`);
});
