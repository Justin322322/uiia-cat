'use client';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Model } from './components/Model';

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [spinSpeed, setSpinSpeed] = useState(20);

  useEffect(() => {
    document.body.className = (!showWarning && isAnimating) ? 'strobe-effect' : '';
  }, [isAnimating, showWarning]);

  return (
    <div className="h-screen flex items-center justify-center relative pt-[30px]">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center bg-white rounded-xl p-6 shadow-xl">
          <h1 className="press-start text-4xl text-black mb-4">
            UIIA CAT
          </h1>
          
          {showWarning && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-red-600">
                <span className="text-2xl">⚠️</span>
                <h2 className="press-start text-xl">WARNING</h2>
              </div>
              <p className="text-gray-800 text-center font-bold max-w-[500px] mb-4">
                This page contains flashing lights and colors that may trigger seizures in people with photosensitive epilepsy.
              </p>
              <button
                onClick={() => setShowWarning(false)}
                className="press-start px-10 py-3 bg-black text-white rounded-lg 
                         hover:bg-gray-800 transition-colors text-lg
                         hover:scale-105 transform duration-200
                         shadow-lg hover:shadow-xl"
              >
                Continue
              </button>
            </div>
          )}
        </div>
        
        <div className="w-[min(70vh,90vw)] aspect-square relative">
          <Canvas className="!absolute inset-0">
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={60} />
            <Model isAnimating={isAnimating} spinSpeed={spinSpeed} />
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 2.5}
            />
          </Canvas>
        </div>

        <div className="flex flex-col items-center gap-4 z-10">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="press-start px-20 py-10 bg-black text-white rounded-lg 
                     hover:bg-gray-800 transition-colors text-3xl
                     hover:scale-110 transform duration-200 uppercase
                     shadow-lg hover:shadow-xl"
          >
            uiia
          </button>
          
          <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
            <label className="press-start text-sm">Speed:</label>
            <input
              type="range"
              min="5"
              max="50"
              value={spinSpeed}
              onChange={(e) => setSpinSpeed(Number(e.target.value))}
              className="w-48"
            />
            <span className="press-start text-sm">{spinSpeed}x</span>
          </div>
        </div>
      </div>
    </div>
  );
}
