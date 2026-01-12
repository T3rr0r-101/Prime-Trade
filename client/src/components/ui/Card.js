import React from 'react';

const Card = ({ children, className = '', hover = false, padding = 'default' }) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`
      bg-white rounded-xl border border-gray-200 shadow-sm
      ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''}
      ${paddingClasses[padding]}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;