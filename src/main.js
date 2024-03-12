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
const SPACE = 'SPACE';
const BLOCK_WIDTH = 41;
const BLOCK_SPACE = 5;
const BLOCK_HEIGHT = 20;

const levelmap = [
    [5 ,6 ,1 ,2 ,3 ,4 ,5 ,6 ,5 ,4 ,3 ,2 ,1 ,6 ,5],
    [6 ,1 ,2 ,3 ,4 ,5 ,6 ,1 ,6 ,5 ,4 ,3 ,2 ,1 ,6],
    [1 ,2 ,3 ,4 ,5 ,6 ,1 ,2 ,1 ,6 ,5 ,4 ,3 ,2 ,1],
    [2 ,3 ,4 ,5 ,6 ,1 ,2 ,3 ,2 ,1 ,6 ,5 ,4 ,3 ,2],
    [3 ,4 ,5 ,6 ,1 ,2 ,3 ,4 ,3 ,2 ,1 ,6 ,5 ,4 ,3],
    [4 ,5 ,6 ,1 ,2 ,3 ,4 ,5 ,4 ,3 ,2 ,1 ,6 ,5 ,4]
  ];

class MyGame extends Phaser.Scene
{

    keyboard;

    /** @type {Phaser.Physics.Arcade.Image} */
    paddle;

    /** @type {Phaser.Physics.Arcade.Image} */
    ball;

    /** @type {Phaser.GameObjects.Text} */
    centerText;
    
    /** @type {Phaser.GameObjects.Text} */
    scoreText;

    /** @type {Phaser.GameObjects.Text} */
    livesText;


    ballVelocity = 100;
    gameStarted = false;

    blocks = [];

    score = 0;
    lives = 3;
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

        this.centerText = this.add.text(400 ,300 ,'Druk spatie om het spel te starten!');
        this.centerText.setOrigin(0.5)

        this.scoreText = this.add.text(2,2,'Score: ' + this.score);
        
        this.livesText = this.add.text(798,2,'Levens: ' + this.lives);
        this.livesText.setOrigin(1,0);

        this.ball = this.physics.add.image(400, 300, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.ball.setVisible(false);

        this.paddle = this.physics.add.image(400, 550, 'paddle');
        this.paddle.setCollideWorldBounds(true);
        this.paddle.setPushable(false);

        this.physics.add.collider(this.paddle,this.ball);

        this.keyboard = this.input.keyboard.addKeys(
            {
                LEFT_KEY: Phaser.Input.Keyboard.KeyCodes.LEFT,
                RIGHT_KEY: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
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
    removeBlock(block, ball) 
    {
        block.destroy();
        this.score++;
        this.scoreText.setText('Score: ' + this.score);
        const index = this.blocks.indexOf(block);
        this.blocks.splice(index, 1)


        if(this.blocks.length == 0) 
        {
            this.centerText.setVisible(true);
            this.centerText.setText('YOU WON!');
            this.ball.setVelocity(0);
            this.ball.setVisible(false);
        }
    }

    update(time, delta)
    {   
        if(this.keyboard.SPACE.isDown && !this.gameStarted && this.lives > 0)
        {
            this.centerText.setVisible(false);
            this.ball.setVelocity(this.ballVelocity);
            this.ball.setVisible(true);
            this.gameStarted = true;
        }

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

        if(this.ball.y >= this.renderer.height) {
            this.gameStarted = false;
            this.lives--;
            this.livesText.setText('Levens: ' + this.lives)
            this.ball.setPosition(400,300);
            this.ball.setVisible(false);
            this.ball.setVelocity(0);

            this.centerText.setVisible(true);
            if(this.lives>0){
                this.centerText.setText('Druk spatie om het spel te herstarten!');
            } else {
                this.centerText.setText('GAME OVER!')
            }
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
