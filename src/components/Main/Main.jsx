import React from 'react';
import { Link } from 'react-router-dom';

import menuIcon from '../../assets/img/menu.png';
import contactsIcon from '../../assets/img/contacts.png';
import deliveryIcon from '../../assets/img/delivery.png';
import vacancyIcon from '../../assets/img/vacancy.png';
import WebApp from '@twa-dev/sdk';
import { chatIds } from '../../common/access';

const Main = () => {
  const linkClassName =
    'w-[80%] h-20 flex justify-start pl-5 items-center mb-5 bg-silver dark:bg-darkGray rounded-lg';

  return (
    <div className="p-2 w-full h-full pt-20 flex flex-col justify-start items-center bg-gray-100 min-h-screen fixed">
      {
        chatIds.includes(WebApp.initDataUnsafe.user.id) ? (
          <>
          <Link
        to="/menu"
        onClick={() => WebApp.HapticFeedback.impactOccurred('medium')}
        className={linkClassName}>
        <img src={menuIcon} className="h-5 mr-3" alt="menu" />
        <span className="dark:text-white">Меню</span>
      </Link>
      <Link
        to="/contacts"
        onClick={() => WebApp.HapticFeedback.impactOccurred('medium')}
        className={linkClassName}>
        <img src={contactsIcon} className="h-5 mr-3" alt="contacts" />
        <span className="dark:text-white">Контакты</span>
      </Link>
      <Link
        to="/delivery"
        onClick={() => WebApp.HapticFeedback.impactOccurred('medium')}
        className={linkClassName}>
        <img src={deliveryIcon} className="h-5 mr-3" alt="delivery" />
        <span className="dark:text-white">Доставка</span>
      </Link>
      <Link
        to="/vacancies"
        onClick={() => WebApp.HapticFeedback.impactOccurred('medium')}
        className={linkClassName}>
        <img src={vacancyIcon} className="h-5 mr-3" alt="vacancies" />
        <span className="dark:text-white">Вакансии</span>
      </Link>
          </>
        ) : (
          <span>К сожалению у вас нет доступа</span>
        )
      }
    </div>
  );
};

export default Main;