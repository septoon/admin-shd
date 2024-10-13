import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryEditor from './components/CategoryEditor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WebApp from '@twa-dev/sdk';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand()

    axios.get('https://api.shashlichny-dom.ru/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const saveData = (updatedData) => {
    axios.put('https://api.shashlichny-dom.ru/api/save', updatedData)
      .then(() => toast.success('Data saved successfully!'))
      .catch(error => {
        console.error('Error saving data:', error);
        toast.error('Failed to save data.');
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-2 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Админ панель</h1>
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
    </div>
  );
}

export default App;