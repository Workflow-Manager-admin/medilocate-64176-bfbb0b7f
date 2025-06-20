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
