import React from 'react';

const StatsCard = ({ 
  title, 
  count, 
  icon, 
  color = 'blue', 
  helperText, 
  progress,
  children 
}) => {
  const colorClasses = {
    blue: {
      accent: 'bg-gradient-to-r from-blue-500 to-blue-600',
      iconBg: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      hoverColor: 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
    },
    yellow: {
      accent: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      iconBg: 'bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-900/30 dark:to-orange-800/30',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      hoverColor: 'group-hover:text-yellow-600 dark:group-hover:text-yellow-400'
    },
    green: {
      accent: 'bg-gradient-to-r from-green-500 to-emerald-600',
      iconBg: 'bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/30 dark:to-emerald-800/30',
      iconColor: 'text-green-600 dark:text-green-400',
      hoverColor: 'group-hover:text-green-600 dark:group-hover:text-green-400'
    },
    indigo: {
      accent: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      iconBg: 'bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-800/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      hoverColor: 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className={`h-1.5 ${colors.accent}`}></div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              {title}
            </p>
            <p className={`text-3xl font-bold text-gray-900 dark:text-white mt-2 transition-colors duration-300 ${colors.hoverColor}`}>
              {count}
            </p>
            {helperText && (
              <div className="flex items-center mt-2 text-sm">
                <span className="text-green-500 font-medium">+12%</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">{helperText}</span>
              </div>
            )}
            {progress && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${colors.accent}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {children}
            <div className={`w-14 h-14 ${colors.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <div className={`w-7 h-7 ${colors.iconColor}`}>
                {icon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;