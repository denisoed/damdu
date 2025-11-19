import React from 'react';
import { ShoppingCart, Trash2, Check, Bike } from 'lucide-react';
import { ShoppingGroup } from '../types';

interface ShoppingListProps {
  groups: ShoppingGroup[];
  toggleItem: (groupIdx: number, itemIdx: number) => void;
  deleteGroup: (groupIdx: number) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ groups, toggleItem, deleteGroup }) => {
  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400 animate-fade-in">
        <div className="animate-bounce duration-[2000ms]">
          <ShoppingCart size={64} className="mb-4 opacity-20" />
        </div>
        <p>Список покупок пуст</p>
      </div>
    );
  }

  const totalItems = groups.reduce((acc, group) => acc + group.items.filter(i => !i.checked).length, 0);

  return (
    <div className="p-6 pb-24">
      <div className="flex justify-between items-end mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-900">Список покупок</h1>
        <span className="text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full text-sm animate-scale-in">
          {totalItems} товаров
        </span>
      </div>
      
      <div className="space-y-6">
        {groups.map((group, groupIdx) => (
          <div key={groupIdx} className="animate-slide-up" style={{ animationDelay: `${groupIdx * 100}ms` }}>
             <div className="flex justify-between items-center mb-3 px-1">
                <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                   {group.mealTitle}
                </h3>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteGroup(groupIdx); }} 
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors active:scale-90"
                >
                  <Trash2 size={16} />
                </button>
             </div>

             <div className="space-y-2">
                {group.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx}
                    onClick={() => toggleItem(groupIdx, itemIdx)}
                    className={`flex items-center p-4 rounded-xl border transition-all duration-300 cursor-pointer active:scale-[0.99] ${
                      item.checked 
                        ? 'bg-gray-50 border-transparent opacity-50' 
                        : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-green-200'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 transition-all duration-300 ${
                      item.checked ? 'bg-green-500 border-green-500 scale-110' : 'border-gray-300'
                    }`}>
                      {item.checked && <Check size={12} className="text-white animate-scale-in" />}
                    </div>
                    <span className={`flex-1 font-medium text-sm transition-colors duration-300 ${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {item.name}
                    </span>
                  </div>
                ))}
             </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-xl flex gap-3 items-start animate-slide-up opacity-0" style={{ animationDelay: '400ms' }}>
        <Bike className="text-blue-600 shrink-0 mt-1 animate-pulse" size={20} />
        <div>
          <p className="text-blue-900 font-semibold text-sm">Заказать продукты?</p>
          <p className="text-blue-700 text-xs mt-1">Отправить список в Яндекс.Лавка или Самокат</p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
