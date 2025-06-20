import React from 'react';

// PUBLIC_INTERFACE
/**
 * Calendar page: Displays week-view with mock medicine schedule.
 * Entries indicate time of day and meal context using colorful badges.
 * Adheres to dark color scheme.
 */
function Calendar() {
  // Mock schedule for the week
  const mockData = [
    {
      day: "Mon",
      entries: [
        { name: "Paracetamol", time: "Morning", meal: "Before meal", color: "#ff8c00" },
        { name: "Atorvastatin", time: "Night", meal: "After meal", color: "#bb66ff" }
      ]
    },
    {
      day: "Tue",
      entries: [
        { name: "Metformin", time: "Morning", meal: "After meal", color: "#21beda" }
      ]
    },
    {
      day: "Wed",
      entries: [
        { name: "Metformin", time: "Morning", meal: "After meal", color: "#21beda" },
        { name: "Paracetamol", time: "Night", meal: "Before meal", color: "#ff8c00" }
      ]
    },
    {
      day: "Thu",
      entries: []
    },
    {
      day: "Fri",
      entries: [
        { name: "Atorvastatin", time: "Night", meal: "After meal", color: "#bb66ff" }
      ]
    },
    {
      day: "Sat",
      entries: [
        { name: "Paracetamol", time: "Morning", meal: "Before meal", color: "#ff8c00" },
        { name: "Metformin", time: "Night", meal: "After meal", color: "#21beda" }
      ]
    },
    {
      day: "Sun",
      entries: [
        { name: "Atorvastatin", time: "Night", meal: "After meal", color: "#bb66ff" }
      ]
    },
  ];
  const badgeColor = (time) => {
    if (time === 'Morning') return "#4ecfff";
    if (time === 'Afternoon') return "#ffd23a";
    if (time === 'Night') return "#bb66ff";
    return "#ccc";
  };
  const mealBadge = (meal) => ({
    "Before meal": "#13d48d",
    "After meal": "#fd576b"
  }[meal] || "#aaa");

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "54px 20px 18px" }}>
      <h2 style={{ color: "var(--base-light)", marginBottom: 8, marginLeft: 4 }}>Calendar</h2>
      <div style={{ color: "var(--text-secondary)", marginBottom: 24, fontSize: 16 }}>
        Week view: Each medicine entry is labeled by time of day and meal context, with badges. (Mock data shown)
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "14px",
        background: "rgba(20,20,50,0.04)",
        padding: "14px",
        borderRadius: "10px",
        border: "1px solid var(--border-color)",
        minHeight: 280,
        overflowX: "auto"
      }}>
        {mockData.map(({ day, entries }) => (
          <div key={day} style={{
            background: "var(--base-dark)",
            border: "1.5px solid var(--border-color)",
            borderRadius: 8,
            padding: "13px 9px",
            minHeight: 110,
            flex: 1,
            color: "var(--text-color)",
            boxShadow: "0 2px 5px rgba(20,20,50,0.07)"
          }}>
            <div style={{
              color: "var(--base-light)",
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 6,
              textAlign: "center"
            }}>{day}</div>
            {entries.length === 0 ? (
              <div style={{ color: "var(--text-secondary)", fontSize: 13, textAlign: "center", marginTop: 21 }}>--</div>
            ) : (
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 9
              }}>
                {entries.map((e, idx) => (
                  <li key={idx} style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1.5px solid " + e.color,
                    borderRadius: 6,
                    padding: "7px 7px 8px",
                    marginBottom: 0,
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    justifyContent: "space-between"
                  }}>
                    <div style={{ display: 'flex', alignItems: "center", gap: 6 }}>
                      <span role="img" aria-label="pill" style={{ fontSize: 17, color: e.color }}>💊</span> <span>{e.name}</span>
                    </div>
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <span style={{
                        background: badgeColor(e.time),
                        color: "#1a1a1a",
                        borderRadius: 9,
                        fontSize: 13,
                        padding: "1.5px 7px",
                        fontWeight: 600,
                        minWidth: 57,
                        textAlign: "center"
                      }}>{e.time}</span>
                      <span style={{
                        background: mealBadge(e.meal),
                        color: "#fff",
                        borderRadius: 9,
                        fontSize: 13,
                        padding: "1.5px 7px",
                        fontWeight: 600,
                        minWidth: 65,
                        textAlign: "center"
                      }}>{e.meal}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
