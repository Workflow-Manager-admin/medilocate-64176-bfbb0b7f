import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContainer from './MainContainer';
import LandingPage from './LandingPage';
import CalendarScreen from './CalendarScreen';
import ChennaiPharmaciesScreen from './ChennaiPharmaciesScreen';

// PUBLIC_INTERFACE
function App() {
  // Primary app routes: landing, home, calendar, area pharmacies
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<MainContainer />} />
        <Route path="/calendar" element={<CalendarScreen />} />
        <Route path="/chennai-pharmacies" element={<ChennaiPharmaciesScreen />} />
      </Routes>
    </Router>
  );
}

export default App;