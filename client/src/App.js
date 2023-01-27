import React, {useState, useEffect} from 'react';
import Home from './components/Navbar/Home.js';
import Cart from './components/Navbar/Cart.js';
import Contact from './components/Navbar/Contact.js';
import Footer from './components/Footer';
import Navbar from './components/pages/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
