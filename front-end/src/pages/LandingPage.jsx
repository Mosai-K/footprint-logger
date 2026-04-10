import React from 'react';

export default function LandingPage({ onGetStarted }) {
    return (
        <div className="bg-light min-vh-100">
            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3">
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center fw-bold fs-3 text-success" href="#">
                        <i className="bi bi-leaf-fill me-2"></i> EcoTrack
                    </a>
                    <button
                        className="btn btn-outline-secondary rounded-pill px-4"
                        onClick={onGetStarted}
                    >
                        Login
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container py-5 mt-lg-5">
                <div className="row align-items-center g-5">
                    <div className="col-lg-6">
                        <h1 className="display-2 fw-bold lh-1 mb-4">
                            Track your <span className="text-success">impact</span>, change the world.
                        </h1>
                        <p className="lead text-muted mb-5">
                            The simplest way to monitor your daily carbon footprint. Log activities,
                            get AI-powered insights, and join a community committed to a greener future.
                        </p>
                        <div className="d-grid d-md-flex gap-3">
                            <button
                                className="btn btn-success btn-lg rounded-pill px-5 py-3 fw-bold shadow-sm"
                                onClick={onGetStarted}
                            >
                                Get Started Free <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                            <button className="btn btn-outline-dark btn-lg rounded-pill px-5 py-3">
                                View Demo
                            </button>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="bg-success bg-opacity-10 rounded-5 p-5 position-relative">
                            <div className="row g-3">
                                <div className="col-6">
                                    <div className="card border-0 shadow-sm rounded-4 p-3 rotate-n3">
                                        <i className="bi bi-bar-chart-fill text-success fs-1"></i>
                                        <h2 className="fw-bold mt-2">84%</h2>
                                        <small className="text-uppercase text-muted tracking-wider">Efficiency</small>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="card border-0 shadow-sm bg-success text-white rounded-4 p-3 rotate-3">
                                        <i className="bi bi-zap-charge fs-1"></i>
                                        <h2 className="fw-bold mt-2">-12kg</h2>
                                        <small className="text-uppercase text-white-50 tracking-wider">Reduction</small>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card border-0 shadow-sm bg-dark text-white rounded-4 p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <i className="bi bi-cpu text-info fs-1"></i>
                                            <span className="badge bg-success bg-opacity-25 text-success rounded-pill">AI ACTIVE</span>
                                        </div>
                                        <p className="fs-5 mb-0">
                                            "Switching to bus travel could save you 4.2kg CO2 this week."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-5 mt-5">
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold">Everything you need to go green</h2>
                        <p className="text-muted">Powerful tools designed to help you understand and minimize your environmental footprint.</p>
                    </div>
                    <div className="row g-4">
                        <FeatureCard
                            icon="bi-lightning-fill"
                            title="Instant Logging"
                            text="Quickly log transport, food, and energy consumption with pre-calculated values."
                        />
                        <FeatureCard
                            icon="bi-pie-chart-fill"
                            title="Visual Analytics"
                            text="Beautiful charts help you visualize your progress and identify high-emission areas."
                        />
                        <FeatureCard
                            icon="bi-robot"
                            title="AI Insights"
                            text="Personalized recommendations powered by Gemini AI to help reach your goals."
                        />
                        <FeatureCard icon="bi-globe" title="Community" text="See how your footprint compares to the community average." />
                        <FeatureCard icon="bi-shield-lock" title="Secure" text="Your data is encrypted and accessible only to you." />
                        <FeatureCard icon="bi-trophy" title="Weekly Goals" text="Set and track weekly reduction targets to make a real difference." />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="container py-5 border-top">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="fw-bold fs-4 text-success">
                        <i className="bi bi-leaf-fill me-2"></i> EcoTrack
                    </div>
                    <p className="text-muted mb-0">© 2026 EcoTrack. Built for a sustainable future.</p>
                </div>
            </footer>
        </div>
    );
}

// Helper Component for Feature Cards
function FeatureCard({ icon, title, text }) {
    return (
        <div className="col-md-4">
            <div className="card border-0 h-100 p-4 feature-hover shadow-sm">
                <div className="bg-success bg-opacity-10 rounded-4 d-inline-flex align-items-center justify-center mb-4" style={{ width: '60px', height: '60px' }}>
                    <i className={`bi ${icon} text-success fs-3`}></i>
                </div>
                <h4 className="fw-bold">{title}</h4>
                <p className="text-muted mb-0">{text}</p>
            </div>
        </div>
    );
}