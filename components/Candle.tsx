
import React from 'react';

interface CandleProps {
  lit: boolean;
}

const Candle: React.FC<CandleProps> = ({ lit }) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Flame */}
      <div className={`absolute -top-6 w-4 h-6 transition-opacity duration-500 ${lit ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute bottom-0 w-full h-full bg-amber-400 rounded-t-full rounded-b-sm animate-pulse"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-2/3 bg-yellow-200 rounded-t-full rounded-b-sm"></div>
      </div>
      {/* Candle Body */}
      <div className="w-3 h-16 bg-gradient-to-b from-pink-200 to-rose-200 rounded-t-sm shadow-md"></div>
    </div>
  );
};

export default Candle;
