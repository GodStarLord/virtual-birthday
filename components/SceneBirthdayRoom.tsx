import React, { useState, useEffect } from 'react';
import { CakeIcon } from './Icons';
import Decorations from './Decorations';

interface SceneBirthdayRoomProps {
  onNextScene: () => void;
}

const SceneBirthdayRoom: React.FC<SceneBirthdayRoomProps> = ({ onNextScene }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center text-center p-8 transition-opacity duration-1000 overflow-hidden ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <Decorations />

      <div className="relative bg-black bg-opacity-30 p-8 rounded-2xl shadow-2xl max-w-2xl z-10">
        <h1 className="text-4xl md:text-6xl font-dancing text-pink-300 mb-4">
          Welcome to the Celebration!
        </h1>
        <p className="text-lg md:text-xl text-pink-100 mb-8">
          A special room, just for you, filled with party decorations. And look, there's a cake waiting!
        </p>
        <div className="my-12 animate-pulse">
            <CakeIcon className="w-32 h-32 text-pink-400 mx-auto" />
        </div>
        <button
          onClick={onNextScene}
          className="px-8 py-4 bg-pink-500 text-white font-bold rounded-full shadow-lg hover:bg-pink-600 transform hover:scale-105 transition-all duration-300"
        >
          Let's go to the cake
        </button>
      </div>
    </div>
  );
};

export default SceneBirthdayRoom;
