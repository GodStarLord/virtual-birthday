import React, { useState, useEffect } from "react";
import Candle from "./Candle";
import Confetti from "./Confetti";
import Decorations from "./Decorations";

interface SceneCakeProps {
  onNextScene: () => void;
}

enum CakeStep {
  MakeWish,
  BlowCandles,
  Celebrate,
  Next,
}

const SceneCake: React.FC<SceneCakeProps> = ({ onNextScene }) => {
  const [step, setStep] = useState<CakeStep>(CakeStep.MakeWish);
  const [candlesLit, setCandlesLit] = useState<boolean[]>(Array(5).fill(true));
  const [showConfetti, setShowConfetti] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleBlowCandles = () => {
    setCandlesLit(Array(5).fill(false));
    setStep(CakeStep.Celebrate);
    setShowConfetti(true);
    setTimeout(() => setStep(CakeStep.Next), 3000);
  };

  const renderStepContent = () => {
    switch (step) {
      case CakeStep.MakeWish:
        return (
          <>
            <h2 className="text-3xl font-dancing text-amber-200 mb-4 animate-fade-in">
              Close your eyes and make a wish...
            </h2>
            <button
              onClick={() => setStep(CakeStep.BlowCandles)}
              className="px-6 py-3 bg-sky-500 text-white font-bold rounded-full shadow-lg hover:bg-sky-600 transition-transform hover:scale-105"
            >
              I've made my wish
            </button>
          </>
        );
      case CakeStep.BlowCandles:
        return (
          <>
            <h2 className="text-3xl font-dancing text-amber-200 mb-4">
              Now, blow out the candles!
            </h2>
            <button
              onClick={handleBlowCandles}
              className="px-6 py-3 bg-pink-500 text-white font-bold rounded-full shadow-lg hover:bg-pink-600 transition-transform hover:scale-105"
            >
              *Blow*
            </button>
          </>
        );
      case CakeStep.Celebrate:
        return (
          <h2 className="text-4xl font-dancing text-yellow-300 animate-bounce">
            Happy Birthday Tulsu 🎂🥳🎈🎉🎊!!!
          </h2>
        );
      case CakeStep.Next:
        return (
          <>
            <h2 className="text-3xl font-dancing text-pink-200 mb-4">
              The cake was delicious! Let's continue...
            </h2>
            <button
              onClick={onNextScene}
              className="px-6 py-3 bg-purple-500 text-white font-bold rounded-full shadow-lg hover:bg-purple-600 transition-transform hover:scale-105"
            >
              What's next?
            </button>
          </>
        );
    }
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-4 transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {showConfetti && <Confetti />}
      <Decorations />
      <div className="absolute top-[25%] md:top-[20%] text-center z-10">
        {renderStepContent()}
      </div>

      <div className="relative mt-48 md:mt-64">
        {/* Cake Base */}
        <div className="w-72 h-24 md:w-96 md:h-32 bg-yellow-800 rounded-t-2xl relative shadow-2xl">
          <div className="w-full h-8 bg-pink-300 absolute bottom-0"></div>
          <div className="w-full h-12 bg-opacity-50 bg-white absolute top-0 rounded-t-2xl"></div>
        </div>
        <div className="w-80 h-20 md:w-[420px] md:h-24 bg-yellow-900 rounded-2xl relative -top-2 mx-auto shadow-inner"></div>

        {/* Candles */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex justify-center items-end space-x-6">
          {candlesLit.map((lit, index) => (
            <Candle key={index} lit={lit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SceneCake;
