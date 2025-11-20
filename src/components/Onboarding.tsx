import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
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

  const stepsCount = questions.length + 1;

  const handleNext = () => {
    if (step < stepsCount - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 bg-white animate-fade-in">
      <div className="mt-10">
        <div className="flex gap-2 mb-8">
          {Array.from({ length: stepsCount }).map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-green-600' : 'bg-gray-200'}`} />
          ))}
        </div>

        {step === 0 ? (
          <div className="animate-slide-up space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Устали каждый день думать “Что сегодня приготовить?”</h1>
              <p className="text-gray-500">
                Приложение составит готовое меню на день и на неделю.
                <br />
                Без стресса. Без выбора. Без головной боли.
              </p>
            </div>

            <div className="space-y-3">
              {["Личный план питания на каждый день", "Список покупок по рецептам", "Поиск блюд по тому, что есть дома"].map((text, idx) => (
                <div
                  key={text}
                  className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 text-gray-700 font-medium flex items-start gap-3 animate-slide-up opacity-0"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <span className="text-lg">{['🍽️', '🛒', '🔍'][idx]}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-full p-4 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors active:scale-[0.98]"
            >
              Начать
            </button>
          </div>
        ) : (
          <div key={step} className="animate-slide-up">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{questions[step - 1].title}</h1>
            <p className="text-gray-500 mb-8">Мы подберем меню персонально для вас.</p>

            <div className="space-y-3">
              {questions[step - 1].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={handleNext}
                  style={{ animationDelay: `${idx * 100}ms` }}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:border-bg-green-50 transition-all duration-200 font-medium text-gray-700 flex justify-between items-center group opacity-0 animate-slide-up active:scale-[0.98]"
                >
                  {opt}
                  <ArrowRight className="text-gray-300 group-hover:text-green-600 transition-transform group-hover:translate-x-1" size={20} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="text-center text-gray-400 text-sm animate-fade-in delay-300 mt-10">Шаг {step + 1} из {stepsCount}</div>
    </div>
  );
};

export default Onboarding;
