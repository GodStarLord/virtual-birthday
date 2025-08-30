import React from 'react';

const Balloon: React.FC<{color: string, position: string, animationDelay: string, size?: string}> = ({color, position, animationDelay, size = 'w-24 h-32'}) => (
    <div className={`absolute ${size} rounded-full ${color} ${position} animate-float`} style={{ animationDelay }}>
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-4 h-4 bg-inherit rounded-b-full"></div>
        <div className="absolute top-4 left-4 w-8 h-8 bg-white opacity-20 rounded-full"></div>
    </div>
);

const ShootingStar: React.FC<{ top: string, left: string, animationDelay: string, animationDuration: string }> = ({ top, left, animationDelay, animationDuration }) => (
  <div
    className="absolute h-1 w-24 bg-gradient-to-r from-white to-transparent rounded-full opacity-0"
    style={{
      top,
      left,
      animation: `shoot ${animationDuration} ${animationDelay} ease-in-out infinite`,
    }}
  ></div>
);

const Star: React.FC<{ top: string, left: string, animationDelay: string, size?: string }> = ({ top, left, animationDelay, size = 'w-2 h-2' }) => (
  <div
    className={`absolute ${size} bg-yellow-200 rounded-full animate-twinkle`}
    style={{ top, left, animationDelay }}
  ></div>
);

const PartyHat: React.FC<{ top: string, position: string, animationDelay: string, rotation: string }> = ({ top, position, animationDelay, rotation }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100" 
        className={`absolute w-16 h-16 animate-float-light ${position}`}
        style={{ top, animationDelay, '--initial-rotate': rotation } as React.CSSProperties}
    >
        <defs>
            <linearGradient id="hatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#67e8f9', stopOpacity: 1}} /> 
            <stop offset="100%" style={{stopColor: '#a855f7', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <polygon points="50,10 90,90 10,90" fill="url(#hatGradient)" />
        <circle cx="50" cy="10" r="8" className="fill-current text-pink-400" />
        <circle cx="30" cy="75" r="5" className="fill-current text-yellow-300" />
        <circle cx="50" cy="60" r="5" className="fill-current text-yellow-300" />
        <circle cx="70" cy="75" r="5" className="fill-current text-yellow-300" />
    </svg>
);


const Decorations: React.FC = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-40 pointer-events-none overflow-hidden">
            <style>{`
                @keyframes float {
                  0%, 100% { transform: translateY(0px) rotate(5deg); }
                  50% { transform: translateY(-30px) rotate(-5deg); }
                }
                .animate-float {
                  animation: float 8s ease-in-out infinite;
                }
                @keyframes shoot {
                  0% {
                    transform: translateX(120vw) translateY(-20vh) rotate(215deg);
                    opacity: 1;
                  }
                  100% {
                    transform: translateX(-20vw) translateY(80vh) rotate(215deg);
                    opacity: 0;
                  }
                }
                @keyframes twinkle {
                  0%, 100% { opacity: 0.5; transform: scale(0.8); }
                  50% { opacity: 1; transform: scale(1); }
                }
                .animate-twinkle {
                  animation: twinkle 4s ease-in-out infinite;
                }
                @keyframes float-light {
                  0%, 100% { transform: translateY(0px) rotate(var(--initial-rotate, 0deg)); }
                  50% { transform: translateY(-15px) rotate(calc(var(--initial-rotate, 0deg) + 5deg)); }
                }
                .animate-float-light {
                  animation: float-light 6s ease-in-out infinite;
                }
            `}</style>
            {/* Balloons */}
            <Balloon color="bg-rose-500" position="top-[5%] left-[5%]" animationDelay="0s" />
            <Balloon color="bg-pink-500" position="top-[10%] right-[10%]" animationDelay="2s" size="w-20 h-28"/>
            <Balloon color="bg-purple-500" position="bottom-[15%] left-[15%]" animationDelay="4s" size="w-16 h-24"/>
            <Balloon color="bg-sky-500" position="bottom-[10%] right-[5%]" animationDelay="6s" />
            <Balloon color="bg-amber-500" position="bottom-[50%] left-[2%]" animationDelay="1s" size="w-12 h-16"/>
            <Balloon color="bg-teal-500" position="top-[25%] right-[2%]" animationDelay="3s" size="w-14 h-20"/>

            {/* Shooting Stars */}
            <ShootingStar top="20%" left="-20%" animationDelay="1s" animationDuration="5s" />
            <ShootingStar top="40%" left="-20%" animationDelay="4s" animationDuration="4s" />

            {/* Twinkling Stars */}
            <Star top="15%" left="25%" animationDelay="0.5s" />
            <Star top="50%" left="80%" animationDelay="1.5s" size="w-3 h-3" />
            <Star top="80%" left="10%" animationDelay="2.5s" />
            <Star top="30%" left="95%" animationDelay="0s" size="w-3 h-3"/>
            <Star top="90%" left="60%" animationDelay="3s" />

            {/* Party Hats */}
            <PartyHat top="15%" position="left-[30%]" animationDelay="1s" rotation="-15deg" />
            <PartyHat top="60%" position="right-[20%]" animationDelay="3s" rotation="20deg" />
        </div>
    )
}

export default Decorations;