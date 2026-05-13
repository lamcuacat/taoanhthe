import React from 'react';

export const PonytailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-8 0a8 8 0 1016 0 8 8 0 10-16 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 14c0 3-1 5-1 5s-1-2-1-5 1-4 1-4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v5" />
  </svg>
);
