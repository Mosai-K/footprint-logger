import React, { useState } from 'react';
import LandingPage from './pages/LandingPage.jsx'
// import AuthPage from './pages/AuthPage'; // We will build this next

function App() {
    // Use state to track if we are on landing or auth/dashboard
    const [view, setView] = useState('landing');

    const handleGetStarted = () => {
        console.log("Navigating to Auth...");
        setView('auth');
    };

    return (
        <div className="App">
            {view === 'landing' ? (
                <LandingPage onGetStarted={handleGetStarted} />
            ) : (
                <div className="container py-5 text-center">
                    <h2 className="display-4">Login / Register Page Coming Next!</h2>
                    <button className="btn btn-secondary mt-3" onClick={() => setView('landing')}>
                        Back to Home
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;