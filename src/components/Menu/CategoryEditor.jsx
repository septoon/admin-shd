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
    const newItem = { id: Date.now(), name: '', price: '', image: '', description: '', onStop: false };
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
        
        <AccordionTab 
          contentClassName='px-0 w-full m-0 [&_.p-accordion-content]:p-0 [&_.p-accordion-content]:dark:bg-black'
          onClick={() => WebApp.HapticFeedback.impactOccurred('soft')}
          headerClassName='font-bold dark:text-white [&_.p-accordion-header-link]:!bg-silver [&_.p-accordion-header-link]:dark:!bg-dark'
          key={category}
          header={
            <span className=" top-0 left-0 right-0 bottom-0 rounded-md flex items-center pl-6 gap-2">
                <span className="font-bold white-space-nowrap">{category}</span>
            </span>
        }>
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
            className="mt-2 px-4 py-2 text-white font-semibold bg-orange-600 rounded-md"
          >
            Добавить новое блюдо +
          </button>
        </AccordionTab>
      </Accordion>
    </div>
  );
}

export default memo(CategoryEditor);