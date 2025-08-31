import React, { useState, useEffect } from "react";
import Decorations from "./Decorations";

interface SceneTimelineProps {
  onNextScene: () => void;
}

const timelineData = [
  {
    month: "March 2024",
    quote:
      "The beginning of a new chapter, marked by distance but defined by love.",
  },
  {
    month: "April 2024",
    quote:
      "Every sunrise feels a little warmer knowing you're watching it too.",
  },
  {
    month: "May 2024",
    quote: "Learning to find you in the lyrics of every love song.",
  },
  {
    month: "June 2024",
    quote: "The days are long, but our conversations make them worth it.",
  },
  {
    month: "July 2024",
    quote:
      "Missing you is a constant ache, but loving you is a constant strength.",
  },
  {
    month: "August 2024",
    quote:
      "The hardest storms test the strongest anchors. We held on, even when it hurt.",
  },
  {
    month: "September 2024",
    quote:
      "We fought for this. We chose each other. And we came out stronger than ever.",
  },
  {
    month: "October 2024",
    quote: "Autumn leaves fall, but my love for you only grows.",
  },
  {
    month: "November 2024",
    quote: "Even in the cold, the thought of you keeps my heart warm.",
  },
  {
    month: "December 2024",
    quote: "Another year ends, but our forever is just beginning.",
  },
  { month: "January 2025", quote: "New year, same dream: being with you." },
  {
    month: "February 2025",
    quote: "Love knows no distance, especially not on Valentine's Day.",
  },
  {
    month: "March 2025",
    quote: "A year of distance has only brought our hearts closer.",
  },
  {
    month: "April 2025",
    quote:
      "Spring is here, and with it, the promise of new beginnings together.",
  },
  {
    month: "May 2025",
    quote: "Planning our adventures for when 'someday' becomes 'today'.",
  },
  { month: "June 2025", quote: "Summer is coming, and so is our reunion." },
  {
    month: "July 2025",
    quote: "So close I can almost feel your hand in mine.",
  },
  {
    month: "August 2025",
    quote: "The final countdown. Every moment is electric with anticipation.",
  },
  {
    month: "September 2025",
    quote: "The wait is over. Our forever starts now.",
  },
];

const SceneTimeline: React.FC<SceneTimelineProps> = ({ onNextScene }) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Fade in on mount
    const timer = setTimeout(() => setFade(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (index < timelineData.length - 1) {
      setIndex(index + 1);
    } else {
      onNextScene();
    }
  };

  const currentItem = timelineData[index];
  const prevItem = index > 0 ? timelineData[index - 1] : null;

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-8 text-center transition-opacity duration-1000 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      <Decorations />
      <div className="bg-black bg-opacity-40 p-10 rounded-2xl shadow-2xl max-w-3xl z-10">
        <h1 className="text-4xl md:text-5xl font-dancing text-sky-200 mb-2">
          Our Journey Through Time
        </h1>
        <p className="text-lg text-sky-100 mb-8">
          From March 17th, 2024 to September 4th, 2025
        </p>

        <div key={index} className="animate-fade-in">
          <div className="min-h-[10rem] flex flex-col items-center justify-center bg-black bg-opacity-20 rounded-lg p-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              {currentItem.month}
            </h2>
            <p className="text-xl md:text-2xl text-sky-100">
              "{currentItem.quote}"
            </p>
          </div>

          {prevItem && (
            <div className="mt-6 opacity-75 text-center px-4">
              <p className="text-md text-sky-200 font-semibold">
                ...from {prevItem.month}:
              </p>
              <p className="text-lg text-sky-100 italic">"{prevItem.quote}"</p>
            </div>
          )}
        </div>

        <button
          onClick={handleNext}
          className="mt-8 px-8 py-4 bg-sky-500 text-white font-bold rounded-full shadow-lg hover:bg-sky-600 transform hover:scale-105 transition-all duration-300"
        >
          {index < timelineData.length - 1 ? "Next Month" : "The Wait Is Over"}
        </button>
      </div>
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

export default SceneTimeline;
