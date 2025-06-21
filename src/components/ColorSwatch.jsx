import React from 'react';

const ColorSwatch = () => {
  const colorGroups = [
    {
      name: 'Lavender',
      prefix: 'lavender',
      shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    {
      name: 'Secondary',
      prefix: 'secondary',
      shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    {
      name: 'Primary',
      prefix: 'primary',
      shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Color Palette</h1>
      
      {colorGroups.map((group) => (
        <div key={group.name} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">{group.name} Colors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {group.shades.map((shade) => (
              <div key={`${group.prefix}-${shade}`} className="flex flex-col items-center">
                <div 
                  className={`w-full h-20 rounded-lg mb-2 bg-${group.prefix}-${shade} border border-gray-200`}
                />
                <span className="text-sm font-mono text-gray-700">
                  {group.prefix}-{shade}
                </span>
                <span className="text-xs text-gray-500">
                  hover:bg-{group.prefix}-{shade}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-12 p-6 bg-lavender-100 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Example Usage</h2>
        <div className="space-y-4">
          <button className="px-4 py-2 bg-lavender-300 hover:bg-lavender-400 text-lavender-900 rounded-md transition-colors">
            Lavender Button
          </button>
          <div className="p-4 border-l-4 border-lavender-500 bg-lavender-50 text-lavender-800">
            This is an info box using lavender colors
          </div>
          <div className="flex space-x-4">
            <div className="w-12 h-12 rounded-full bg-lavender-200 flex items-center justify-center">
              <span className="text-lavender-800 font-bold">A</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-lavender-300 flex items-center justify-center">
              <span className="text-lavender-900 font-bold">B</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-lavender-400 flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSwatch;
