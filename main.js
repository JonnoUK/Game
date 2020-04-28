class MainScreen extends Phaser.Scene {
    constructor() {
        super({key: 'MainScreen'})
    }

    create() {
            gameState.hitpoints = 100;
            this.scene.stop();        
            
              // Once the page is loaded, disable the right click menu of the canvas.


            
            this.scene.start('SceneOne')

            


    }
}


var conErr = [
    'background-color: red',
    'color: black',
    'padding: 1px',
    'opacity: 0.5'
].join(';');

var conCre = [
    'background-color: orange',
    'color: black',
    'padding: 1px',
    'opacity: 0.5'
].join(';');

var conCom = [
    'background-color: green',
    'color: white',
    'padding: 1px',
    'opacity: 0.5'
].join(';');




function render() {
    console.log("Creating Debug Camera")
    game.debug.cameraInfo(game.camera, 32, 32);
}

function keyListen(game) {

    gameState.upW = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    gameState.leftA = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    gameState.downS = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    gameState.rightD = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


     
}


const gameState = {

    
}


var inventory =[
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0]
   ]

const config = {
    type: Phaser.AUTO,
    width: 450,
    height: 350,
    backgroundColor: '000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            enableBody: true,
            debug: false,
        }
    },
    scene: [MainScreen, SceneOne]
    }

var map;
var player;
var npcId = new Object();
var onFloorObj = new Object();
var invSlots = new Object();


const game = new Phaser.Game(config);