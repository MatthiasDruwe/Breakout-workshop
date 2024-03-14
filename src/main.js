import Phaser from 'phaser';
import paddle_img from './assets/paddle.png';
import ball_img from './assets/ball.png';
import block_1_img from './assets/block_1.png';
import block_2_img from './assets/block_2.png';
import block_3_img from './assets/block_3.png';
import block_4_img from './assets/block_4.png';
import block_5_img from './assets/block_5.png';
import block_6_img from './assets/block_6.png';
import sky_img from './assets/sky.jpg';

const PADDLE_VELOCITY = 150;
const LEFT_KEY = 'LEFT';
const RIGHT_KEY = 'RIGHT';

class MyGame extends Phaser.Scene
{

    keyboard;

    /** @type {Phaser.Physics.Arcade.Image} */
    paddle;

    preload()
    {  
        this.load.image('ball', ball_img);
        this.load.image('paddle', paddle_img);
    }

    create()
    {
        const ball = this.physics.add.image(400, 300, 'ball');
        ball.setVelocity(100);
        ball.setCollideWorldBounds(true);
        ball.setBounce(1);

        this.paddle = this.physics.add.image(400, 550, 'paddle');
        this.paddle.setCollideWorldBounds(true);


        this.keyboard = this.input.keyboard.addKeys(
            {
                LEFT_KEY: Phaser.Input.Keyboard.KeyCodes.LEFT,
                RIGHT_KEY: Phaser.Input.Keyboard.KeyCodes.RIGHT
            });

    }

    update(time, delta)
    {

        if(this.keyboard.LEFT_KEY.isDown) 
        {
            this.paddle.setVelocityX(-PADDLE_VELOCITY);
        }  
        else if(this.keyboard.RIGHT_KEY.isDown)
        {
            this.paddle.setVelocityX(PADDLE_VELOCITY);
        }
        else {
            this.paddle.setVelocityX(0);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: MyGame,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { 
                y: 0 
            }
        }
    }
};

const game = new Phaser.Game(config);
