import React from "react";
import Navbar from "./Navbar";

// PUBLIC_INTERFACE
/**
 * CalendarScreen: Shows calendar of medicine schedule & refill dates
 */
function CalendarScreen() {
  return (
    <div className="app" style={{ background: "#1c1d23", minHeight: "100vh" }}>
      <Navbar selected="calendar" />
      <div style={{ maxWidth: 950, margin: "0 auto", padding: "36px 18px", color: "#fff" }}>
        <h2 style={{ color: "#052fff", marginTop: 0 }}>
          Medicine & Refill Calendar
        </h2>
        <div style={{ fontSize: 18, color: "#bbbbbb", marginBottom: 20 }}>
          {/* Replace with actual calendar implementation */}
          (Calendar with medicine & refill predictions coming soon)
        </div>
        {/* TODO: Integrate medicine schedule and refill highlight */}
        <div
          style={{
            background: "#222333",
            minHeight: 280,
            borderRadius: 10,
            boxShadow: "0 1px 4px rgba(82,47,244,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#bc1ff4",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          📅
        </div>
      </div>
    </div>
  );
}

export default CalendarScreen;
