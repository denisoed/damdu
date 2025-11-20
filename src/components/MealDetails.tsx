import React, { useState } from 'react';
import { ArrowRight, Clock, Flame, BookOpen, List, ShoppingCart, Sparkles } from 'lucide-react';
import { Meal } from '../types';

interface MealDetailsProps {
  meal: Meal;
  onBack: () => void;
  onAddToShoppingList: (meal: Meal) => void;
}

const MealDetails: React.FC<MealDetailsProps> = ({ meal, onBack, onAddToShoppingList }) => {
  const [activeTab, setActiveTab] = useState<'recipe' | 'instruction'>('recipe');

  if (!meal) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fade-in" onClick={onBack} />
      
      <div className="relative w-full h-full bg-white overflow-y-auto animate-slide-in-right shadow-2xl">
        <div className="relative h-72 shrink-0">
          <img src={meal.image} alt={meal.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          
          <button 
            onClick={onBack}
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 hover:scale-110 transition-all"
          >
            <ArrowRight className="rotate-180" size={24} />
          </button>

          <div className="absolute bottom-0 left-0 w-full p-6 text-white animate-slide-up delay-200 opacity-0">
            <span className="px-2 py-1 bg-green-600 rounded text-xs font-bold uppercase tracking-wider mb-2 inline-block">
              {meal.type}
            </span>
            <h1 className="text-3xl font-bold leading-tight mb-2">{meal.title}</h1>
            <div className="flex gap-4 text-white/90 text-sm font-medium">
              <span className="flex items-center gap-1"><Clock size={16}/> {meal.time}</span>
              <span className="flex items-center gap-1"><Flame size={16}/> {meal.calories} ккал</span>
            </div>
          </div>
        </div>

        <div className="p-6 pb-24">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 animate-slide-up delay-300 opacity-0">
            <button 
              onClick={() => setActiveTab('recipe')}
              className={`flex-1 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${
                activeTab === 'recipe' 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen size={16} /> Рецепт
            </button>
            <button 
              onClick={() => setActiveTab('instruction')}
              className={`flex-1 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${
                activeTab === 'instruction' 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List size={16} /> Инструкция
            </button>
          </div>

          {/* Content Area */}
          <div className="min-h-[200px]">
            {activeTab === 'recipe' && (
              <div className="animate-slide-up delay-100">
                {meal.additions?.length ? (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-50 text-green-700 rounded-lg text-[11px] font-bold uppercase tracking-wide">
                          Дополнить блюдо
                        </span>
                        <Sparkles size={16} className="text-green-500" />
                      </div>
                      <span className="text-xs text-gray-500">Идеи к подаче</span>
                    </div>
                    <div className="grid gap-3">
                      {meal.additions.map((addition, i) => (
                        <div
                          key={`${addition.title}-${i}`}
                          className="p-3 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-green-50/40 shadow-sm flex gap-3 items-start"
                        >
                          <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center shadow-inner">
                            +
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 leading-snug">{addition.title}</p>
                            {addition.note && <p className="text-xs text-gray-600 mt-1 leading-relaxed">{addition.note}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex justify-between items-center">
                    Ингредиенты
                    <span className="text-sm font-normal text-gray-500">{meal.ingredients.length} шт.</span>
                  </h3>
                  <ul className="space-y-3">
                    {meal.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => {
                      onAddToShoppingList(meal);
                      onBack();
                    }}
                    className="mt-6 w-full py-3.5 text-green-600 font-bold text-sm border border-green-200 rounded-xl hover:bg-green-50 hover:border-green-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                     <ShoppingCart size={18} />
                    + Добавить в покупки
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'instruction' && (
              <div className="animate-slide-up delay-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Пошаговый план</h3>
                <div className="space-y-6 relative">
                   <div className="absolute top-2 left-[19px] bottom-4 w-0.5 bg-gray-100 z-0" />
                   {meal.steps ? (
                      meal.steps.map((step, i) => (
                        <div key={i} className="flex gap-4 relative z-10">
                          <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 font-bold flex items-center justify-center shrink-0 border-4 border-white shadow-sm">
                            {i + 1}
                          </div>
                          <div className="pt-1 pb-2 border-b border-gray-50 last:border-0 w-full">
                            <p className="text-gray-700 leading-relaxed">{step}</p>
                          </div>
                        </div>
                      ))
                   ) : (
                     <p className="text-gray-400 italic">Инструкция загружается...</p>
                   )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
