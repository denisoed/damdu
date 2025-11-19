import React, { useState } from 'react';
import { Clock, Flame, ArrowRight, RefreshCw } from 'lucide-react';

const MealCard = ({ meal, onSwap, onViewDetails, index = 0 }) => {
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = (e) => {
    e.stopPropagation();
    setIsSwapping(true);
    setTimeout(() => {
      onSwap(meal);
      setIsSwapping(false);
    }, 400);
  };

  return (
    <div 
      onClick={() => onViewDetails(meal)}
      style={{ animationDelay: `${index * 150}ms` }}
      className={`relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4 transition-all duration-500 active:scale-[0.98] cursor-pointer group opacity-0 animate-slide-up ${isSwapping ? 'opacity-0 translate-x-full' : 'opacity-100'}`}
    >
      <div className="absolute top-3 right-3 z-10">
         <button 
          onClick={handleSwap}
          className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md text-gray-600 hover:text-green-600 hover:rotate-180 transition-all duration-500 active:scale-90"
        >
          <RefreshCw size={18} />
        </button>
      </div>
      
      <div className="h-32 w-full relative overflow-hidden">
        <img 
          src={meal.image} 
          alt={meal.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-xs font-medium uppercase tracking-wider opacity-80">{meal.type}</p>
          <h3 className="text-lg font-bold leading-tight">{meal.title}</h3>
        </div>
      </div>
      
      <div className="p-4 flex justify-between items-center">
        <div className="flex gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={14} /> {meal.time}
          </div>
          <div className="flex items-center gap-1">
            <Flame size={14} /> {meal.calories} ккал
          </div>
        </div>
        <div className="bg-gray-100 p-1.5 rounded-lg text-gray-400 group-hover:bg-green-100 group-hover:text-green-600 transition-colors duration-300">
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
};

export default MealCard;

