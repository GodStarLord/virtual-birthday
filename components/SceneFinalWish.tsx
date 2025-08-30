import React, { useState, useEffect } from 'react';
import { HeartIcon } from './Icons';
import Decorations from './Decorations';

interface SceneFinalWishProps {
  onNextScene: () => void;
}

const SceneFinalWish: React.FC<SceneFinalWishProps> = ({ onNextScene }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);


  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center p-8 text-center transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <Decorations />
      <div className="bg-black bg-opacity-40 p-10 rounded-2xl shadow-2xl max-w-3xl relative z-10">
        <h1 className="text-5xl md:text-7xl font-dancing text-pink-300 mb-6">
          Happy Birthday, My Dearest Tulsi
        </h1>
        <p className="text-lg md:text-xl text-pink-100 my-4 leading-relaxed">
            To my friend, my best friend, my girlfriend, my greatest strength, my everything... my Tulsu. You are the most incredible person I know, and today, the world celebrates you.
        </p>
        <p className="text-lg md:text-xl text-pink-100 my-4 leading-relaxed">
            Though thousands of miles may keep us apart today, my heart is right there with you, celebrating every single thing that makes you, you. This distance is temporary. Our love is permanent.
        </p>
        <p className="text-2xl md:text-3xl text-pink-100 my-8 leading-relaxed font-bold">
            We will overcome this. We will be together. And our story, the one we are writing across continents, will be our greatest victory.
        </p>
        <p className="text-3xl md:text-4xl font-dancing text-pink-200 mt-8">
            I love you more than words can say.
        </p>
        <div className="flex justify-center items-center mt-8 space-x-4 text-rose-400">
            <HeartIcon className="w-8 h-8 animate-pulse" style={{animationDelay: '0.2s'}}/>
            <span className="text-xl font-bold">Forever and always.</span>
            <HeartIcon className="w-8 h-8 animate-pulse" style={{animationDelay: '0.4s'}}/>
        </div>
        <button
            onClick={onNextScene}
            className="mt-10 px-8 py-4 bg-purple-500 text-white font-bold rounded-full shadow-lg hover:bg-purple-600 transform hover:scale-105 transition-all duration-300 animate-pulse"
            style={{ animationDuration: '3s' }}
        >
            Continue
        </button>
      </div>
    </div>
  );
};

export default SceneFinalWish;