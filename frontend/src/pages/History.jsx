import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const History = () => {
  const [history, setHistory] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyRes, analyticsRes] = await Promise.all([
          axios.get(`${API_BASE}/history`),
          axios.get(`${API_BASE}/analytics`)
        ]);
        
        setHistory(historyRes.data);
        setAnalytics(analyticsRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load history data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading history...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Query Analytics</h2>
      
      {analytics && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{analytics.total}</div>
            <div className="stat-label">Total Queries</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ background: 'linear-gradient(to right, #10b981, #34d399)', WebkitBackgroundClip: 'text' }}>
              {analytics.success}
            </div>
            <div className="stat-label">Successful Queries</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ background: 'linear-gradient(to right, #ef4444, #f87171)', WebkitBackgroundClip: 'text' }}>
              {analytics.failed}
            </div>
            <div className="stat-label">Failed Queries</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{analytics.avgExecutionTime}ms</div>
            <div className="stat-label">Avg. Execution Time</div>
          </div>
        </div>
      )}

      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Recent Queries</h2>
      
      <div className="panel">
        <div className="table-container">
          <table className="result-table">
            <thead>
              <tr>
                <th>Database</th>
                <th>Question</th>
                <th>SQL Generated</th>
                <th>Time (ms)</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{item.database_name}</td>
                  <td>{item.question}</td>
                  <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <code style={{ background: 'rgba(0,0,0,0.2)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>
                      {item.generated_sql}
                    </code>
                  </td>
                  <td>{item.execution_time}</td>
                  <td>
                    <span className={`badge ${item.status === 'SUCCESS' ? 'success' : 'failed'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No query history available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
