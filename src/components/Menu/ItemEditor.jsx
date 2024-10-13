import React from 'react';

function ItemEditor({ item, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...item, [name]: value });
  };

  const toggleStopList = () => {
    onChange({ ...item, onStop: !item.onStop });
  };

  return (
    <div className='w-full flex flex-col items-center justify-between rounded-10 mb-5 py-2 bg-white rounded-md shadow-xl'>
      <div className="flex w-full justify-between flex-row mb-2">
        <img
          src={item.image}
          width={40}
          height={28}
          quality={100}
          sizes="50%"
          className="rounded-md min-w-40 min-h-28 max-w-40 max-h-28 object-cover"
          alt="pic"
        />
        <div className="flex flex-col w-full h-full justify-around pl-2">
          <div className="item_name">
            <input
              type="text"
              name="name"
              value={item.name || ''}
              onChange={handleChange}
              placeholder="Название"
              className="p-2 border w1/3 border-gray-300 rounded"
            />
          </div>
          <div className="columns">
            {item.options ? (
              <input
                type="text"
                name="options"
                value={item.options || ''}
                onChange={handleChange}
                placeholder="Цена за 100г"
                className="p-2 border border-gray-300 rounded"
              />
            ) : (
              <input
                type="text"
                name="serving"
                value={item.serving || ''}
                onChange={handleChange}
                placeholder="Вес"
                className="p-2 border border-gray-300 rounded"
              />
            )}
          </div>
          <div className="w-full flex flex-row justify-between items-center pr-2">
            <span className="text-gray-500">Цена:</span>
            <div>
              <input
                type="number"
                name="price"
                value={item.price || ''}
                onChange={handleChange}
                placeholder="Цена"
                className="p-2 border w-12 border-gray-300 rounded"
              />
              <span className="text-gray-500"> ₽</span>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-between'>
        <input
          type="text"
          name="image"
          value={item.image || ''}
          onChange={handleChange}
          placeholder="Ссылка на изображение"
          className="p-2 border min-w-40 max-w-40 border-gray-300 rounded"
        />
        <button
          onClick={toggleStopList}
          className={`rounded-md px-2 text-white ${item.onStop ? 'bg-red-400' : 'bg-orange-400'}`}
        >
          {item.onStop ? 'Убрать из стоп листа' : 'Добавить в стоп лист'}
        </button>
      </div>
    </div>
  );
}

export default React.memo(ItemEditor);