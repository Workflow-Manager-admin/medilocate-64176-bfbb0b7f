import React from "react";
import Navbar from "./Navbar";

// PUBLIC_INTERFACE
/**
 * CalendarScreen: Shows calendar of medicine schedule & refill dates, with medicine list per day.
 */
function CalendarScreen() {
  // Mock medicines
  // Each entry has: name, dosage, daysOfWeek (array), timing (morning/afternoon/night), mealTiming ("before"/"after"), startDate (ISO string), endDate (ISO string)
  const mockMedicines = [
    {
      name: "Metformin",
      dosage: "500mg",
      timings: [
        { period: "morning", mealTiming: "after" },
        { period: "night", mealTiming: "before" }
      ],
      daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      startDate: "2024-06-01",
      endDate: "2024-06-30"
    },
    {
      name: "Amoxicillin",
      dosage: "250mg",
      timings: [
        { period: "afternoon", mealTiming: "after" }
      ],
      daysOfWeek: ["Mon", "Wed", "Fri"],
      startDate: "2024-06-10",
      endDate: "2024-06-20"
    },
    {
      name: "Atorvastatin",
      dosage: "20mg",
      timings: [
        { period: "night", mealTiming: "after" }
      ],
      daysOfWeek: ["Tue", "Thu", "Sat"],
      startDate: "2024-06-01",
      endDate: "2024-06-18"
    }
  ];

  // Calendar utilities
  const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();

  // Show current month
  const month = today.getMonth(); // 0-based
  const year = today.getFullYear();

  // Get first day of month (0:Sun)
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Build calendar grid: previous month's last days if current month doesn't start on Sun
  const numDaysInMonth = lastDayOfMonth.getDate();
  const firstDayIdx = firstDayOfMonth.getDay();
  const totalCells = Math.ceil((numDaysInMonth + firstDayIdx) / 7) * 7;

  function getISODate(yyyy, mm, dd) {
    // mm: 0-based JS month, dd: 1-based
    return `${yyyy}-${String(mm + 1).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
  }

  function getPeriodDisplay(period) {
    if (period === "morning") return "🌅 Morning";
    if (period === "afternoon") return "🌤️ Afternoon";
    if (period === "night") return "🌙 Night";
    return period;
  }

  function getMealDisplay(mealTiming) {
    return mealTiming === "before" ? "Before Meal" : "After Meal";
  }

  /**
   * Find which medicines (and timings) should be taken on date
   * @param {Date} dateObj
   * @returns array of { name, dosage, period, mealTiming }
   */
  function medicinesForDate(dateObj) {
    const isoDate = dateObj.toISOString().split("T")[0];
    const weekDay = WEEK_DAYS[dateObj.getDay()];
    return mockMedicines
      .filter(med => {
        const isInDateRange =
          isoDate >= med.startDate && isoDate <= med.endDate;
        const isCorrectDay = med.daysOfWeek.includes(weekDay);
        return isInDateRange && isCorrectDay;
      })
      .flatMap(med =>
        med.timings.map(timing => ({
          name: med.name,
          dosage: med.dosage,
          period: timing.period,
          mealTiming: timing.mealTiming
        }))
      );
  }

  // Generate calendar cells
  const calendarCells = [];
  for (let cellIdx = 0; cellIdx < totalCells; ++cellIdx) {
    const dayNum = cellIdx - firstDayIdx + 1;
    let cellDate = null;
    let isThisMonth = false;
    if (dayNum > 0 && dayNum <= numDaysInMonth) {
      cellDate = new Date(year, month, dayNum);
      isThisMonth = true;
    } else {
      // Out of month (prev or next), leave cell blank for grid look
      cellDate = null;
      isThisMonth = false;
    }
    calendarCells.push({
      cellDate,
      isThisMonth,
      cellIdx
    });
  }

  // UI Styles
  const calendarStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "0.5rem",
    background: "#222333",
    padding: "18px 8px 8px 8px",
    borderRadius: "10px",
    minHeight: 410,
    boxShadow: "0 1px 4px rgba(82,47,244,0.08)",
    marginTop: 12
  };
  const dayHeaderStyle = {
    textAlign: "center",
    fontWeight: 700,
    color: "#bc1ff4",
    padding: "2px 0 8px 0",
    letterSpacing: ".5px"
  };

  const dateCellStyle = (isThisMonth, isToday) => ({
    background: isThisMonth ? "#282944" : "transparent",
    borderRadius: "7px",
    minHeight: 75,
    padding: "5px 6px 4px 6px",
    border: isToday ? "1.8px solid #ae4c69" : "1.2px solid #232345",
    boxShadow: isToday ? "0 0 10px #ae4c69bb" : "none",
    color: "#fff",
    fontSize: 15,
    position: "relative",
    outline: isToday ? "2px solid #ae4c6944" : "none",
    transition: "box-shadow .13s"
  });

  const medPillStyle = {
    background: "#bc1ff4",
    color: "#29223b",
    borderRadius: "6px",
    padding: "2px 6px",
    marginBottom: 2,
    fontSize: 14,
    fontWeight: 600,
    boxShadow: "0 2px 6px rgba(174,76,225,0.14)"
  };

  const medTimingStyle = {
    background: "#222238",
    color: "#ae4c69",
    borderRadius: "4px",
    fontSize: 13,
    fontWeight: 600,
    padding: "0 5px",
    marginTop: "3px",
    marginBottom: "2px",
    display: "inline-block"
  };

  const mealInstrStyle = {
    fontSize: 12,
    color: "#bbbbbb",
    marginLeft: 2
  };

  // Get today's date string to highlight
  const todayISO = today.toISOString().split("T")[0];

  // Month/Year title
  const monthName = today.toLocaleString("default", { month: "long" });

  return (
    <div className="app" style={{ background: "#1c1d23", minHeight: "100vh" }}>
      <Navbar selected="calendar" />
      <div style={{ maxWidth: 990, margin: "0 auto", padding: "34px 18px 36px", color: "#fff" }}>
        <h2 style={{ color: "#052fff", marginTop: 0 }}>
          Medicine & Refill Calendar
        </h2>
        <div style={{ fontSize: 17, color: "#bbbbbb", marginBottom: 19, marginTop: 2 }}>
          View your scheduled medicines by day. Each entry shows timing and meal instructions.
        </div>

        {/* Month and navigation header (static for this mock) */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 7
        }}>
          <span style={{
            fontWeight: 700,
            color: "#bc1ff4",
            fontSize: 21,
            letterSpacing: ".4px"
          }}>
            {monthName} {year}
          </span>
        </div>
        <div style={{ ...calendarStyle }}>
          {/* Render day headers */}
          {WEEK_DAYS.map(weekday => (
            <div key={weekday} style={dayHeaderStyle}>{weekday}</div>
          ))}
          {/* Render calendar days (cells) */}
          {calendarCells.map(({ cellDate, isThisMonth, cellIdx }) => {
            if (!cellDate) return (
              <div key={cellIdx} />
            );

            const isoCell = cellDate.toISOString().split("T")[0];
            const isToday = isoCell === todayISO;
            const medicines = medicinesForDate(cellDate);

            return (
              <div
                key={cellIdx}
                style={dateCellStyle(isThisMonth, isToday)}
              >
                {/* Date number */}
                <div style={{
                  textAlign: "right",
                  fontWeight: 800,
                  color: isToday ? "#ae4c69" : "#bbb",
                  fontSize: 16,
                  position: "absolute",
                  top: 7,
                  right: 9
                }}>
                  {cellDate.getDate()}
                </div>
                {/* Medicines (show up to 3 for brevity) */}
                <div style={{ marginTop: 22, paddingRight: 2 }}>
                  {medicines.length === 0 ? (
                    <span style={{
                      fontSize: 12,
                      color: "#666",
                      fontStyle: "italic"
                    }} />
                  ) : medicines.slice(0, 4).map((med, idx) => (
                    <div key={idx} style={{ marginBottom: 2 }}>
                      <span style={medPillStyle}>{med.name}</span>
                      <span style={{ fontSize: 13, color: "#bbbbbb", fontWeight: 500, marginLeft: 4 }}>
                        ({med.dosage})
                      </span>
                      <div style={medTimingStyle}>{getPeriodDisplay(med.period)}</div>
                      <span style={mealInstrStyle}>{getMealDisplay(med.mealTiming)}</span>
                    </div>
                  ))}
                  {/* Show ... if there are many */}
                  {medicines.length > 4 && (
                    <div style={{ fontSize: 12, color: "#bbb", marginTop: 2 }}>+{medicines.length - 4} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Weekly summary section */}
        <div style={{
          background: "#232345",
          borderRadius: 11,
          marginTop: 32,
          boxShadow: "0 2px 8px #bc1ff413",
          padding: "20px 9px 13px 9px",
        }}>
          <div style={{
            fontSize: 18,
            color: "#bc1ff4",
            fontWeight: 700,
            marginBottom: 8,
            textAlign: "center",
            letterSpacing: "0.5px"
          }}>Weekly Medicine Summary</div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "8px",
            marginTop: 9,
            marginBottom: 7,
            minHeight: 100,
          }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((weekday, widx) => {
              // Find the soonest date for each day in the current week (Mon-Sun, current week)
              // Get this week's Monday
              const curr = new Date();
              const day = curr.getDay(); // 0-Sun, 1-Mon
              const weekDayIdx = (widx + 1) % 7;
              const monday = new Date(curr);
              monday.setDate(curr.getDate() - ((day + 6) % 7));
              // Week dates
              const summaryDate = new Date(monday);
              summaryDate.setDate(monday.getDate() + widx);
              const isToday = summaryDate.toISOString().split("T")[0] === todayISO;
              // Get medicine list for this summaryDate
              const meds = medicinesForDate(summaryDate);

              return (
                <div key={weekday}
                  style={{
                    background: isToday ? "#36377A" : "#282944",
                    borderRadius: 8,
                    border: isToday ? "2.5px solid #ae4c69" : "1.2px solid #232345",
                    padding: "9px 6px 7px 6px",
                    minHeight: 82,
                    boxShadow: isToday ? "0 0 8px #ae4c6970" : "none",
                    color: "#fff"
                  }}>
                  <div style={{
                    fontWeight: 700,
                    color: isToday ? "#ae4c69" : "#bc1ff4",
                    textAlign: "center",
                    marginBottom: 1
                  }}>{weekday}
                    {isToday && <span style={{
                      marginLeft: 5,
                      color: "#bc1ff4",
                      fontSize: 15
                    }}>•</span>}
                  </div>
                  {meds.length === 0 ? (
                    <div style={{
                      fontSize: 12,
                      color: "#7d7d8d",
                      textAlign: "center",
                      marginTop: 7,
                      fontStyle: "italic"
                    }}>
                      None
                    </div>
                  ) : meds.map((med, midx) => (
                    <div key={midx} style={{
                      margin: "4px 0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}>
                      <span style={{
                        ...medPillStyle,
                        color: "#1c1d23",
                        padding: "2px 9px",
                        fontWeight: 700,
                        marginBottom: 1,
                        background: "#fff"
                      }}>{med.name}</span>
                      <span style={{
                        fontSize: 13,
                        color: "#bbbbbb",
                        fontWeight: 500,
                        marginBottom: 1
                      }}>
                        ({med.dosage})
                      </span>
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ ...medTimingStyle, fontSize: 17 }}>{med.period === "morning" ? "🌅" : med.period === "afternoon" ? "🌤️" : med.period === "night" ? "🌙" : ""}</span>
                        <span style={{
                          ...mealInstrStyle,
                          marginLeft: 4,
                          marginRight: 3,
                          color: med.mealTiming === "before" ? "#e87a41" : "#3fc16b",
                          fontWeight: 500
                        }}>{med.mealTiming === "before" ? "⏱️ Before" : "🍽️ After"}</span>
                      </span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          {/* Legend summary for weekly */}
          <div style={{ color: "#bbb", fontSize: 14, textAlign: "center" }}>
            <span style={medTimingStyle}>🌅</span> Morning
            <span style={{ margin: "0 9px" }}></span>
            <span style={medTimingStyle}>🌤️</span> Afternoon
            <span style={{ margin: "0 9px" }}></span>
            <span style={medTimingStyle}>🌙</span> Night
            <span style={{ margin: "0 12px" }}></span>
            <span style={{ color: "#e87a41", fontWeight: 600 }}>⏱️ Before</span> = Before Meal
            <span style={{ margin: "0 7px" }}></span>
            <span style={{ color: "#3fc16b", fontWeight: 600 }}>🍽️ After</span> = After Meal
          </div>
        </div>
        <div style={{ color: "#bbb", marginTop: 17, fontSize: 14 }}>
          {/* Legend */}
          <span style={{ marginRight: 14 }}><span style={medPillStyle}>Metformin</span> = Medicine name</span>
          <span style={medTimingStyle}>🌅</span> = Morning, <span style={medTimingStyle}>🌤️</span> = Afternoon, <span style={medTimingStyle}>🌙</span> = Night
        </div>
      </div>
    </div>
  );
}

export default CalendarScreen;
