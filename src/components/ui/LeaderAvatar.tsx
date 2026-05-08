'use client';

import React, { useState } from 'react';

interface LeaderAvatarProps {
  name: string;
  image?: string;
  partyColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LeaderAvatar: React.FC<LeaderAvatarProps> = ({ name, image, partyColor = '#6366F1', size = 'md' }) => {
  const [error, setError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-12 h-12 text-xs',
    lg: 'w-14 h-14 text-lg'
  };

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center overflow-hidden border-2 border-white dark:border-zinc-800 shadow-sm shrink-0 bg-zinc-100 dark:bg-zinc-800 relative group`}>
      {image && !error ? (
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover select-none image-render-auto" 
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          onError={() => setError(true)}
          style={{ imageRendering: 'auto' }}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div 
            className="absolute inset-0 opacity-20" 
            style={{ backgroundColor: partyColor }}
          />
          {/* Professional Silhouette SVG */}
          <svg className="w-2/3 h-2/3 text-zinc-400 dark:text-zinc-600 mb-[-4px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span className="relative z-10 font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-tighter">
            {initials}
          </span>
        </div>
      )}
      
      {/* Party Indicator Badge */}
      <div 
        className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white dark:border-zinc-800 rounded-full shadow-sm z-20"
        style={{ backgroundColor: partyColor }}
      />
    </div>
  );
};
