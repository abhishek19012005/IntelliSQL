import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DatabaseSelector = ({ onSelectDatabase, selectedDatabase }) => {
  const [databases, setDatabases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/databases');
        setDatabases(response.data);
        if (response.data.length > 0 && !selectedDatabase) {
          onSelectDatabase(response.data[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching databases:', err);
        setError('Failed to load databases.');
        setLoading(false);
      }
    };

    fetchDatabases();
  }, [onSelectDatabase, selectedDatabase]);

  if (loading) return <div>Loading databases...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="form-group">
      <label className="form-label" htmlFor="db-select">Select Target Database</label>
      <select 
        id="db-select"
        className="select-input" 
        value={selectedDatabase} 
        onChange={(e) => onSelectDatabase(e.target.value)}
      >
        {databases.map((db) => (
          <option key={db} value={db}>{db}</option>
        ))}
      </select>
    </div>
  );
};

export default DatabaseSelector;
