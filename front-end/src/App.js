import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';

function App() {
    const [user, setUser] = useState(null);
    const [view, setView] = useState('landing'); // 'landing', 'auth', 'dashboard'

    // On mount, check if user is already logged in
    useEffect(() => {
        const savedUser = localStorage.getItem('ecotrack_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setView('dashboard');
        }
    }, []);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setView('dashboard');
    };

    const handleLogout = () => {
        localStorage.removeItem('ecotrack_user');
        setUser(null);
        setView('landing');
    };

    return (
        <div className="App">
            {view === 'landing' && (
                <LandingPage onGetStarted={() => setView('auth')} />
            )}

            {view === 'auth' && (
                <AuthPage onLoginSuccess={handleLoginSuccess} />
            )}

            {view === 'dashboard' && (
                <div className="container py-5 text-center">
                    <h2 className="display-5 fw-bold">Welcome, {user?.email}</h2>
                    <p className="text-muted">Dashboard structure coming next!</p>
                    <button className="btn btn-outline-danger mt-4" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;