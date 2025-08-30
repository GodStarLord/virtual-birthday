
import React, { useState, useEffect } from 'react';

interface SceneCurtainsProps {
  onNextScene: () => void;
}

const SceneCurtains: React.FC<SceneCurtainsProps> = ({ onNextScene }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsFading(true);
      }, 1500); // Start fading the button after curtains start opening
      const sceneTimer = setTimeout(() => {
        onNextScene();
      }, 2500); // Transition to next scene after animation
      return () => {
        clearTimeout(timer);
        clearTimeout(sceneTimer);
      };
    }
  }, [isOpen, onNextScene]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {/* Left Curtain */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-rose-800 transition-transform duration-[2000ms] ease-in-out z-10 shadow-2xl ${
          isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{ boxShadow: '-5px 0 15px rgba(0,0,0,0.5)' }}
      >
        <div className="w-full h-full bg-gradient-to-r from-rose-900 to-rose-700"></div>
      </div>
      {/* Right Curtain */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-rose-800 transition-transform duration-[2000ms] ease-in-out z-10 shadow-2xl ${
          isOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{ boxShadow: '5px 0 15px rgba(0,0,0,0.5)' }}
      >
        <div className="w-full h-full bg-gradient-to-l from-rose-900 to-rose-700"></div>
      </div>
      
      {!isOpen && (
        <div className="z-20 text-center">
            <h1 className="text-5xl md:text-7xl font-dancing text-rose-200 mb-4 animate-pulse">A Special Surprise...</h1>
            <button
              onClick={() => setIsOpen(true)}
              className={`px-8 py-4 bg-rose-500 text-white font-bold rounded-full shadow-lg hover:bg-rose-600 transform hover:scale-105 transition-all duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
            >
              Click to Reveal
            </button>
        </div>
      )}
    </div>
  );
};

export default SceneCurtains;
