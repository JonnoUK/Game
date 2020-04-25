class MainScreen extends Phaser.Scene {
    constructor() {
        super({key: 'MainScreen'})
    }

    create() {
        this.add.text(350, 350, "Click to Start")
        this.input.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start('SceneOne')
        });
    }
}

/* Checks whether player is in radius around Npc (parsed) */
function isClose(npcId, range) {
    if(npcId.alive == true) {
    var maxX = npcId.x + range;
    var minX = npcId.x - range;
    var maxY = npcId.y + range;
    var minY = npcId.y - range;

    if(gameState.player.x >= minX && gameState.player.x <= maxX && gameState.player.y >= minY && gameState.player.y <= maxY) {
    return true;
    }
}
}

function attackNpc(npcId) {
        if(isClose(npcId, npcId.range)) {
            npcId.health -= 2;
            console.log(npcId.health)
        } else if(npcId.alive == false) {
                console.log("Npc Dead")
        } else {
            console.log("Not close enough")
        }
}


function chasePlayer(npcId) {
    var playerX = gameState.player.x
    var playerY = gameState.player.y

    //If player larger
        if(playerX > npcId.x) {
            if(npcId.direction == 'left') {
                npcId.flipX = !npcId.flipX;
                npcId.direction = 'right';
            } else {
                npcId.flipX = npcId.flipX;
            }
                npcId.setVelocityX(40)
                npcId.play('walkBoss', true);
                
    //If player smaller
        } else if (playerX < npcId.x) {
            if(npcId.direction == 'right') {
                npcId.flipX = !npcId.flipX;
                npcId.direction = 'left';
            } else {
                npcId.flipX = npcId.flipX
            }
            npcId.setVelocityX(-40)
            npcId.play('walkBoss', true);
        }
    //If player larger
        if(playerY > npcId.y) {
            npcId.setVelocityY(40)
            npcId.play('walkBoss', true);
    //If player smaller
        } else if (playerY < npcId.y) {
            npcId.setVelocityY(-40)
            npcId.play('walkBoss', true);
        }
    }




function render() {
    game.debug.cameraInfo(game.camera, 32, 32);
}
/* Loads NPCs into scene and assigns attributes */
/* [0:'Name', 1:XLoc, 2:YLoc, 3:Scale, 4:Range, 5:WayToFace, 6:SpriteFacing, 7:AttPower, 8:Health, 9:'Scene']  */
function loadNPCs(game, scene) {

    for(var i =0; i < bosses.length; i++) {
        if(bosses[i][9] == scene) {
            npcId[bosses[i][0]] = game.physics.add.sprite(bosses[i][1], bosses[i][2], bosses[i][0]).setScale(bosses[i][3]);
            npcId[bosses[i][0]].setCollideWorldBounds(true);
            npcId[bosses[i][0]].attPower = bosses[i][7];
            npcId[bosses[i][0]].health = bosses[i][8];
            npcId[bosses[i][0]].alive = true;
            npcId[bosses[i][0]].range = bosses[i][4];
            npcId[bosses[i][0]].setInteractive();

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

const gameState = {
}

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
            debug: false,
        }
    },
    scene: [MainScreen, SceneOne]
    }

var map;
var player;
var npcId = new Object();
/* ['Name', XLoc, YLoc, Scale, Range, WayToFace, SpriteFacing, Scale, Health, 'Scene']  */
var bosses = [
    ['boss1', 750, 300, 1.5, 70, 'right', 'right', 0.5, 20, 'SceneOne'],
    ['boss2', 450, 250, 1.2, 50, 'left', 'right', 0.5, 20, 'SceneOne'],
];
const game = new Phaser.Game(config);