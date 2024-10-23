import React from 'react';
import { ROD_START, ROD_END } from './constants';

export const Rod: React.FC = () => (
  <>
    {/* Rod shadow */}
    <line 
      x1={ROD_START} 
      y1="102" 
      x2={ROD_END} 
      y2="102" 
      stroke="#CBD5E1" 
      strokeWidth="6" 
      strokeLinecap="round"
    />
    {/* Main rod */}
    <line 
      x1={ROD_START} 
      y1="100" 
      x2={ROD_END} 
      y2="100" 
      stroke="#475569" 
      strokeWidth="4" 
      strokeLinecap="round"
    />
  </>
);