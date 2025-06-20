import React, { useState, useEffect } from 'react';

// PUBLIC_INTERFACE
/**
 * MainContainer for MediLocate: Integrates Medicine Reminder and Pharmacy Locator
 * Dark-themed, custom colored, clean/modern layout.
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

// --------- Medicine Reminder System Components ------------

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

// PUBLIC_INTERFACE
function MedicineReminderSystem() {
  // Mock medicines data
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
  // Medicine to be added via form
  const [addMed, setAddMed] = useState({name: "", dosage: "", time: "08:00", days: []});
  // UI state
  const [showAdd, setShowAdd] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // list | calendar

  // Add new medicine
  function handleAddMedicine(e) {
    e.preventDefault();
    if (!addMed.name.trim() || !addMed.dosage.trim() || addMed.days.length === 0) return;
    setMedicines(meds => [
      ...meds,
      {
        id: Date.now(),
        name: addMed.name,
        dosage: addMed.dosage,
        time: addMed.time,
        days: addMed.days,
        records: { [todayStr()]: false }
      }
    ]);
    setAddMed({name: "", dosage: "", time: "08:00", days: []});
    setShowAdd(false);
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

  // Toggle day in form
  function toggleDay(day) {
    setAddMed(am => ({
      ...am,
      days: am.days.includes(day)
        ? am.days.filter(d => d !== day)
        : [...am.days, day]
    }));
  }

  // Render medicine scheduled for today
  function medsForToday() {
    const dayName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date().getDay()];
    return medicines.filter(med => med.days.includes(dayName));
  }

  // Calendar view (shows the week with med indicators)
  function CalendarView() {
    const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const weekDates = [];
    const now = new Date();
    for(let i=0;i<7;i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + i);
      weekDates.push({date: d, day: weekdays[i]});
    }
    return (
      <div style={{display:'flex',gap:8,margin:'16px 0',justifyContent:'center',alignItems:'end'}}>
        {weekDates.map(({date, day}) => (
          <div key={day} style={{
            background:COLORS.card,
            border:`1px solid ${COLORS.primary}`,
            padding:'10px 8px', borderRadius:8, minWidth:60, textAlign:'center', color:COLORS.text
          }}>
            <div style={{
              fontWeight:'bold', color: (weekdays[new Date().getDay()]===day) ? COLORS.primary : COLORS.subtle
            }}>{day}</div>
            <div style={{fontSize:13,color:COLORS.subtle}}>{date.getDate()}/{date.getMonth()+1}</div>
            {/* Medicines scheduled that day */}
            <div style={{marginTop:6,minHeight:35}}>
              {medicines.filter(med=>med.days.includes(day)).map(med=>(
                <div key={med.id} style={{
                  display:'flex',alignItems:'center',justifyContent:'center',gap:4,
                  color:med.records[date.toISOString().split("T")[0]]?COLORS.taken:COLORS.primary,
                  textDecoration: med.records[date.toISOString().split("T")[0]]?'line-through':'none',
                  fontSize: 14
                }}>
                  <span>💊</span> {med.name}
                </div>
              ))}
              {medicines.filter(med=>med.days.includes(day)).length===0&&
                <div style={{fontSize:12,color:COLORS.subtle}}>--</div>
              }
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{
      background: COLORS.card, borderRadius:12, padding:24, margin:'32px 0', boxShadow:'0 2px 8px rgba(0,0,0,0.13)'
    }}>
      <h2 style={{color:COLORS.primary,margin:'0 0 8px'}}>Medicine Reminder</h2>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:14}}>
        <button
          style={{
            background:viewMode==='list'?COLORS.primary:COLORS.background,
            color:viewMode==='list'?COLORS.text:COLORS.primary,
            border:'none',borderRadius:6,padding:'7px 17px',cursor:'pointer'
          }}
          onClick={()=>setViewMode('list')}
        >List</button>
        <button
          style={{
            background:viewMode==='calendar'?COLORS.primary:COLORS.background,
            color:viewMode==='calendar'?COLORS.text:COLORS.primary,
            border:'none',borderRadius:6,padding:'7px 17px',cursor:'pointer'
          }}
          onClick={()=>setViewMode('calendar')}
        >Calendar</button>
        <button
          style={{
            marginLeft:'auto',
            background:COLORS.accent,
            color:COLORS.text,
            border:'none',borderRadius:6,padding:'7px 17px',cursor:'pointer'
          }}
          onClick={()=>setShowAdd(v=>!v)}
        >{showAdd?'Cancel':'Add Medicine'}</button>
      </div>
      {showAdd && (
        <form onSubmit={handleAddMedicine} style={{
          marginBottom:20,padding:14,background:COLORS.background,borderRadius:6
        }}>
          <div style={{display:'flex',gap:15,marginBottom:10}}>
            <input
              type="text" placeholder="Medicine name"
              value={addMed.name} required
              onChange={e=>setAddMed(m=>({...m, name:e.target.value}))}
              style={{flex:2,background:COLORS.card,color:COLORS.text,border:`1px solid ${COLORS.border||COLORS.subtle}`,borderRadius:4,padding:6}}
            />
            <input
              type="text" placeholder="Dosage"
              value={addMed.dosage} required
              onChange={e=>setAddMed(m=>({...m, dosage:e.target.value}))}
              style={{flex:1,background:COLORS.card,color:COLORS.text,border:`1px solid ${COLORS.border||COLORS.subtle}`,borderRadius:4,padding:6}}
            />
            <input
              type="time" value={addMed.time}
              onChange={e=>setAddMed(m=>({...m, time:e.target.value}))}
              required
              style={{flex:1,background:COLORS.card,color:COLORS.text,border:`1px solid ${COLORS.border||COLORS.subtle}`,borderRadius:4,padding:6}}
            />
          </div>
          <div style={{marginBottom:10}}>
            <span style={{color:COLORS.subtle, fontSize:13}}>Days: </span>
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day=>(
              <label key={day} style={{
                marginRight:10, color:addMed.days.includes(day)?COLORS.primary:COLORS.subtle
              }}>
                <input
                  type="checkbox"
                  checked={addMed.days.includes(day)}
                  onChange={()=>toggleDay(day)}
                  style={{marginRight:3}}
                />{day}
              </label>
            ))}
          </div>
          <button type="submit" style={{
            padding:'7px 17px',background:COLORS.primary,color:COLORS.text,
            border:'none',borderRadius:4,fontWeight:600
          }}>Add Medicine</button>
        </form>
      )}
      {viewMode==='calendar'?<CalendarView/>:(
        <div>
          {medsForToday().length===0 && (
            <div style={{
              color: COLORS.subtle, fontSize: 15, padding: "8px 0"
            }}>
              No medicines scheduled for today.
            </div>
          )}
          <ul style={{listStyle:'none',padding:0,margin:0}}>
            {medsForToday().map(med=>(
              <li key={med.id} style={{
                background:COLORS.background,marginBottom:11,padding:'13px 9px',borderRadius:7,
                display:'flex',alignItems:'center',justifyContent:'space-between',
                border:`1.5px solid ${med.records[todayStr()]?COLORS.taken:COLORS.primary}`,
                boxShadow: med.records[todayStr()]?"none":"0 1px 3px rgba(174,76,105,0.06)"
              }}>
                <div style={{
                  display:'flex', alignItems:'center', gap:13
                }}>
                  <span style={{
                    fontSize:20,
                    color:med.records[todayStr()]?COLORS.taken:COLORS.primary
                  }}>💊</span>
                  <div>
                    <div style={{
                      fontWeight:600, fontSize:16, color:med.records[todayStr()]?COLORS.taken:COLORS.text,
                      textDecoration:med.records[todayStr()]?"line-through":"none"
                    }}>{med.name} <span style={{
                      color:COLORS.subtle,
                      fontWeight:400,
                      fontSize:13}}>({
                        med.dosage})</span>
                    </div>
                    <div style={{
                      fontSize:13, color:COLORS.subtle
                    }}>{med.time}</div>
                  </div>
                </div>
                <button
                  onClick={()=>markAsTaken(med.id)}
                  style={{
                    padding:'6px 13px',
                    background:med.records[todayStr()]?COLORS.taken:COLORS.primary,
                    color:COLORS.text,
                    border:'none',borderRadius:4, fontWeight:500, cursor:"pointer"
                  }}
                >{med.records[todayStr()] ? "Taken" : "Mark as Taken"}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}




//
// -------- MAIN CONTAINER --------------

/*
  Remove: PharmacyLocator and its UI.
  Add: Google map below medicine reminder.
*/

function MainContainer() {
  // Google Maps API Key for embedding map (provided by requirements)
  const GOOGLE_MAPS_API_KEY = "AIzaSyBtMQNFdZbNfN7urxPy2oxDVtG_3ozXfes";

  // PUBLIC_INTERFACE
  /**
   * EmbeddedGoogleMap uses Google Maps JavaScript API to render a live, interactive map.
   * If iframe does not work, fallback to direct JS API loading for full functionality.
   */
  function EmbeddedGoogleMap() {
    // Default: map of Chennai
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

    // Use useRef and useEffect to embed the JS API for more reliability
    const mapRef = React.useRef(null);

    React.useEffect(() => {
      // Prevent re-initializing map
      if (!window.google || !window.google.maps) {
        // Dynamically load script only if not already present
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
      // No cleanup for test/demonstration. In production, remove script on unmount.
      // eslint-disable-next-line
    }, []);

    return (
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        {/* Container for live Google Map */}
        <div
          ref={mapRef}
          style={mapContainerStyle}
          data-testid="google-map-container"
        ></div>
        {/* If desired, fallback to iframe below (commented, not rendered) */}
        {/* <iframe
          title="Google Map"
          src={`https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAPS_API_KEY}&center=${center_lat},${center_lng}&zoom=${zoom}&maptype=roadmap`}
          width="600"
          height="300"
          style={mapContainerStyle}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        /> */}
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.background,
      color: COLORS.text,
      paddingBottom: 28
    }}>
      {/* Navigation Bar */}
      <nav style={{
        background: "#161722",
        color: COLORS.text,
        padding: "21px 0 10px",
        marginBottom: 30,
        borderBottom: `2.5px solid ${COLORS.primary}`,
        position: "sticky",
        top: 0,
        zIndex: 99
      }}>
        <div style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 28px",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: '-1.5px',
            color: COLORS.primary,
            display: 'flex',
            alignItems: 'center',
            gap: 7
          }}>
            <span style={{ fontSize: 28, color: COLORS.accent }}>💊</span> MediLocate
          </span>
          <span style={{
            fontSize: 13,
            color: COLORS.text,
            background: COLORS.secondary,
            padding: '5px 16px',
            borderRadius: 16,
            fontWeight: 600
          }}>Dark Mode</span>
        </div>
      </nav>
      {/* Main layout */}
      <main>
        <div style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {/* Medicine Reminder, centered */}
          <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <MedicineReminderSystem />
          </div>
          {/* Directly below: Google Map */}
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
