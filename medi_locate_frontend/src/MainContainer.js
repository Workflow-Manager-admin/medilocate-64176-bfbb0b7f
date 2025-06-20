import React, { useState } from 'react';
import Navbar from './Navbar';

// PUBLIC_INTERFACE
/**
 * MainContainer for MediLocate: Shows the persistent Navbar,
 * the today's medicine list with mark-as-taken, and the Google map below.
 * Note: All navigation (Home, Calendar, Add Medicine, Pharmacies) is through the persistent Navbar.
 */

const COLORS = {
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

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

// Only exposes list of medicines for today and mark-as-taken.
function MedicineReminderSystem() {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Metformin",
      dosage: "500mg",
      time: "08:00",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      records: { [todayStr()]: false }
    },
    {
      id: 2,
      name: "Atorvastatin",
      dosage: "20mg",
      time: "20:00",
      days: ["Mon", "Wed", "Fri"],
      records: { [todayStr()]: false }
    }
  ]);

  // Render medicine scheduled for today
  function medsForToday() {
    const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date().getDay()];
    return medicines.filter(med => med.days.includes(dayName));
  }

  // Toggle marked as taken for today
  function markAsTaken(medId) {
    setMedicines(meds => meds.map(med => {
      if (med.id !== medId) return med;
      return {
        ...med,
        records: { ...med.records, [todayStr()]: !med.records[todayStr()] }
      };
    }));
  }

  return (
    <div style={{
      background: COLORS.card, borderRadius: 12, padding: 24, margin: '32px 0', boxShadow: '0 2px 8px rgba(0,0,0,0.13)'
    }}>
      <h2 style={{ color: COLORS.primary, margin: '0 0 8px' }}>Medicine Reminder</h2>
      <div>
        {medsForToday().length === 0 && (
          <div style={{
            color: COLORS.subtle, fontSize: 15, padding: "8px 0"
          }}>
            No medicines scheduled for today.
          </div>
        )}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {medsForToday().map(med => (
            <li key={med.id} style={{
              background: COLORS.background,
              marginBottom: 11,
              padding: '13px 9px',
              borderRadius: 7,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: `1.5px solid ${med.records[todayStr()] ? COLORS.taken : COLORS.primary}`,
              boxShadow: med.records[todayStr()] ? "none" : "0 1px 3px rgba(174,76,105,0.06)"
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 13
              }}>
                <span style={{
                  fontSize: 20,
                  color: med.records[todayStr()] ? COLORS.taken : COLORS.primary
                }}>💊</span>
                <div>
                  <div style={{
                    fontWeight: 600, fontSize: 16, color: med.records[todayStr()] ? COLORS.taken : COLORS.text,
                    textDecoration: med.records[todayStr()] ? "line-through" : "none"
                  }}>{med.name} <span style={{
                    color: COLORS.subtle,
                    fontWeight: 400,
                    fontSize: 13
                  }}>
                      ({med.dosage})</span>
                  </div>
                  <div style={{
                    fontSize: 13, color: COLORS.subtle
                  }}>{med.time}</div>
                </div>
              </div>
              <button
                onClick={() => markAsTaken(med.id)}
                style={{
                  padding: '6px 13px',
                  background: med.records[todayStr()] ? COLORS.taken : COLORS.primary,
                  color: COLORS.text,
                  border: 'none',
                  borderRadius: 4,
                  fontWeight: 500,
                  cursor: "pointer"
                }}
              >{med.records[todayStr()] ? "Taken" : "Mark as Taken"}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Embedded Google Map
function EmbeddedGoogleMap() {
  const GOOGLE_MAPS_API_KEY = "AIzaSyBtMQNFdZbNfN7urxPy2oxDVtG_3ozXfes";
  const center_lat = 13.0827, center_lng = 80.2707, zoom = 12;
  const mapContainerStyle = {
    width: "100%",
    maxWidth: 600,
    minWidth: 200,
    height: 300,
    margin: "0 auto",
    border: 0,
    borderRadius: 10,
    boxShadow: "0 1px 8px rgba(82,47,244,0.12)",
    marginTop: 30,
    marginBottom: 24,
    display: "block"
  };
  const mapRef = React.useRef(null);
  React.useEffect(() => {
    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.onload = () => {
        if (mapRef.current) {
          // eslint-disable-next-line no-undef
          new window.google.maps.Map(mapRef.current, {
            center: { lat: center_lat, lng: center_lng },
            zoom,
            mapTypeId: "roadmap",
            disableDefaultUI: false
          });
        }
      };
      document.body.appendChild(script);
    } else {
      if (mapRef.current) {
        // eslint-disable-next-line no-undef
        new window.google.maps.Map(mapRef.current, {
          center: { lat: center_lat, lng: center_lng },
          zoom,
          mapTypeId: "roadmap",
          disableDefaultUI: false
        });
      }
    }
    // No cleanup necessary here for the demo.
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div
        ref={mapRef}
        style={mapContainerStyle}
        data-testid="google-map-container"
      ></div>
    </div>
  );
}

function MainContainer() {
  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.background,
      color: COLORS.text,
      paddingBottom: 28
    }}>
      <Navbar selected="home" />
      <main>
        <div style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <MedicineReminderSystem />
          </div>
          <EmbeddedGoogleMap />
        </div>
      </main>
      <footer style={{
        textAlign: "center",
        color: COLORS.subtle,
        fontSize: 14,
        marginTop: 40,
        padding: "10px 0"
      }}>
        &copy; {new Date().getFullYear()} MediLocate. For demo use only. | Design by KAVIA
      </footer>
    </div>
  );
}

export default MainContainer;
