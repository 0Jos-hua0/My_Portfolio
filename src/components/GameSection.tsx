import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameEngine } from './CarGame';

interface CarGameProps {
  width?: number;
  height?: number;
}

const CarGame: React.FC<CarGameProps> = ({ width = 800, height = 600 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameEngineRef = useRef<GameEngine | null>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [selectedCar, setSelectedCar] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [coinsCollected, setCoinsCollected] = useState<number>(0);
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [showLevelUp, setShowLevelUp] = useState<boolean>(false);
  const [canAdvanceLevel, setCanAdvanceLevel] = useState<boolean>(false);

  const cars = [
    { id: 'car1', name: 'Razor Classic', image: '/assets/Razor.png' },
    { id: 'car2', name: 'Razor Sport', image: '/assets/Razor1.png' },
    { id: 'car3', name: 'Razor Elite', image: '/assets/Razor2.png' }
  ];

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('carGameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Save high score to localStorage
  const updateHighScore = useCallback((newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('carGameHighScore', newScore.toString());
    }
  }, [highScore]);

  const startGame = useCallback(() => {
    if (!selectedCar || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    gameEngineRef.current = new GameEngine(canvas, ctx, selectedCar);
    
    gameEngineRef.current.onScoreUpdate = (newScore: number, newLevel: number, coins: number, totalCoinsInLevel: number) => {
      setScore(newScore);
      setLevel(newLevel);
      setCoinsCollected(coins);
      setTotalCoins(totalCoinsInLevel);
    };

    gameEngineRef.current.onGameOver = (finalScore: number, finalLevel: number) => {
      setGameState('gameOver');
      updateHighScore(finalScore);
    };

    gameEngineRef.current.onLevelUp = (newLevel: number) => {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2000);
    };

    gameEngineRef.current.onCanAdvance = (canAdvance: boolean) => {
      setCanAdvanceLevel(canAdvance);
    };

    setGameState('playing');
    setScore(0);
    setLevel(1);
    setCoinsCollected(0);
    setCanAdvanceLevel(false);
    gameEngineRef.current.start();
  }, [selectedCar, updateHighScore]);

  const resetGame = useCallback(() => {
    if (gameEngineRef.current) {
      gameEngineRef.current.stop();
      gameEngineRef.current = null;
    }
    setGameState('menu');
    setSelectedCar('');
    setScore(0);
    setLevel(1);
    setCoinsCollected(0);
    setCanAdvanceLevel(false);
  }, []);

  const advanceToNextLevel = useCallback(() => {
    if (gameEngineRef.current && canAdvanceLevel) {
      gameEngineRef.current.advanceToNextLevel();
    }
  }, [canAdvanceLevel]);

  const restartGame = useCallback(() => {
    if (gameEngineRef.current) {
      gameEngineRef.current.stop();
    }
    startGame();
  }, [startGame]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent arrow keys from scrolling the page during gameplay
      if (gameState === 'playing' && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
        event.preventDefault();
      }
      
      if (gameEngineRef.current && gameState === 'playing') {
        gameEngineRef.current.handleKeyPress(event);
      }
    };

    const handleKeyRelease = (event: KeyboardEvent) => {
      // Prevent arrow keys from scrolling the page during gameplay
      if (gameState === 'playing' && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
        event.preventDefault();
      }
      
      if (gameEngineRef.current && gameState === 'playing') {
        gameEngineRef.current.handleKeyRelease(event);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyRelease);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyRelease);
    };
  }, [gameState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gameEngineRef.current) {
        gameEngineRef.current.stop();
      }
    };
  }, []);

  return (
    <div id="game" className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Game Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-center mb-4 drop-shadow-lg">🏎️ Speed Racer Elite</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-xs opacity-80">Score</div>
                <div className="text-xl font-bold">{score.toLocaleString()}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-xs opacity-80">Level</div>
                <div className="text-xl font-bold">{level}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-xs opacity-80">Coins</div>
                <div className="text-xl font-bold">{coinsCollected}/{totalCoins}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-xs opacity-80">High Score</div>
                <div className="text-xl font-bold">{highScore.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {gameState === 'playing' && (
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress to Next Level</span>
              <span className="text-sm text-gray-600">{Math.round((coinsCollected / totalCoins) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  canAdvanceLevel
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                    : 'bg-gradient-to-r from-blue-400 to-purple-500'
                }`}
                style={{ width: `${Math.min((coinsCollected / totalCoins) * 100, 100)}%` }}
              ></div>
              <div 
                className="absolute h-3 w-1 bg-yellow-400 shadow-lg"
                style={{ left: `${70}%`, transform: 'translateX(-50%)' }}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-3">
              {canAdvanceLevel ? (
                <div className="flex items-center justify-between w-full">
                  <span className="text-emerald-600 font-semibold text-sm">
                    ✅ Level unlocked! Ready to advance
                  </span>
                  <button
                    onClick={advanceToNextLevel}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
                  >
                    🚀 Next Level
                  </button>
                </div>
              ) : (
                <span className="text-amber-600 font-medium text-sm w-full text-center">
                  Collect {Math.ceil(totalCoins * 0.7) - coinsCollected} more coins to unlock progression
                </span>
              )}
            </div>
          </div>
        )}

        {/* Game Canvas */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-2">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="block bg-gray-200 rounded-lg shadow-inner"
            style={{ width: `${width}px`, height: `${height}px` }}
          />

          {/* Car Selection Menu */}
          {gameState === 'menu' && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl border border-gray-200">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Choose Your Ride
                  </h2>
                  <p className="text-gray-600">Select your vehicle and start racing!</p>
                </div>
                <div className="grid grid-cols-1 gap-4 mb-8">
                  {cars.map((car) => (
                    <button
                      key={car.id}
                      onClick={() => setSelectedCar(car.id)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                        selectedCar === car.id
                          ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg'
                          : 'border-gray-300 hover:border-indigo-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-6">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-20 h-20 object-contain drop-shadow-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        <div className="text-left">
                          <h3 className="font-bold text-xl text-gray-800">{car.name}</h3>
                          <p className="text-gray-500 text-sm mt-1">High performance racing machine</p>
                          {selectedCar === car.id && (
                            <div className="flex items-center mt-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              <span className="text-green-600 text-sm font-medium">Selected</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={startGame}
                  disabled={!selectedCar}
                  className="w-full py-4 px-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                >
                  🚀 Start Racing
                </button>
              </div>
            </div>
          )}

          {/* Level Up Notification */}
          {showLevelUp && gameState === 'playing' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none rounded-lg">
              <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white px-12 py-8 rounded-2xl shadow-2xl animate-bounce border-4 border-white">
                <h2 className="text-4xl font-bold text-center mb-2">🎉 LEVEL {level} 🎉</h2>
                <p className="text-center text-lg font-medium">Prepare for greater challenges!</p>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl border border-gray-200">
                <div className="mb-6">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
                    Game Over!
                  </h2>
                  <p className="text-gray-600">Better luck next time, racer!</p>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">{score.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Final Score</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{level}</div>
                      <div className="text-sm text-gray-600">Level Reached</div>
                    </div>
                  </div>
                  {score === highScore && score > 0 && (
                    <div className="mt-4 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
                      <p className="text-orange-600 font-bold">🎉 New High Score!</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={restartGame}
                    className="py-4 px-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    🔄 Race Again
                  </button>
                  <button
                    onClick={resetGame}
                    className="py-4 px-8 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-bold rounded-xl hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    🚗 Change Vehicle
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Game Controls */}
        {gameState === 'playing' && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 text-center border-t">
            <h3 className="font-semibold text-gray-800 mb-3">Game Controls</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <kbd className="px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm font-mono">↑/W</kbd>
                <span className="text-gray-600">Accelerate</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm font-mono">↓/S</kbd>
                <span className="text-gray-600">Reverse</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm font-mono">←→/AD</kbd>
                <span className="text-gray-600">Turn</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              💡 Collect 70% of coins to unlock level progression
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarGame;