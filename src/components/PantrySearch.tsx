import React, { useState } from 'react';
import { Search, UtensilsCrossed } from 'lucide-react';

const PantrySearch = () => {
  const [query, setQuery] = useState('');
  const popular = ['Яйца', 'Курица', 'Картофель', 'Томаты'];

  return (
    <div className="p-6 pb-24 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-2 animate-slide-up">Что в холодильнике?</h1>
      <p className="text-gray-500 mb-6 animate-slide-up delay-100 opacity-0">Найдем рецепт из того, что у вас уже есть.</p>

      <div className="relative mb-6 animate-slide-up delay-200 opacity-0">
        <Search className="absolute left-4 top-4 text-gray-400" size={20} />
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Например: помидоры, сыр..."
          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-100 border-transparent focus:bg-white focus:border-green-500 focus:ring-0 transition-all duration-300"
        />
      </div>

      <div className="mb-8 animate-slide-up delay-300 opacity-0">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Часто ищут</h3>
        <div className="flex flex-wrap gap-2">
          {popular.map((tag, i) => (
            <button 
              key={tag} 
              onClick={() => setQuery(tag)} 
              style={{ animationDelay: `${300 + (i * 50)}ms` }}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-green-500 hover:text-green-600 transition-all active:scale-95 opacity-0 animate-slide-up"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {query && (
        <div className="text-center py-10 animate-scale-in">
          <div className="inline-block p-4 bg-green-50 rounded-full mb-4 text-green-600 animate-bounce">
            <UtensilsCrossed size={32} />
          </div>
          <p className="text-gray-900 font-medium">Мы ищем лучшие сочетания...</p>
        </div>
      )}
    </div>
  );
};

export default PantrySearch;

