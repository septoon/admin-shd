import React, { useState } from 'react';
import ItemEditor from './ItemEditor';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { memo } from 'react';
import WebApp from '@twa-dev/sdk';
import '../../custom.css';

function CategoryEditor({ category, items, onSave }) {
  const [editingItems, setEditingItems] = useState(items);
  const [activeIndexes, setActiveIndexes] = useState([0, 1]);

  const handleSave = () => {
    onSave(editingItems);
  };

  const handleChange = (index, updatedItem) => {
    const newItems = editingItems.map((item, i) => (i === index ? updatedItem : item));
    setEditingItems(newItems);
  };

  const onTabChange = (e) => {
    setActiveIndexes(e.index);
  };

  return (
    <div className="mb-8 p-1 bg-white rounded-lg shadow">
      <Accordion
        activeIndex={activeIndexes}
        className="w-full py-4 font-bold text-lg"
        onTabChange={onTabChange}>
        <AccordionTab
          contentClassName="font-light py-0 text-sm"
          onClick={() => WebApp.HapticFeedback.impactOccurred('soft')}
          headerClassName="accord"
          key={items.id}
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
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Сохранить {category}
      </button>
    </div>
  );
}

export default memo(CategoryEditor);
