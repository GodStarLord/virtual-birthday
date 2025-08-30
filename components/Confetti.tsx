
import React, { useMemo } from 'react';

const ConfettiPiece: React.FC<{ options: Record<string, string> }> = ({ options }) => {
  // Using inline styles here is necessary for randomization, which is not possible
  // with a finite set of Tailwind classes. This is a deliberate choice for UX.
  return <div style={options} className="absolute w-3 h-3 rounded-full"></div>;
};


const Confetti: React.FC = () => {
    const confettiPieces = useMemo(() => {
    const pieces = [];
    const colors = ['bg-pink-500', 'bg-yellow-400', 'bg-sky-400', 'bg-purple-500', 'bg-rose-500'];
    const animations = ['animate-bounce', 'animate-ping', 'animate-spin'];

    for (let i = 0; i < 100; i++) {
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const animationDuration = `${Math.random() * 2 + 3}s`;
      const animationDelay = `${Math.random() * 2}s`;
      const opacity = `${Math.random() * 0.5 + 0.5}`;
      const transform = `rotate(${Math.random() * 360}deg)`;
      const colorClass = colors[i % colors.length];
      
      pieces.push(
        <div
          key={i}
          className={`absolute w-3 h-5 ${colorClass} rounded-full`}
          style={{
            top: '-20%', // Start above the screen
            left: left,
            opacity: 0,
            animation: `fall ${animationDuration} ${animationDelay} linear forwards`,
            transform: transform,
          }}
        ></div>
      );
    }
    return pieces;
  }, []);

  return (
    <>
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50">
        {confettiPieces}
      </div>
    </>
  );
};

export default Confetti;
