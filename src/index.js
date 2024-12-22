import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './Pages/Home/Home';
import Nav from './GlobalComponents/Navigation/Nav';
import EnergyStatistics from './Pages/Energy-use-and-management/EnergyStatistics';
import AccountAndBilling from './Pages/Account-and-billing/AccountAndBilling';
import Contact from './Pages/Contact-and-Communication/Contact';
import Tail from './GlobalComponents/Tail/Tail';
import { UserContextProvider } from './GlobalComponents/Context/UserContextProvider';
import Registration from './Pages/Registration/Registration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/EnergyStatistics" element={<EnergyStatistics />}/>
          <Route path="/Account" element={<AccountAndBilling />}/>
          <Route path="/Contact" element={<Contact />}/>
          <Route path='/UserRegistration' element={<Registration/>}/>
        </Routes>    
      </BrowserRouter>
      <Tail />      
    </UserContextProvider>
  </React.StrictMode>
);