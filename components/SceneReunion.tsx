import React, { useState, useEffect } from "react";
import Decorations from "./Decorations";
import Confetti from "./Confetti";
import { HeartIcon } from "./Icons";

interface SceneReunionProps {
  onNextScene: () => void;
}

enum ReunionStep {
  Intro,
  Animating,
  Celebration,
}

const ReunionAnimation: React.FC = () => {
  const [progress, setProgress] = useState(0); // 0 to 1

  useEffect(() => {
    let start: number | null = null;
    const ANIMATION_DURATION = 4000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const currentProgress = Math.min(elapsed / ANIMATION_DURATION, 1);
      setProgress(currentProgress);

      if (elapsed < ANIMATION_DURATION) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, []);

  const distance = Math.floor(11400 * (1 - progress));
  // An easing function for a more dynamic movement
  const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

  // Position hearts from 10% from edge to the center (50%)
  const position = 10 + 40 * easedProgress;

  const personStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: `translateY(-50%) scale(${1 + easedProgress * 0.5})`,
    opacity: progress < 0.9 ? 1 : 1 - (progress - 0.9) * 10,
    transition: "opacity 100ms linear",
  };

  const mergedHeartStyle: React.CSSProperties = {
    opacity: progress > 0.9 ? (progress - 0.9) * 10 : 0,
    transform: `scale(${1 + (progress > 0.9 ? (progress - 0.9) * 10 : 0)})`,
    transition: "opacity 200ms linear, transform 200ms ease-out",
  };

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(148, 0, 211, 0.15) 0%, transparent 60%)`,
          opacity: progress,
          transition: "opacity 500ms ease-in",
        }}
      ></div>

      <div className="absolute w-full h-full">
        {/* Canada Heart (Left) */}
        <div
          style={{
            ...personStyle,
            left: `${position}%`,
            transform: `${personStyle.transform} translateX(-50%)`,
          }}
        >
          <HeartIcon className="text-rose-400 w-16 h-16 md:w-24 md:h-24" />
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white font-dancing text-2xl whitespace-nowrap">
            Canada (Tulsu)
          </span>
        </div>
        {/* India Heart (Right) */}
        <div
          style={{
            ...personStyle,
            right: `${position}%`,
            transform: `${personStyle.transform} translateX(50%)`,
          }}
        >
          <HeartIcon className="text-rose-400 w-16 h-16 md:w-24 md:h-24" />
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white font-dancing text-2xl whitespace-nowrap">
            India (Ujju)
          </span>
        </div>
      </div>

      {/* Merged Heart */}
      <div className="absolute" style={mergedHeartStyle}>
        <HeartIcon
          className="text-rose-300 w-32 h-32 md:w-48 md:h-48 animate-pulse"
          style={{ animationDuration: "1.5s" }}
        />
      </div>

      <div
        className="absolute top-1/2 mt-32 text-center"
        style={{
          opacity: 1 - easedProgress,
          transition: "opacity 500ms linear",
        }}
      >
        <p
          className="text-4xl md:text-6xl font-bold text-white"
          style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
        >
          {distance.toLocaleString()} km
        </p>
        <p className="text-xl md:text-2xl text-gray-200 mt-2">
          ...and counting down.
        </p>
      </div>
    </div>
  );
};

const SceneReunion: React.FC<SceneReunionProps> = ({ onNextScene }) => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<ReunionStep>(ReunionStep.Intro);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const startAnimation = () => {
    setStep(ReunionStep.Animating);
    setTimeout(() => {
      setStep(ReunionStep.Celebration);
      setShowConfetti(true);
    }, 4500); // a bit longer than animation duration
  };

  const renderContent = () => {
    switch (step) {
      case ReunionStep.Intro:
        return (
          <div className="animate-fade-in text-center">
            <h1 className="text-4xl md:text-5xl font-dancing text-yellow-200 mb-4">
              The Final Countdown
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100 max-w-2xl mx-auto mb-8">
              "And suddenly you know... it's time to start something new and
              trust the magic of beginnings."
            </p>
            <button
              onClick={startAnimation}
              className="px-8 py-4 bg-yellow-500 text-white font-bold rounded-full shadow-lg hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300"
            >
              Bring Us Together
            </button>
          </div>
        );
      case ReunionStep.Celebration:
        return (
          <div className="animate-fade-in text-center">
            <div className="relative mb-6">
              <HeartIcon
                className="w-24 h-24 text-rose-300 mx-auto animate-pulse"
                style={{ animationDuration: "1.5s" }}
              />
              <HeartIcon className="w-16 h-16 text-rose-300 mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-75 animate-ping" />
            </div>
            <h1 className="text-5xl md:text-7xl font-dancing text-rose-200 mb-4">
              Together At Last!
            </h1>
            <p className="text-2xl text-rose-100 mb-8 max-w-xl">
              We will be together soon, and this long distance will just be a
              beautiful memory in our story.
            </p>
            <button
              onClick={onNextScene}
              className="px-8 py-4 bg-rose-500 text-white font-bold rounded-full shadow-lg hover:bg-rose-600 transform hover:scale-105 transition-all duration-300"
            >
              Read Ujju's B'day Wish
            </button>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-8 text-center transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {showConfetti && <Confetti />}
      <Decorations />
      {step === ReunionStep.Animating && <ReunionAnimation />}
      {step !== ReunionStep.Animating && (
        <div
          className={`bg-black bg-opacity-40 p-10 rounded-2xl shadow-2xl max-w-3xl z-10 min-h-[24rem] flex items-center justify-center`}
        >
          {renderContent()}
        </div>
      )}
      <style>{`
                @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                animation: fade-in 0.8s ease-out forwards;
                }
            `}</style>
    </div>
  );
};

export default SceneReunion;
