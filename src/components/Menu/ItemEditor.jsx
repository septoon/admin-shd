import WebApp from '@twa-dev/sdk';
import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-cyan/theme.css";


function ItemEditor({ item, onChange, onDelete }) {
  const [visible, setVisible] = useState(false);
  const toastBC = useRef(null);

  const clear = () => {
      toastBC.current.clear();
      setVisible(false);
  };

  const submit = () => {
    toastBC.current.clear();
      onDelete()
      setVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...item, [name]: value });
  };

  const toggleStopList = () => {
    WebApp.HapticFeedback.impactOccurred('soft');
    onChange({ ...item, onStop: !item.onStop });
  };

  const confirm = () => {
    if (!visible) {
        setVisible(true);
        toastBC.current.clear();
        toastBC.current.show({
            severity: 'success',
            summary: 'Вы действительно хотите удалить блюдо? Это действие безвозвратно!',
            sticky: true,
            content: (props) => (
              <div className="flex flex-col align-items-left">
                <div className="flex align-items-center gap-2">
                  <span className="font-bold text-900">Удалить блюдо</span>
                </div>
                <div className="font-medium text-lg my-3 text-900">{props.message.summary}</div>
                <Button className="p-button-sm flex self-start" label="Подтвердить" severity="success" onClick={submit}></Button>
              </div>
            )
        });
    }
  };


  const inputClassName = 'p-2 border border-gray-300 focus:outline-none dark:border-gray dark:bg-dark dark:text-white rounded';

  return (
    <div className='w-full flex flex-col items-center justify-between rounded-10 px-0 mt-5 dark:bg-black rounded-md shadow-xl'>
      <div className="card flex justify-content-center">
        <Toast ref={toastBC} position="top-center" onRemove={clear} />
      </div>
      <div className="flex w-full justify-between dark:bg-black flex-row mb-2">
        <img
          src={item.image}
          width={40}
          height={28}
          quality={100}
          sizes="50%"
          className="rounded-md min-w-40 min-h-28 max-w-40 max-h-28 object-cover"
          alt="pic"
        />
        <div className="flex flex-col w-1/2 h-full dark:bg-black justify-around px-1">
          <input
            type="text"
            name="name"
            value={item.name || ''}
            onChange={handleChange}
            placeholder="Название"
            className={inputClassName}
          />
          {item.options ? (
            <input
              type="text"
              name="options"
              value={item.options || ''}
              onChange={handleChange}
              placeholder="Цена за 100г"
              className={inputClassName}
            />
          ) : (
            <input
              type="text"
              name="serving"
              value={item.serving || ''}
              onChange={handleChange}
              placeholder="Вес"
              className={inputClassName}
            />
          )}
          <div className="w-full flex flex-row justify-between items-center pr-2">
            <span className="text-gray-500">Цена:</span>
            <div>
              <input
                type="number"
                name="price"
                value={item.price || ''}
                onChange={handleChange}
                placeholder="Цена"
                className={`${inputClassName} w-16`}
              />
              <span className="text-gray-500"> ₽</span>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-between dark:bg-black'>
        <input
          type="text"
          name="image"
          value={item.image || ''}
          onChange={handleChange}
          placeholder="Ссылка на изображение"
          className={`${inputClassName} w-40`}
        />
        <button
          onClick={toggleStopList}
          className={`rounded-md px-2 text-white ${item.onStop ? 'bg-red' : 'bg-orange'}`}
        >
          {item.onStop ? 'Убрать из стоп листа' : 'Добавить в стоп лист'}
        </button>
      </div>
      <button
          onClick={() => confirm('top')}
          className='rounded-md py-2 mt-1 w-full text-white bg-DimGray'
        >
          Удалить "{item.name}"
        </button>
    </div>
  );
}

export default React.memo(ItemEditor);