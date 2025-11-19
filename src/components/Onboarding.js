import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const questions = [
    {
      title: "Какая у вас цель?",
      options: ["Питаться здоровее", "Сэкономить время", "Похудеть", "Набрать массу"]
    },
    {
      title: "Сколько времени есть на готовку?",
      options: ["До 15 минут", "30-40 минут", "Люблю готовить долго", "Не хочу готовить"]
    },
    {
      title: "Есть ли аллергии?",
      options: ["Нет", "Глютен", "Лактоза", "Орехи"]
    }
  ];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 bg-white animate-fade-in">
      <div className="mt-10">
        <div className="flex gap-2 mb-8">
          {questions.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-green-600' : 'bg-gray-200'}`} />
          ))}
        </div>
        
        <div key={step} className="animate-slide-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{questions[step].title}</h1>
          <p className="text-gray-500 mb-8">Мы подберем меню персонально для вас.</p>
          
          <div className="space-y-3">
            {questions[step].options.map((opt, idx) => (
              <button 
                key={idx}
                onClick={handleNext}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200 font-medium text-gray-700 flex justify-between items-center group opacity-0 animate-slide-up active:scale-[0.98]"
              >
                {opt}
                <ArrowRight className="text-gray-300 group-hover:text-green-600 transition-transform group-hover:translate-x-1" size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm animate-fade-in delay-300">Шаг {step + 1} из {questions.length}</div>
    </div>
  );
};

export default Onboarding;

