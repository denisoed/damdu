import React from 'react';
import { 
  ChefHat, 
  Clock, 
  Calendar, 
  Settings, 
  CreditCard, 
  X, 
  LogOut, 
  Star, 
  ChevronRight, 
  MapPin 
} from 'lucide-react';

const Profile = ({ onClose }) => {
  const stats = [
    { label: 'Дней подряд', value: '12', icon: Calendar, color: 'bg-blue-100 text-blue-600' },
    { label: 'Рецептов', value: '48', icon: ChefHat, color: 'bg-green-100 text-green-600' },
    { label: 'Часов сэкономлено', value: '24', icon: Clock, color: 'bg-orange-100 text-orange-600' },
  ];

  const menuItems = [
    { icon: Settings, label: 'Настройки диеты', value: 'Сбалансированная' },
    { icon: Star, label: 'Любимые рецепты', value: '15' },
    { icon: MapPin, label: 'Адреса доставки', value: 'Дом, Работа' },
    { icon: CreditCard, label: 'Подписка', value: 'Pro Plan', highlight: true },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto animate-slide-in-right">
      <div className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Профиль</h1>
        <button 
          onClick={onClose} 
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 pb-32">
        {/* Avatar & Info */}
        <div className="flex items-center gap-4 mb-8 animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-3xl font-bold border-4 border-white shadow-lg">
            A
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Анна Смирнова</h2>
            <p className="text-sm text-gray-500 mb-1">anna.smirnova@email.com</p>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full uppercase tracking-wide">
              <Star size={10} fill="currentColor" /> Pro Аккаунт
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8 animate-slide-up delay-100 opacity-0">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className={`w-8 h-8 rounded-full ${stat.color} flex items-center justify-center mb-2`}>
                <stat.icon size={16} />
              </div>
              <span className="text-lg font-bold text-gray-900 leading-none mb-1">{stat.value}</span>
              <span className="text-[10px] text-gray-500 font-medium leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8 animate-slide-up delay-200 opacity-0">
          {menuItems.map((item, i) => (
            <button 
              key={i} 
              className="w-full p-4 flex items-center justify-between border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.highlight ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'} group-hover:scale-110 transition-transform`}>
                  <item.icon size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                  {item.value && <p className="text-xs text-gray-500">{item.value}</p>}
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button className="w-full p-4 rounded-xl border border-red-100 text-red-600 bg-red-50 font-medium flex items-center justify-center gap-2 hover:bg-red-100 transition-colors animate-slide-up delay-300 opacity-0">
          <LogOut size={18} />
          Выйти из аккаунта
        </button>

        <p className="text-center text-xs text-gray-400 mt-6 animate-fade-in delay-500">Версия 1.0.2 (Beta)</p>
      </div>
    </div>
  );
};

export default Profile;

