import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './Pages/Home/Home';
import Nav from './GlobalComponents/Navigation/Nav';
import EnergyStatistics from './Pages/Energy-use-and-management/EnergyStatistics';
import AccountView from './Pages/Account-and-billing/AccountView';
import Contact from './Pages/Contact-and-Communication/Contact';
import Tail from './GlobalComponents/Tail/Tail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Nav />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/EnergyStatistics/:UserID" element={<EnergyStatistics />}/>
        <Route path="/Account/:UserID" element={<AccountView />}/>
        <Route path="/Contact" element={<Contact />}/>
      </Routes>    
    </BrowserRouter>
    <Tail />
  </React.StrictMode>
);