import React, { useState } from "react";

/**
 * Homepage component for MediLocate.
 * Shows a medicine reminder section for today's medicines,
 * each with a 'Mark as Taken' button.
 * Uses mock data. Styled to fit the medi locate dark theme.
 */
// PUBLIC_INTERFACE
function Homepage() {
  // Dark theme palette (from LandingPage and MainContainer for color consistency)
  const palette = {
    primary: "#ae4c69",
    secondary: "#052fff",
    accent: "#bc1ff4",
    background: "#1c1d23",
    card: "#222333",
    text: "#fff",
    subtle: "#bbbbbb",
    taken: "#3fc16b",
    missed: "#e94f64"
  };

  // Mock medicines for today
  const [medicines, setMedicines] = useState([
    {
      id: 101,
      name: "Metformin",
      dosage: "500mg",
      time: "08:00",
      taken: false
    },
    {
      id: 102,
      name: "Atorvastatin",
      dosage: "20mg",
      time: "21:00",
      taken: false
    },
    {
      id: 103,
      name: "Lisinopril",
      dosage: "10mg",
      time: "09:00",
      taken: false
    }
  ]);

  // Handler for 'Mark as Taken'
  function handleMarkAsTaken(id) {
    setMedicines(meds =>
      meds.map(med =>
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: palette.background,
        color: palette.text,
        padding: "0",
        fontFamily: `'Inter','Roboto','Helvetica','Arial',sans-serif'`
      }}
    >
      {/* Navigation Bar */}
      <nav
        style={{
          background: "#161722",
          color: palette.text,
          padding: "21px 0 10px",
          borderBottom: `2.5px solid ${palette.primary}`,
          position: "sticky",
          top: 0,
          zIndex: 99
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: "-1.5px",
              color: palette.primary,
              display: "flex",
              alignItems: "center",
              gap: 7
            }}
          >
            <span style={{ fontSize: 28, color: palette.accent }}>💊</span>{" "}
            MediLocate
          </span>
          <span
            style={{
              fontSize: 13,
              color: palette.text,
              background: palette.secondary,
              padding: "5px 16px",
              borderRadius: 16,
              fontWeight: 600
            }}
          >
            Dark Mode
          </span>
        </div>
      </nav>
      {/* Main container */}
      <main
        style={{
          maxWidth: 700,
          margin: "40px auto 0 auto",
          padding: "0 20px"
        }}
      >
        {/* Medicine Reminder Section */}
        <section
          style={{
            background: palette.card,
            borderRadius: 14,
            boxShadow: "0 2px 14px rgba(174,76,105,0.07)",
            padding: "32px 28px 28px 28px",
            marginTop: 24
          }}
        >
          <h2 style={{ color: palette.primary, margin: 0, marginBottom: 13 }}>
            Today's Medicines
          </h2>
          <div
            style={{
              fontSize: 16,
              color: palette.subtle,
              marginBottom: 20
            }}
          >
            Stay on track with your medication schedule. Mark each as taken once done!
          </div>
          {medicines.length === 0 && (
            <div
              style={{
                color: palette.subtle,
                fontSize: 15,
                padding: "8px 0"
              }}
            >
              No medicines scheduled for today.
            </div>
          )}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "16px"
            }}
          >
            {medicines.map(med => (
              <li
                key={med.id}
                style={{
                  background: palette.background,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: `2px solid ${med.taken ? palette.taken : palette.primary}`,
                  borderRadius: 8,
                  padding: "15px 14px",
                  boxShadow: med.taken
                    ? "none"
                    : "0 1px 3px rgba(174,76,105,0.06)"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 13
                  }}
                >
                  <span
                    style={{
                      fontSize: 22,
                      color: med.taken ? palette.taken : palette.primary
                    }}
                  >
                    💊
                  </span>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 17,
                        color: med.taken ? palette.taken : palette.text,
                        textDecoration: med.taken ? "line-through" : "none"
                      }}
                    >
                      {med.name}{" "}
                      <span
                        style={{
                          color: palette.subtle,
                          fontWeight: 400,
                          fontSize: 14
                        }}
                      >
                        ({med.dosage})
                      </span>
                    </div>
                    <div
                      style={{
                        color: palette.accent,
                        fontWeight: 500,
                        fontSize: 14
                      }}
                    >
                      {med.time}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleMarkAsTaken(med.id)}
                  style={{
                    background: med.taken ? palette.taken : palette.primary,
                    color: palette.text,
                    border: "none",
                    borderRadius: 5,
                    padding: "8px 20px",
                    fontWeight: "600",
                    fontSize: "1rem",
                    minWidth: 106,
                    cursor: "pointer",
                    outline: "none",
                    transition: "background 0.18s"
                  }}
                >
                  {med.taken ? "Taken" : "Mark as Taken"}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer
        style={{
          textAlign: "center",
          color: palette.subtle,
          fontSize: 14,
          marginTop: 48,
          padding: "12px 0"
        }}
      >
        &copy; {new Date().getFullYear()} MediLocate. For demo use only. | Design by KAVIA
      </footer>
    </div>
  );
}

export default Homepage;
