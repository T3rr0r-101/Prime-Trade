import React from 'react';
import Badge from '../ui/Badge';

const TaskCard = ({ 
  task, 
  onComplete, 
  onEdit, 
  onDelete, 
  isCompleting = false 
}) => {
  return (
    <div className={`
      group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 
      shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none hover:-translate-y-1 
      transition-all duration-200 p-6 relative
      ${isCompleting ? 'bg-green-50 dark:bg-green-900/20 animate-pulse' : ''}
    `}>
      <div className="flex items-start justify-between mb-4">
        <h3 className={`
          text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1
          ${isCompleting ? 'line-through text-green-700 dark:text-green-400' : ''}
        `}>
          {task.title}
        </h3>
      </div>
      
      {task.description && (
        <p className={`
          text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3
          ${isCompleting ? 'line-through text-green-600 dark:text-green-400' : ''}
        `}>
          {task.description}
        </p>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex gap-2">
          <Badge variant={task.status}>{task.status}</Badge>
          <Badge variant={task.priority}>{task.priority}</Badge>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      {/* Action Row - Hidden by default, shown on hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex gap-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600 p-1">
          {task.status !== 'completed' && (
            <button
              onClick={() => onComplete(task)}
              disabled={isCompleting}
              className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors disabled:opacity-50"
              title="Mark as completed"
            >
              {isCompleting ? (
                <svg className="w-4 h-4 text-green-600 dark:text-green-400 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          )}
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {isCompleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-green-50/90 dark:bg-green-900/50 backdrop-blur-sm rounded-xl">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-medium text-green-700 dark:text-green-300">Task Completed!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;