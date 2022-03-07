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

class MyGame extends Phaser.Scene
{

    preload()
    {  
        this.load.image('ball', ball_img);
    }

    create()
    {
        const ball = this.physics.add.sprite(300, 400, 'ball');
    }

    update(time, delta)
    {

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
            gravity: { y: 20 }
        }
    }
};

const game = new Phaser.Game(config);
