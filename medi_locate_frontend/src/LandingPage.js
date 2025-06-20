import React from "react";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * LandingPage for MediLocate: Title, description, Get Started
 */
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1A1A2A",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "center",
          padding: 34,
          borderRadius: 15,
          boxShadow: "0 2px 16px rgba(174,76,105,0.13)",
          background: "#222238",
        }}
      >
        <div style={{ color: "#ae4c69", fontSize: 45, fontWeight: 700, letterSpacing: "-1.5px", marginBottom: 10 }}>
          <span style={{ color: "#bc1ff4", fontSize: 48 }}>💊</span> MediLocate
        </div>
        <h2 style={{ fontWeight: 600, color: "#052fff", marginTop: 0, marginBottom: 24 }}>
          Medication Reminders &amp; Pharmacy Finder for Chennai
        </h2>
        <div className="description" style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, marginBottom: 32 }}>
          Never miss your pills again and easily locate nearby pharmacies for quick medicine refills. MediLocate manages your schedules, predictions for refills, and provides up-to-date listings of Chennai pharmacy availability—all in a secure, dark-themed app.
        </div>
        <button
          className="btn btn-large"
          style={{
            background: "#ae4c69",
            color: "#fff",
            fontWeight: 700,
            padding: "13px 32px",
            borderRadius: 8,
            fontSize: 20,
            border: "none",
            cursor: "pointer",
            marginTop: 12
          }}
          onClick={() => navigate("/home")}
          data-testid="get-started-btn"
        >
          Get Started
        </button>
      </div>
      <footer
        style={{
          color: "#bc1ff4",
          marginTop: 40,
          opacity: 0.8,
          fontSize: 14,
          textAlign: "center",
        }}
      >
        &copy; {new Date().getFullYear()} MediLocate. Chennai, India.
      </footer>
    </div>
  );
}

export default LandingPage;
