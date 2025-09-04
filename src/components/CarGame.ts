interface Position {
  x: number;
  y: number;
}

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed?: number;
}

interface Car extends GameObject {
  image: HTMLImageElement | null;
  selectedCarId: string;
  angle: number;
  velocity: { x: number; y: number };
}

interface Coin extends GameObject {
  image: HTMLImageElement | null;
  collected: boolean;
}

interface Obstacle extends GameObject {
  image: HTMLImageElement | null;
  type: number;
  velocity?: { x: number; y: number };
}

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private car: Car;
  private coins: Coin[] = [];
  private obstacles: Obstacle[] = [];
  private background: HTMLImageElement | null = null;
  private coinImage: HTMLImageElement | null = null;
  private obstacleImages: HTMLImageElement[] = [];
  private gameRunning: boolean = false;
  private animationFrameId: number | null = null;
  private keys: { [key: string]: boolean } = {};
  private score: number = 0;
  private level: number = 1;
  private coinsCollected: number = 0;
  private totalCoinsInLevel: number = 25;
  private gameSpeed: number = 1;
  private canAdvanceLevel: boolean = false;

  // Callbacks
  public onScoreUpdate: ((score: number, level: number, coinsCollected: number, totalCoins: number) => void) | null = null;
  public onGameOver: ((finalScore: number, finalLevel: number) => void) | null = null;
  public onLevelUp: ((newLevel: number) => void) | null = null;
  public onCanAdvance: ((canAdvance: boolean) => void) | null = null;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, selectedCarId: string) {
    this.canvas = canvas;
    this.ctx = ctx;
    
    // Initialize car with realistic physics
    this.car = {
      x: canvas.width / 2 - 30,
      y: canvas.height / 2 - 20,
      width: 60,
      height: 40,
      speed: 3,
      image: null,
      selectedCarId,
      angle: 0,
      velocity: { x: 0, y: 0 }
    };

    this.loadImages();
  }

  private loadImages(): void {
    // Load background
    this.background = new Image();
    this.background.src = '/assets/Background.png';

    // Load car image based on selection
    this.car.image = new Image();
    const carImageMap: { [key: string]: string } = {
      'car1': '/assets/Razor.png',
      'car2': '/assets/Razor1.png',
      'car3': '/assets/Razor2.png'
    };
    this.car.image.src = carImageMap[this.car.selectedCarId] || '/assets/Razor.png';

    // Load coin image
    this.coinImage = new Image();
    this.coinImage.src = '/assets/coin.png';

    // Load obstacle images
    for (let i = 1; i <= 4; i++) {
      const obstacleImg = new Image();
      obstacleImg.src = `/assets/obstacle${i}.jpg`;
      this.obstacleImages.push(obstacleImg);
    }
  }

  public start(): void {
    this.gameRunning = true;
    this.score = 0;
    this.level = 1;
    this.coinsCollected = 0;
    this.canAdvanceLevel = false;
    this.coins = [];
    this.obstacles = [];
    this.gameSpeed = 1;
    this.car.angle = 0;
    this.car.velocity = { x: 0, y: 0 };
    this.car.x = this.canvas.width / 2 - 30;
    this.car.y = this.canvas.height / 2 - 20;
    
    this.generateLevel();
    this.gameLoop();
  }

  public advanceToNextLevel(): void {
    if (this.canAdvanceLevel) {
      this.levelUp();
    }
  }
  public stop(): void {
    this.gameRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public handleKeyPress(event: KeyboardEvent): void {
    this.keys[event.code] = true;
  }

  public handleKeyRelease(event: KeyboardEvent): void {
    this.keys[event.code] = false;
  }

  private generateLevel(): void {
    this.coins = [];
    this.obstacles = [];
    
    // Generate 20-30 coins randomly positioned
    this.totalCoinsInLevel = 25 + Math.floor(Math.random() * 11); // 20-30 coins
    
    for (let i = 0; i < this.totalCoinsInLevel; i++) {
      let coinX, coinY;
      let validPosition = false;
      let attempts = 0;
      
      // Try to find a valid position that doesn't overlap with car or other objects
      while (!validPosition && attempts < 50) {
        coinX = 30 + Math.random() * (this.canvas.width - 60);
        coinY = 30 + Math.random() * (this.canvas.height - 60);
        
        // Check distance from car
        const distFromCar = Math.sqrt(
          Math.pow(coinX - this.car.x, 2) + Math.pow(coinY - this.car.y, 2)
        );
        
        if (distFromCar > 100) {
          validPosition = true;
        }
        attempts++;
      }
      
      const coin: Coin = {
        x: coinX || 30 + Math.random() * (this.canvas.width - 60),
        y: coinY || 30 + Math.random() * (this.canvas.height - 60),
        width: 25,
        height: 25,
        image: this.coinImage,
        collected: false
      };
      this.coins.push(coin);
    }
    
    // Generate obstacles based on level
    const obstacleCount = Math.min(5 + this.level * 2, 15);
    
    for (let i = 0; i < obstacleCount; i++) {
      let obsX, obsY;
      let validPosition = false;
      let attempts = 0;
      
      while (!validPosition && attempts < 50) {
        obsX = 40 + Math.random() * (this.canvas.width - 80);
        obsY = 40 + Math.random() * (this.canvas.height - 80);
        
        // Check distance from car
        const distFromCar = Math.sqrt(
          Math.pow(obsX - this.car.x, 2) + Math.pow(obsY - this.car.y, 2)
        );
        
        // Check distance from coins
        let tooCloseToCoins = false;
        for (const coin of this.coins) {
          const distFromCoin = Math.sqrt(
            Math.pow(obsX - coin.x, 2) + Math.pow(obsY - coin.y, 2)
          );
          if (distFromCoin < 60) {
            tooCloseToCoins = true;
            break;
          }
        }
        
        if (distFromCar > 120 && !tooCloseToCoins) {
          validPosition = true;
        }
        attempts++;
      }
      
      const obstacleType = Math.floor(Math.random() * 4);
      const obstacle: Obstacle = {
        x: obsX || 40 + Math.random() * (this.canvas.width - 80),
        y: obsY || 40 + Math.random() * (this.canvas.height - 80),
        width: 45,
        height: 45,
        image: this.obstacleImages[obstacleType],
        type: obstacleType,
        velocity: this.level > 1 ? {
          x: (Math.random() - 0.5) * this.gameSpeed * 0.5,
          y: (Math.random() - 0.5) * this.gameSpeed * 0.5
        } : { x: 0, y: 0 }
      };
      this.obstacles.push(obstacle);
    }
  }

  private gameLoop(): void {
    if (!this.gameRunning) return;

    this.update();
    this.render();

    this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
  }

  private update(): void {
    // Realistic car movement with rotation
    const acceleration = 0.3;
    const friction = 0.95;
    const maxSpeed = 4;
    
    // Calculate current speed for dynamic turn rate
    let currentSpeed = Math.sqrt(this.car.velocity.x ** 2 + this.car.velocity.y ** 2);
    const speedRatio = currentSpeed / maxSpeed;
    
    // Dynamic turn speed: higher speed = less turning ability (more realistic)
    const baseTurnSpeed = 0.08;
    const turnSpeed = baseTurnSpeed * (1 - speedRatio * 0.6); // Reduce turning at high speed
    
    // Only allow turning if car is moving forward
    const isMovingForward = this.keys['ArrowUp'] || this.keys['KeyW'];
    const canTurn = currentSpeed > 0.5 || isMovingForward;

    // Handle turning (only when moving or accelerating)
    if (canTurn && (this.keys['ArrowLeft'] || this.keys['KeyA'])) {
      this.car.angle -= turnSpeed;
    }
    if (canTurn && (this.keys['ArrowRight'] || this.keys['KeyD'])) {
      this.car.angle += turnSpeed;
    }

    // Handle acceleration/deceleration
    if (this.keys['ArrowUp'] || this.keys['KeyW']) {
      this.car.velocity.x += Math.cos(this.car.angle) * acceleration;
      this.car.velocity.y += Math.sin(this.car.angle) * acceleration;
    }
    if (this.keys['ArrowDown'] || this.keys['KeyS']) {
      this.car.velocity.x -= Math.cos(this.car.angle) * acceleration * 0.5;
      this.car.velocity.y -= Math.sin(this.car.angle) * acceleration * 0.5;
    }

    // Apply friction
    this.car.velocity.x *= friction;
    this.car.velocity.y *= friction;

    // Limit max speed
    currentSpeed = Math.sqrt(this.car.velocity.x ** 2 + this.car.velocity.y ** 2);
    if (currentSpeed > maxSpeed) {
      this.car.velocity.x = (this.car.velocity.x / currentSpeed) * maxSpeed;
      this.car.velocity.y = (this.car.velocity.y / currentSpeed) * maxSpeed;
    }

    // Update car position
    this.car.x += this.car.velocity.x;
    this.car.y += this.car.velocity.y;

    // Keep car within bounds
    this.car.x = Math.max(0, Math.min(this.canvas.width - this.car.width, this.car.x));
    this.car.y = Math.max(0, Math.min(this.canvas.height - this.car.height, this.car.y));

    // Update moving obstacles (level 2+)
    if (this.level > 1) {
      this.obstacles.forEach(obstacle => {
        if (obstacle.velocity) {
          obstacle.x += obstacle.velocity.x;
          obstacle.y += obstacle.velocity.y;

          // Bounce off walls
          if (obstacle.x <= 0 || obstacle.x >= this.canvas.width - obstacle.width) {
            obstacle.velocity.x *= -1;
          }
          if (obstacle.y <= 0 || obstacle.y >= this.canvas.height - obstacle.height) {
            obstacle.velocity.y *= -1;
          }

          // Keep within bounds
          obstacle.x = Math.max(0, Math.min(this.canvas.width - obstacle.width, obstacle.x));
          obstacle.y = Math.max(0, Math.min(this.canvas.height - obstacle.height, obstacle.y));
        }
      });
    }

    // Check coin collection
    this.coins.forEach(coin => {
      if (!coin.collected && this.checkCollision(this.car, coin)) {
        coin.collected = true;
        this.coinsCollected++;
        this.score += 10;
        
        // Check if player can advance to next level (70%+ coins)
        const requiredCoins = Math.ceil(this.totalCoinsInLevel * 0.7);
        const newCanAdvance = this.coinsCollected >= requiredCoins;
        if (newCanAdvance !== this.canAdvanceLevel) {
          this.canAdvanceLevel = newCanAdvance;
          if (this.onCanAdvance) {
            this.onCanAdvance(this.canAdvanceLevel);
          }
        }
        
        if (this.onScoreUpdate) {
          this.onScoreUpdate(this.score, this.level, this.coinsCollected, this.totalCoinsInLevel);
        }
        
        // Auto advance if all coins collected (100%)
        if (this.coinsCollected >= this.totalCoinsInLevel) {
          this.levelUp();
          return;
        }
      }
    });

    // Check obstacle collision
    for (const obstacle of this.obstacles) {
      if (this.checkCollision(this.car, obstacle)) {
        // Always game over on collision - player must use button to advance
        this.gameOver();
        return;
      }
    }
  }

  private levelUp(): void {
    this.level++;
    this.coinsCollected = 0;
    this.canAdvanceLevel = false;
    this.gameSpeed = Math.min(3, 1 + (this.level - 1) * 0.3);
    
    if (this.onCanAdvance) {
      this.onCanAdvance(false);
    }
    
    if (this.onLevelUp) {
      this.onLevelUp(this.level);
    }
    
    // Generate new level
    setTimeout(() => {
      this.generateLevel();
    }, 1000);
  }

  private render(): void {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw background
    if (this.background && this.background.complete) {
      this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
    } else {
      // Fallback background with road texture
      const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
      gradient.addColorStop(0, '#2d5016');
      gradient.addColorStop(0.3, '#4a7c59');
      gradient.addColorStop(0.7, '#2d5016');
      gradient.addColorStop(1, '#1a3409');
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Draw road markings
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([15, 15]);
      
      // Horizontal lines
      for (let y = 100; y < this.canvas.height; y += 100) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.canvas.width, y);
        this.ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 100; x < this.canvas.width; x += 100) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.canvas.height);
        this.ctx.stroke();
      }
      
      this.ctx.setLineDash([]);
    }

    // Draw coins
    this.coins.forEach(coin => {
      if (!coin.collected) {
        if (this.coinImage && this.coinImage.complete) {
          this.ctx.drawImage(this.coinImage, coin.x, coin.y, coin.width, coin.height);
        } else {
          // Fallback coin rendering
          this.ctx.fillStyle = '#ffd700';
          this.ctx.beginPath();
          this.ctx.arc(coin.x + coin.width / 2, coin.y + coin.height / 2, coin.width / 2, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.strokeStyle = '#b8860b';
          this.ctx.lineWidth = 2;
          this.ctx.stroke();
        }
      }
    });

    // Draw obstacles
    this.obstacles.forEach(obstacle => {
      if (this.obstacleImages[obstacle.type] && this.obstacleImages[obstacle.type].complete) {
        this.ctx.drawImage(this.obstacleImages[obstacle.type], obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      } else {
        // Fallback obstacle rendering
        this.ctx.fillStyle = '#8b4513';
        this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        this.ctx.strokeStyle = '#654321';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      }
    });

    // Draw car with rotation
    this.ctx.save();
    this.ctx.translate(this.car.x + this.car.width / 2, this.car.y + this.car.height / 2);
    this.ctx.rotate(this.car.angle);
    
    if (this.car.image && this.car.image.complete) {
      this.ctx.drawImage(this.car.image, -this.car.width / 2, -this.car.height / 2, this.car.width, this.car.height);
    } else {
      // Fallback car rendering
      this.ctx.fillStyle = '#3182ce';
      this.ctx.fillRect(-this.car.width / 2, -this.car.height / 2, this.car.width, this.car.height);
      this.ctx.strokeStyle = '#2c5282';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(-this.car.width / 2, -this.car.height / 2, this.car.width, this.car.height);
    }
    
    this.ctx.restore();
  }

  private checkCollision(obj1: GameObject, obj2: GameObject): boolean {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
  }

  private gameOver(): void {
    this.gameRunning = false;
    if (this.onGameOver) {
      this.onGameOver(this.score, this.level);
    }
  }
}