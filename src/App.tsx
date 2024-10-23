import React from 'react';
import DraggableBallsRod from './components/DraggableBallsRod';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Magnetic Balls</h1>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <DraggableBallsRod />
      </div>
      <p className="mt-4 text-gray-600">Drag the balls to see the magnetic effect</p>
    </div>
  );
}

export default App;