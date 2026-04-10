import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { ACTIVITY_TYPES } from '../types';

export default function ActivityLogger({ user, onLogAdded }) {
    const [selectedActivity, setSelectedActivity] = useState(ACTIVITY_TYPES[0].id);
    const [value, setValue] = useState('');
    const [recentLogs, setRecentLogs] = useState([]);

    const fetchRecent = useCallback(async () => {
        if (!user?.id) return;
        try {
            const data = await api.logs.getByUser(user.id);
            setRecentLogs(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5));
        } catch (err) {
            console.error("Failed to fetch recent logs:", err);
        }
    }, [user?.id]);

    useEffect(() => {
        fetchRecent();
    }, [fetchRecent]);

    const handleAdd = async (e) => {
        e.preventDefault();

        // 1. Find the current activity object from your constants
        const activity = ACTIVITY_TYPES.find(a => a.id === selectedActivity);

        // Safety check: stop if we can't find the activity or value is missing
        if (!activity || !value) {
            console.error("Missing activity or value");
            return;
        }

        const numValue = parseFloat(value);

        // 2. Fix the floating point math (e.g., 11.20000000001 -> 11.2)
        const co2Calculated = Math.round((numValue * activity.co2PerUnit) * 100) / 100;

        // 3. Construct the payload to match exactly what your DB expects
        const payload = {
            userId: user.id,
            category: activity.category,
            activityType: activity.name,
            value: numValue,
            unit: activity.unit,
            carbonImpact: co2Calculated,
            co2: co2Calculated,
            timestamp: new Date().toISOString()
        };

        console.log("Sending Payload:", payload);

        try {
            await api.logs.add(payload);
            setValue('');
            onLogAdded();
            fetchRecent();
        } catch (err) {
            console.error("Logging failed:", err);
        }
    };
    const currentActivity = ACTIVITY_TYPES.find(a => a.id === selectedActivity);

    return (
        <div className="row g-4">
            {/* Form Column */}
            <div className="col-lg-4">
                <div className="card border-0 shadow-sm rounded-4 p-3">
                    <div className="card-body">
                        <h5 className="fw-bold mb-4">Log New Activity</h5>
                        <form onSubmit={handleAdd}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold">Category</label>
                                <select
                                    className="form-select border-2 border-light"
                                    value={selectedActivity}
                                    onChange={(e) => setSelectedActivity(e.target.value)}
                                >
                                    {ACTIVITY_TYPES.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold">Amount ({currentActivity?.unit})</label>
                                <input
                                    type="number"
                                    className="form-control border-2 border-light"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    required
                                />
                            </div>
                            {value && (
                                <div className="alert alert-success border-0 small py-2 mb-4">
                                    Estimated: <strong>{value && !isNaN(parseFloat(value))
                                        ? (parseFloat(value) * currentActivity.co2PerUnit).toFixed(2)
                                        : "0.00"} kg CO2</strong>
                                </div>
                            )}
                            <button type="submit" className="btn btn-success w-100 rounded-pill fw-bold">
                                <i className="bi bi-plus-circle me-2"></i> Add Entry
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Recent History Column */}
            <div className="col-lg-8">
                <div className="card border-0 shadow-sm rounded-4 p-3">
                    <div className="card-body">
                        <h5 className="fw-bold mb-4">Recent Logs</h5>
                        <div className="list-group list-group-flush">
                            {recentLogs.map(log => {
                                const category = log.category?.toLowerCase();
                                const activityName = log.activityType || log.activity || 'Activity';

                                // Determine the specific icon
                                let icon = 'lightning-charge'; // Default
                                let themeColor = 'warning';

                                if (category === 'transport') {
                                    themeColor = 'primary';
                                    // Specific icon for flights
                                    icon = activityName.toLowerCase().includes('flight') ? 'airplane' : 'car-front';
                                } else if (category === 'food') {
                                    themeColor = 'orange';
                                    icon = 'egg-fried';
                                }

                                return (
                                    <div key={log._id || log.id} className="list-group-item d-flex justify-content-between align-items-center py-3 border-light bg-transparent">
                                        <div className="d-flex align-items-center">
                                            <div className={`p-2 rounded-3 me-3 bg-opacity-10 bg-${themeColor}`}
                                                style={category === 'food' ? { backgroundColor: 'rgba(253, 126, 20, 0.1)' } : {}}>
                                                <i className={`bi bi-${icon} text-${themeColor}`}
                                                    style={category === 'food' ? { color: '#fd7e14' } : {}}></i>
                                            </div>

                                            <div>
                                                <div className="fw-bold text-dark">{activityName}</div>
                                                <div className="text-muted small">
                                                    {log.timestamp ? new Date(log.timestamp).toLocaleDateString() : 'Recent'}
                                                    <span className="mx-1">•</span>
                                                    {log.value} {log.unit}
                                                </div>
                                            </div>
                                        </div>

                                        <span className="badge bg-success bg-opacity-10 text-success rounded-pill border border-success border-opacity-25 px-3">
                                            {`${typeof (log.carbonImpact ?? log.co2) === 'number' ? (log.carbonImpact ?? log.co2).toFixed(2) : "0.00"} ${log.unit || ''}`.trim()}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}