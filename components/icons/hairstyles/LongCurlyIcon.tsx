import React from 'react';

export const LongCurlyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-8 0a8 8 0 1016 0 8 8 0 10-16 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10c0 1.5.5 3 1.5 4s1.5 2 1.5 3v1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 10c0 1.5-.5 3-1.5 4s-1.5 2-1.5 3v1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 13c0 1.5.5 3 1.5 4s1.5 2 1.5 3v-1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 13c0 1.5-.5 3-1.5 4s-1.5 2-1.5 3v-1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9a3 3 0 116 0" />
  </svg>
);