import React from 'react';

const Badge = ({ children, variant = 'default', size = 'sm' }) => {
  const variants = {
    default: 'bg-gray-50 text-gray-700 border border-gray-200',
    pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    'in-progress': 'bg-blue-50 text-blue-700 border border-blue-200',
    completed: 'bg-green-50 text-green-700 border border-green-200',
    low: 'bg-gray-50 text-gray-700 border border-gray-200',
    medium: 'bg-orange-50 text-orange-700 border border-orange-200',
    high: 'bg-red-50 text-red-700 border border-red-200'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};

export default Badge;