import React from "react";

// PUBLIC_INTERFACE
/**
 * PharmaciesChennai: Lists major Chennai areas and their nearest pharmacies with dial buttons.
 * Uses mock data. Styled for MediLocate dark theme.
 */
const mockData = [
  {
    area: "Adyar",
    pharmacies: [
      { name: "Apollo Pharmacy", phone: "04424455510" },
      { name: "MedPlus Adyar", phone: "04424617700" },
    ],
  },
  {
    area: "Anna Nagar",
    pharmacies: [
      { name: "Guardian Pharmacy", phone: "04426202233" },
      { name: "Sri Lakshmi Medicals", phone: "04442610234" },
    ],
  },
  {
    area: "T. Nagar",
    pharmacies: [
      { name: "Apollo Pharmacy", phone: "04424344300" },
      { name: "Vivek Medicals", phone: "04424325001" },
    ],
  },
  {
    area: "Velachery",
    pharmacies: [
      { name: "MedPlus Velachery", phone: "04422433345" },
      { name: "Arogya Pharmacy", phone: "04422581109" },
    ],
  },
];

const COLORS = {
  area: "var(--base-light)",
  card: "var(--base-dark)",
  text: "var(--text-color)",
  secondary: "var(--text-secondary)",
  border: "var(--border-color)",
};

function PharmaciesChennai() {
  return (
    <div style={{
      maxWidth: 780,
      margin: "0 auto",
      padding: "54px 14px 32px",
      color: COLORS.text
    }}>
      <h2 style={{
        color: COLORS.area,
        marginBottom: 10,
        marginLeft: 2
      }}>Pharmacies in Chennai</h2>
      <div style={{
        color: COLORS.secondary,
        fontSize: 16,
        marginBottom: 24
      }}>
        Select your area to view the nearest pharmacies. Click 'Dial' to call the pharmacy directly.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {mockData.map(({ area, pharmacies }) => (
          <section key={area} style={{
            background: COLORS.card,
            borderRadius: 10,
            padding: "18px 16px",
            border: `1.5px solid ${COLORS.border}`,
            boxShadow: "0 2px 8px rgba(20,30,80,0.08)"
          }}>
            <div style={{
              color: COLORS.area,
              fontWeight: 700,
              fontSize: 21,
              marginBottom: 10
            }}>
              <span style={{ fontSize: 22 }}>📍</span> {area}
            </div>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16
            }}>
              {pharmacies.map((ph, idx) => (
                <li key={ph.name + ph.phone} style={{
                  background: "rgba(220,255,255,0.03)",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: "11px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8
                }}>
                  <div>
                    <div style={{
                      color: COLORS.text,
                      fontWeight: 520,
                      fontSize: 17
                    }}>{ph.name}</div>
                    <div style={{
                      fontSize: 15,
                      color: COLORS.secondary,
                      marginTop: 2
                    }}>
                      ☎️ {ph.phone}
                    </div>
                  </div>
                  <a
                    href={`tel:${ph.phone}`}
                    style={{
                      background: "var(--base-light)",
                      color: "#09174b",
                      border: "none",
                      borderRadius: 6,
                      fontWeight: 600,
                      fontSize: 15,
                      textDecoration: "none",
                      padding: "8px 20px",
                      transition: "background 0.15s",
                      display: "inline-block"
                    }}
                  >
                    Dial
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export default PharmaciesChennai;
