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


// --------- Pharmacy Locator Components ------------

/**
 * PUBLIC_INTERFACE
 * PharmacyLocator (Google Maps version): Shows all pharmacies in Chennai as markers on the map.
 * Preserves dark theme and color palette.
 * For live map experience, we use the Google Maps JavaScript API (client-side).
 * For demo, a static list of notable pharmacies in Chennai are marked.
 * In a full production, pharmacy list would come from a backend or APIs (e.g., Google Places).
 */
function PharmacyLocator() {
  // Hard-code a few sample pharmacy locations in Chennai for the demo.
  const chennaiPharmacies = [
    { name: "Apollo Pharmacy - Anna Salai", lat: 13.060422, lng: 80.249583 },
    { name: "Medplus - T Nagar", lat: 13.039799, lng: 80.233371 },
    { name: "Guardian Pharmacy - Velachery", lat: 12.971903, lng: 80.220772 },
    { name: "Apollo Pharmacy - Adyar", lat: 13.006935, lng: 80.257257 },
    { name: "Medplus - Vadapalani", lat: 13.049014, lng: 80.213894 },
    { name: "Trust Chemists - Nungambakkam", lat: 13.057974, lng: 80.242378 },
    { name: "Sanjeevani - Kilpauk", lat: 13.080460, lng: 80.247860 },
    { name: "Apollo Pharmacy - Perambur", lat: 13.118684, lng: 80.233890 }
  ];

  // Chennai city center: 13.0827° N, 80.2707° E
  const CHENNAI_CENTER = { lat: 13.0827, lng: 80.2707 };

  const [mapLoaded, setMapLoaded] = useState(false);

  // Load Google Maps JS API via script tag only once
  useEffect(() => {
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }
    // Add the script
    const scriptId = 'google-maps-script';
    if (document.getElementById(scriptId)) {
      return; // already loading
    }
    const script = document.createElement('script');
    // Note: For production, replace the key below with a PROPER key with "Maps JavaScript API" enabled, with proper referer restrictions.
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDEMO-DEMO-KEY-CHANGEME&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.id = scriptId;
    window.initMap = () => setMapLoaded(true);
    document.body.appendChild(script);
    // Clean up
    return () => { delete window.initMap; };
  }, []);

  // Reference to the map DOM
  const mapRef = React.useRef();

  useEffect(() => {
    if (!mapLoaded || !window.google || !mapRef.current) return;
    // Create the map
    // Custom dark theme for Google Maps
    const map = new window.google.maps.Map(mapRef.current, {
      center: CHENNAI_CENTER,
      zoom: 12.6,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#232436" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2d" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#a9aacb" }] },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#3c3b59" }]
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#47476b" }]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#282c3e" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#1c314a" }]
        }
      ],
      disableDefaultUI: true,
      zoomControl: true,
      streetViewControl: false
    });

    // Mark all pharmacies
    chennaiPharmacies.forEach(ph => {
      new window.google.maps.Marker({
        position: { lat: ph.lat, lng: ph.lng },
        map,
        title: ph.name,
        icon: {
          // Pinkish (primary color) marker dot for pharmacy
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: COLORS.primary,
          fillOpacity: 0.95,
          strokeWeight: 2,
          strokeColor: COLORS.accent
        },
        label: {
          text: "💊",
          fontSize: "18px",
          color: COLORS.primary
        }
      });
    });
  }, [mapLoaded]);

  return (
    <div style={{
      background: COLORS.card,
      borderRadius: 12,
      padding: 24,
      boxShadow:'0 2px 8px rgba(0,0,0,0.13)'
    }}>
      <h2 style={{color:COLORS.secondary,margin:'0 0 8px'}}>Chennai Pharmacy Map</h2>
      <div style={{
        marginBottom: 12,
        color: COLORS.subtle,
        fontSize: 15
      }}>Find all notable pharmacies mapped across Chennai. Map style &pins use MediLocate color palette.</div>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          maxWidth: 600,
          height: 310,
          margin: "0 auto 16px",
          borderRadius: 12,
          overflow: "hidden",
          background: "#191932",
          boxShadow: "0 1px 3px rgba(174,76,105,0.10)"
        }}
      >
        {/* Google Map injected here */}
        {!mapLoaded && (
          <div style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.accent,
            background: "#242546"
          }}>
            Loading Google Map...
          </div>
        )}
      </div>
      <div style={{
        fontWeight: 500, color: COLORS.primary, marginBottom: 8
      }}>
        Pharmacies in Chennai:
      </div>
      <ul style={{listStyle:'none',padding:0,margin:0}}>
        {chennaiPharmacies.map((ph, idx) => (
          <li key={idx} style={{
            background: COLORS.background,
            borderLeft:`4px solid ${COLORS.accent}`,
            padding:'11px 9px',borderRadius:6,
            margin:'0 0 10px',fontWeight:430,fontSize:15,display:'flex',alignItems:'center',gap:10
          }}>
            <span style={{fontSize:18,color:COLORS.accent}}>💊</span>
            <span>
              <strong>{ph.name}</strong>
              <span style={{
                display:'block',
                fontSize:13,
                color:COLORS.subtle,
                marginTop:2
              }}>
                ({ph.lat.toFixed(4)}, {ph.lng.toFixed(4)})
              </span>
            </span>
          </li>
        ))}
      </ul>
      <div style={{marginTop:12, fontSize:12, color:COLORS.subtle}}>
        (For best experience, use production Google Maps API key. 
        Pharmacy data is for illustration; real app would pull live data.)
      </div>
    </div>
  );
}

// -------- MAIN CONTAINER --------------

function MainContainer() {
  return (
    <div style={{
      minHeight:"100vh", background:COLORS.background, color: COLORS.text, paddingBottom:28
    }}>
      {/* Navigation Bar */}
      <nav style={{
        background: "#161722", color:COLORS.text,
        padding: "21px 0 10px", marginBottom:30,
        borderBottom:`2.5px solid ${COLORS.primary}`,
        position:"sticky",top:0,zIndex:99
      }}>
        <div style={{
          maxWidth:960, margin:"0 auto", padding: "0 28px",
          display:'flex',alignItems:'center',justifyContent:'space-between'
        }}>
          <span style={{
            fontWeight:800,fontSize:22,letterSpacing:'-1.5px',color:COLORS.primary,
            display:'flex',alignItems:'center',gap:7
          }}>
            <span style={{fontSize:28,color:COLORS.accent}}>💊</span> MediLocate
          </span>
          <span style={{
            fontSize:13, color:COLORS.text, background:COLORS.secondary, padding:'5px 16px',
            borderRadius:16, fontWeight:600
          }}>Dark Mode</span>
        </div>
      </nav>
      {/* Main layout */}
      <main>
        <div style={{
          maxWidth: 960, margin: "0 auto", padding: "0 28px"
        }}>
          <div style={{
            display:'grid',
            gridTemplateColumns:'1fr 1fr',
            gap:36,
            alignItems:'flex-start'
          }}>
            <div>
              {/* Medicine Reminder System */}
              <MedicineReminderSystem />
            </div>
            <div>
              {/* Nearby Pharmacy Locator */}
              <PharmacyLocator />
            </div>
          </div>
        </div>
      </main>
      <footer style={{
        textAlign: "center", color: COLORS.subtle, fontSize: 14, marginTop:40, padding: "10px 0"
      }}>
        &copy; {new Date().getFullYear()} MediLocate. For demo use only. | Design by KAVIA
      </footer>
    </div>
  );
}

export default MainContainer;
