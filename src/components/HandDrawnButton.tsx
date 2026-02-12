
import React from 'react';
import { SHADOWS } from '../constants';

interface HandDrawnButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Added 'accent' to the allowed variants to match the usage in the switch statement
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Renamed to match the request but internally styling is Corporate Trust
 */
export const HandDrawnButton: React.FC<HandDrawnButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-primary text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.35)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.45)]';
      case 'secondary':
        return 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100';
      case 'outline':
        return 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300';
      case 'ghost':
        return 'bg-transparent text-slate-600 hover:bg-slate-100';
      case 'accent': // Mapping old prop
        return 'bg-emerald-500 text-white hover:bg-emerald-600';
      default:
        return 'bg-indigo-600 text-white hover:bg-indigo-700';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm': return 'px-3 py-1.5 text-sm';
      case 'lg': return 'px-8 py-3.5 text-lg font-bold';
      case 'md':
      default: return 'px-5 py-2.5 text-base font-semibold';
    }
  };

  return (
    <button
      className={`
        relative inline-flex items-center justify-center rounded-xl transition-all duration-200
        hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none
        ${getVariantStyles()} ${getSizeStyles()} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
