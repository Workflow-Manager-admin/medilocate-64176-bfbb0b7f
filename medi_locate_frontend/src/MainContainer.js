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

/**
 * MedicineReminderSystem: Enhanced to show an extended sample list of tablets scheduled throughout the day.
 * Now supports a realistic day schedule for demo purposes.
 */
// PUBLIC_INTERFACE
function MedicineReminderSystem() {
  // Extended sample medicines for today
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
    },
    {
      id: 3,
      name: "Aspirin",
      dosage: "75mg",
      time: "07:30",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      records: { [todayStr()]: false }
    },
    {
      id: 4,
      name: "Thyroxine",
      dosage: "50mcg",
      time: "06:30",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      records: { [todayStr()]: false }
    },
    {
      id: 5,
      name: "Losartan",
      dosage: "25mg",
      time: "09:00",
      days: ["Mon", "Thu", "Sat", "Sun"],
      records: { [todayStr()]: false }
    },
    {
      id: 6,
      name: "Omeprazole",
      dosage: "20mg",
      time: "19:00",
      days: ["Mon", "Tue", "Fri", "Sun"],
      records: { [todayStr()]: false }
    },
    {
      id: 7,
      name: "Amoxicillin",
      dosage: "500mg",
      time: "13:00",
      days: ["Mon", "Tue", "Wed"],
      records: { [todayStr()]: false }
    },
    {
      id: 8,
      name: "Vitamin D3",
      dosage: "1000IU",
      time: "10:30",
      days: ["Mon", "Thu"],
      records: { [todayStr()]: false }
    },
    {
      id: 9,
      name: "Calcium",
      dosage: "600mg",
      time: "15:00",
      days: ["Mon", "Wed", "Fri"],
      records: { [todayStr()]: false }
    },
    {
      id: 10,
      name: "Paracetamol",
      dosage: "500mg",
      time: "12:00",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      records: { [todayStr()]: false }
    },
    {
      id: 11,
      name: "Cetirizine",
      dosage: "10mg",
      time: "21:15",
      days: ["Mon", "Tue", "Thu", "Sat"],
      records: { [todayStr()]: false }
    },
    {
      id: 12,
      name: "Clopidogrel",
      dosage: "75mg",
      time: "18:30",
      days: ["Mon", "Tue", "Fri"],
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


/* 
 * PUBLIC_INTERFACE
 * PharmacyLocatorWithAddress: Google Maps + Address Bar + Dynamic Pharmacy search.
 * User can enter an address (city/country allowed), geocode it, and see pharmacies near that point.
 * Pharmacies are currently filtered based on a local sample, but geocoded and dynamic map logic
 * paves the way for Google Places API integration.
 */
function PharmacyLocatorWithAddress() {
  // Demo pharmacies across Chennai
  const SAMPLE_PHARMACIES = [
    { name: "Apollo Pharmacy - Anna Salai", lat: 13.060422, lng: 80.249583 },
    { name: "Medplus - T Nagar", lat: 13.039799, lng: 80.233371 },
    { name: "Guardian Pharmacy - Velachery", lat: 12.971903, lng: 80.220772 },
    { name: "Apollo Pharmacy - Adyar", lat: 13.006935, lng: 80.257257 },
    { name: "Medplus - Vadapalani", lat: 13.049014, lng: 80.213894 },
    { name: "Trust Chemists - Nungambakkam", lat: 13.057974, lng: 80.242378 },
    { name: "Sanjeevani - Kilpauk", lat: 13.080460, lng: 80.247860 },
    { name: "Apollo Pharmacy - Perambur", lat: 13.118684, lng: 80.233890 }
  ];
  // Default at Chennai center
  const DEFAULT_CENTER = { lat: 13.0827, lng: 80.2707 };

  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [address, setAddress] = useState('');
  const [searching, setSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  // Start with empty, show only after search
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);

  // Track if address was searched (for UI logic)
  const [addressSearched, setAddressSearched] = useState(false);

  // --- Google Maps script loader: robust and idempotent ---
  // PUBLIC_INTERFACE
  /**
   * Loads the Google Maps JS API robustly, ensuring we don't double-load and that errors/timeouts
   * produce visible, actionable error messages.
   * Always calls cb() if successful load, or sets error UI state if failure.
   */
  function loadGoogleMapsScript(cb) {
    // Provide a clear error message in UI if API key is missing or dummy
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyDEMO-DEMO-KEY-CHANGEME";
    if (!apiKey || apiKey.indexOf("DEMO-KEY-CHANGEME") !== -1) {
      setErrorMsg("Google Maps API key is invalid or missing. Please specify a valid key in REACT_APP_GOOGLE_MAPS_API_KEY env var.");
      setMapLoaded(false);
      if (cb) cb(false);
      return;
    }
    const scriptId = 'google-maps-script';

    // If already loaded, use it
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      if (cb) cb(true);
      return;
    }

    // If script exists but not loaded yet
    let script = document.getElementById(scriptId);
    if (script) {
      // Attach cb to load event, set window.initMap fallback
      script.addEventListener('load', () => { setMapLoaded(true); if (cb) cb(true); }, { once: true });
      if (!window.initMap) window.initMap = () => { setMapLoaded(true); if (cb) cb(true); };
      // Attach error event
      script.addEventListener('error', () => {
        setErrorMsg("Google Maps script failed to load. Please check your internet connection and API key.");
        setMapLoaded(false);
        if (cb) cb(false);
      }, { once: true });
      return;
    }

    // Insert new script
    script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    // Success handler
    script.onload = () => { setMapLoaded(true); if (cb) cb(true); };
    // Defensive: maps API sometimes fails to call callback
    window.initMap = () => { setMapLoaded(true); if (cb) cb(true); };
    // Error handler
    script.onerror = () => {
      setErrorMsg("Google Maps failed to load. Check internet, ad blockers, or API key restrictions.");
      setMapLoaded(false);
      if (cb) cb(false);
    };
    // Timeout fallback (robust fallback in case neither onload nor onerror fire)
    setTimeout(() => {
      if (!window.google || !window.google.maps) {
        setErrorMsg("Google Maps loading timed out. Check your API key, network, or browser extensions.");
        setMapLoaded(false);
        if (cb) cb(false);
      }
    }, 10000);
    document.body.appendChild(script);
  }

  // Load Maps JS (just once, robustly)
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyDEMO-DEMO-KEY-CHANGEME";
    if (!apiKey || apiKey.indexOf("DEMO-KEY-CHANGEME") !== -1) {
      setErrorMsg("Google Maps API key is invalid or missing. Please specify a valid key in REACT_APP_GOOGLE_MAPS_API_KEY env var.");
      return;
    }
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }
    loadGoogleMapsScript(() => {
      setMapLoaded(true);
    });
    return () => { delete window.initMap; };
    // eslint-disable-next-line
  }, []);

  // Google Map ref
  const mapRef = React.useRef();

  // Save instance to avoid recreation on every change
  const mapInstance = React.useRef(null);
  const markersRef = React.useRef([]);

  // When map loads or center/filteredPharmacies update, draw map/markers
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyDEMO-DEMO-KEY-CHANGEME";
    if (!apiKey || apiKey.indexOf("DEMO-KEY-CHANGEME") !== -1) {
      return; // Do not try to draw if API key is invalid
    }
    if (!mapLoaded || !window.google || !mapRef.current) return;
    // If no map yet, create
    if (!mapInstance.current) {
      try {
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center, zoom: 13,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#232436" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2d" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#a9aacb" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#3c3b59" }] },
            { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#47476b" }] },
            { featureType: "poi", elementType: "geometry", stylers: [{ color: "#282c3e" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#1c314a" }] }
          ],
          disableDefaultUI: true, zoomControl: true, streetViewControl: false
        });
      } catch (e) {
        setErrorMsg("Google Maps could not be rendered. See browser console for details.");
      }
    }
    if (!mapInstance.current) return;
    // Recentering and re-populate markers
    mapInstance.current.setCenter(center);
    // Remove existing markers
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];
    // Add each marker
    filteredPharmacies.forEach(ph => {
      try {
        const marker = new window.google.maps.Marker({
          position: { lat: ph.lat, lng: ph.lng },
          map: mapInstance.current,
          title: ph.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: COLORS.primary,
            fillOpacity: 0.95,
            strokeWeight: 2,
            strokeColor: COLORS.accent
          },
          label: { text: "💊", fontSize: "18px", color: COLORS.primary }
        });
        markersRef.current.push(marker);
      } catch (e) {
        // Marker may error if map API failed. Ignore for now.
      }
    });
  }, [mapLoaded, center, filteredPharmacies]);

  // Handle address bar submit: geocode and recenter, show nearby pharmacies
  async function handleAddressSearch(e) {
    e.preventDefault();
    setSearching(true);
    setAddressSearched(true); // Mark as searched for UI logic
    setErrorMsg('');
    setFilteredPharmacies([]); // Reset listing before search
    // Use Google Maps Geocoding API
    try {
      const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyDEMO-DEMO-KEY-CHANGEME";
      if (!API_KEY || API_KEY.indexOf("DEMO-KEY-CHANGEME") !== -1) {
        setErrorMsg("Google Maps API key is invalid or missing. Set REACT_APP_GOOGLE_MAPS_API_KEY in environment.");
        setSearching(false);
        return;
      }
      const enc = encodeURIComponent(address.trim());
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${enc}&key=${API_KEY}`;
      const resp = await fetch(url);
      const data = await resp.json();
      if (data.status !== "OK" || !data.results.length) throw new Error("Address not found");
      const { lat, lng } = data.results[0].geometry.location;
      setCenter({ lat, lng });
      // Show only nearby pharmacies (within ~7km for this demo)
      function haversineDistance(lat1, lng1, lat2, lng2) {
        function deg2rad(deg) { return deg * (Math.PI / 180); }
        const R = 6371; // Earth km
        const dLat = deg2rad(lat2 - lat1);
        const dLng = deg2rad(lng2 - lng1);
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLng / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      }
      const found = SAMPLE_PHARMACIES
        .map(ph => ({
          ...ph,
          dist: haversineDistance(lat, lng, ph.lat, ph.lng)
        }))
        .filter(ph => ph.dist < 7)
        .sort((a, b) => a.dist - b.dist);
      setFilteredPharmacies(found);
    } catch (err) {
      setErrorMsg("Sorry, address not found. Please try again.");
      setFilteredPharmacies([]); // Clear if error
    }
    setSearching(false);
  }

  // Render address bar, map and dynamic markers
  return (
    <div style={{
      background: COLORS.card, borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.13)'
    }}>
      <h2 style={{color:COLORS.secondary,margin:'0 0 8px'}}>Pharmacy Map</h2>
      <form onSubmit={handleAddressSearch} style={{
        display: "flex", alignItems:"center", gap: 10, marginBottom: 10
      }}>
        <input
          type="text"
          value={address}
          placeholder="Enter your address (e.g., street, city, or area)"
          style={{
            flex: 1,
            border: `1px solid ${COLORS.secondary}`,
            borderRadius: 6,
            background: COLORS.background,
            color: COLORS.text,
            fontSize: 15,
            padding: "8px 13px",
            outline: "none",
            boxShadow: "inset 0 1px 3px rgba(40,90,210,0.05)"
          }}
          onChange={e => setAddress(e.target.value)}
          disabled={searching}
        />
        <button type="submit"
          style={{
            background: COLORS.primary, color: COLORS.text,
            border: "none", borderRadius: 6, padding: "8px 16px",
            fontWeight: 600, cursor: "pointer", fontSize: 15
          }}
          disabled={searching || !address.trim()}
        >
          {searching ? "Locating..." : "Search"}
        </button>
      </form>
      <div style={{ color: COLORS.accent, fontSize:13, minHeight:21, marginBottom:8 }}>
        {/* Error message (map or API) */}
        {errorMsg}
        {/* If Google Maps API not loaded and no error, show loader */}
        {!mapLoaded && !errorMsg && (
          <span>Loading Google Map...</span>
        )}
      </div>
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
          boxShadow: "0 1px 3px rgba(174,76,105,0.10)",
          position: "relative"
        }}
      >
        {/* Google Map injected here. If failed, overlay error */}
        {(!mapLoaded || errorMsg) && (
          <div style={{
            position: "absolute",
            top: 0, left: 0, width: "100%", height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: errorMsg ? "#ff5656" : COLORS.accent,
            background: "rgba(36,37,70,0.95)",
            zIndex: 20,
            fontSize: 16,
            fontWeight: 500,
            borderRadius: 12
          }}>
            {errorMsg
              ? <span>{errorMsg}</span>
              : "Loading Google Map..."
            }
          </div>
        )}
      </div>
      {addressSearched && (
        <>
          <div style={{
            fontWeight: 500, color: COLORS.primary, marginBottom: 8
          }}>
            {errorMsg
              ? "No known pharmacies found near this address."
              : (filteredPharmacies.length
                ? `Pharmacies near this address:`
                : `No known pharmacies found near this address.`)}
          </div>
          <ul style={{listStyle:'none',padding:0,margin:0}}>
            {filteredPharmacies.map((ph, idx) => (
              <li key={idx} style={{
                background: COLORS.background,
                borderLeft:`4px solid ${COLORS.accent}`,
                padding:'11px 9px',borderRadius:6,margin:'0 0 10px',
                fontWeight:430,fontSize:15,display:'flex',alignItems:'center',gap:10
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
                    {ph.dist!==undefined && typeof(ph.dist)==="number" ? (
                      <span style={{marginLeft:12, color:COLORS.primary, fontSize:12}}>
                        {ph.dist<1 ? `${(ph.dist*1000).toFixed(0)} m` : `${ph.dist.toFixed(1)} km`} away
                      </span>
                    ) : null}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <div style={{marginTop:12, fontSize:12, color:COLORS.subtle}}>
            Powered by Google Maps. Pharmacy data is for illustration; real app would pull live data from an API.
          </div>
        </>
      )}
    </div>
  );
}

// -------- MAIN CONTAINER --------------

function MainContainer() {
  // Real-time date and time state and effect
  const [now, setNow] = React.useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  // Format helpers
  function formatDateString(date) {
    // Example: Monday, 8 July 2024
    return date.toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
  }
  function format24HourTime(date) {
    return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second:"2-digit" });
  }

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
      {/* Date and Time Bar */}
      <div style={{
        maxWidth:960, margin:"0 auto", padding:"0 28px", marginBottom:22
      }}>
        <div style={{
          background: "linear-gradient(90deg, #303151 80%, #371a2b)", borderRadius: 12,
          display:"flex", flexDirection:"row", alignItems:"center",
          justifyContent: "center",
          gap:28,
          padding:"22px 0 8px 0",
          marginBottom: 8,
          boxShadow: '0 2px 5px rgba(0,0,0,0.19)'
        }}>
          <span style={{
            fontWeight:600, fontSize: 22, color: COLORS.secondary, letterSpacing: "0.2px"
          }}>
            {formatDateString(now)}
          </span>
          <span style={{
            marginLeft:18,
            fontSize: 21,
            fontFamily: "'Fira Mono', monospace",
            fontWeight: 500,
            color: COLORS.accent,
            background: "#1c1d25",
            borderRadius: 7,
            padding: "8px 19px",
            boxShadow: "0 1px 5px #34264a55"
          }}>
            {format24HourTime(now)}
          </span>
        </div>
      </div>
      {/* Main layout */}
      <main>
        <div style={{
          maxWidth: 960, margin: "0 auto", padding: "0 28px"
        }}>
          {/* Medicine Reminder Section */}
          <div style={{
            marginBottom: 36
          }}>
            <MedicineReminderSystem />
          </div>
          {/* Pharmacy Locator below Medicine Reminder */}
          <div style={{
            marginBottom: 36
          }}>
            <PharmacyLocatorWithAddress />
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
