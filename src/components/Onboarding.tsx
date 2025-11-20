import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ShoppingCart, Search, UtensilsCrossed } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

type Option = {
  title: string;
  helper?: string;
  badge?: string;
};

type Question = {
  title: string;
  description?: string;
  options: Option[];
  shouldShow?: (answers: (string | null)[]) => boolean;
};

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const questions: Question[] = [
    {
      title: "Для кого готовим?",
      description: "Подберем рецепты и покажем нужное количество ингредиентов.",
      options: [
        {
          title: "Для всей семьи",
          helper: "5+ порций, чтобы всем хватило",
          badge: "Домохозяйки выбирают это"
        },
        {
          title: "Для себя",
          helper: "1-2 порции без лишних остатков",
          badge: "Персональный рацион"
        },
        {
          title: "Для пары",
          helper: "2-3 порции, можно с запасом",
          badge: "Совместные ужины"
        }
      ]
    },
    {
      title: "Какая цель питания?",
      description: "Соберем меню под ваш результат.",
      options: [
        { title: "Здоровое питание", helper: "Баланс БЖУ без сложностей" },
        { title: "Похудение", helper: "Контроль калорий и простые блюда" },
        { title: "Набор массы", helper: "Больше белка и сытные порции" },
        { title: "Экономия времени", helper: "Минимум готовки и посуды" }
      ],
      shouldShow: answers => answers[0] === "Для себя"
    },
    {
      title: "Есть ли ограничения?",
      description: "Уберем нежелательные продукты из меню.",
      options: [
        { title: "Нет ограничений" },
        { title: "Без глютена" },
        { title: "Без лактозы" },
        { title: "Без орехов" }
      ]
    }
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null)
  );

  const getVisibleQuestions = (currentAnswers = answers) =>
    questions
      .map((question, idx) => ({ question, idx }))
      .filter(({ question }) =>
        question.shouldShow ? question.shouldShow(currentAnswers) : true
      );

  const visibleQuestions = getVisibleQuestions();

  const featureIcons = [UtensilsCrossed, ShoppingCart, Search];

  const featureStyles = [
    { color: 'text-green-600', bg: 'bg-green-50' },
    { color: 'text-orange-600', bg: 'bg-orange-50' },
    { color: 'text-blue-600', bg: 'bg-blue-50' }
  ];

  const stepsCount = visibleQuestions.length + 2;
  const isSummaryStep = step === stepsCount - 1;

  const handleStart = () => {
    setStep(1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 0));
  };

  const handleOptionSelect = (option: string, questionIndex: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = option;
    setAnswers(updatedAnswers);

    const updatedVisible = getVisibleQuestions(updatedAnswers);
    const currentVisibleIndex = updatedVisible.findIndex(
      ({ idx }) => idx === questionIndex
    );
    const nextStep = Math.min(
      currentVisibleIndex + 2,
      updatedVisible.length + 1
    );

    setStep(nextStep);
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
                Учитываем цели и количество порций — все ингредиенты сразу в списке покупок.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Личный план питания на каждый день",
                "Список покупок с точными граммовками",
                "Поиск блюд по тому, что есть дома"
              ].map((text, idx) => (
                <div
                  key={text}
                  className="p-4 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium flex items-center gap-3 animate-slide-up opacity-0"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-lg ${featureStyles[idx].bg} ${featureStyles[idx].color}`}
                  >
                    {React.createElement(featureIcons[idx], { size: 20 })}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{text}</p>
                    {idx === 0 && <p className="text-sm text-gray-500">Для мам, которые готовят сразу на 4-6 человек.</p>}
                    {idx === 1 && <p className="text-sm text-gray-500">Чтобы всегда хватало на всю семью.</p>}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleStart}
              className="w-full p-4 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors active:scale-[0.98]"
            >
              Начать
            </button>
          </div>
        ) : isSummaryStep ? (
          <div className="animate-slide-up space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Готово! Вот что вы выбрали</h1>
              <p className="text-gray-500">Мы учтем это, чтобы подобрать персональное меню и список покупок.</p>
            </div>

            <div className="space-y-3">
              {visibleQuestions.map(({ question, idx }) => (
                <div
                  key={question.title}
                  className="p-4 rounded-xl border border-gray-200 bg-white flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{question.title}</p>
                    <p className="text-lg font-semibold text-gray-900">{answers[idx] || 'Не выбрано'}</p>
                  </div>
                  <Check className="text-green-500" size={20} />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleBack}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 active:scale-[0.98]"
              >
                <ArrowLeft size={18} />
                Назад
              </button>

              <button
                onClick={onComplete}
                className="w-full p-4 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors active:scale-[0.98]"
              >
                Поехали!
              </button>
            </div>
          </div>
        ) : (
          <div key={step} className="animate-slide-up">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{visibleQuestions[step - 1].question.title}</h1>
            <p className="text-gray-500 mb-8">{visibleQuestions[step - 1].question.description || 'Мы подберем меню персонально для вас.'}</p>

            <div className="space-y-3">
              {visibleQuestions[step - 1].question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(opt.title, visibleQuestions[step - 1].idx)}
                  style={{ animationDelay: `${idx * 100}ms` }}
                  className="group w-full text-left p-4 rounded-xl border border-gray-200 transition-all duration-200 font-medium text-gray-700 flex justify-between items-center gap-3 opacity-0 animate-slide-up active:scale-[0.98] active:bg-green-50 active:border-green-200 active:text-green-800"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold text-gray-900">{opt.title}</span>
                    {opt.helper && <span className="text-sm text-gray-500">{opt.helper}</span>}
                    {opt.badge && (
                      <span className="inline-flex w-fit items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  <ArrowRight className="text-gray-300 transition-transform duration-200 group-active:text-green-500 group-active:translate-x-1" size={20} />
                </button>
              ))}
            </div>

            <button
              onClick={handleBack}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 active:scale-[0.98]"
            >
              <ArrowLeft size={18} />
              Назад
            </button>
          </div>
        )}
      </div>
      <div className="text-center text-gray-400 text-sm animate-fade-in delay-300 mt-10">Шаг {step + 1} из {stepsCount}</div>
    </div>
  );
};

export default Onboarding;
