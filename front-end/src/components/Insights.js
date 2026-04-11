import React, { useState } from 'react';
import { generateInsights } from '../lib/gemini';

export default function Insights({ logs }) {
    const [insight, setInsight] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGetInsight = async () => {
        setLoading(true);
        try {
            const text = await generateInsights(logs);
            setInsight(text);
        } catch (err) {
            setInsight("I couldn't reach the eco-consultant. Please check your API key.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
            <div className="d-flex align-items-center mb-4">
                <div className="p-3 bg-primary bg-opacity-10 rounded-circle me-3">
                    <i className="bi bi-robot text-primary fs-4"></i>
                </div>
                <div>
                    <h5 className="fw-bold mb-0">Gemini AI Insights</h5>
                    <small className="text-muted">Personalized sustainability coaching</small>
                </div>
            </div>

            {!insight && !loading && (
                <div className="text-center py-5">
                    <p className="text-muted">Ready to analyze your last {logs.length} activities?</p>
                    <button onClick={handleGetInsight} className="btn btn-primary rounded-pill px-4 fw-bold">
                        Generate Insights
                    </button>
                </div>
            )}

            {loading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary mb-3" role="status"></div>
                    <p className="text-muted animate-pulse">Analyzing your carbon footprint...</p>
                </div>
            )}

            {insight && (
                <div className="bg-light rounded-4 p-4 border-0 mt-3">
                    {/* Using <pre> ensures the text shows up even without a Markdown library */}
                    <pre style={{
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'inherit',
                        fontSize: '0.95rem',
                        color: '#333'
                    }}>
                        {insight}
                    </pre>

                    <button onClick={handleGetInsight} className="btn btn-outline-primary btn-sm rounded-pill mt-3">
                        <i className="bi bi-arrow-clockwise me-2"></i>Refresh Advice
                    </button>
                </div>
            )}
        </div>
    );
}