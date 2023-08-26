import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import NavBar from './components/Navbar';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: 90,paddingBottom: 90, paddingInline: 40 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
