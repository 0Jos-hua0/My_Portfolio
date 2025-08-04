// CarGame.ts
import Phaser from 'phaser';

// Game configuration
const scene = {
  preload: function(this: Phaser.Scene) {
    // Load all game assets
    this.load.image('car', 'assets/Razor.png');
    this.load.image('coin', 'assets/coin.png');
    this.load.image('background', 'assets/background.png');
    
    ['obstacle1', 'obstacle2', 'obstacle3', 'obstacle4'].forEach((obstacle) => {
      this.load.image(obstacle, `assets/${obstacle}.png`);
    });
  },
  create: function(this: Phaser.Scene) {
    // Game world size (larger than visible area)
    const gameSize = { width: 1600, height: 1200 };
    
    // Set physics parameters in scene data
    this.data.set('acceleration', 10);
    this.data.set('deceleration', 25);
    this.data.set('maxSpeed', 500);
    this.data.set('reverseSpeed', 150);

    // Set up game world
    this.physics.world.setBounds(0, 0, gameSize.width, gameSize.height);
    this.add.tileSprite(0, 0, gameSize.width, gameSize.height, 'background')
      .setOrigin(0, 0);

    // Create player car
    const car = this.physics.add.sprite(
      gameSize.width / 2, 
      gameSize.height / 2, 
      'car'
    );
    
    car.setCollideWorldBounds(true)
       .setDrag(0.2) // Increased drag for better coasting
       .setMaxVelocity(this.data.get('maxSpeed'));
    
    if (car.body) {
      car.body.setSize(40, 20).setOffset(10, 10);
    }

    // Setup camera
    this.cameras.main
      .setBounds(0, 0, gameSize.width, gameSize.height)
      .startFollow(car)
      .setZoom(0.8);

    // Create coins
    const coins = this.physics.add.group();
    for (let i = 0; i < 20; i++) {
      const coin = coins.create(
        Phaser.Math.Between(50, gameSize.width - 50),
        Phaser.Math.Between(50, gameSize.height - 50),
        'coin'
      ).setScale(0.05);
      if (coin.body) {
        coin.body.setCircle(15);
      }
    }

    // Create obstacles
    const obstacles = this.physics.add.staticGroup();
    for (let i = 0; i < 15; i++) {
      const obstacle = obstacles.create(
        Phaser.Math.Between(50, gameSize.width - 50),
        Phaser.Math.Between(50, gameSize.height - 50),
        `obstacle${Phaser.Math.Between(1, 4)}`
      ).setScale(1);
      if (obstacle.body) {
        obstacle.body.setSize(obstacle.width * 0.7, obstacle.height * 0.7);
      }
    }

    // Set up controls
    const cursors = this.input.keyboard?.createCursorKeys();

    // Score text
    const scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      color: '#000',
      backgroundColor: '#fff',
      padding: { x: 10, y: 5 }
    }).setScrollFactor(0);

    // Collision handlers
    this.physics.add.collider(car, obstacles);
    
    this.physics.add.overlap(
      car,
      coins,
      (_, coin) => {
        (coin as Phaser.Physics.Arcade.Sprite).disableBody(true, true);
        scoreText.setText(`Score: ${parseInt(scoreText.text.split(' ')[1]) + 10}`);
        
        this.time.delayedCall(5000, () => {
          if (coins.getLength() < 20) {
            (coin as Phaser.Physics.Arcade.Sprite).enableBody(
              true,
              Phaser.Math.Between(50, gameSize.width - 50),
              Phaser.Math.Between(50, gameSize.height - 50),
              true,
              true
            );
          }
        });
      },
      undefined,
      this
    );

    // Store references in scene data
    this.data.set('car', car);
    this.data.set('cursors', cursors);
    this.data.set('scoreText', scoreText);
  },
  update: function(this: Phaser.Scene) {
      const car = this.data.get('car') as Phaser.Physics.Arcade.Sprite;
      const cursors = this.data.get('cursors') as Phaser.Types.Input.Keyboard.CursorKeys;
      const acceleration = this.data.get('acceleration');
      const deceleration = this.data.get('deceleration');
      const maxSpeed = this.data.get('maxSpeed');
      const reverseSpeed = this.data.get('reverseSpeed');
    
      if (!car || !cursors || !car.body) return;
    
      // Type guard to ensure we have a dynamic body
      if (!(car.body instanceof Phaser.Physics.Arcade.Body)) return;
    
      // Steering
      const currentSpeed = Math.sqrt(car.body.velocity.x ** 2 + car.body.velocity.y ** 2);
      const maxTurningSpeed = 200; // degrees/sec at 0 speed
      const minTurningSpeed = 100;  // degrees/sec at max speed
      const speedRatio = Math.min(currentSpeed / maxSpeed, 1);
      const minSpeedForTurning = 5; // threshold to consider the car as 'moving'
      let effectiveTurningSpeed = 0;
      if (currentSpeed > minSpeedForTurning) {
        effectiveTurningSpeed = maxTurningSpeed * (1 - speedRatio) + minTurningSpeed * speedRatio;
      }

      if (cursors.left.isDown) {
        car.setAngularVelocity(-effectiveTurningSpeed);
      } else if (cursors.right.isDown) {
        car.setAngularVelocity(effectiveTurningSpeed);
      } else {
        car.setAngularVelocity(0);
      }
    
      // IMPROVED ACCELERATION SYSTEM
      if (cursors.up.isDown) {
        // Accelerate forward
        this.physics.velocityFromRotation(
          car.rotation,
          Math.min(currentSpeed + acceleration, maxSpeed),
          car.body.velocity
        );
      } else if (cursors.down.isDown) {
        // Brake or reverse
        this.physics.velocityFromRotation(
          car.rotation,
          Math.max(currentSpeed - deceleration, -reverseSpeed),
          car.body.velocity
        );
      } else {
        // Natural deceleration when no keys pressed
        if (currentSpeed > 0) {
          this.physics.velocityFromRotation(
            car.rotation,
            Math.max(currentSpeed - deceleration/2, 0),
            car.body.velocity
          );
        } else if (currentSpeed < 0) {
          this.physics.velocityFromRotation(
            car.rotation,
            Math.min(currentSpeed + deceleration/2, 0),
            car.body.velocity
          );
        }
      }
  }
};

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scene
};

export const initGame = (parent: HTMLDivElement): Phaser.Game => {
  config.parent = parent;
  return new Phaser.Game(config);
};