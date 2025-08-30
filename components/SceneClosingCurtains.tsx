import React, { useState } from 'react';
import Confetti from './Confetti';

const SceneClosingCurtains: React.FC = () => {
  const [isClosing, setIsClosing] = useState(false);
  
  const handleEnd = () => {
    setIsClosing(true);
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {isClosing && <Confetti />}
      
      {/* Left Curtain */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-rose-800 transition-transform duration-[2500ms] ease-in-out z-10 shadow-2xl ${
          isClosing ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ boxShadow: '-5px 0 15px rgba(0,0,0,0.5)' }}
      >
        <div className="w-full h-full bg-gradient-to-r from-rose-900 to-rose-700"></div>
      </div>
      
      {/* Right Curtain */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-rose-800 transition-transform duration-[2500ms] ease-in-out z-10 shadow-2xl ${
          isClosing ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ boxShadow: '5px 0 15px rgba(0,0,0,0.5)' }}
      >
        <div className="w-full h-full bg-gradient-to-l from-rose-900 to-rose-700"></div>
      </div>
      
      <div className={`z-20 text-center transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="text-4xl md:text-6xl font-dancing text-rose-200 mb-4">Happy Birthday once again, my love.</h1>
          <p className="text-3xl md:text-5xl font-dancing text-rose-100 mb-8">I Love You.</p>
          <button
              onClick={handleEnd}
              className="px-8 py-4 bg-rose-500 text-white font-bold rounded-full shadow-lg hover:bg-rose-600 transform hover:scale-105 transition-all duration-300"
          >
              The End
          </button>
      </div>
    </div>
  );
};

export default SceneClosingCurtains;
