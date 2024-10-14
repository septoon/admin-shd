import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WebApp from '@twa-dev/sdk';
import { Link, Route, Routes } from 'react-router-dom';

import Menu from './components/Menu/Menu';
import Contacts from './components/Contacts/Contacts';
import Delivery from './components/Delivery/Delivery';
import Vacancies from './components/Vacancies/Vacancies';
import Main from './components/Main/Main';


function App() {
  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, []);

  const linkClassName = 'w-[80%] h-20 flex justify-start pl-5 items-center mb-5 bg-silver dark:bg-darkGray rounded-lg';

  return (
    <div className="p-2 w-full h-full flex flex-col justify-start items-center bg-gray-100 min-h-screen">
      <ToastContainer />
      
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/vacancies" element={<Vacancies />} />
      </Routes>
    </div>
  );
}

export default App;