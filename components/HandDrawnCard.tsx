
import React from 'react';

interface HandDrawnCardProps {
  children: React.ReactNode;
  variant?: 'white' | 'ghost' | 'glass';
  className?: string;
  hoverable?: boolean;
}

export const HandDrawnCard: React.FC<HandDrawnCardProps> = ({
  children,
  variant = 'white',
  className = '',
  hoverable = true
}) => {
  const getBg = () => {
    switch (variant) {
      case 'ghost': return 'bg-slate-50 border-slate-200';
      case 'glass': return 'bg-white/80 backdrop-blur-md border-white/40';
      case 'white':
      default: return 'bg-white border-slate-100';
    }
  };

  return (
    <div 
      className={`
        relative border rounded-2xl p-6 transition-all duration-300
        ${hoverable ? 'hover:-translate-y-1 hover:shadow-[0_12px_30px_-5px_rgba(79,72,229,0.12)]' : ''}
        shadow-[0_4px_20px_-2px_rgba(79,72,229,0.06)]
        ${getBg()} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};
