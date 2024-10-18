import { BackButton, MainButton } from '@twa-dev/sdk/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';
import WebApp from '@twa-dev/sdk';
import Loader from '../../common/Loader';

const Delivery = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    paidDelivery: false,
    deliveryStart: '',
    deliveryEnd: '',
    minDeliveryAmount: '',
    deliveryCost: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://api.shashlichny-dom.ru/delivery.json')
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
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const saveData = () => {
    WebApp.HapticFeedback.impactOccurred('heavy');
    axios
      .put('https://api.shashlichny-dom.ru/api/save/delivery.json', data)  // Обновляем по правильному URL
      .then(() => toast.success('Данные успешно обновлены!'))
      .catch((error) => {
        console.error('Error saving data:', error);
        toast.error('Ошибка обновления данных.');
      });
  };

  if (loading) {
    return <Loader />
  }

  const inputClassName = 'p-2 w-20 border border-gray-300 focus:outline-none dark:border-gray dark:bg-dark dark:text-white rounded';

  return (
    <div className='w-full h-full flex flex-col justify-center items-center pt-4'>
      
      <div className='w-full flex flex-col pl-3'>
        <div className='flex items-center mb-3 w-full'>
          <div className='flex justify-between items-center w-full'>
            <span className='font-bold dark:text-white'>Платная доставка:</span>
            <input
              type="checkbox"
              name="paidDelivery"
              checked={data.paidDelivery}
              onChange={handleChange}
              className='mr-2'
            />
          </div>
        </div>

        <div className='flex items-center mb-3 w-full'>
          <div className='flex flex-col'>
            <span className='font-bold dark:text-white'>Начало доставки:</span>
            <div>
              <span className="text-gray-500"> с </span>
              <input
                type="number"
                name="deliveryStart"
                className={inputClassName}
                placeholder='Начало доставки'
                onChange={handleChange}
                value={data.deliveryStart || ''}
              />
              <span className="text-gray-500"> часов</span>
            </div>
          </div>
        </div>

        <div className='flex items-center mb-3 w-full'>
          <div className='flex flex-col'>
            <span className='font-bold dark:text-white'>Конец доставки:</span>
            <div>
              <span className="text-gray-500"> до </span>
              <input
                type="number"
                name="deliveryEnd"
                className={inputClassName}
                placeholder='Конец доставки'
                onChange={handleChange}
                value={data.deliveryEnd || ''}
              />
              <span className="text-gray-500"> часов</span>
            </div>
          </div>
        </div>

        <div className='flex items-center mb-3 w-full'>
          <div className='flex flex-col'>
            <span className='font-bold dark:text-white'>Минимальная сумма заказа:</span>
            <div>
              <input
                type="number"
                name="minDeliveryAmount"
                className={inputClassName}
                placeholder='Минимальная сумма'
                onChange={handleChange}
                value={data.minDeliveryAmount || ''}
              />
              <span className="text-gray-500"> ₽</span>
            </div>
          </div>
        </div>

        <div className='flex items-center mb-3 w-full'>
          <div className='flex flex-col'>
            <span className='font-bold dark:text-white'>Стоимость доставки:</span>
            <div>
              <input
                type="number"
                name="deliveryCost"
                className={inputClassName}
                placeholder='Стоимость доставки'
                onChange={handleChange}
                value={data.deliveryCost || ''}
              />
              <span className="text-gray-500"> ₽</span>
            </div>
          </div>
        </div>
      </div>

      <BackButton onClick={() => navigate('/admin-shd')} />
      <MainButton text='Сохранить изменения' onClick={saveData} />
    </div>
  );
};

export default Delivery;