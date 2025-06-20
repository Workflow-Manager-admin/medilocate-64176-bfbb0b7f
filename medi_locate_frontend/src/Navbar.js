import React from "react";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * Navbar for navigation between Home, Calendar, and Chennai Pharmacies
 */
function Navbar({ selected = "home" }) {
  const nav = useNavigate();
  return (
    <nav
      style={{
        background: "#161722",
        color: "#fff",
        padding: "20px 0 10px",
        borderBottom: "2.5px solid #ae4c69",
        position: "sticky",
        top: 0,
        zIndex: 99,
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          onClick={() => nav("/")}
          style={{
            fontWeight: 800,
            fontSize: 24,
            letterSpacing: "-1.5px",
            color: "#ae4c69",
            display: "flex",
            alignItems: "center",
            gap: 7,
            cursor: "pointer"
          }}
        >
          <span style={{ fontSize: 28, color: "#bc1ff4" }}>💊</span> MediLocate
        </span>
        <div style={{ flex: 1 }}></div>
        <button
          className="btn"
          style={{
            marginRight: 5,
            background: selected === "home" ? "#ae4c69" : "#222238",
            color: selected === "home" ? "#fff" : "#bc1ff4",
            fontSize: 16,
            border: "none",
            borderRadius: 7,
            padding: "6px 18px",
            fontWeight: 600,
            cursor: "pointer"
          }}
          onClick={() => nav("/home")}
        >
          Home
        </button>
        <button
          className="btn"
          style={{
            marginRight: 5,
            background: selected === "calendar" ? "#052fff" : "#222238",
            color: selected === "calendar" ? "#fff" : "#bc1ff4",
            fontSize: 16,
            border: "none",
            borderRadius: 7,
            padding: "6px 18px",
            fontWeight: 600,
            cursor: "pointer"
          }}
          onClick={() => nav("/calendar")}
        >
          Calendar
        </button>
        <button
          className="btn"
          style={{
            marginRight: 5,
            background: selected === "add" ? "#ae4c69" : "#222238",
            color: selected === "add" ? "#fff" : "#bc1ff4",
            fontSize: 16,
            border: "none",
            borderRadius: 7,
            padding: "6px 18px",
            fontWeight: 600,
            cursor: "pointer"
          }}
          onClick={() => nav("/add-medicine")}
        >
          Add Medicine
        </button>
        <button
          className="btn"
          style={{
            background: selected === "pharmacies" ? "#bc1ff4" : "#222238",
            color: selected === "pharmacies" ? "#fff" : "#bc1ff4",
            fontSize: 16,
            border: "none",
            borderRadius: 7,
            padding: "6px 18px",
            fontWeight: 600,
            cursor: "pointer"
          }}
          onClick={() => nav("/chennai-pharmacies")}
        >
          Pharmacies
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
