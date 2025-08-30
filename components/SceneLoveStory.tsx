import React, { useState, useEffect } from 'react';
import { HeartIcon } from './Icons';
import Decorations from './Decorations';

interface SceneLoveStoryProps {
  onNextScene: () => void;
}

const storyParts = [
  {
    title: "Gulbarga: Where It All Began",
    text: "Our story began in the charming streets of Gulbarga. It feels like just yesterday we were sharing dreams under those familiar skies, not knowing we were at the very beginning of our forever, my dear Tulsu.",
  },
  {
    title: "Hyderabad: Our Moments",
    text: "Then came Hyderabad, a city that saw our love blossom. We had it all - the laughter over shared biryani, the joy of late-night rides, and the comfort of just being together.",
  },
  {
    title: "Coorg: An Unforgettable Escape",
    text: "Remember Coorg? The crisp, cold air, trekking through misty hills, dancing under the stars... We sang, we laughed, we lived. Every moment was pure magic, a memory I'll cherish forever.",
  },
  {
    title: "The Storm Before the Calm",
    text: "Like any great love story, we faced our tough times. Misunderstandings and sadness tested us, but through it all, our bond refused to break. It only made us stronger and more certain.",
  },
  {
    title: "India to Canada: A Test of Love",
    text: "And now, this... a new chapter that puts thousands of miles between us. Watching the distance grow has been the hardest part.",
    visual: 'map'
  },
  {
    title: "Our Unbreakable Bond",
    text: "This distance is just a number. It's teaching us patience, trust, and the true meaning of partnership. The thought of our reunion is the beautiful destination at the end of this journey.",
  },
];

const DistanceAnimation: React.FC = () => {
    const [distance, setDistance] = useState(0);
    const [separation, setSeparation] = useState(0);
    const MAX_DISTANCE = 11400;
    const ANIMATION_DURATION = 3000;

    useEffect(() => {
        let start: number | null = null;
        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const distanceProgress = Math.min((progress / ANIMATION_DURATION) * MAX_DISTANCE, MAX_DISTANCE);
            const visualProgress = Math.min((progress / ANIMATION_DURATION) * 100, 100);

            setDistance(Math.floor(distanceProgress));
            setSeparation(visualProgress);

            if (progress < ANIMATION_DURATION) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }, []);

    return (
        <div className="mt-6 text-sky-300 w-full flex flex-col items-center">
            <div className="w-full max-w-xs h-16 relative">
                 <div className="absolute top-0 w-4 h-4 bg-sky-400 rounded-full" style={{ left: `calc(50% - ${separation * 1.5}px)` }}></div>
                 <div className="absolute top-0 w-4 h-4 bg-sky-400 rounded-full" style={{ left: `calc(50% + ${separation * 1.5}px)` }}></div>
                
                 <div className="absolute top-[6px] h-1 bg-sky-400 bg-opacity-50 border-t border-b border-dotted border-sky-300" style={{ left: `calc(50% - ${separation * 1.5}px + 8px)`, width: `${separation * 3}px` }}></div>
                
                 <span className="absolute -bottom-6 font-bold text-lg" style={{ left: `calc(50% - ${separation * 1.5}px - 25px)` }}>INDIA</span>
                 <span className="absolute -bottom-6 font-bold text-lg" style={{ left: `calc(50% + ${separation * 1.5}px - 30px)` }}>CANADA</span>
            </div>
            <p className="text-2xl font-bold mt-4">{distance.toLocaleString()} km</p>
            <p className="text-sm mt-1">And one unbreakable bond.</p>
        </div>
    );
};


const SceneLoveStory: React.FC<SceneLoveStoryProps> = ({ onNextScene }) => {
  const [partIndex, setPartIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(true);
  }, [partIndex]);
  
  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      if (partIndex < storyParts.length - 1) {
        setPartIndex(partIndex + 1);
      } else {
        onNextScene();
      }
    }, 500);
  };

  const currentPart = storyParts[partIndex];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center">
      <Decorations />
      <div className={`bg-black bg-opacity-40 p-10 rounded-2xl shadow-2xl max-w-3xl transition-opacity duration-500 z-10 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        <HeartIcon className="w-16 h-16 text-rose-400 mx-auto mb-6 animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-dancing text-rose-200 mb-4">{currentPart.title}</h1>
        <div className="h-48 flex flex-col items-center justify-center">
          {currentPart.visual === 'map' ? (
             <DistanceAnimation />
          ) : (
            <p className="text-xl md:text-2xl text-rose-100">
              {currentPart.text}
            </p>
          )}
        </div>
        <button
          onClick={handleNext}
          className="mt-8 px-8 py-4 bg-rose-500 text-white font-bold rounded-full shadow-lg hover:bg-rose-600 transform hover:scale-105 transition-all duration-300"
        >
          {partIndex < storyParts.length - 1 ? 'And then...' : "Our Journey Ahead"}
        </button>
      </div>
    </div>
  );
};

export default SceneLoveStory;
