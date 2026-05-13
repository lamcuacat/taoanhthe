import React from 'react';

export const QuiffIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-8 0a8 8 0 1016 0 8 8 0 10-16 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 10c1-3 3-4 5-3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12v-1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12v-1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 17s1-2 4-2 4 2 4 2" />
  </svg>
);
