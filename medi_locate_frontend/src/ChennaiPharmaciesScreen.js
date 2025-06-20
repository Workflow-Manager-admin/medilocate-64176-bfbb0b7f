import React, { useState } from "react";
import Navbar from "./Navbar";

// Example hardcoded areas and pharmacies (can be replaced by an API)
const CHENNAI_AREAS = [
  { name: "T Nagar", pharmacies: [{ name: "Apollo Pharmacy" }, { name: "Medplus" }] },
  { name: "Anna Nagar", pharmacies: [{ name: "Guardian Pharmacy" }, { name: "Apollo Pharmacy" }] },
  { name: "Adyar", pharmacies: [{ name: "Health & Glow" }, { name: "Wellcare Pharmacy" }] },
  { name: "Tambaram", pharmacies: [{ name: "Siva Pharmacy" }, { name: "Medplus" }] }
];

// PUBLIC_INTERFACE
/**
 * ChennaiPharmaciesScreen: Shows Chennai area selector + list of pharmacies, check-availability buttons.
 */
function ChennaiPharmaciesScreen() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [checked, setChecked] = useState(null);

  function handleCheck(pharm) {
    setChecked(pharm.name + Math.random());
    // TODO: Implement backend API call to check availability.
    // For now, just flash message.
    setTimeout(() => setChecked(null), 1400);
  }

  return (
    <div className="app" style={{ background: "#1c1d23", minHeight: "100vh" }}>
      <Navbar selected="pharmacies" />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "36px 16px" }}>
        <h2 style={{ color: "#bc1ff4", margin: 0 }}>Chennai Pharmacies</h2>
        <div style={{ color: "#bbbbbb", fontSize: 18, marginBottom: 28 }}>
          Browse pharmacies by area and check medicine/tablet stock instantly.
        </div>
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontWeight: 500, color: "#ae4c69", marginRight: 15, fontSize: 18 }}>
            Select Area:
          </span>
          {CHENNAI_AREAS.map(area => (
            <button
              key={area.name}
              style={{
                background: selectedArea === area.name ? "#bc1ff4" : "#222238",
                color: selectedArea === area.name ? "#1c1d23" : "#bc1ff4",
                fontWeight: selectedArea === area.name ? 700 : 600,
                marginRight: 10,
                marginBottom: 6,
                border: "none",
                borderRadius: 6,
                padding: "5px 18px",
                fontSize: 16,
                cursor: "pointer",
                boxShadow: selectedArea === area.name
                  ? "0 1px 8px rgba(188,31,244,0.13)"
                  : "none"
              }}
              onClick={() => setSelectedArea(area.name)}
            >
              {area.name}
            </button>
          ))}
        </div>
        {selectedArea ? (
          <div>
            <h3 style={{ color: "#052fff", fontSize: 20, marginBottom: 11 }}>
              Pharmacies in {selectedArea}:
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {CHENNAI_AREAS.find(a => a.name === selectedArea).pharmacies.map(pharm => (
                <li
                  key={pharm.name}
                  style={{
                    background: "#222333",
                    borderLeft: "4px solid #ae4c69",
                    padding: "16px 15px",
                    borderRadius: 8,
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: 17
                  }}
                >
                  <span>
                    <span style={{ fontSize: 21, color: "#bc1ff4", marginRight: 9 }}>🏥</span>
                    {pharm.name}
                  </span>
                  <button
                    className="btn"
                    style={{
                      background: "#052fff",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 15,
                      border: "none",
                      borderRadius: 7,
                      padding: "7px 13px",
                      cursor: "pointer"
                    }}
                    onClick={() => handleCheck(pharm)}
                  >
                    {checked && checked.startsWith(pharm.name) ? "Checking..." : "Check Availability"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div
            style={{
              color: "#bbbbbb",
              background: "#222333",
              padding: 24,
              borderRadius: 9,
              fontSize: 18,
              marginTop: 18
            }}
          >
            Please select an area above to view pharmacies.
          </div>
        )}
      </div>
    </div>
  );
}

export default ChennaiPharmaciesScreen;
