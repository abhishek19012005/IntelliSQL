import React from 'react';

const ResultTable = ({ data, error }) => {
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!data) return null;

  if (data.length === 0) {
    return (
      <div className="panel" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
        No results found for this query.
      </div>
    );
  }

  // Extract column headers from the first row object keys
  const columns = Object.keys(data[0]);

  return (
    <div className="panel">
      <h3 style={{ marginBottom: '1rem', marginTop: 0 }}>Query Results</h3>
      <div className="table-container">
        <table className="result-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col}>
                    {row[col] !== null ? String(row[col]) : <em>null</em>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Showing {data.length} row(s)
      </div>
    </div>
  );
};

export default ResultTable;
