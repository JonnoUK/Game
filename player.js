/* Checks whether player is in radius around Npc (parsed) */
function isClose(npcId, range, type) {
    if(type == 'object') {
        var maxX = npcId.x + range;
        var minX = npcId.x - range;
        var maxY = npcId.y + range;
        var minY = npcId.y - range;
    
        if(gameState.player.x >= minX && gameState.player.x <= maxX && gameState.player.y >= minY && gameState.player.y <= maxY) {
            return true;
        }
    } else if(npcId.alive == true) {
        var maxX = npcId.x + range;
        var minX = npcId.x - range;
        var maxY = npcId.y + range;
        var minY = npcId.y - range;

        if(gameState.player.x >= minX && gameState.player.x <= maxX && gameState.player.y >= minY && gameState.player.y <= maxY) {
            return true;
        }
    }
}



/*LOADS PLAYER & SETS ATTRIBUTES*/
function loadPlayer(game, scene, stage) {
    /*PRELOAD FUNCTIONS*/
    if(stage == 1) {
        console.log("%cPreloading Player Assets", conCre)
        game.load.atlas('player', 'assets/Knight/plwalk.png', 'assets/Knight/plwalk.json');
        game.load.atlas('playAtt', 'assets/Knight/paspritesheet.png', 'assets/Knight/pasprites.json');
        game.load.atlas('plDeath', 'assets/Knight/playerDeath.png', 'assets/Knight/playerDeath.json');
        game.load.atlas('plIdle', 'assets/Knight/plIdle.png', 'assets/Knight/plIdle.json');
        game.load.atlas('plDefend', 'assets/Knight/plDefend.png', 'assets/Knight/plDefend.json');
        game.load.image('healthEmpty', 'assets/Knight/health-bar-empty.png');
        game.load.image('healthFull', 'assets/Knight/health-bar-full.png');
        console.log("%cLoaded Player Assets", conCom)

    }
    /*CREATE FUNCTION BELOW MAP*/
    if(stage == 2) {
        console.log("%cLoading Player below 'On Top' map layer", conCre)
        gameState.player = game.physics.add.sprite(gameState.xloc, gameState.yloc, 'player').setScale(1.2);
        console.log("%cLoaded Player below 'On Top' map layer", conCom)
        gameState.player.speed = 100;
        gameState.player.canAttack = true;
    }
    /*CREATE FUNCTION GENERIC*/
    if(stage == 3) {
        console.log("%cSetting player attributes", conCre)
        gameState.player.setCollideWorldBounds(true);

        game.cameras.main.startFollow(gameState.player, true);

        gameState.gameActive = true;
        gameState.attacking = false;
        gameState.defending = 0;
        
        /*Sets up Camera & Physics of world*/
        game.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        game.cameras.main.setZoom(1);
        game.physics.world.setBounds(0, 0, 2000, 1500);
        gameState.playerDisplay = game.add.image(5, 5, 'healthEmpty').setScrollFactor(0).setScale(0.5).setOrigin(0,0);
        gameState.playerDisplay = game.add.image(5, 5, 'healthFull').setScrollFactor(0).setScale(0.5).setOrigin(0, 0);

        //gameState.playerDisplay = game.add.text(200, 200).setScrollFactor(0).setFontSize(10).setColor('#fcba03');
        game.physics.add.collider(gameState.player, gameState.clipped);
        console.log("%cLoaded player attributes", conCom);
        gameState.player.direction = 'right';


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
        console.log("%cSet Sword in variables", conCre);
        //invSlots[1] = game.add.sprite(20, 50, 'item1').setScrollFactor(0);

        invSlots[1] = game.add.sprite(slots[0][0], slots[0][1], items[inventory[0][0]]).setScrollFactor(0);
        invSlots[1].setInteractive(); 
        console.log("%cAdded Sword", conCom)


        /*SET BLANK SPRITES IN INVENTORY*/
        invSlots[2] = game.add.sprite(0,0, items[inventory[0][0]]).setScrollFactor(0);
        invSlots[2].visible = false;
        invSlots[3] = game.add.sprite(0,0, items[inventory[0][0]]).setScrollFactor(0);
        invSlots[3].visible = false;
        invSlots[4] = game.add.sprite(0,0, items[inventory[0][0]]).setScrollFactor(0);
        invSlots[4].visible = false;
        invSlots[5] = game.add.sprite(0,0, items[inventory[0][0]]).setScrollFactor(0);
        invSlots[5].visible = false;
        console.log("%cLoaded Inventory", conCom)
}