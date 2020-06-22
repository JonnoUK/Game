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
    gameState.player.body.setVelocityX(0);
    gameState.player.body.setVelocityY(0);
    /** Waits for Space Input */
    if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
        game.scene.stop();
        game.scene.start('MainScreen')
    }
}
}

function playerUpdates(game) {



    gameState.moving = false;
    gameState.defending = 0;
    /** Check if attacking... */
    if (gameState.cursors.space.isDown && !gameState.attacking) {
        gameState.player.defending = 100;
        gameState.player.setScale(1);
    } else {
        gameState.player.defending = 0;
    }
    
    /** Player Controls */
    /** 1 W, 2 A, 3 S, 4 D */
    if (Phaser.Input.Keyboard.JustDown(gameState.cursors.shift)){
        console.log(inventory)
        console.log(gameState.player.x + " / " + gameState.player.y)
    }

    if (playerInput["1"].isDown || playerInput[`2`].isDown || playerInput[`3`].isDown || playerInput[`4`].isDown) {
        gameState.moving = true;
        if(playerState.normalWalk) {
            gameState.player.anims.play('walk', true);
        } 
        if (!playerState.normalWalk && playerState.sword) {
            gameState.player.anims.play('varis_walk_sword', true); 
        }
        Object.keys(playerInput).forEach(function (keyInput) {
            if(playerInput[keyInput].isDown) {
                switch(keyInput) {
                    case "1":
                        gameState.player.setVelocityY(-gameState.player.speed)
                    break;

                    case "2":
                        gameState.player.flipX = false;
                        gameState.player.direction = 'left';
                        gameState.player.setVelocityX(-gameState.player.speed)
                    break;

                    case "3":
                        gameState.player.body.setVelocityY(gameState.player.speed)
                    break;

                    case "4":
                        gameState.player.flipX = true;
                        gameState.player.direction = 'right';
                        gameState.player.body.setVelocityX(gameState.player.speed)
                }
            }  
        });
    }


    if(gameState.player.defending == 100) {
        gameState.player.anims.play('plShield', true);
        gameState.player.setVelocityX(0);
        gameState.player.setVelocityY(0);
    } else if(gameState.attacking == true) {
        gameState.player.anims.play('playAtt', true);
        gameState.player.setVelocityX(0);
        gameState.player.setVelocityY(0);
    }

    if(gameState.player.defending == 0 && !gameState.attacking && !playerState.sword && !gameState.moving){
        gameState.player.anims.play('idle', true);
        gameState.player.body.setVelocityY(0)
        gameState.player.body.setVelocityX(0)
    }

    if(playerState.sword && !gameState.moving) {
        gameState.player.anims.play('varis_idle_sword', true);
        playerState.normalWalk = false;
        gameState.player.body.setVelocityY(0)
        gameState.player.body.setVelocityX(0)
    }


    }