import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContainer from './MainContainer';
import LandingPage from './LandingPage';
import CalendarScreen from './CalendarScreen';
import ChennaiPharmaciesScreen from './ChennaiPharmaciesScreen';
import AddMedicineScreen from './AddMedicineScreen';

// PUBLIC_INTERFACE
function App() {
  // Primary app routes: landing, home, calendar, add medicine, area pharmacies
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<MainContainer />} />
        <Route path="/calendar" element={<CalendarScreen />} />
        <Route path="/add-medicine" element={<AddMedicineScreen />} />
        <Route path="/chennai-pharmacies" element={<ChennaiPharmaciesScreen />} />
      </Routes>
    </Router>
  );
}

export default App;