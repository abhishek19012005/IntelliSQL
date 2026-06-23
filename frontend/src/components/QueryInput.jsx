import React, { useState } from 'react';
import { Send } from 'lucide-react';

const QueryInput = ({ onGenerate, loading }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && !loading) {
      onGenerate(question);
    }
  };

  return (
    <div className="panel">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="question-input">Ask a question about your database</label>
          <textarea
            id="question-input"
            className="textarea-input"
            placeholder="e.g. Show me all students with CGPA greater than 8 in Computer Science"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
          />
        </div>
        <button 
          type="submit" 
          className="btn" 
          disabled={!question.trim() || loading}
        >
          {loading ? (
            <>
              <div className="loader-icon">⟳</div>
              Generating...
            </>
          ) : (
            <>
              <Send size={18} />
              Generate SQL
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default QueryInput;
