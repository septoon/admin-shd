import React, { useState } from 'react';
import ItemEditor from './ItemEditor';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { memo } from 'react';
import WebApp from '@twa-dev/sdk';
import '../../custom.css';

function CategoryEditor({ category, items, onUpdate }) {
  const [editingItems, setEditingItems] = useState(items);
  const [activeIndexes, setActiveIndexes] = useState([0, 1]);

  const handleChange = (index, updatedItem) => {
    const newItems = editingItems.map((item, i) => (i === index ? updatedItem : item));
    setEditingItems(newItems);
    onUpdate(newItems); // Передаем обновленные элементы в Menu
  };

  const addItem = () => {
    const newItem = { id: Date.now(), name: '', price: '', image: '', onStop: false };
    const newItems = [...editingItems, newItem];
    setEditingItems(newItems);
    onUpdate(newItems);
  };

  const deleteItem = (id) => {
    const newItems = editingItems.filter((item) => item.id !== id);
    setEditingItems(newItems);
    onUpdate(newItems);
  };

  const onTabChange = (e) => {
    setActiveIndexes(e.index);
  };

  return (
    <div className="card flex w-full justify-center overflow-y-scroll mb-2">
      <Accordion
        activeIndex={activeIndexes}
        className="w-full"
        onTabChange={onTabChange}>
        <AccordionTab contentClassName=''
          onClick={() => WebApp.HapticFeedback.impactOccurred('soft')}
          headerClassName='font-bold bg-light dark:text-white dark:bg-dark rounded-md'
          key={category}
          header={category}>
          {editingItems.map((item, index) => (
            <ItemEditor
              key={item.id || index}
              item={item}
              onChange={(updatedItem) => handleChange(index, updatedItem)}
              onDelete={() => deleteItem(item.id)}
            />
          ))}
          <button
            onClick={addItem}
            className="mt-2 px-4 py-2 text-white bg-orange-600 rounded-md"
          >
            Добавить блюдо
          </button>
        </AccordionTab>
      </Accordion>
    </div>
  );
}

export default memo(CategoryEditor);