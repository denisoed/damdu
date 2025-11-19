import React from 'react';

const DateSelector = ({ selectedDate, onSelect }) => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push(d);
  }

  const isSameDay = (d1, d2) => {
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth();
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 mb-4 -mx-6 px-6 scrollbar-hide select-none animate-fade-in">
      {dates.map((date, idx) => {
        const isSelected = isSameDay(date, selectedDate);
        const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short' });
        const dayNum = date.getDate();
        
        return (
          <button
            key={idx}
            onClick={() => onSelect(date)}
            style={{ animationDelay: `${idx * 50}ms` }}
            className={`flex flex-col items-center min-w-[60px] p-3 rounded-2xl border transition-all duration-300 opacity-0 animate-slide-up ${
              isSelected 
                ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-200 transform scale-105' 
                : 'bg-white text-gray-500 border-gray-100 hover:border-green-200 hover:-translate-y-1'
            }`}
          >
            <span className={`text-xs font-medium capitalize mb-1 ${isSelected ? 'text-green-100' : 'text-gray-400'}`}>
              {dayName}
            </span>
            <span className="text-xl font-bold">
              {dayNum}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default DateSelector;

