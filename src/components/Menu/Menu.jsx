import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CategoryEditor from './CategoryEditor';
import { toast } from 'react-toastify';
import { BackButton } from '@twa-dev/sdk/react';

const Menu = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();

    axios
      .get('https://api.shashlichny-dom.ru/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const saveData = (updatedData) => {
    axios
      .put('https://api.shashlichny-dom.ru/api/save', updatedData)
      .then(() => toast.success('Данные успешно обновлены!'))
      .catch((error) => {
        console.error('Error saving data:', error);
        toast.error('Failed to save data.');
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
   <div>
     {data && Object.keys(data).map(category => (
      <CategoryEditor
        key={category}
        category={category}
        items={data[category]}
        onSave={(updatedItems) => {
          const updatedData = { ...data, [category]: updatedItems };
          setData(updatedData);
          saveData(updatedData);
        }}
      />
    ))}
    <BackButton onClick={() => navigate('/admin-shd')} />
   </div>
  )
}

export default Menu