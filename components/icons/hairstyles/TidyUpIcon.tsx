import React from 'react';

export const TidyUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-8 0a8 8 0 1016 0 8 8 0 10-16 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 8.5l1.5-1.5 1.5 1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 15.5l1.5 1.5 1.5-1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 10l1.5-1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 15.5L8 14" />
  </svg>
);
