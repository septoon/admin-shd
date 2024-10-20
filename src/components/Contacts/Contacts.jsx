import { BackButton, MainButton } from '@twa-dev/sdk/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';
import WebApp from '@twa-dev/sdk';
import Loader from '../../common/Loader';

const Contacts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ phoneNumber: '', address: '', schedule: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://api.shashlichny-dom.ru/contacts.json')
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
      [name]: value,
    }));
  };

  const saveData = () => {
    WebApp.HapticFeedback.impactOccurred('heavy');
    axios
      .put('https://api.shashlichny-dom.ru/api/save/contacts.json', data)
      .then(() => toast.success('Данные успешно обновлены!'))
      .catch((error) => {
        console.error('Error saving data:', error);
        toast.error('Ошибка обновления данных.');
      });
  };

  if (loading) {
    return <Loader />
  }

  const inputClassName = 'p-2 w-full border border-gray-300 focus:outline-none dark:border-dark-switch dark:bg-dark dark:text-white rounded';

  return (
    <div className='w-full h-full flex flex-col justify-center items-center pt-4'>
      <div className='w-full flex flex-col pl-3'>
        <div className='flex items-center mb-3 w-full'>
          <div className='flex flex-col'>
            <span className='font-bold dark:text-white'>Телефон:</span>
            <input
              type="text"
              name="phoneNumber"
              className={inputClassName}
              placeholder='Телефон'
              onChange={handleChange}
              value={data.phoneNumber || ''}
            />
          </div>
        </div>

        <div className='flex items-center mb-3 w-full'>
          <div className='flex flex-col'>
            <span className='font-bold dark:text-white'>Адрес:</span>
            <input
              type="text"
              name="address"
              className={inputClassName}
              placeholder='Адрес'
              onChange={handleChange}
              value={data.address || ''}
            />
          </div>
        </div>

        <div className='flex items-center mb-3 w-full'>
          <div className='flex flex-col'>
            <span className='font-bold dark:text-white'>Режим работы:</span>
            <input
              type="text"
              name="schedule"
              className={inputClassName}
              placeholder='Режим работы'
              onChange={handleChange}
              value={data.schedule || ''}
            />
          </div>
        </div>
      </div>

      <BackButton onClick={() => navigate('/admin-shd')} />
      <MainButton text='Сохранить изменения' onClick={saveData} />
    </div>
  );
};

export default Contacts;