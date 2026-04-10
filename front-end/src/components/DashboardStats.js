import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0d6efd', '#fd7e14', '#ffc107', '#198754'];

export default function DashboardStats({ logs, communityAvg }) {
    const totalEmissions = logs.reduce((sum, log) => {
        return sum + (log.co2 || log.carbonImpact || 0);
    }, 0);

    const categoryData = [
        {
            name: 'Transport',
            value: logs.filter(l => l.category === 'transport')
                .reduce((s, l) => s + (l.co2 || l.carbonImpact || 0), 0)
        },
        {
            name: 'Food',
            value: logs.filter(l => l.category === 'food')
                .reduce((s, l) => s + (l.co2 || l.carbonImpact || 0), 0)
        },
        {
            name: 'Energy',
            value: logs.filter(l => l.category === 'energy')
                .reduce((s, l) => s + (l.co2 || l.carbonImpact || 0), 0)
        },
    ].filter(c => c.value > 0);

    return (
        <div className="row g-4">
            {/* Total Card */}
            <div className="col-md-4">
                <div className="card bg-success text-white border-0 rounded-4 shadow-sm h-100 p-3">
                    <div className="card-body">
                        <h6 className="text-uppercase opacity-75 small fw-bold">Total Footprint</h6>
                        <h2 className="display-5 fw-bold mb-0">{totalEmissions.toFixed(1)}</h2>
                        <span className="small">kg CO2e</span>
                    </div>
                </div>
            </div>

            {/* Comparison Card */}
            <div className="col-md-4">
                <div className="card border-0 rounded-4 shadow-sm h-100 p-3 bg-white">
                    <div className="card-body">
                        <h6 className="text-muted text-uppercase small fw-bold">Vs Community</h6>
                        <h2 className="display-5 fw-bold text-success mb-0">
                            {communityAvg > 0 ? ((totalEmissions / communityAvg) * 100).toFixed(0) : 0}%
                        </h2>
                        <span className="small text-muted">of average user</span>
                    </div>
                </div>
            </div>

            {/* Top Category Card */}
            <div className="col-md-4">
                <div className="card border-0 rounded-4 shadow-sm h-100 p-3 bg-white">
                    <div className="card-body">
                        <h6 className="text-muted text-uppercase small fw-bold">Primary Source</h6>
                        <h3 className="fw-bold mt-2 text-dark">
                            {categoryData.length > 0
                                ? categoryData.sort((a, b) => b.value - a.value)[0].name
                                : 'No Data'}
                        </h3>
                        <span className="small text-muted">Most logged impact</span>
                    </div>
                </div>
            </div>

            {/* Chart Card */}
            <div className="col-12">
                <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold mb-0">Emission Distribution</h5>
                        <i className="bi bi-pie-chart text-success fs-4"></i>
                    </div>
                    <div style={{ width: '100%', height: 320 }}>
                        {categoryData.length > 0 ? (
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={110}
                                        paddingAngle={8}
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                                Log an activity to see your breakdown
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}