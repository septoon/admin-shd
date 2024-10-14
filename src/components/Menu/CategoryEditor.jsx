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

  const onTabChange = (e) => {
    setActiveIndexes(e.index);
  };

  return (
    <div className="card flex w-full justify-center overflow-y-scroll pt-5">
      <Accordion
        activeIndex={activeIndexes}
        className="w-full"
        onTabChange={onTabChange}>
        <AccordionTab contentClassName='accord'
          onClick={() => WebApp.HapticFeedback.impactOccurred('soft')}
          headerClassName='font-bold pb-4'
          key={category}
          header={category}>
          {editingItems.map((item, index) => (
            <ItemEditor
              key={item.id || index}
              item={item}
              onChange={(updatedItem) => handleChange(index, updatedItem)}
            />
          ))}
        </AccordionTab>
      </Accordion>
    </div>
  );
}

export default memo(CategoryEditor);