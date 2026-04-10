import React from 'react';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

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

    const getDailyTrend = () => {
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        return last7Days.map(dateStr => {
            const dailySum = logs
                .filter(log => (log.timestamp || log.date).startsWith(dateStr))
                .reduce((sum, log) => sum + (log.co2 || log.carbonImpact || 0), 0);

            return {
                date: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
                amount: parseFloat(dailySum.toFixed(2))
            };
        });
    };

    const dailyData = getDailyTrend();

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

            {/* Row for Charts */}
            <div className="col-lg-6">
                <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold mb-0">Emission Distribution</h5>
                        <i className="bi bi-pie-chart text-success fs-4"></i>
                    </div>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5}>
                                    {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="col-lg-6">
                <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold mb-0">Daily Trend (Last 7 Days)</h5>
                        <i className="bi bi-bar-chart-line text-primary fs-4"></i>
                    </div>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={dailyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6c757d' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6c757d' }} />
                                <Tooltip cursor={{ fill: '#f8f9fa' }} contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="amount" fill="#198754" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}