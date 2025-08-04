import React, { useEffect, useRef } from 'react';
import { Gamepad2, Play } from 'lucide-react';
import { initGame } from '../game/CarGame';

const GameSection = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current && !gameInstanceRef.current) {
      gameInstanceRef.current = initGame(gameRef.current);
    }

    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section id="game" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Gamepad2 className="text-blue-600 mr-3" size={32} />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Interactive Demo
            </h2>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A fun car control game built with Phaser.js to demonstrate interactive web development skills. 
            Use arrow keys to control the car!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-100 rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Play className="text-green-600" size={20} />
                <span className="text-slate-700 font-medium">Use Arrow Keys to Control</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-600">
                <span className="px-3 py-1 bg-white rounded-full">↑ Accelerate</span>
                <span className="px-3 py-1 bg-white rounded-full">↓ Brake</span>
                <span className="px-3 py-1 bg-white rounded-full">← → Steer</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-inner">
              <div 
                ref={gameRef}
                className="w-full h-96 flex items-center justify-center bg-gradient-to-b from-sky-200 to-green-200"
              >
                
              </div>
            </div>

            <div className="mt-6 text-center">
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameSection;