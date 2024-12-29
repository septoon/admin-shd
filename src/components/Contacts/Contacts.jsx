import { BackButton, MainButton } from '@twa-dev/sdk/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';
import WebApp from '@twa-dev/sdk';
import Loader from '../../common/Loader/Loader';
import '../../index.css';

const Contacts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    phoneNumber: '',
    address: '',
    scheduleStart: 0,
    scheduleEnd: 0,
  });
  const [loading, setLoading] = useState(true);
  const [animationClass, setAnimationClass] = useState('page-el-enter');

  useEffect(() => {
    setAnimationClass('page-el-enter-active');
    axios
      .get(`${process.env.REACT_APP_URL}/contacts.json?t=${Date.now()}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        toast.error('Ошибка загрузки данных.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]:
        ["scheduleStart", "scheduleEnd"].includes(name)
          ? Number(value)
          : value,
    }));
  };

  const handleNavigation = () => {
    setAnimationClass('page-el-exit-active');

    setTimeout(() => {
      navigate('/admin-shd');
    }, 300);
  };

  const saveData = () => {
    WebApp.HapticFeedback.impactOccurred('heavy');
    axios
      .put(`${process.env.REACT_APP_URL}/api/save/contacts.json`, data)
      .then(() => toast.success('Данные успешно обновлены!'))
      .catch((error) => {
        console.error('Error saving data:', error);
        toast.error('Ошибка обновления данных.');
      });
  };

  if (loading) {
    return <Loader />;
  }

  const inputClassName =
    'p-2 w-full border border-gray-300 focus:outline-none dark:border-dark-switch dark:bg-dark dark:text-white rounded';

  return (
    <div
      className={`w-full h-full flex flex-col justify-center items-center pt-4 page-el ${animationClass}`}>
      <div className="w-full flex flex-col pl-3">
        <div className="flex items-center mb-3 w-full">
          <div className="flex flex-col">
            <span className="font-bold dark:text-white">Телефон:</span>
            <input
              type="text"
              name="phoneNumber"
              className={inputClassName}
              placeholder="Телефон"
              onChange={handleChange}
              value={data.phoneNumber || ''}
              inputMode="numeric"
            />
          </div>
        </div>

        <div className="flex items-center mb-3 w-full">
          <div className="flex flex-col">
            <span className="font-bold dark:text-white">Адрес:</span>
            <input
              type="text"
              name="address"
              className={inputClassName}
              placeholder="Адрес"
              onChange={handleChange}
              value={data.address || ''}
            />
          </div>
        </div>

        <div className="flex items-center mb-3 w-full">
          <div className="flex flex-col">
            <span className="font-bold dark:text-white mb-2">Режим работы:</span>
            <span className="text-sm font-bold dark:text-white my-1">Открытие:</span>
            <input
              type="number"
              name="scheduleStart"
              className={inputClassName}
              placeholder="Открытие"
              onChange={handleChange}
              value={data.scheduleStart || ''}
              inputMode="numeric"
            />
            <span className="text-sm font-bold dark:text-white my-1">Закрытие:</span>
            <input
              type="number"
              name="scheduleEnd"
              className={inputClassName}
              placeholder="Закрытие"
              onChange={handleChange}
              value={data.scheduleEnd || ''}
              inputMode="numeric"
            />
          </div>
        </div>
      </div>

      <BackButton onClick={handleNavigation} />
      <MainButton text="Сохранить изменения" onClick={saveData} />
    </div>
  );
};

export default Contacts;
