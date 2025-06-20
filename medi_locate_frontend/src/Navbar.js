import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';

// PUBLIC_INTERFACE
/**
 * Navbar component with navigation links for the MediLocate app.
 * Adheres to the app's dark color scheme and is always visible at the top.
 */
function Navbar() {
  return (
    <nav className="navbar" style={{ background: 'var(--base-dark)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="logo">
          <span className="logo-symbol" role="img" aria-label="pill" style={{ fontSize: 22 }}>💊</span> MediLocate
        </span>
        <div style={{ display: 'flex', gap: '18px' }}>
          <NavLink
            to="/add-medicine"
            className={({ isActive }) =>
              'nav-link' + (isActive ? ' nav-link-active' : '')
            }
            style={{
              color: 'var(--text-color)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: 16,
              padding: '6px 14px',
              borderRadius: 7,
              transition: 'background 0.18s'
            }}
          >Add Medicine</NavLink>
          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              'nav-link' + (isActive ? ' nav-link-active' : '')
            }
            style={{
              color: 'var(--text-color)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: 16,
              padding: '6px 14px',
              borderRadius: 7,
              transition: 'background 0.18s'
            }}
          >Calendar</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
