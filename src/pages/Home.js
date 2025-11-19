import React from 'react';
import { RefreshCw, Bike } from 'lucide-react';
import DateSelector from '../components/DateSelector';
import MealCard from '../components/MealCard';

const Home = ({ 
  selectedDate, 
  setSelectedDate, 
  dailyMenu, 
  generateMenu, 
  handleSwapMeal, 
  setSelectedMeal 
}) => {
  return (
    <div className="p-6 pb-32">
      <DateSelector selectedDate={selectedDate} onSelect={setSelectedDate} />

      <div className="flex justify-between items-center mb-4 animate-slide-up delay-200 opacity-0">
        <p className="text-gray-600 font-medium">Меню на этот день</p>
        <button onClick={generateMenu} className="text-green-600 text-sm font-semibold flex items-center gap-1 hover:bg-green-50 px-2 py-1 rounded-lg transition-colors active:scale-95">
          <RefreshCw size={14} /> Обновить
        </button>
      </div>
      
      <div className="space-y-2">
        {dailyMenu.map((meal, idx) => (
          <MealCard 
            key={`${meal?.id}-${idx}`} 
            meal={meal} 
            index={idx}
            onSwap={handleSwapMeal} 
            onViewDetails={setSelectedMeal}
          />
        ))}
      </div>

      <div 
        className="mt-8 p-6 bg-gradient-to-r from-orange-100 to-amber-50 rounded-2xl relative overflow-hidden animate-slide-up opacity-0 hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
        style={{ animationDelay: '500ms' }}
      >
        <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
          <h3 className="font-bold text-orange-900 mb-1">Не хотите готовить?</h3>
          <p className="text-sm text-orange-700 mb-3 opacity-90">Закажите доставку из любимых ресторанов</p>
          <button className="bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-orange-50 transition-colors">
            Посмотреть варианты
          </button>
        </div>
        <Bike className="absolute -bottom-2 -right-2 text-orange-200 opacity-50 rotate-12 transition-transform duration-500 group-hover:translate-x-2 group-hover:rotate-6" size={100} />
      </div>
    </div>
  );
};

export default Home;

