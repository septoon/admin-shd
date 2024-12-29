import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import ImageDialog from '../../common/ImageDialog';

import LoadFile from '../../assets/img/load-photo.webp';
import WebApp from '@twa-dev/sdk';

function ItemEditor({ item, onChange, onDelete }) {
  const [visible, setVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const toastBC = useRef(null);

  const clear = () => {
    toastBC.current.clear();
    setVisible(false);
  };

  const submit = () => {
    onDelete();
    setVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Если имя поля среди перечисленных — приводим к числу
    if (['serving', 'weight', 'price'].includes(name)) {
      // Можно использовать parseFloat или Number,
      // в зависимости от того, нужны ли десятичные значения
      newValue = parseFloat(value) || 0;
    }
    onChange({ ...item, [name]: newValue});
  };

  const toggleStopList = () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred('soft');
    onChange({ ...item, onStop: !item.onStop });
  };

  const handleUpload = (uploadedUrl) => {
    onChange({ ...item, image: uploadedUrl });
    setDialogVisible(false);
  };

  const confirm = () => {
    WebApp.showConfirm(
      `Вы действительно хотите удалить ${item.name === '' ? 'новое блюдо' : item.name}? Это действие безвозвратно!`,
      (confirmed) => {
        if (confirmed) {
          submit();
        }
      }
    );
  };

  const inputClassName =
    'p-2 border border-gray-300 focus:outline-none dark:border-dark-switch dark:bg-dark dark:text-white rounded';

  return (
    <div className="w-full flex flex-col items-center justify-between dark:bg-black rounded-10 px-0 mt-5 rounded-md shadow-xl">
      <div className="card flex justify-content-center">
        <Toast ref={toastBC} position="top-center" onRemove={clear} />
      </div>
      <div className="flex w-full justify-between items-start flex-row mb-2">
        <div className='flex flex-col'>
          <button onClick={() => setDialogVisible(true)} className="relative min-w-40 min-h-28 max-w-40 max-h-28">
            <img
              src={item.image}
              width={40}
              height={28}
              quality={100}
              sizes="50%"
              className="rounded-m min-w-40 min-h-28 max-w-40 max-h-28 object-cover"
              alt=""
            />
            <div className="w-full h-full bg-white flex justify-center items-center dark:bg-black absolute left-0 top-0 right-0 bottom-0 opacity-50">
            </div>
            <div className="w-full h-full absolute left-0 top-0 right-0 bottom-0 flex flex-col justify-center items-center">
              <img className="w-10 h-10 shadow-md" src={LoadFile} alt="Выбрать файл" />
              <span className="text-black font-bold dark:text-white text-base shadow-md">{item.image === '' ? 'Загрузить' : 'Заменить'}</span>
            </div>
          </button>
          <input
            type="text"
            name="image"
            value={item.image || ''}
            onChange={handleChange}
            placeholder="Ссылка на изображение"
            className={`${inputClassName} w-40`}
          />
        </div>
        <div className="flex flex-col w-1/2 h-full justify-around px-1">
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
          {
            item.weight ? (
              <>
                <span className='text-xs font-bold dark:text-white my-1'>Укажите средний вес готового блюда:</span>
                <input
                  type="number"
                  name="weight"
                  value={item.weight || 0}
                  onChange={handleChange}
                  placeholder="Средний вес"
                  className={inputClassName}
                  onFocus={(event) => event.target.select()}
                  inputMode="numeric"
                />
              </>
            ) : null
          }
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
                inputMode="numeric"
              />
              <span className="text-gray-500"> ₽</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between dark:bg-black">
        <input
          type="text"
          name="description"
          value={item.description}
          onChange={handleChange}
          placeholder="Описание блюда"
          className={`${inputClassName} w-40`}
        />
        <button
          onClick={toggleStopList}
          className={`rounded-md px-2 text-white ${item.onStop ? 'bg-red' : 'bg-orange'}`}>
          {item.onStop ? 'Убрать из стоп листа' : 'Добавить в стоп лист'}
        </button>
      </div>
      <button
        onClick={() => confirm('top')}
        className="rounded-md py-2 mt-1 w-full text-white bg-DimGray">
        Удалить {item.name.length > 0 ? `"${item.name}"` : ''}
      </button>
      <ImageDialog
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        onUpload={handleUpload}
      />
    </div>
  );
}

export default React.memo(ItemEditor);
