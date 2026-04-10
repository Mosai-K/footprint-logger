const config = {
    backendUrl: process.env.API_URL,
    geminiKey: process.env.GEMINI_API_KEY
};

console.log(`backendUrl in config.js: ${config.backendUrl}`)
export { config as urlConfig }
