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
const BLOCK_WIDTH = 41;
const BLOCK_SPACE = 5;
const BLOCK_HEIGHT = 20;

const levelmap = [
        [5,6,1,2,3,4,5,6,5,4,3,2,1,6,5],
        [6,1,2,3,4,5,6,1,6,5,4,3,2,1,6],
        [1,2,3,4,5,6,1,2,1,6,5,4,3,2,1],
        [2,3,4,5,6,1,2,3,2,1,6,5,4,3,2],
        [3,4,5,6,1,2,3,4,3,2,1,6,5,4,3],
        [4,5,6,1,2,3,4,5,4,3,2,1,6,5,4]
        ];

class MyGame extends Phaser.Scene
{

    keyboard;

    /** @type {Phaser.Physics.Arcade.Image} */
    paddle;

    /** @type {Phaser.Physics.Arcade.Image} */
    ball;

    blocks = [];
    preload()
    {  
        this.load.image('ball', ball_img);
        this.load.image('paddle', paddle_img);
        this.load.image('block_1', block_1_img);
        this.load.image('block_2', block_2_img);
        this.load.image('block_3', block_3_img);
        this.load.image('block_4', block_4_img);
        this.load.image('block_5', block_5_img);
        this.load.image('block_6', block_6_img);
    }

    create()
    {
        this.ball = this.physics.add.image(400, 300, 'ball');
        this.ball.setVelocity(100);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);

        this.paddle = this.physics.add.image(400, 550, 'paddle');
        this.paddle.setCollideWorldBounds(true);
        this.paddle.setPushable(false);

        this.physics.add.collider(this.paddle,this.ball);

        this.keyboard = this.input.keyboard.addKeys(
            {
                LEFT_KEY: Phaser.Input.Keyboard.KeyCodes.LEFT,
                RIGHT_KEY: Phaser.Input.Keyboard.KeyCodes.RIGHT
            });

        this.physics.world.checkCollision.down = false;

        this.loadBlocks();

    }

    loadBlocks()
    {
        const startYPosition = 20;
        for(let rowNumber = 0; rowNumber < levelmap.length; rowNumber++)
        {
            const numberOfBlocks = levelmap[rowNumber].length;
            const blockRowWidth = numberOfBlocks * BLOCK_WIDTH + (numberOfBlocks-1) * BLOCK_SPACE;
            const startXPosition = (this.renderer.width - blockRowWidth) / 2;

            for(let blockNumber = 0; blockNumber < levelmap[rowNumber].length ; blockNumber++)
            {
                const block_id = levelmap[rowNumber][blockNumber];
                if(block_id != 0)
                {
                    const block_key = 'block_' + block_id;
                    const xPositionBlock = startXPosition + blockNumber * (BLOCK_WIDTH + BLOCK_SPACE) + BLOCK_WIDTH / 2;
                    const yPositionBlock = startYPosition + rowNumber * (BLOCK_HEIGHT + BLOCK_SPACE) + BLOCK_HEIGHT / 2;
                    this.addBlock(xPositionBlock, yPositionBlock, block_key ); 
                }
            }
        }
    }

    addBlock(x, y, block_id){
        const block = this.physics.add.image(x, y, block_id);
        this.physics.add.collider(block, this.ball,this.removeBlock,null,this);
        block.setPushable(false);
        this.blocks.push(block);
    }

    /**
     * 
     * @param {Phaser.Physics.Arcade.Image} block 
     * @param {Phaser.Physics.Arcade.Image} ball 
     */
    removeBlock(block, ball) {
        console.log(this.blocks);
        console.log(this.blocks.indexOf(block));
        block.destroy();
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
