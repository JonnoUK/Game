class MainScreen extends Phaser.Scene {
    constructor() {
        super({key: 'MainScreen'})
    }

    create() {
        this.add.text(350, 350, "Click to Start")
        this.input.on('pointerdown', () => {
            gameState.hitpoints = 100;
            this.scene.stop();            
            this.scene.start('SceneOne')
        });
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

/* Loads NPCs into scene and assigns attributes */
/* [0:'Name', 1:XLoc, 2:YLoc, 3:Scale, 4:Range, 5:WayToFace, 6:SpriteFacing, 7:AttPower, 8:Health, 9:'Scene']  */
function loadNPCs(game, scene, stage) {
    /*PRELOAD FUNCTIONS*/
    if(stage == 1) {
        console.log("%cPreloading " + bosses.length +" NPCs", conCre);
        for(var i =0; i < bosses.length; i++) {
            if(bosses[i][9] == scene) {
                game.load.atlas(bosses[i][0], 'assets/NPCs/'+bosses[i][0]+'spritesheet.png', 'assets/NPCs/'+bosses[i][0]+'sprites.json');
            }
        }
        if (i = bosses.length) {
            console.log("%cLoaded " + i + " NPCs", conCom);
        } else {
            console.log("%cError loading NPCs. Stuck at iteration "+i, conErr);
        }
    }
    /*CREATE FUNCTIONS*/
    if(stage == 2) {
        console.log("%cCreating NPCs", conCom)
        for(var i =0; i < bosses.length; i++) {
            if(bosses[i][9] == scene) {
                npcId[bosses[i][0]] = game.physics.add.sprite(bosses[i][1], bosses[i][2], bosses[i][0]).setScale(bosses[i][3]);
                npcId[bosses[i][0]].setCollideWorldBounds(true);
                npcId[bosses[i][0]].attPower = bosses[i][7];
                npcId[bosses[i][0]].health = bosses[i][8];
                npcId[bosses[i][0]].alive = true;
                npcId[bosses[i][0]].range = bosses[i][4];
                npcId[bosses[i][0]].setInteractive();
                npcId[bosses[i][0]].move = 0;
                game.physics.add.collider(npcId[bosses[i][0]], gameState.clipped);

                if(bosses[i][5] == 'left') {
                    if(bosses[i][6] == 'right') {
                        npcId[bosses[i][0]].flipX = true;
                        npcId[bosses[i][0]].direction = 'left';
                    
                    } else {
                        npcId[bosses[i][0]].flipX = false;
                        npcId[bosses[i][0]].direction = 'left';
                    }
                } else if(bosses[i][5] == 'right') {
                    if(bosses[i][6] == 'left') {
                        npcId[bosses[i][0]].flipX = true;
                        npcId[bosses[i][0]].direction = 'right';
                    } else {
                        npcId[bosses[i][0]].flipX = false;
                        npcId[bosses[i][0]].direction = 'right';
                    }
                }
            }
        }
    }
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
    width: 700,
    height: 700,
    backgroundColor: '000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            enableBody: true,
            debug: true,
        }
    },
    scene: [MainScreen, SceneOne]
    }

var map;
var player;
var npcId = new Object();
var onFloorObj = new Object();
var invSlots = new Object();
/* ['Name', XLoc, YLoc, Scale, Range, WayToFace, SpriteFacing, Scale, Health, 'Scene']  */
var bosses = [
    ['boss1', 750, 300, 1.5, 70, 'right', 'right', 0.5, 20, 'SceneOne'],
    ['boss2', 450, 250, 1.2, 50, 'left', 'right', 0.5, 20, 'SceneOne'],
];




const game = new Phaser.Game(config);