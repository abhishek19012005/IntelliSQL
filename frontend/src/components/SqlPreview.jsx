import React from 'react';
import { Code, Play } from 'lucide-react';

const SqlPreview = ({ sql, onExecute, loading, executing }) => {
  if (!sql) return null;

  return (
    <div className="panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <Code size={20} color="#34d399" /> Generated SQL
        </h3>
        <button 
          className="btn" 
          onClick={onExecute} 
          disabled={loading || executing}
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
        >
          {executing ? (
            <>
              <div className="loader-icon">⟳</div> Executing...
            </>
          ) : (
            <>
              <Play size={16} /> Execute Query
            </>
          )}
        </button>
      </div>
      <pre className="code-preview">
        <code>{sql}</code>
      </pre>
    </div>
  );
};

export default SqlPreview;
