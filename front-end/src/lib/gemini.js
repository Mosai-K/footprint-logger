import { GoogleGenerativeAI } from "@google/generative-ai";
import config from '../config';

const genAI = new GoogleGenerativeAI(config.geminiKey);

export const generateInsights = async (logs) => {
    try {

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

        const summary = logs.length > 0
            ? logs.map(l => `- ${l.activityType}: ${l.value}${l.unit}`).join('\n')
            : "No logs yet.";

        const prompt = `Act as a sustainability expert. Analyze these logs and provide 3 tips: ${summary}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Detail Error:", error);

        throw new Error(error.message || "Failed to generate insights");
    }
};