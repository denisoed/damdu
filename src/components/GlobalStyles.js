import React from 'react';

const GlobalStyles = () => (
  <style>{`
    @keyframes slideUpFade {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .animate-slide-up {
      animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-scale-in {
      animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-slide-in-right {
      animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }
    
    .delay-0 { animation-delay: 0ms; }
    .delay-100 { animation-delay: 100ms; }
    .delay-200 { animation-delay: 200ms; }
    .delay-300 { animation-delay: 300ms; }
    .delay-400 { animation-delay: 400ms; }
    .delay-500 { animation-delay: 500ms; }
  `}</style>
);

export default GlobalStyles;

