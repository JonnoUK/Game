function gameUpdateLogic(game, scene) {
     /** ACTIONS IF GAME PLAYING */
     if (gameState.gameActive == true) {

        /*HEALTH BAR*/
        var displayHp = gameState.hitpoints / 100 * 300;
        gameState.playerDisplay.setCrop();
        gameState.playerDisplay.setCrop(0, 0, displayHp, 20);


    /** IF OUT OF HITPOINTS */
    if(gameState.hitpoints <= 0) {
        gameState.gameActive = false;
    }

    npcUpdates();
    playerUpdates(game);


    /** LOSE CONDITION */
} else {

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

function playerUpdates(game) {
    /** Check if attacking... */
    if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
        attackNpc();
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
    
    
    
    /** Player Controls */
    if(gameState.cursors.shift.isDown){
        console.log(inventory)
    }
    
    if(gameState.cursors.left.isDown){
        gameState.player.flipX = true;
        gameState.player.direction = 'left';
        if(!gameState.attacking) {
            gameState.player.anims.play('walk', true); 
        }
        gameState.player.setVelocityX(-70)
        
    } else if (gameState.cursors.right.isDown) {
        gameState.player.flipX = false;
        gameState.player.direction = 'right';
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
    }