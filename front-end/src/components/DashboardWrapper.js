import React, { useState } from 'react';

export default function DashboardWrapper({ user, onLogout, children, activeTab, setActiveTab }) {
    return (
        <div className="min-vh-100 bg-light">

            <nav className="navbar navbar-expand-lg navbar-white bg-white border-bottom sticky-top py-3">
                <div className="container">
                    <div className="navbar-brand d-flex align-items-center fw-bold fs-4 text-success">
                        <i className="bi bi-leaf-fill me-2"></i> EcoTrack
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <div className="d-none d-md-block text-end">
                            <div className="small fw-bold text-dark">{user?.email}</div>
                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Standard Member</div>
                        </div>
                        <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={onLogout}>
                            <i className="bi bi-box-arrow-right me-1"></i> Logout
                        </button>
                    </div>
                </div>
            </nav>


            <main className="container py-5">

                <div className="d-flex justify-content-center mb-5">
                    <div className="nav nav-pills bg-white p-1 rounded-pill shadow-sm border">
                        <button
                            className={`nav-link rounded-pill px-4 fw-bold ${activeTab === 'dashboard' ? 'active bg-success' : 'text-muted'}`}
                            onClick={() => setActiveTab('dashboard')}
                        >
                            Dashboard
                        </button>
                        <button
                            className={`nav-link rounded-pill px-4 fw-bold ${activeTab === 'log' ? 'active bg-success' : 'text-muted'}`}
                            onClick={() => setActiveTab('log')}
                        >
                            Log Activity
                        </button>
                        <button
                            className={`nav-link rounded-pill px-4 fw-bold ${activeTab === 'insights' ? 'active bg-success' : 'text-muted'}`}
                            onClick={() => setActiveTab('insights')}
                        >
                            AI Insights
                        </button>
                    </div>
                </div>

                {/* Dynamic Content Slot */}
                <div className="row justify-content-center">
                    <div className="col-12">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}