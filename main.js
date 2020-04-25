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

function createAnims(game) {

    game.anims.create({
        key: 'playAtt',
        frames: game.anims.generateFrameNames('playAtt', {prefix: 'sprite0', start: 4, end: 8, zeroPad: 0}),
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'walk',
        frames: game.anims.generateFrameNames('player', {prefix: 'sprite', start: 1, end: 7, zeroPad: 0}),
        frameRate: 10,
        repeat: -1
    });
    game.anims.create({
        key: 'idle',
        frames: [{key: 'player', frame: 'sprite1'}],
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'walkBoss',
        frames: game.anims.generateFrameNames('boss2', {prefix: 'sprite', start: 1, end: 7, zeroPad: 0}),
        frameRate: 10,
        repeat: -1
    });
    game.anims.create({
        key: 'idleBoss',
        frames: [{key: 'boss2', frame: 'sprite1'}],
        frameRate: 10,
        repeat: -1
    });
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
function loadNPCs(game, scene, stage) {
    /*PRELOAD FUNCTIONS*/
    if(stage == 1) {
        for(var i =0; i < bosses.length; i++) {
            if(bosses[i][9] == scene) {
                game.load.atlas(bosses[i][0], 'assets/NPCs/'+bosses[i][0]+'spritesheet.png', 'assets/NPCs/'+bosses[i][0]+'sprites.json');
            }
        }
    }
    /*CREATE FUNCTIONS*/
    if(stage == 2) {
        for(var i =0; i < bosses.length; i++) {
            if(bosses[i][9] == scene) {
                npcId[bosses[i][0]] = game.physics.add.sprite(bosses[i][1], bosses[i][2], bosses[i][0]).setScale(bosses[i][3]);
                npcId[bosses[i][0]].setCollideWorldBounds(true);
                npcId[bosses[i][0]].attPower = bosses[i][7];
                npcId[bosses[i][0]].health = bosses[i][8];
                npcId[bosses[i][0]].alive = true;
                npcId[bosses[i][0]].range = bosses[i][4];
                npcId[bosses[i][0]].setInteractive();
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

/*LOADS PLAYER & SETS ATTRIBUTES*/
function loadPlayer(game, scene, stage) {
    /*PRELOAD FUNCTIONS*/
    if(stage == 1) {
        game.load.atlas('player', 'assets/Knight/spritesheet.png', 'assets/Knight/sprites.json');
        game.load.atlas('playAtt', 'assets/Knight/paspritesheet.png', 'assets/Knight/pasprites.json');
    }
    /*CREATE FUNCTION BELOW MAP*/
    if(stage == 2) {
        gameState.player = game.physics.add.sprite(gameState.xloc, gameState.yloc, 'player').setScale(1.2);
    }
    /*CREATE FUNCTION GENERIC*/
    if(stage == 3) {
        gameState.player.setCollideWorldBounds(true);

        game.cameras.main.startFollow(gameState.player, true);

        gameState.gameActive = true;
        gameState.attacking = false;
        
        /*Sets up Camera & Physics of world*/
        game.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        game.cameras.main.setZoom(2.2);
        game.physics.world.setBounds(0, 0, 2000, 1500);
        gameState.playerDisplay = game.add.text(200, 200).setScrollFactor(0).setFontSize(10).setColor('#fcba03');
        game.physics.add.collider(gameState.player, gameState.clipped);

    }
}

function gameUpdateLogic(game, scene) {
     /** ACTIONS IF GAME PLAYING */
     if (gameState.gameActive == true) {
        gameState.playerDisplay.setText([
        'Health: '+gameState.hitpoints
        ]);

    /** IF OUT OF HITPOINTS */
    if(gameState.hitpoints <= 0) {
        gameState.gameActive = false;
    }
    var npc = npcId['boss2']
    /** IF CLOSE TO BOSS, AND BOSS ALIVE, CHASE. IF NOT CLOSE, DON'T MOVE*/
    if (isClose(npcId['boss2'], 100) && npc.alive == true) {
        chasePlayer(npcId['boss2'], 1, 150);
        npcId['boss2'].move += 1;
    } else if (npc.alive === true) {
            if (npcId['boss2'].move >= 500){
                npcId['boss2'].x = bosses[1][1];
                npcId['boss2'].y = bosses[1][2];
            }
        npc.play('idleBoss', true);
        npcId['boss2'].setVelocityX(0);
        npcId['boss2'].setVelocityY(0);
    }

    
    /** Check if attacking... */
    if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
        attackNpc(npcId['boss2']);
        gameState.attacking = true;
        gameState.player.anims.play('playAtt', true);
        gameState.player.setScale(1);
    } else if (gameState.attacking == true) {
        game.time.delayedCall(400, ()=> {
            gameState.attacking = false;
            gameState.player.setScale(1.2);
        });
    }

    if(gameState.attacking == true) {
        gameState.player.anims.play('playAtt', true);
    }

    /** Checks if boss is still alive... */
    if(npcId['boss2'].alive == true && npcId['boss2'].health <= 0) {
        npcId['boss2'].alive = false;
        npcId['boss2'].destroy();
    }

    /** Player Controls */
    if(gameState.cursors.left.isDown){
        gameState.player.flipX = true;
        if(!gameState.attacking) {
            gameState.player.anims.play('walk', true); 
        }
        gameState.player.setVelocityX(-70)
        
    } else if (gameState.cursors.right.isDown) {
        gameState.player.flipX = false;
        if(!gameState.attacking) {
            gameState.player.anims.play('walk', true); 
        }
        gameState.player.body.setVelocityX(70)
    } else {
        gameState.player.body.setVelocityX(0)
    }
    if(gameState.cursors.up.isDown){
        if(!gameState.attacking) {
            gameState.player.anims.play('walk', true);
        }
        gameState.player.setVelocityY(-70)
        
    } else if (gameState.cursors.down.isDown) {
        if(!gameState.attacking) {
            gameState.player.anims.play('walk', true);
        }
        gameState.player.body.setVelocityY(70)
    } else {
        gameState.player.body.setVelocityY(0)
    }
    if(!gameState.attacking && !gameState.cursors.left.isDown && !gameState.cursors.right.isDown && !gameState.cursors.up.isDown && !gameState.cursors.down.isDown ){
        gameState.player.anims.play('idle', true);
    }


    /** LOSE CONDITION */
} else {
    gameState.playerDisplay.setText([
        'GAME OVER'
    ]);
    game.physics.pause();
    gameState.player.body.setVelocityX(0)
    gameState.player.body.setVelocityY(0)
    /** Waits for Space Input */
    if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
        game.scene.stop();
        game.scene.start('MainScreen')
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
            debug: true,
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