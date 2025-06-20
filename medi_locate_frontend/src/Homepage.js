import React, { useState } from "react";

/**
 * Homepage component for MediLocate.
 * Shows a vertically and horizontally centered medicine reminder section,
 * then directly below, a live Google Map using provided API key.
 * Fully styled for MediLocate dark theme.
 */
// PUBLIC_INTERFACE
function Homepage() {
  // Color palette for dark theme consistency with MediLocate
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

  // Mock medicines for the example
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

  // PUBLIC_INTERFACE
  /** Embeds the Google Map showing central Chennai using the known working Google public embed, with fixed width and height. 
   * No conditional rendering is present, so the map is always shown unless embedding is blocked by browser or network policy.
   * 
   * If the map does not display, open https://maps.google.com, search for "Chennai, India", then use "Share" > "Embed a map"
   * to generate a new iframe code. Replace the src URL as required.
   */
  function GoogleMapEmbed() {
    // Known working Google Maps embed public URL for Chennai, India.
    // Uses "pb=" format, no API key required (Embed API keys are often blocked or restricted)
    const mapSrcPublic =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.0020631776705!2d80.26404571531156!3d13.082680415098756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52679a89d6314b%3A0xc1f6ab4f9450cb96!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1681299092380!5m2!1sen!2sin";
    return (
      <div
        style={{
          width: "100%",
          maxWidth: 660,
          margin: "40px auto 0",
          background: palette.card,
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 2px 14px rgba(52,52,90,0.11)",
          border: `1.5px solid ${palette.background}`,
        }}
      >
        <iframe
          title="Google Map"
          width="100%"
          height="400"
          loading="lazy"
          style={{
            border: "none",
            display: "block",
            background: "#17182a",
            minHeight: 260,
            filter: "invert(0.94) hue-rotate(185deg) contrast(1.05) brightness(0.88)",
            width: "100%", // redundant with width attr, but ensures stretching
            height: 400
          }}
          src={mapSrcPublic}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div
          style={{
            padding: "10px 16px 10px",
            color: palette.text,
            background: palette.card,
            fontWeight: 430,
            fontSize: 16,
            borderTop: `1.5px solid ${palette.background}`,
            textAlign: "left"
          }}
        >
          <span style={{ color: palette.accent, marginRight: 8 }}>🗺️ Google Map</span>
          <span style={{ color: palette.subtle, fontSize: 14 }}>
            Map area (Chennai center), always visible. <b>If the map fails to display, regenerate a public embed at maps.google.com as described below.</b>
          </span>
        </div>
      </div>
    );
  }

  // The homepage returns the reminders, then the map, styled in MediLocate dark theme.
  return (
    <div
      style={{
        minHeight: "100vh",
        background: palette.background,
        color: palette.text,
        fontFamily: `'Inter','Roboto','Helvetica','Arial',sans-serif'`
      }}
    >
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
            <span style={{ fontSize: 28, color: palette.accent }}>💊</span>
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
      {/* Centered flex layout for reminders and map */}
      <div
        style={{
          minHeight: "calc(100vh - 105px - 62px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px 0 0",
        }}
      >
        {/* Medicine reminder section */}
        <div
          style={{
            background: palette.card,
            borderRadius: 16,
            boxShadow: "0 2px 12px rgba(174,76,105,0.06)",
            padding: "38px 34px 34px",
            width: "100%",
            maxWidth: 470,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h2
            style={{
              color: palette.primary,
              margin: "0 0 14px 0",
              letterSpacing: "-1px"
            }}
          >
            Today's Medicines
          </h2>
          <div
            style={{
              fontSize: 16,
              color: palette.subtle,
              marginBottom: 22,
              textAlign: "center"
            }}
          >
            Stay on track with your medication schedule.<br />Mark each as taken when done!
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
              gap: "15px",
              width: "100%"
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
                  padding: "13px 10px",
                  boxShadow: med.taken
                    ? "none"
                    : "0 2px 8px rgba(174,76,105,0.06)"
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
                      fontSize: 23,
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
        </div>
        {/* Google Map directly beneath */}
        <GoogleMapEmbed />
      </div>
      <footer
        style={{
          textAlign: "center",
          color: palette.subtle,
          fontSize: 14,
          marginTop: 54,
          padding: "12px 0"
        }}
      >
        &copy; {new Date().getFullYear()} MediLocate. For demo use only. | Design by KAVIA
      </footer>
    </div>
  );
}

export default Homepage;
