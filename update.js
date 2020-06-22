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

    npcUpdates(game);
    playerUpdates(game);
    
    /** LOSE CONDITION */
} else {

    game.physics.pause();
    game.anims.pauseAll();
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

    gameState.defending = 0;
    /** Check if attacking... */
    if (gameState.cursors.space.isDown && !gameState.attacking) {
        gameState.player.defending = 100;
        gameState.player.setScale(1);
    } else {
        gameState.player.defending = 0;
    }

    
    
    /** Player Controls */
    if (Phaser.Input.Keyboard.JustDown(gameState.cursors.shift)){
        console.log(inventory)
        console.log(gameState.player.x + " / " + gameState.player.y)
    }


    if(gameState.leftA.isDown){
        gameState.player.flipX = true;
        gameState.player.direction = 'left';
        if(!gameState.attacking || gameState.player.defending == 0) {
            gameState.player.anims.play('walk', true); 
            gameState.player.setScale(1.2);
        }
        gameState.player.setVelocityX(-gameState.player.speed)
        
    } else if (gameState.rightD.isDown) {
        gameState.player.flipX = false;
        gameState.player.direction = 'right';
        if(!gameState.attacking || gameState.player.defending == 0) {
            gameState.player.anims.play('walk', true); 
            gameState.player.setScale(1.2);
        }
        gameState.player.body.setVelocityX(gameState.player.speed)
    } else {
        gameState.player.body.setVelocityX(0)
    }
    if(gameState.upW.isDown){
        if(!gameState.attacking || gameState.player.defending == 0) {
            gameState.player.anims.play('walk', true);
            gameState.player.setScale(1.2);
        }
        gameState.player.setVelocityY(-gameState.player.speed)
        
    } else if (gameState.downS.isDown) {
        if(!gameState.attacking || gameState.player.defending == 0) {
            gameState.player.anims.play('walk', true);
            gameState.player.setScale(1.2);
        }
        gameState.player.body.setVelocityY(gameState.player.speed)
    } else {
        gameState.player.body.setVelocityY(0)
    }


    if(gameState.player.defending == 100) {
        gameState.player.anims.play('plShield', true);
        gameState.player.setVelocityX(0);
        gameState.player.setVelocityY(0);
        gameState.player.setScale(1);
    } else if(gameState.attacking == true) {
        gameState.player.anims.play('playAtt', true);
        gameState.player.setVelocityX(0);
        gameState.player.setVelocityY(0);
    }

    if(gameState.player.defending == 0 && !gameState.attacking && !gameState.leftA.isDown && !gameState.rightD.isDown && !gameState.upW.isDown && !gameState.downS.isDown ){
        gameState.player.anims.play('idle', true);
        gameState.player.setScale(1);
    }
    }