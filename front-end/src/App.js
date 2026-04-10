import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import DashboardWrapper from './components/DashboardWrapper';
import DashboardStats from './components/DashboardStats';
import ActivityLogger from './components/ActivityLogger';
import { api } from './services/api';
import { useCallback } from 'react';


function App() {
    const [user, setUser] = useState(null);
    const [view, setView] = useState('landing');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [logs, setLogs] = useState([]);
    const [communityAvg, setCommunityAvg] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchLogs = useCallback(async (userId) => {
        try {
            const [userLogs, communityData] = await Promise.all([
                api.logs.getByUser(userId),
                api.community.getAverage()
            ]);
            setLogs(userLogs);
            setCommunityAvg(communityData.average);
        } catch (err) {
            console.error("Error loading dashboard data:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const savedUser = localStorage.getItem('ecotrack_user');
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            setView('dashboard');
            fetchLogs(parsedUser.id);
        } else {
            setLoading(false);
        }
    }, [fetchLogs]);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setView('dashboard');
        fetchLogs(userData.id);
    };

    const handleLogout = () => {
        localStorage.removeItem('ecotrack_user');
        setUser(null);
        setView('landing');
    };

    return (
        <div className="App">
            {view === 'landing' && <LandingPage onGetStarted={() => setView('auth')} />}

            {view === 'auth' && <AuthPage onLoginSuccess={handleLoginSuccess} />}

            {view === 'dashboard' && (
                <DashboardWrapper
                    user={user}
                    onLogout={handleLogout}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                >
                    {activeTab === 'dashboard' && <DashboardStats logs={logs} communityAvg={communityAvg} />}
                    {activeTab === 'log' && <ActivityLogger user={user} onLogAdded={() => fetchLogs(user.id)} />}

                    {activeTab === 'insights' && (
                        <div className="text-center py-5 border rounded-4 bg-white p-5">
                            <i className="bi bi-robot text-success display-4"></i>
                            <h3 className="fw-bold mt-3">AI Insights Engine</h3>
                            <p className="text-muted">Gemini AI analysis will appear here.</p>
                        </div>
                    )}
                </DashboardWrapper>
            )}
        </div>
    );
}

export default App;