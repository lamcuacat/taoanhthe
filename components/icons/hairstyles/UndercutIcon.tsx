import React from 'react';

export const UndercutIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-8 0a8 8 0 1016 0 8 8 0 10-16 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8v-3a4 4 0 10-8 0v3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 13v1m8-1v1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 17s1-2 4-2 4 2 4 2" />
  </svg>
);
