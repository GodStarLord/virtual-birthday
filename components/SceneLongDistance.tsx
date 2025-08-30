import React, { useState, useEffect, useMemo } from 'react';
import Decorations from './Decorations';

interface SceneLongDistanceProps {
  onNextScene: () => void;
}

const AnimatedItem: React.FC<{ children: React.ReactNode; className: string; style: React.CSSProperties }> = ({ children, className, style }) => (
    <div className={`absolute flex items-center justify-center text-center flex-col text-lg text-white bg-black bg-opacity-40 p-3 rounded-lg animate-fade-in-float ${className}`} style={style}>
        {children}
    </div>
);

const SunIcon: React.FC = () => (
    <div className="w-16 h-16 bg-yellow-300 rounded-full shadow-[0_0_20px_5px] shadow-yellow-300/50 flex items-center justify-center">
        <div className="w-12 h-12 bg-yellow-200 rounded-full"></div>
    </div>
);

const MoonIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-16 h-16" style={{ filter: 'drop-shadow(0 0 10px rgba(226, 232, 240, 0.7))' }}>
        <defs>
            <linearGradient id="moon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0" /> 
                <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
        </defs>
        <path
            d="M 50 0 A 50 50 0 1 0 50 100 A 40 40 0 1 1 50 0 Z"
            fill="url(#moon-gradient)"
        />
    </svg>
);

const StarryNight: React.FC = () => {
    const stars = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 2 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {stars.map(star => (
                <div
                    key={star.id}
                    className="absolute bg-white rounded-full animate-twinkle"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        animationDelay: star.animationDelay,
                        animationDuration: star.animationDuration
                    }}
                ></div>
            ))}
        </div>
    );
};


const SceneLongDistance: React.FC<SceneLongDistanceProps> = ({ onNextScene }) => {
    const [visible, setVisible] = useState(false);
    const [rotation, setRotation] = useState(-90); // Start with sun on the left (Canada)

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            // 360 degrees over 30 seconds
            setRotation(((timestamp / 30000) * 360 - 90) % 360);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const rotationRad = rotation * (Math.PI / 180);
    const sunX = Math.sin(rotationRad); // Ranges from -1 (left) to 1 (right)

    const canadaDayOpacity = Math.min(1, Math.max(0, (-sunX + 0.2) * 1.5));
    const indiaDayOpacity = Math.min(1, Math.max(0, (sunX + 0.2) * 1.5));
    
    const canadaActivityOpacity = canadaDayOpacity * 0.8 + 0.2;
    const indiaActivityOpacity = indiaDayOpacity * 0.8 + 0.2;

    return (
        <div className={`relative w-full h-full flex flex-col items-center justify-center p-4 text-center transition-opacity duration-1000 overflow-hidden ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <style>{`
                @keyframes fade-in-float {
                    0% { opacity: 0; transform: translateY(20px) scale(0.9); }
                    100% { opacity: 1; transform: translateY(0px) scale(1); }
                }
                .animate-fade-in-float { animation: fade-in-float 1s ease-out forwards; }
                
                @keyframes twinkle {
                  0%, 100% { opacity: 0.2; }
                  50% { opacity: 1; }
                }
                .animate-twinkle {
                  animation: twinkle 4s ease-in-out infinite;
                }

                .bg-day-gradient { background-image: linear-gradient(to bottom, #87CEEB, #FDB813); }
                .bg-night-gradient { background-image: linear-gradient(to bottom, #0c1445, #2c3e50); }
            `}</style>
            
            {/* Dynamic Backgrounds */}
            <div className="absolute top-0 left-0 w-1/2 h-full">
                <div className="absolute inset-0 bg-night-gradient"><StarryNight /></div>
                <div className="absolute inset-0 bg-day-gradient" style={{ opacity: canadaDayOpacity, transition: 'opacity 1s linear' }}></div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full">
                <div className="absolute inset-0 bg-night-gradient"><StarryNight /></div>
                <div className="absolute inset-0 bg-day-gradient" style={{ opacity: indiaDayOpacity, transition: 'opacity 1s linear' }}></div>
            </div>
            <Decorations />

            {/* Celestial Rotation */}
            <div className="absolute top-1/2 left-1/2 w-[140vh] h-[140vh]" style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"><SunIcon /></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" style={{ transform: 'translateX(-50%) translateY(50%) rotate(180deg)' }}><MoonIcon /></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-dancing text-white mb-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>Our Long-Distance Life</h1>
                <p className="text-xl text-gray-200 mb-8" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>Juggling time zones, work, and life... but always making time for us.</p>
            </div>
            
            {/* Activities */}
            <div className="absolute inset-0 z-10">
                {/* Canada (Day) */}
                <AnimatedItem className="top-[25%] left-[10%]" style={{ animationDelay: '0.4s', opacity: canadaActivityOpacity, transition: 'opacity 1s ease-in-out' }}>
                    <span className="text-3xl">🏢</span><span>Work Shifts</span>
                </AnimatedItem>
                <AnimatedItem className="top-[50%] left-[20%]" style={{ animationDelay: '0.8s', opacity: canadaActivityOpacity, transition: 'opacity 1s ease-in-out' }}>
                    <span className="text-3xl">📚</span><span>Assignments</span>
                </AnimatedItem>
                 <AnimatedItem className="top-[70%] left-[15%]" style={{ animationDelay: '1.2s', opacity: canadaActivityOpacity, transition: 'opacity 1s ease-in-out' }}>
                    <span className="text-3xl">✈️</span><span>Travel</span>
                </AnimatedItem>

                {/* India (Night) */}
                 <AnimatedItem className="top-[20%] right-[12%]" style={{ animationDelay: '0.6s', opacity: indiaActivityOpacity, transition: 'opacity 1s ease-in-out' }}>
                    <span className="text-3xl">📱</span><span>Late Night Calls</span>
                </AnimatedItem>
                 <AnimatedItem className="top-[45%] right-[22%]" style={{ animationDelay: '1.0s', opacity: indiaActivityOpacity, transition: 'opacity 1s ease-in-out' }}>
                    <span className="text-3xl">🎬</span><span>Watching Movies</span>
                </AnimatedItem>
                <AnimatedItem className="top-[65%] right-[10%]" style={{ animationDelay: '1.4s', opacity: indiaActivityOpacity, transition: 'opacity 1s ease-in-out' }}>
                    <span className="text-3xl">💬</span><span>WhatsApp & Duo</span>
                </AnimatedItem>

                {/* Shared */}
                <AnimatedItem className="bottom-[10%] left-1/2 -translate-x-1/2" style={{ animationDelay: '1.6s' }}>
                    <div className="flex space-x-4">
                        <div className="flex flex-col items-center"><span className="text-3xl">😂</span><span>Laughter</span></div>
                        <div className="flex flex-col items-center"><span className="text-3xl">😠</span><span>Playful Fights</span></div>
                    </div>
                </AnimatedItem>

                <div className="absolute top-4 left-4 text-3xl font-bold font-dancing text-white" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Canada</div>
                <div className="absolute bottom-4 right-4 text-3xl font-bold font-dancing text-white" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>India</div>
            </div>

            <button
                onClick={onNextScene}
                className="absolute bottom-8 z-20 px-8 py-4 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-300"
            >
                See Our Timeline
            </button>
        </div>
    );
};

export default SceneLongDistance;