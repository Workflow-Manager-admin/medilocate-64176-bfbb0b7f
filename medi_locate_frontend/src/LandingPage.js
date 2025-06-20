import React from 'react';

// PUBLIC_INTERFACE
/**
 * LandingPage component for MediLocate
 * Displays the app title, a description, and a "Get Started" button.
 * Button routes to the homepage ('/').
 * The dark theme and provided color palette are used for styling.
 */
function LandingPage() {
  // MediLocate branding and color palette
  const palette = {
    primary: "#ae4c69",
    secondary: "#052fff",
    accent: "#bc1ff4",
    background: "#16161f",
    card: "#1e1e29",
    text: "#fff",
    textSecondary: "rgba(255,255,255,0.78)"
  };

  // Handles navigation to the homepage
  function handleGetStarted() {
    window.location.pathname = '/';
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: palette.background,
      color: palette.text,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: `'Inter','Roboto','Helvetica','Arial',sans-serif'`
    }}>
      {/* Logo and Title */}
      <div style={{
        background: palette.card,
        borderRadius: 18,
        boxShadow: "0 4px 32px rgba(174,76,105,0.09)",
        padding: "54px 44px 42px 44px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 520
      }}>
        <span style={{
          fontSize: 56,
          color: palette.accent,
          background: "rgba(188,31,244,0.09)",
          borderRadius: "50%",
          padding: 10,
          marginBottom: 13
        }}>💊</span>
        <h1 style={{
          fontSize: "2.8rem",
          fontWeight: 700,
          margin: "0 0 10px",
          color: palette.primary,
          letterSpacing: "-2px"
        }}>
          MediLocate
        </h1>
        <div style={{
          color: palette.textSecondary,
          fontWeight: 500,
          fontSize: "1.1rem",
          marginBottom: 16,
          textAlign: "center"
        }}>
          Manage your medication schedule and quickly find nearby pharmacies.
        </div>
        <div style={{
          fontSize: "1rem",
          color: "#bbb",
          textAlign: "center",
          maxWidth: 420,
          marginBottom: 30
        }}>
          <b>Features:</b>
          <ul style={{
            margin: "13px auto 0",
            padding: 0,
            listStyle: "none",
            color: palette.textSecondary,
            textAlign: "left"
          }}>
            <li style={{marginBottom:6}}>
              <span style={{color:palette.secondary,fontWeight:600}}>Medicine Reminder System:</span> Schedule and receive reminders for medication doses.
            </li>
            <li>
              <span style={{color:palette.accent,fontWeight:600}}>Nearby Pharmacy Locator:</span> Instantly find the nearest pharmacies using your device's location.
            </li>
          </ul>
        </div>
        <button
          onClick={handleGetStarted}
          style={{
            background: `linear-gradient(90deg, ${palette.primary} 65%, ${palette.secondary} 100%)`,
            color: "#fff",
            fontWeight: "600",
            border: "none",
            borderRadius: 8,
            padding: "13px 45px",
            fontSize: "1.15rem",
            letterSpacing: "0.5px",
            cursor: "pointer",
            boxShadow: `0 2px 18px 0px ${palette.primary}22`,
            transition: "background 0.2s"
          }}
        >
          Get Started
        </button>
      </div>
      <footer style={{
        marginTop: 35,
        color: "#888",
        fontSize: 14,
        textAlign: "center"
      }}>
        &copy; {new Date().getFullYear()} MediLocate. A KAVIA demo project.
      </footer>
    </div>
  );
}

export default LandingPage;
