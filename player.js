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