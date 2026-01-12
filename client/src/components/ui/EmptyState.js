import React from 'react';
import Button from './Button';

const EmptyState = ({ 
  title = "All caught up!", 
  message = "Time to relax or create something new.", 
  actionText = "Add Task",
  onAction,
  icon = "celebration"
}) => {
  const icons = {
    celebration: (
      <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tasks: (
      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  };

  return (
    <div className="text-center py-12 px-6">
      <div className="animate-bounce">
        {icons[icon]}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">{message}</p>
      {onAction && (
        <Button 
          onClick={onAction}
          className="animate-pulse hover:animate-none"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;