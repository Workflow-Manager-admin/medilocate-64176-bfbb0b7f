import React from 'react';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Welcome/Landing page for MediLocate app
 * Dark theme, project color palette, centered layout.
 */
function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#1c1d23",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif"
    }}>
      {/* App Logo and Title */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <span style={{
          fontSize: 62,
          color: '#bc1ff4',
          verticalAlign: "middle",
          filter: "drop-shadow(0 0 8px #bc1ff480)"
        }}>💊</span>
        <h1 style={{
          color: "#ae4c69",
          fontSize: "3.1rem",
          fontWeight: 900,
          margin: "10px 0 0"
        }}>MediLocate</h1>
      </div>
      {/* Subtitle */}
      <div style={{
        color: "#052fff", fontWeight: 600, fontSize: 22, marginBottom: 15, letterSpacing: "1.5px"
      }}>
        Your Personal Medicine Organizer & Pharmacy Finder
      </div>
      {/* Description */}
      <div style={{
        maxWidth: 480,
        fontSize: 18,
        lineHeight: 1.6,
        color: "rgba(255,255,255,0.73)",
        marginBottom: 42,
        textAlign: "center"
      }}>
        Manage your medications efficiently and locate the nearest pharmacies, all in one sleek, dark-themed app. Schedule reminders, mark doses as taken, and never miss your medicines again!
      </div>
      {/* Get Started Button */}
      <button
        style={{
          background: "linear-gradient(90deg, #ae4c69 0%, #052fff 100%)",
          color: "#fff",
          padding: "15px 39px",
          fontSize: "1.35rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
          border: "none",
          borderRadius: "7px",
          cursor: "pointer",
          boxShadow: "0 1px 8px #ae4c6980",
          transition: "background 0.18s"
        }}
        onClick={() => navigate('/home')}
        autoFocus
      >
        Get started
      </button>
      {/* Small footer */}
      <div style={{
        marginTop: 54,
        fontSize: 14,
        color: "#bbbbbb"
      }}>
        &copy; {new Date().getFullYear()} MediLocate &bull; Demo by KAVIA
      </div>
    </div>
  );
}

export default WelcomePage;
