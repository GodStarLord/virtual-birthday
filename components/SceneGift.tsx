import React, { useState, useEffect } from 'react';
import Decorations from './Decorations';
import { HeartIcon } from './Icons';

interface SceneGiftProps {
  onNextScene: () => void;
}

enum GiftStep {
  Present,
  Opened,
  Continue,
}

const SceneGift: React.FC<SceneGiftProps> = ({ onNextScene }) => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<GiftStep>(GiftStep.Present);
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const handleOpenGift = () => {
      setIsBoxOpen(true);
      setStep(GiftStep.Opened);
      setTimeout(() => {
          setStep(GiftStep.Continue);
      }, 2000);
  }

  const renderContent = () => {
      switch(step) {
          case GiftStep.Present:
              return (
                  <>
                    <h1 className="text-4xl font-dancing text-amber-200 mb-4">I have something for you...</h1>
                    <button onClick={handleOpenGift} className="px-6 py-3 bg-amber-500 text-white font-bold rounded-full shadow-lg hover:bg-amber-600 transition-transform hover:scale-105">
                        Open the Present
                    </button>
                  </>
              );
          case GiftStep.Opened:
               return <h1 className="text-4xl font-dancing text-amber-200 animate-pulse">It's our story...</h1>;
          case GiftStep.Continue:
               return (
                   <>
                    <h1 className="text-4xl font-dancing text-amber-200 mb-4">The story of us.</h1>
                    <button onClick={onNextScene} className="px-6 py-3 bg-rose-500 text-white font-bold rounded-full shadow-lg hover:bg-rose-600 transition-transform hover:scale-105">
                        Let's Begin
                    </button>
                   </>
               )
      }
  }


  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center p-4 transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <Decorations />

        <div className="absolute top-[25%] text-center z-20">
            {renderContent()}
        </div>

        <div className="relative mt-48 cursor-pointer group" onClick={step === GiftStep.Present ? handleOpenGift : undefined}>
            {/* Light glow on open */}
            <div className={`absolute -inset-8 bg-yellow-300 rounded-full blur-2xl transition-opacity duration-1000 delay-500 ${isBoxOpen ? 'opacity-50' : 'opacity-0'}`}></div>

            {/* Gift Box */}
            <div className="relative w-64 h-48">
                {/* Lid */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-72 h-12 bg-rose-600 rounded-t-lg shadow-lg transition-transform duration-1000 ease-in-out z-10 ${isBoxOpen ? '-translate-y-24 rotate-12' : ''}`}>
                     {/* Ribbon */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-rose-400"></div>
                </div>
                {/* Box Base */}
                <div className="absolute bottom-0 w-64 h-40 bg-rose-700 rounded-lg shadow-2xl">
                    {/* Ribbon */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-rose-500"></div>
                </div>
                {/* Heart inside */}
                 <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 delay-1000 ${isBoxOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <HeartIcon className="w-24 h-24 text-rose-300 animate-pulse"/>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default SceneGift;
