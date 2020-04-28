function gameUpdateLogic(game, scene) {
     /** ACTIONS IF GAME PLAYING */
     if (gameState.gameActive == true) {
        var displayHp = gameState.hitpoints / 100 * 300;
        console.log(displayHp)
        gameState.playerDisplay.setCrop();
        gameState.playerDisplay.setCrop(0, 0, displayHp, 20);

        /*gameState.playerDisplay.setText([
        'Health: '+gameState.hitpoints
        ]);
        //*/


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