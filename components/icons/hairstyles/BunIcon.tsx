import React from 'react';

export const BunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-8 0a8 8 0 1016 0 8 8 0 10-16 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6m-3 0a3 3 0 106 0 3 3 0 10-6 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16c1-2 2-3 5-3s4 1 5 3" />
  </svg>
);
