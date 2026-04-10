import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function AuthPage({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const endpoint = isLogin ? '/auth/login' : '/auth/register';

        try {
            const res = await axios.post(`${config.backendUrl}${endpoint}`, {
                email,
                password
            });

            localStorage.setItem('ecotrack_user', JSON.stringify(res.data.user));
            onLoginSuccess(res.data.user);
        } catch (err) {
            setError(err.response?.data?.error || "Authentication failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-0 min-vh-100 bg-white">
            <div className="row g-0 min-vh-100">

                {/* --- LEFT SIDE: art--- */}
                <div className="col-lg-6 d-none d-lg-flex flex-column align-items-center justify-content-center bg-success bg-opacity-10 p-5 position-relative overflow-hidden">


                    <div className="position-absolute opacity-10" style={{ top: '-10%', right: '-10%', transform: 'scale(2)' }}>
                        <AbstractBlob />
                    </div>

                    <div className="text-center position-relative z-index-1">
                        <div className="bg-success text-white d-inline-flex p-4 rounded-circle mb-4 shadow-lg">
                            <i className="bi bi-leaf-fill fs-1"></i>
                        </div>
                        <h1 className="display-3 fw-bold tracking-tighter">EcoTrack</h1>
                        <p className="lead text-success text-opacity-75 max-w-sm mx-auto">
                            Your intelligent companion for a sustainable, carbon-conscious lifestyle.
                        </p>
                    </div>

                    <div className="position-absolute bottom-0 left-0 opacity-10" style={{ transform: 'rotate(180deg) scale(1.5)', marginLeft: '-15%' }}>
                        <AbstractBlob />
                    </div>
                </div>

                {/* --- RIGHT SIDE: login form--- */}
                <div className="col-lg-6 d-flex align-items-center justify-content-center p-5">
                    <div className="card shadow-lg border-0 rounded-4 w-100" style={{ maxWidth: '420px' }}>
                        <div className="card-body p-5">


                            <div className="text-center mb-5 d-lg-none">
                                <i className="bi bi-leaf-fill text-success fs-2 me-2"></i>
                                <h2 className="fw-bold d-inline-block align-middle">EcoTrack</h2>
                            </div>

                            <div className="mb-4">
                                <h3 className="fw-bold">
                                    {isLogin ? 'Welcome Back!' : 'Create an Account'}
                                </h3>
                                <p className="text-muted">
                                    {isLogin ? 'Sign in to access your dashboard' : 'Start your journey to sustainability'}
                                </p>
                            </div>

                            {error && <div className="alert alert-danger py-2 small">{error}</div>}

                            <form onSubmit={handleAuth}>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg rounded-3 border-2 border-opacity-25"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label small fw-bold">Password</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg rounded-3 border-2 border-opacity-25"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg w-100 rounded-pill fw-bold h-14"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                    ) : null}
                                    {isLogin ? 'Sign In' : 'Sign Up'}
                                </button>
                            </form>

                            <div className="mt-5 text-center border-top pt-4">
                                <p className="text-muted small">
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                                </p>
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="btn btn-outline-success btn-sm rounded-pill fw-bold px-4"
                                >
                                    {isLogin ? 'Register New Account' : 'Back to Login'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function AbstractBlob() {
    return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '600px', height: '600px' }}>
            <path fill="#198754" d="M38.1,-48.5C50.2,-39.8,61.3,-30.3,66.5,-18.2C71.7,-6.1,71,8.5,64.8,19.6C58.5,30.7,46.7,38.3,34.8,45.4C22.8,52.4,10.7,58.8,-1.7,60.8C-14.1,62.8,-28.1,60.5,-39.1,53.2C-50,45.9,-57.8,33.7,-60.8,20.4C-63.8,7,-62,-7.4,-57.6,-20.9C-53.1,-34.4,-46,-47,-35.1,-56C-24.1,-65,-9.3,-70.3,1.9,-72.7C13.2,-75.1,26.1,-57.3,38.1,-48.5Z" transform="translate(100 100)" />
        </svg>
    );
}