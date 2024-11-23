import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategoryEditor from './CategoryEditor';
import { toast } from 'react-toastify';
import { BackButton, MainButton } from '@twa-dev/sdk/react';
import Loader from '../../common/Loader/Loader';
import '../../index.css'

const Menu = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animationClass, setAnimationClass] = useState('page-el-enter');
  const navigate = useNavigate();

  useEffect(() => {
    setAnimationClass('page-el-enter-active');
    axios
      .get(`https://api.shashlichny-dom.ru/data.json?t=${Date.now()}`)
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

  const handleCategoryUpdate = (category, updatedItems) => {
    setData(prevData => ({
      ...prevData,
      [category]: updatedItems,
    }));
  };

  const handleNavigation = () => {
    setAnimationClass('page-el-exit-active');

    setTimeout(() => {
      navigate('/admin-shd');
    }, 200);
  };

  const saveData = () => {
    WebApp.HapticFeedback.impactOccurred('heavy');
    axios
    .put('https://api.shashlichny-dom.ru/api/save/data.json', data)
      .then(() => toast.success('Данные успешно обновлены!'))
      .catch((error) => {
        console.error('Error saving data:', error);
        toast.error('Ошибка обновления данных.');
      });
  };

  if (loading) return <Loader />

  return (
    <div className={`w-full pb-10 page-el ${animationClass}`}>
      {data && Object.keys(data).map(category => (
        <CategoryEditor
          key={category}
          category={category}
          items={data[category]}
          onUpdate={(updatedItems) => handleCategoryUpdate(category, updatedItems)}
        />
      ))}
      <BackButton onClick={handleNavigation} />
      <MainButton text='Сохранить изменения' onClick={saveData} />
    </div>
  );
};

export default Menu;