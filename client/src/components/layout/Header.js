import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import ProgressRing from '../ui/ProgressRing';

const Header = ({ completionRate = 0 }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    const firstName = user?.name?.split(' ')[0] || 'there';
    
    if (hour < 12) {
      return {
        greeting: `Good morning, ${firstName} ☀️`,
        message: "Ready to crush your goals today?"
      };
    } else if (hour < 17) {
      return {
        greeting: `Good afternoon, ${firstName} 🌤️`,
        message: "Keep up the great momentum!"
      };
    } else {
      return {
        greeting: `Good evening, ${firstName} 🌙`,
        message: "Time to wrap up and plan tomorrow."
      };
    }
  };

  const { greeting, message } = getGreeting();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 p-8 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {greeting}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {message}
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          {/* Progress Section */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(completionRate)}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Completed
              </div>
            </div>
            <ProgressRing 
              progress={completionRate} 
              size={64} 
              className="text-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;