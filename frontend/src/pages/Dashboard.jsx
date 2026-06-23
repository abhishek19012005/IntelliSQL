import React, { useState } from 'react';
import axios from 'axios';
import DatabaseSelector from '../components/DatabaseSelector';
import QueryInput from '../components/QueryInput';
import SqlPreview from '../components/SqlPreview';
import ResultTable from '../components/ResultTable';

const API_BASE = 'http://localhost:5000/api';

const Dashboard = () => {
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [generatedSql, setGeneratedSql] = useState('');
  const [queryResults, setQueryResults] = useState(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const handleGenerateSql = async (question) => {
    setIsGenerating(true);
    setError(null);
    setGeneratedSql('');
    setQueryResults(null);
    setCurrentQuestion(question);

    try {
      const response = await axios.post(`${API_BASE}/generate-sql`, {
        question,
        database: selectedDatabase
      });
      
      setGeneratedSql(response.data.sql);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to generate SQL.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExecuteQuery = async () => {
    if (!generatedSql) return;
    
    setIsExecuting(true);
    setError(null);
    setQueryResults(null);

    try {
      const response = await axios.post(`${API_BASE}/execute-query`, {
        sql: generatedSql,
        database: selectedDatabase,
        question: currentQuestion
      });
      
      setQueryResults(response.data.rows);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to execute query.');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div>
      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        <div>
          <DatabaseSelector 
            selectedDatabase={selectedDatabase} 
            onSelectDatabase={setSelectedDatabase} 
          />
          <QueryInput 
            onGenerate={handleGenerateSql} 
            loading={isGenerating} 
          />
        </div>
        
        <div>
          <SqlPreview 
            sql={generatedSql} 
            onExecute={handleExecuteQuery}
            loading={isGenerating}
            executing={isExecuting}
          />
        </div>
      </div>

      {(queryResults || error) && (
        <ResultTable data={queryResults} error={error && !isGenerating ? error : null} />
      )}
    </div>
  );
};

export default Dashboard;
