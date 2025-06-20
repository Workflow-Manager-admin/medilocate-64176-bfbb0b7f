import React from 'react';

// PUBLIC_INTERFACE
/**
 * Placeholder page/component for adding medicine details.
 */
function AddMedicine() {
  return (
    <div style={{
      margin: "0 auto",
      padding: "54px 16px 0",
      maxWidth: 540,
      color: "var(--text-color)",
      background: "var(--base-dark)",
      minHeight: "60vh"
    }}>
      <h2 style={{ color: "var(--base-light)", marginBottom: 10 }}>Add Medicine</h2>
      <div style={{
        fontSize: 16,
        color: "var(--text-secondary)",
        marginBottom: 24
      }}>This is a placeholder for the Add Medicine form. (Coming soon!)</div>
      <form style={{
        background: "rgba(255,255,255,0.01)",
        border: "1px solid var(--border-color)",
        borderRadius: 9,
        padding: "28px 22px",
        width: "100%",
        maxWidth: 420,
        margin: "0 auto"
      }}>
        <fieldset disabled style={{ border: 0, margin: 0, padding: 0 }}>
          <div style={{ marginBottom: 13 }}>
            <label style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Medicine Name</label>
            <input type="text" style={{
              width: "100%", background: "var(--base-dark)", color: "#ccc",
              border: "1px solid var(--border-color)", borderRadius: 4, padding: 7, marginTop: 4
            }} placeholder="e.g. Metformin" />
          </div>
          <div style={{ marginBottom: 13 }}>
            <label style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Schedule</label>
            <input type="text" style={{
              width: "100%", background: "var(--base-dark)", color: "#ccc",
              border: "1px solid var(--border-color)", borderRadius: 4, padding: 7, marginTop: 4
            }} placeholder="e.g. Mon, Wed, Fri" />
          </div>
          <div style={{ marginBottom: 13 }}>
            <label style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Time of Day</label>
            <input type="text" style={{
              width: "100%", background: "var(--base-dark)", color: "#ccc",
              border: "1px solid var(--border-color)", borderRadius: 4, padding: 7, marginTop: 4
            }} placeholder="e.g. Morning" />
          </div>
          <div style={{ marginBottom: 13 }}>
            <label style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Meal Context</label>
            <input type="text" style={{
              width: "100%", background: "var(--base-dark)", color: "#ccc",
              border: "1px solid var(--border-color)", borderRadius: 4, padding: 7, marginTop: 4
            }} placeholder="e.g. Before meal" />
          </div>
          <button style={{
            width: "100%",
            background: "var(--base-light)",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            padding: "10px 0",
            fontWeight: 600,
            fontSize: 17,
            marginTop: 8
          }}>Save (Coming Soon)</button>
        </fieldset>
      </form>
    </div>
  );
}

export default AddMedicine;
