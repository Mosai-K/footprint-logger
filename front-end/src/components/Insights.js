import React, { useState } from 'react';
import { generateInsights } from '../lib/gemini';

export default function AIInsights({ logs }) {
    const [insight, setInsight] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetInsight = async () => {
        console.log("Button clicked! Current logs length:", logs?.length);
        setLoading(true);
        setError(null);

        try {
            const text = await generateInsights(logs);
            console.log("AI Response received:", text);
            setInsight(text);
        } catch (err) {
            console.error("Caught error in component:", err);
            setError(err.message || "Failed to connect to Gemini.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
            <h5 className="fw-bold">AI Sustainability Consultant</h5>

            {error && (
                <div className="alert alert-danger small mt-2">{error}</div>
            )}

            <div className="text-center py-4">
                <button
                    onClick={handleGetInsight}
                    disabled={loading}
                    className="btn btn-primary rounded-pill px-4"
                >
                    {loading ? (
                        <><span className="spinner-border spinner-border-sm me-2"></span>Thinking...</>
                    ) : "Get AI Advice"}
                </button>
            </div>

            {insight && (
                <div className="mt-3 p-3 bg-light rounded-3" style={{ whiteSpace: 'pre-wrap' }}>
                    {insight}
                </div>
            )}
        </div>
    );
}