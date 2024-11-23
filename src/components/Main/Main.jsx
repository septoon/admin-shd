import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import menuIcon from '../../assets/img/menu.png';
import contactsIcon from '../../assets/img/contacts.png';
import deliveryIcon from '../../assets/img/delivery.png';
import availableIcon from '../../assets/img/isAvailable.png';
import { chatIds } from '../../common/access';
import './Main.css';

const Main = () => {
  const [animationClass, setAnimationClass] = useState('page-enter');
  const navigate = useNavigate();
  const userId = window.Telegram?.WebApp.initDataUnsafe.user.id;

  useEffect(() => {
    try {
      const WebApp = window.Telegram?.WebApp;
      if (!WebApp) {
        console.error('Telegram WebApp API недоступен.');
        return;
      }
      WebApp.ready();
      WebApp.expand();
      WebApp.requestFullscreen();
    } catch (error) {
      console.error('Ошибка при инициализации Telegram WebApp:', error);
    }
    setAnimationClass('page-enter-active');
  }, []);

  const handleNavigation = (path) => {
    setAnimationClass('page-exit-active');

    setTimeout(() => {
      navigate(path);
    }, 200);
  };

  return (
    <div className={`page ${animationClass}`}>
      {chatIds.includes(userId) ? (
        <>
          <div
            onClick={() => handleNavigation('/menu')}
            className="w-[80%] h-20 flex justify-start pl-5 items-center mb-5 bg-silver dark:bg-darkGray rounded-lg cursor-pointer"
          >
            <img src={menuIcon} className="h-5 mr-3" alt="menu" />
            <span className="dark:text-white">Меню</span>
          </div>
          <div
            onClick={() => handleNavigation('/contacts')}
            className="w-[80%] h-20 flex justify-start pl-5 items-center mb-5 bg-silver dark:bg-darkGray rounded-lg cursor-pointer"
          >
            <img src={contactsIcon} className="h-5 mr-3" alt="contacts" />
            <span className="dark:text-white">Контакты</span>
          </div>
          <div
            onClick={() => handleNavigation('/delivery')}
            className="w-[80%] h-20 flex justify-start pl-5 items-center mb-5 bg-silver dark:bg-darkGray rounded-lg cursor-pointer"
          >
            <img src={deliveryIcon} className="h-5 mr-3" alt="delivery" />
            <span className="dark:text-white">Доставка</span>
          </div>
          <div
            onClick={() => handleNavigation('/available')}
            className="w-[80%] h-20 flex justify-start pl-5 items-center mb-5 bg-silver dark:bg-darkGray rounded-lg cursor-pointer"
          >
            <img src={availableIcon} className="h-5 mr-3" alt="available" />
            <span className="dark:text-white">Доступность сайта</span>
          </div>
        </>
      ) : (
        <span>К сожалению, у вас нет доступа</span>
      )}
    </div>
  );
};

export default Main;