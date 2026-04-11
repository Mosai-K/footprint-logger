import { GoogleGenerativeAI } from "@google/generative-ai";
import config from '../config';

const genAI = new GoogleGenerativeAI(config.geminiKey);

export const generateInsights = async (logs) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const summary = logs.map(l =>
        `- ${l.activityType}: ${l.value}${l.unit} (${(l.co2 || l.carbonImpact).toFixed(2)}kg)`
    ).join('\n');

    const prompt = `
    You are an eco-friendly AI sustainability consultant for the app "EcoTrack".
    Based on the following user activity logs, provide:
    1. A brief encouraging summary of their footprint.
    2. Two specific, actionable tips to reduce their highest impact category.
    3. One "fun fact" about carbon reduction related to their activities.

    User Logs:
    ${summary || "No activities logged yet."}

    Format the response in clean Markdown with bold headers. Keep it under 150 words.
  `;

    const result = await model.generateContent(prompt);
    return result.response.text();
};