import React from 'react';
import './App.css';
import MainContainer from './MainContainer';
import WelcomePage from './WelcomePage';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// PUBLIC_INTERFACE
function App() {
  // App-level routing: welcome page + home (main container)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<MainContainer />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;