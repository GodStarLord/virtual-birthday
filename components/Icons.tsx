
import React from 'react';

interface IconProps {
    className?: string;
    // FIX: Add style property to allow passing inline styles to the icon components.
    style?: React.CSSProperties;
}

// FIX: Update component to accept and apply the style prop.
export const CakeIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-2-4.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm3 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-3 4.5c-2.48 0-4.5 2.02-4.5 4.5h9c0-2.48-2.02-4.5-4.5-4.5z" opacity=".3"/>
        <path d="M22 18v-2h-1.6c-.41-1.16-1.52-2-2.9-2s-2.49.84-2.9 2H3.4c-.41-1.16-1.52-2-2.9-2S-1.01 14.84-.6 16H-2v2h1.6c.41 1.16 1.52 2 2.9 2s2.49-.84 2.9-2h11.2c.41 1.16 1.52 2 2.9 2s2.49-.84 2.9-2H22zM12 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM3.5 12c.83 0 1.5-.67 1.5-1.5S4.33 9 3.5 9 2 9.67 2 10.5 2.67 12 3.5 12zm9-4.5c.83 0 1.5-.67 1.5-1.5S13.33 4.5 12.5 4.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM12 7.5c-2.48 0-4.5-2.02-4.5-4.5h9c0 2.48-2.02 4.5-4.5 4.5z"/>
    </svg>
);

// FIX: Update component to accept and apply the style prop.
export const HeartIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
);
