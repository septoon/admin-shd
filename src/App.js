import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';

import Menu from './components/Menu/Menu';
import Contacts from './components/Contacts/Contacts';
import Delivery from './components/Delivery/Delivery';
import Available from './components/Available/Available';
import Main from './components/Main/Main';

function App() {
  
  return (
    <div
      className="p-2 w-full h-full flex flex-col justify-start items-center bg-gray-100 min-h-screen overflow-hidden"
    >
      <ToastContainer />
      <Routes>
        <Route exact path="/admin-shd" element={<Main />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/available" element={<Available />} />
      </Routes>
    </div>
  );
}

export default App;