import React from 'react';

export const KeepOriginalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-8 0a8 8 0 1016 0 8 8 0 10-16 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10l-2 2 2 2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l2 2-2 2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 15.5c-1 0-2-1-2-2.5s1-2.5 2-2.5" />
  </svg>
);
