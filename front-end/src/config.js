const config = {
    backendUrl: "http://localhost:3060/api",
    geminiKey: process.env.GEMINI_API_KEY
};

console.log(`backendUrl in config.js: ${config.backendUrl}`)
export default config;
