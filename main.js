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
            console.log("%cSuccess attack on "+npcId+". Health: "+npcId.health, conCom)
        } else if(npcId.alive == false) {
                console.log("Npc Dead")
        } else {
            console.log("%cNot close enough", conCre)
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

function loadFloorObjects(game, scene, stage) {
    /*PRELOAD FUNCTIONS*/
    if(stage == 1) {
        console.log("%cLoading "+ onFloor.length +" Floor Objects", conCre)
        for(var i =0; i < onFloor.length; i++) {
            var ObjScene = onFloor[i][3];
            var ObjName = onFloor[i][0];
            if(ObjScene == scene) {
                game.load.image(ObjName, 'assets/Inventory/'+ObjName+'.png');
            }
        }
        console.log("%cFinished loading "+ i +" Floor Objects", conCom)
    }
    /*CREATE FUNCTIONS*/
    if(stage == 2) {
        console.log("%cCreating " + onFloor.length + " Floor Objects", conCom)
        for(var i =0; i < onFloor.length; i++) {
            var ObjScene = onFloor[i][3];
            var ObjName = onFloor[i][0];
            if(onFloor[i][3] == scene) {
                if(onFloor[i][5] == true) {
                    onFloorObj[i+1] = game.physics.add.sprite(onFloor[i][1], onFloor[i][2], onFloor[i][0]);
                    onFloorObj[i+1].setInteractive();
                    console.log("%cCreated "+onFloor[i][0]+" on the floor at "+onFloor[i][1]+"/"+onFloor[i][2]+ "\n with ID: "+(i+1), conCom)
                }
            }
        }
    }
}

/*LOADS PLAYER & SETS ATTRIBUTES*/
function loadPlayer(game, scene, stage) {
    /*PRELOAD FUNCTIONS*/
    if(stage == 1) {
        console.log("%cPreloading Player Assets", conCre)
        game.load.atlas('player', 'assets/Knight/spritesheet.png', 'assets/Knight/sprites.json');
        game.load.atlas('playAtt', 'assets/Knight/paspritesheet.png', 'assets/Knight/pasprites.json');
        console.log("%cLoaded Player Assets", conCom)
    }
    /*CREATE FUNCTION BELOW MAP*/
    if(stage == 2) {
        console.log("%cLoading Player below 'On Top' map layer", conCre)
        gameState.player = game.physics.add.sprite(gameState.xloc, gameState.yloc, 'player').setScale(1.2);
        console.log("%cLoaded Player below 'On Top' map layer", conCom)
    }
    /*CREATE FUNCTION GENERIC*/
    if(stage == 3) {
        console.log("%cSetting player attributes", conCre)
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
        console.log("%cLoaded player attributes", conCom)
        /*CLICK FUNCTION*/
        /*
        game.input.on('pointerup', function() {
            itemHandler(event.clientX, event.clientY, game)
        });
        //*/
 
        loadInventory(game);


    }
}

function loadInventory(game) {
        console.log("%cLoading Inventory", conCre)
        /*LOAD IN SWORD IN INVENTORY*/
        inventory[0][0] = 1;
        inventory[0][1] = 1;
        invSlots[1] = game.add.sprite(200, 220, objects[inventory[0][0]][0]).setScrollFactor(0);
        invSlots[1].setInteractive(); 


        /*SET BLANK SPRITES IN INVENTORY*/
        invSlots[2] = game.add.sprite(0,0, objects[inventory[0][0]][0]).setScrollFactor(0);
        invSlots[2].visible = false;
        invSlots[3] = game.add.sprite(0,0, objects[inventory[0][0]][0]).setScrollFactor(0);
        invSlots[3].visible = false;
        invSlots[4] = game.add.sprite(0,0, objects[inventory[0][0]][0]).setScrollFactor(0);
        invSlots[4].visible = false;
        invSlots[5] = game.add.sprite(0,0, objects[inventory[0][0]][0]).setScrollFactor(0);
        invSlots[5].visible = false;
        console.log("%cLoaded Inventory", conCom)
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
    if(gameState.cursors.shift.isDown){
        console.log(inventory)
    }

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

function inventoryManage(object, game, indId) {
        var slots = [
            [200, 220],
            [220, 220],
            [240, 220],
            [260, 220],
            [280, 220]
        ];
        var trySlot = 0;
        for(var i = 0; i < inventory.length; i++) {
            if (inventory[i][0] == 0) {
                inventory[i][0] = object;
                inventory[i][1] = indId;
                invSlots[indId] = game.add.sprite(slots[i][0], slots[i][1], objects[inventory[i][0]][0]).setScrollFactor(0);
                invSlots[indId].setInteractive(); 
                //once object defined, set i to maximum to stop loop...
                gameState.latestInv = i;
                trySlot = 0;
                gameState.invSuccess = true;
                i = inventory.length;
            } else {
                trySlot += 1;
            }
            if (trySlot >= inventory.length) {
                /*Inventory is Full*/
                gameState.invSuccess = false;
                console.log("%cInventory full!", conErr)
            }
        }
        if (gameState.invSuccess == true) {
            console.log("%cAdded to inventory: "+gameState.invSuccess+"\n"+object, conCom);
            onFloorObj[indId].destroy();
            console.log("%cDeleted Item from floor Id: "+indId, conCre)
        }
}


function destroyItem(itemClicked, slot) {
    invSlots[inventory[slot][1]].destroy();
    inventory[slot][0] = 0;
    inventory[slot][1] = 0;
    gameState.itemClicked = '';
    console.log("Destroyed Item Id: "+itemClicked)
}

function itemHandler(clicked, slot, game) {

    if (clicked[0] == 'item1') {
        console.log("Hello World")
    } else if (clicked[0] == 'item2') {

        destroyItem(2, slot);
    } else if (clicked[0] == 'item3') {
        if(gameState.hitpoints < 100) {
            gameState.hitpoints = 100;
            destroyItem(3, slot);
            //console.log("Player hitpoints restored");
        } else {
            console.log("This item will restore your hitpoints")
        }
    } else {
        //console.log("%cNothing interesting happens...", conCre)
    }   
}

function handleItems(game) {
    if(onFloorObj[2] != undefined){
        game.physics.add.overlap(gameState.player, onFloorObj[2],  () => {
            inventoryManage(2, game, 2);
            var invSlot = gameState.latestInv;
            var success = gameState.invSuccess;
            if (success) {
            invSlots[2].on('pointerup', function () {
                gameState.itemClicked = objects[ [inventory[invSlot][0]] [0] ];
                console.log("Clicked "+gameState.itemClicked);
                itemHandler(gameState.itemClicked, invSlot, game)
            });
        }
        });
    }


    if(onFloorObj[3] != undefined){
        game.physics.add.overlap(gameState.player, onFloorObj[3],  () => {
            inventoryManage(3, game, 3);
            var invSlot = gameState.latestInv;
            var success = gameState.invSuccess;
            if (success) {
            invSlots[3].on('pointerup', function () {
                gameState.itemClicked = objects[ [inventory[invSlot][0]] [0] ];
                console.log("Clicked ",gameState.itemClicked);
                itemHandler(gameState.itemClicked, invSlot, game)
            });
        }
        });
    }
    if(onFloorObj[4] != undefined){
        game.physics.add.overlap(gameState.player, onFloorObj[4],  () => {
            inventoryManage(4, game, 4);
            var invSlot = gameState.latestInv;
            var success = gameState.invSuccess;
            if (success) {
            invSlots[4].on('pointerup', function () {
                gameState.itemClicked = objects[ [inventory[invSlot][0]] [0] ];
                console.log("Clicked "+gameState.itemClicked);
                itemHandler(gameState.itemClicked, invSlot, game)
            });
        }
        });
    }
    if(onFloorObj[5] != undefined){
        game.physics.add.overlap(gameState.player, onFloorObj[5],  () => {
            inventoryManage(2, game, 5);
            var invSlot = gameState.latestInv;
            var success = gameState.invSuccess;
            if (success) {
            invSlots[5].on('pointerup', function () {
                gameState.itemClicked = objects[ [inventory[invSlot][0]] [0] ];
                console.log("Clicked "+gameState.itemClicked);
                itemHandler(gameState.itemClicked, invSlot, game)
            });
        }
        });
    }
    if(onFloorObj[6] != undefined){
        game.physics.add.overlap(gameState.player, onFloorObj[6],  () => {
            inventoryManage(2, game, 6);
            var invSlot = gameState.latestInv;
            var success = gameState.invSuccess;
            if (success) {
            invSlots[6].on('pointerup', function () {
                gameState.itemClicked = objects[ [inventory[invSlot][0]] [0] ];
                console.log("Clicked "+gameState.itemClicked);
                itemHandler(gameState.itemClicked, invSlot, game)
                });
            }
        });
    }
    if(onFloorObj[7] != undefined){
        game.physics.add.overlap(gameState.player, onFloorObj[7],  () => {
            inventoryManage(2, game, 7);
            var invSlot = gameState.latestInv;
            var success = gameState.invSuccess;
            if (success) {
                invSlots[7].on('pointerup', function () {
                    gameState.itemClicked = objects[ [inventory[invSlot][0]] [0] ];
                    console.log("Clicked "+gameState.itemClicked);
                    itemHandler(gameState.itemClicked, invSlot, game)
                });
            }
        });
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

var objects = [
    ["", 0],
    ["item1", 0],
    ['item2', 0],
    ["item3", 0], 
    ['item4', 0], 
    ['item5', 0]
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

var onFloor = [
    ['item1', 100, 150, 'SceneOne', 1, false],
    ['item2', 100, 200, 'SceneOne', 2, true],
    ['item3', 100, 250, 'SceneOne', 3, true],
];

const game = new Phaser.Game(config);