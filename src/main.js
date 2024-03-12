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
    constructor()
    {
        super();
    }

    preload()
    {
    }

    create()
    {
    }

    update(time, delta)
    {

    }


}

const config = {
    type: Phaser.AUTO,
    parent: 'breakout',
    width: 800,
    height: 600,
    scene: MyGame
};

const game = new Phaser.Game(config);
