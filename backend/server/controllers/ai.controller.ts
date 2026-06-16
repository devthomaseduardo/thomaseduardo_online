import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response } from "express";
import projectsData from "../../uploads/projects.json"; // Assuming the projects json is accessible

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const chatWithData = async (req: Request, res: Response) => {
  const { message } = req.body;
  
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const context = `Você é um assistente do portfólio do Thomas Eduardo. 
    Responda perguntas baseadas nestes projetos: ${JSON.stringify(projectsData)}.
    Seja conciso, profissional e ajude o usuário a entender os projetos do Thomas.`;

    const result = await model.generateContent([context, message]);
    const response = await result.response;
    res.json({ reply: response.text() });
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar chat" });
  }
};
