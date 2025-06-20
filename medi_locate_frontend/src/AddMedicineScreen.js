import React, { useState } from "react";
import Navbar from "./Navbar";

// PUBLIC_INTERFACE
/**
 * AddMedicineScreen: Standalone page to add a new medicine (accessed via nav bar)
 */
function AddMedicineScreen() {
  const COLORS = {
    primary: "#ae4c69",
    accent: "#bc1ff4",
    card: "#222333",
    background: "#1c1d23",
    text: "#fff",
    subtle: "#bbbbbb"
  };

  const [addMed, setAddMed] = useState({
    name: "",
    dosage: "",
    time: "08:00",
    days: []
  });
  const [confirm, setConfirm] = useState(false);

  // Handle form submit (UI only)
  function handleAddMedicine(e) {
    e.preventDefault();
    if (
      !addMed.name.trim() ||
      !addMed.dosage.trim() ||
      addMed.days.length === 0
    )
      return;
    setConfirm(true);
    setTimeout(() => setConfirm(false), 1800);
    setAddMed({ name: "", dosage: "", time: "08:00", days: [] });
  }

  // Toggle day in form
  function toggleDay(day) {
    setAddMed((am) => ({
      ...am,
      days: am.days.includes(day)
        ? am.days.filter((d) => d !== day)
        : [...am.days, day]
    }));
  }

  return (
    <div
      className="app"
      style={{
        minHeight: "100vh",
        background: COLORS.background,
        color: COLORS.text
      }}
    >
      <Navbar selected="add" />
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "40px 22px 0"
        }}
      >
        <h2 style={{ color: COLORS.primary, marginTop: 0 }}>
          Add a New Medicine
        </h2>
        <div
          style={{
            maxWidth: 520,
            background: COLORS.card,
            padding: 28,
            borderRadius: 10,
            boxShadow: "0 2px 14px rgba(190,76,105,0.13)"
          }}
        >
          <form onSubmit={handleAddMedicine}>
            <div
              style={{
                display: "flex",
                gap: 15,
                marginBottom: 14
              }}
            >
              <input
                type="text"
                placeholder="Medicine name"
                autoFocus
                value={addMed.name}
                required
                onChange={(e) =>
                  setAddMed((m) => ({
                    ...m,
                    name: e.target.value
                  }))
                }
                style={{
                  flex: 2,
                  background: COLORS.background,
                  color: COLORS.text,
                  border: `1px solid ${COLORS.primary}`,
                  borderRadius: 4,
                  padding: 8,
                  fontSize: 16
                }}
              />
              <input
                type="text"
                placeholder="Dosage"
                value={addMed.dosage}
                required
                onChange={(e) =>
                  setAddMed((m) => ({
                    ...m,
                    dosage: e.target.value
                  }))
                }
                style={{
                  flex: 1,
                  background: COLORS.background,
                  color: COLORS.text,
                  border: `1px solid ${COLORS.primary}`,
                  borderRadius: 4,
                  padding: 8,
                  fontSize: 16
                }}
              />
              <input
                type="time"
                value={addMed.time}
                onChange={(e) =>
                  setAddMed((m) => ({
                    ...m,
                    time: e.target.value
                  }))
                }
                required
                style={{
                  flex: 1,
                  background: COLORS.background,
                  color: COLORS.text,
                  border: `1px solid ${COLORS.primary}`,
                  borderRadius: 4,
                  padding: 8,
                  fontSize: 15
                }}
              />
            </div>
            <div style={{ marginBottom: 12, fontSize: 15 }}>
              <span style={{ color: COLORS.subtle, fontSize: 13 }}>Days: </span>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <label
                  key={day}
                  style={{
                    marginRight: 10,
                    color: addMed.days.includes(day)
                      ? COLORS.primary
                      : COLORS.subtle
                  }}
                >
                  <input
                    type="checkbox"
                    checked={addMed.days.includes(day)}
                    onChange={() => toggleDay(day)}
                    style={{ marginRight: 3 }}
                  />
                  {day}
                </label>
              ))}
            </div>
            <button
              type="submit"
              className="btn"
              style={{
                padding: "9px 21px",
                background: COLORS.primary,
                color: COLORS.text,
                border: "none",
                borderRadius: 5,
                fontWeight: 600,
                fontSize: 16
              }}
            >
              Add Medicine
            </button>
            {confirm && (
              <span
                style={{
                  color: COLORS.accent,
                  marginLeft: 18,
                  fontWeight: 600,
                  fontSize: 16
                }}
              >
                Medicine added! (mock)
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMedicineScreen;
