import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, Clock } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="brand">
        <Database size={24} color="#818cf8" />
        <span>IntelliSQL</span>
      </div>
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Dashboard
        </Link>
        <Link 
          to="/history" 
          className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
             <Clock size={18} />
             History
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
