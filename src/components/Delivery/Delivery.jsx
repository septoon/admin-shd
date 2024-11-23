import { BackButton, MainButton } from '@twa-dev/sdk/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';
import WebApp from '@twa-dev/sdk';
import Loader from '../../common/Loader/Loader';
import Switch from '../Switch/Switch';
import '../../index.css'

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
  const [animationClass, setAnimationClass] = useState('page-el-enter');

  useEffect(() => {
    setAnimationClass('page-el-enter-active');
    axios
      .get(`https://api.shashlichny-dom.ru/delivery.json?t=${Date.now()}`)
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
    type === 'checkbox' && WebApp.HapticFeedback.impactOccurred('medium');
    setData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
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
      .put('https://api.shashlichny-dom.ru/api/save/delivery.json', data)
      .then(() => toast.success('Данные успешно обновлены!'))
      .catch((error) => {
        console.error('Error saving data:', error);
        toast.error('Ошибка обновления данных.');
      });
  };

  const visiblePaid = data.paidDelivery ? 'flex items-center my-3 w-full opacity-1' : 'flex items-center my-3 w-full opacity-35'

  if (loading) {
    return <Loader />
  }

  const inputWrapper = 'flex items-center py-3 w-full border-b border-gray-300 dark:border-dark-switch'
  const inputClassName = 'pl-2 py-0 w-14 border border-gray-300 focus:outline-none dark:border-dark-switch dark:bg-dark dark:text-white rounded';

  return (
    <div className={`w-full h-full flex flex-col justify-center items-center pt-4 page-el ${animationClass}`}>
      
      <div className='w-full flex flex-col px-3'>
        <div className={inputWrapper}>
          <div className='flex justify-between items-center w-full'>
            <span className='font-bold dark:text-white'>Платная доставка:</span>
            <Switch
              value={data.paidDelivery}
              onColor="#4DD863"
              handleToggle={handleChange}
            />
          </div>
        </div>

        <div className={inputWrapper}>
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
                inputMode="numeric"
              />
              <span className="text-gray-500"> часов</span>
            </div>
          </div>
        </div>

        <div className={inputWrapper}>
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
                inputMode="numeric"
              />
              <span className="text-gray-500"> часов</span>
            </div>
          </div>
        </div>

        <div className={inputWrapper}>
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
                inputMode="numeric"
              />
              <span className="text-gray-500"> ₽</span>
            </div>
          </div>
        </div>

        <div className={visiblePaid}>
          <div className='flex flex-col'>
            <span className='font-bold dark:text-white'>Стоимость доставки:</span>
            <div>
              <input
                type="number"
                name="deliveryCost"
                disabled={!data.paidDelivery}
                className={inputClassName}
                placeholder='Стоимость доставки'
                onChange={handleChange}
                value={data.deliveryCost || ''}
                inputMode="numeric"
              />
              <span className="text-gray-500"> ₽</span>
            </div>
          </div>
        </div>
      </div>

      <BackButton onClick={handleNavigation} />
      <MainButton text='Сохранить изменения' onClick={saveData} />
    </div>
  );
};

export default Delivery;