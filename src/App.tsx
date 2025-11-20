import React, { useState, useEffect } from 'react';
import { 
  ChefHat, 
  ShoppingCart, 
  Home as HomeIcon, 
  User
} from 'lucide-react';

import GlobalStyles from './components/GlobalStyles';
import Onboarding from './components/Onboarding';
import Profile from './components/Profile';
import ShoppingList from './components/ShoppingList';
import PantrySearch from './components/PantrySearch';
import MealDetails from './components/MealDetails';
import Home from './pages/Home';
import { MEAL_TYPES, RECIPES } from './data/recipes';
import { Meal, ShoppingGroup } from './types';
import { useTelegram } from './telegram';

export default function App() {
  const { user, tg } = useTelegram();
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyMenu, setDailyMenu] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  
  // State for Shopping List Groups
  const [shoppingListGroups, setShoppingListGroups] = useState<ShoppingGroup[]>([]); 

  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    generateMenu();
  }, [selectedDate]);

  const generateMenu = () => {
    setDailyMenu([]);
    setTimeout(() => {
      const getMeal = (type: string) => {
        const options = RECIPES.filter(r => r.type === type);
        return options[Math.floor(Math.random() * options.length)];
      };
      setDailyMenu([
        getMeal(MEAL_TYPES.BREAKFAST),
        getMeal(MEAL_TYPES.LUNCH),
        getMeal(MEAL_TYPES.DINNER)
      ]);
    }, 50);
  };

  const handleSwapMeal = (oldMeal: Meal) => {
    const options = RECIPES.filter(r => r.type === oldMeal.type && r.id !== oldMeal.id);
    const newMeal = options[Math.floor(Math.random() * options.length)] || oldMeal;
    
    setDailyMenu(current => 
      current.map(m => m.id === oldMeal.id ? newMeal : m)
    );
  };

  const addToShoppingList = (meal: Meal, servings: number) => {
    const formatAmount = (value: number) => {
      const rounded = Number(value.toFixed(2));
      return Number.isInteger(rounded) ? rounded.toString() : rounded.toString();
    };

    const additionItems = meal.additions?.map(add => ({
      name: add.note ? `${add.title} (${add.note})` : add.title,
      checked: false
    })) || [];

    const ingredientItems = meal.ingredients.map(ing => ({
      name: `${ing.name} — ${formatAmount(ing.amount * servings)} ${ing.unit}`,
      checked: false
    }));

    const newGroup: ShoppingGroup = {
      mealTitle: meal.title,
      items: [
        ...ingredientItems,
        ...additionItems
      ]
    };
    setShoppingListGroups(prev => [...prev, newGroup]);
    setActiveTab('cart');
  };

  const toggleShoppingItem = (groupIdx: number, itemIdx: number) => {
    const newGroups = [...shoppingListGroups];
    newGroups[groupIdx].items[itemIdx].checked = !newGroups[groupIdx].items[itemIdx].checked;
    setShoppingListGroups(newGroups);
  };

  const deleteShoppingGroup = (groupIdx: number) => {
    const newGroups = shoppingListGroups.filter((_, i) => i !== groupIdx);
    setShoppingListGroups(newGroups);
  };

  if (!onboardingComplete) {
    return (
      <>
        <GlobalStyles />
        <Onboarding onComplete={() => setOnboardingComplete(true)} />
      </>
    );
  }

  const formattedDate = selectedDate.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
  const totalShoppingItems = shoppingListGroups.reduce((acc, group) => acc + group.items.filter(i => !i.checked).length, 0);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 mx-auto overflow-hidden relative">
      <GlobalStyles />
      
      {/* Header */}
      <div className="bg-white p-6 pb-4 sticky top-0 z-20 border-b border-gray-100 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 capitalize animate-slide-up">
              {formattedDate}
            </h2>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2 animate-slide-up delay-100 opacity-0">
              Привет, {user?.first_name || 'Анна'} <span className="text-2xl hover:animate-spin cursor-default">👋</span>
            </h1>
          </div>
          <button 
            onClick={() => setShowProfile(true)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-green-100 hover:text-green-600 transition-colors cursor-pointer active:scale-90 duration-200"
          >
            <User size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="h-full">
        {activeTab === 'home' && (
          <Home 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate}
            dailyMenu={dailyMenu}
            generateMenu={generateMenu}
            handleSwapMeal={handleSwapMeal}
            setSelectedMeal={setSelectedMeal}
          />
        )}

        {activeTab === 'cart' && (
          <div key="cart">
            <ShoppingList 
              groups={shoppingListGroups} 
              toggleItem={toggleShoppingItem} 
              deleteGroup={deleteShoppingGroup}
            />
          </div>
        )}

        {activeTab === 'pantry' && (
          <div key="pantry">
            <PantrySearch />
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedMeal && (
        <MealDetails 
          meal={selectedMeal} 
          onBack={() => setSelectedMeal(null)} 
          onAddToShoppingList={addToShoppingList}
        />
      )}

      {showProfile && (
        <Profile onClose={() => setShowProfile(false)} />
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-100 flex justify-around items-center py-4 pb-6 px-2 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 px-4 transition-all duration-300 ${activeTab === 'home' ? 'text-green-600 -translate-y-1' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <HomeIcon size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} className={activeTab === 'home' ? 'animate-bounce' : ''} />
          <span className="text-[10px] font-medium">Меню</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('pantry')}
          className={`flex flex-col items-center gap-1 px-4 transition-all duration-300 ${activeTab === 'pantry' ? 'text-green-600 -translate-y-1' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <ChefHat size={24} strokeWidth={activeTab === 'pantry' ? 2.5 : 2} className={activeTab === 'pantry' ? 'animate-bounce' : ''} />
          <span className="text-[10px] font-medium">Что есть?</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('cart')}
          className={`relative flex flex-col items-center gap-1 px-4 transition-all duration-300 ${activeTab === 'cart' ? 'text-green-600 -translate-y-1' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <div className="relative">
            <ShoppingCart size={24} strokeWidth={activeTab === 'cart' ? 2.5 : 2} className={activeTab === 'cart' ? 'animate-bounce' : ''} />
            {totalShoppingItems > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-scale-in" />
            )}
          </div>
          <span className="text-[10px] font-medium">Покупки</span>
        </button>
      </div>
    </div>
  );
}
