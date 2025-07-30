import Phaser from 'phaser';

class CarGameScene extends Phaser.Scene {
  private car!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private speed = 0;
  private maxSpeed = 200;
  private acceleration = 300;
  private drag = 100;

  constructor() {
    super({ key: 'CarGameScene' });
  }

  preload() {
    // Create simple colored rectangles as sprites
    this.add.graphics()
      .fillStyle(0x4F46E5)
      .fillRect(0, 0, 40, 20)
      .generateTexture('car', 40, 20);

    this.add.graphics()
      .fillStyle(0x10B981)
      .fillRect(0, 0, 20, 20)
      .generateTexture('obstacle', 20, 20);

    this.add.graphics()
      .fillStyle(0xF59E0B)
      .fillRect(0, 0, 15, 15)
      .generateTexture('coin', 15, 15);
  }

  create() {
    // Create car
    this.car = this.physics.add.sprite(400, 300, 'car');
    this.car.setCollideWorldBounds(true);
    this.car.setDrag(this.drag);
    this.car.setMaxVelocity(this.maxSpeed);

    // Create some obstacles
    const obstacles = this.physics.add.staticGroup();
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(100, 700);
      const y = Phaser.Math.Between(100, 500);
      obstacles.create(x, y, 'obstacle');
    }

    // Create collectible coins
    const coins = this.physics.add.group();
    for (let i = 0; i < 8; i++) {
      const x = Phaser.Math.Between(50, 750);
      const y = Phaser.Math.Between(50, 550);
      coins.create(x, y, 'coin');
    }

    // Enable cursor keys
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Collision detection
    this.physics.add.collider(this.car, obstacles, () => {
      // Simple bounce effect
      this.car.setVelocity(this.car.body!.velocity.x * -0.5, this.car.body!.velocity.y * -0.5);
    });

    this.physics.add.overlap(this.car, coins, (car, coin) => {
      (coin as Phaser.Physics.Arcade.Sprite).destroy();
    });

    // Add instructions
    this.add.text(10, 10, 'Use Arrow Keys to Control the Car', {
      fontSize: '16px',
      color: '#1F2937'
    });

    this.add.text(10, 35, 'Collect yellow coins, avoid green obstacles!', {
      fontSize: '14px',
      color: '#6B7280'
    });
  }

  update() {
    // Handle input
    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.car.rotation, this.maxSpeed, this.car.body!.velocity);
    } else if (this.cursors.down.isDown) {
      this.physics.velocityFromRotation(this.car.rotation, -this.maxSpeed * 0.5, this.car.body!.velocity);
    }

    if (this.cursors.left.isDown) {
      this.car.setAngularVelocity(-200);
    } else if (this.cursors.right.isDown) {
      this.car.setAngularVelocity(200);
    } else {
      this.car.setAngularVelocity(0);
    }
  }
}

export const initGame = (parent: HTMLElement): Phaser.Game => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    parent: parent,
    backgroundColor: '#E0F2FE',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false
      }
    },
    scene: CarGameScene
  };

  return new Phaser.Game(config);
};