import React from 'react';

export const LongStraightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-8 0a8 8 0 1016 0 8 8 0 10-16 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10V20" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 10V20" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9a3 3 0 116 0" />
  </svg>
);
