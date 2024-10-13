import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WebApp from '@twa-dev/sdk';
import { Link, Outlet } from 'react-router-dom';

import Menu from './assets/img/menu.png'
import Contacts from './assets/img/contacts.png'
import Delivery from './assets/img/delivery.png'
import Vacancy from './assets/img/vacancy.png'

function App() {

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, [])

  const linkClassName = 'w-[80%] h-20 flex justify-start pl-5 items-center mb-5 bg-silver dark:bg-darkGray rounded-lg';

  return (
    <div className="p-2 w-full h-full flex flex-col justify-start items-center bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-16">Админ панель</h1>

      <Link to="/menu" className={linkClassName}>
        <img src={Menu} className="h-5 mr-3" alt="kitchen" />
        <span className="dark:text-white">Меню</span>
      </Link>
      <Link to="/contacts" className={linkClassName}>
        <img src={Contacts} className="h-5 mr-3" alt="bar" />
        <span className="dark:text-white">Контакты</span>
      </Link>
      <Link to="/delivery" className={linkClassName}>
        <img src={Delivery} className="h-5 mr-3" alt="grill" />
        <span className="dark:text-white">Доставка</span>
      </Link>
      <Link to="/vacancies" className={linkClassName}>
        <img src={Vacancy} className="h-5 mr-3" alt="household" />
        <span className="dark:text-white">Вакансии</span>
      </Link>
      <Outlet />
    </div>
  );
}

export default App;
