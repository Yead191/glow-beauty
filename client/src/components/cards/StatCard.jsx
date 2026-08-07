import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'rose', subtitle }) => {
  const colorMap = {
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
  };

  const selectedColor = colorMap[color] || colorMap.rose;

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
          {title}
        </p>
        <h3 className="font-serif text-3xl font-bold text-gray-900 tracking-tight">
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1 font-medium">
            {subtitle}
          </p>
        )}
      </div>

      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${selectedColor}`}>
        {Icon && <Icon className="w-7 h-7" />}
      </div>
    </div>
  );
};

export default StatCard;
