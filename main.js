class MainScreen extends Phaser.Scene {
    constructor() {
        super({key: 'MainScreen'})
    }

    create() {
            gameState.hitpoints = 100;
            this.scene.stop();        
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

function sendMessage(string, game) {
    clearTimeout(gameState.messageTimer);
    gameState.playerMessage.setText(string);   
    gameState.messageTime++;     
    game.tweens.add({
        targets: gameState.playerMessage,
        alpha: 1,
        duration: 300,
        ease: 'Power2'
    }, game);
    gameState.messageTimer = setTimeout( function(){
        game.tweens.add({
            targets: gameState.playerMessage,
            alpha: 0,
            duration: 1000,
            ease: 'Power2'
        }, game);
        gameState.messageTime = 1;
    }, 3500);
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

   /*itemName (sprite), XLoc, YLoc, Scene, itemId, visible*/
var onFloor = [
    ['1', 100, 150, 'SceneOne', 1, false],
    ['2', 100, 200, 'SceneOne', 2, false],
    ['3', 100, 250, 'SceneOne', 3, false],
]

var items = [
    ['empty'],
    ['1', 'Sword', 'To defeat monsters'], 
    ['2', 'Strength Potion', 'This will increase my strength by 10%.'],
    ['3', 'Health Potion', 'This will restore your hitpoints when most needed.'], 
    ['4'], 
    ['5']
]



var slots = [
    [15, 30],
    [35, 30],
    [55, 30],
    [75, 30],
    [95, 30]
]

const config = {
    type: Phaser.AUTO,
    width: 450,
    height: 350,
    backgroundColor: 'ffffff',
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
var gameObject = new Object();

const game = new Phaser.Game(config);