import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import MainContainer from './MainContainer';
import AddMedicine from './AddMedicine';
import Calendar from './Calendar';

// PUBLIC_INTERFACE
function App() {
  // Layout: Navbar always visible, then routed content under it
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{
        paddingTop: 68 // offset for fixed navbar
      }}>
        <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route path="/add-medicine" element={<AddMedicine />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;