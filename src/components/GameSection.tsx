import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameEngine } from './CarGame';
import gamebg from '/assets/Gamebg.jpg';  // adjust path as needed


interface CarGameProps {
  width?: number;
  height?: number;
}

const CarGame: React.FC<CarGameProps> = ({ width = 1000, height = 600 }) => {
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

  const cars = [
    { id: 'car1', name: 'Razor Sport', image: '/assets/Razor.png' },
    { id: 'car2', name: 'Razor Classic', image: '/assets/Razor1.png' },
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

    setGameState('playing');
    setScore(0);
    setLevel(1);
    setCoinsCollected(0);
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
  }, []);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4 text-white relative overflow-hidden"
    style={{ backgroundImage: `url(${gamebg})` }}>
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Game Header */}
        <div className="bg-gradient-to-r from-orange-600 to-purple-600 text-white p-4">
          <h1 className="text-3xl font-bold text-center">🏎️ Speed Racer</h1>
          <div className="flex justify-between items-center mt-2 text-sm">
            <div>Score: <span className="font-bold">{score}</span></div>
            <div>Level: <span className="font-bold">{level}</span></div>
            <div>Coins: <span className="font-bold">{coinsCollected}/{totalCoins}</span></div>
            <div className="text-sm">High Score: <span className="font-bold">{highScore}</span></div>
          </div>
          {gameState === 'playing' && (
            <div className="text-center mt-2 text-xs">
              {coinsCollected >= Math.ceil(totalCoins * 0.7) ? (
                <span className="text-green-200">✅ Ready to advance! Collect all coins or hit obstacle to progress</span>
              ) : (
                <span className="text-yellow-200">Collect {Math.ceil(totalCoins * 0.7) - coinsCollected} more coins to unlock next level</span>
              )}
            </div>
          )}
        </div>

        {/* Game Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="block bg-gray-200"
            style={{ width: `${width}px`, height: `${height}px` }}
          />

          {/* Car Selection Menu */}
          {gameState === 'menu' && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Choose Your Car</h2>
                <div className="grid grid-cols-1 gap-4 mb-6">
                  {cars.map((car) => (
                    <button
                      key={car.id}
                      onClick={() => setSelectedCar(car.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedCar === car.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-orange-300 hover:border-orange-400'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-16 h-16 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        <div>
                        <h3 className="font-semibold text-lg text-violet-400">{car.name}</h3>

                          <p className="text-gray-600 text-sm">Click to select</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={startGame}
                  disabled={!selectedCar}
                  className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                >
                  Start Game
                </button>
              </div>
            </div>
          )}

          {/* Level Up Notification */}
          {showLevelUp && gameState === 'playing' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-yellow-400 text-black px-8 py-4 rounded-lg shadow-lg animate-bounce">
                <h2 className="text-2xl font-bold text-center">🎉 LEVEL {level} 🎉</h2>
                <p className="text-center">Get ready for more challenges!</p>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
                <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over!</h2>
                <div className="text-xl mb-4">
                  <p className="text-yellow-600 font-bold mt-2">Final Score: <span className="font-bold text-red-600">{score}</span></p>
                  <p className="text-yellow-600 font-bold mt-2">Level Reached: <span className="font-bold text-red-600">{level}</span></p>
                  {score === highScore && score > 0 && (
                    <p className="text-yellow-600 font-bold mt-2">🎉 New High Score!</p>
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={restartGame}
                    className="py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={resetGame}
                    className="py-3 px-6 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-bold rounded-lg hover:from-gray-600 hover:to-gray-800 transition-all duration-200"
                  >
                    Choose Different Car
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Game Controls */}
        {gameState === 'playing' && (
          <div className="bg-gray-100 p-4 text-center">
            <p className="text-sm text-gray-600">
              <kbd className="px-2 py-1 bg-gray-300 rounded">↑/W</kbd> Accelerate • <kbd className="px-2 py-1 bg-gray-300 rounded">↓/S</kbd> Reverse • <kbd className="px-2 py-1 bg-gray-300 rounded">←/A</kbd> <kbd className="px-2 py-1 bg-gray-300 rounded">→/D</kbd> Turn • Collect 70% coins to unlock progression
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarGame;