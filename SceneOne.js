class SceneOne extends Phaser.Scene {
    constructor() {
        super( {key: 'SceneOne'});
        
    }

    preload() {
        for(var i =0; i < bosses.length; i++) {
            if(bosses[i][9] == 'SceneOne') {
                this.load.atlas(bosses[i][0], 'assets/NPCs/'+bosses[i][0]+'spritesheet.png', 'assets/NPCs/'+bosses[i][0]+'sprites.json');
            }
        }
        this.load.atlas('player', 'assets/Knight/spritesheet.png', 'assets/Knight/sprites.json');
        this.load.atlas('playAtt', 'assets/Knight/paspritesheet.png', 'assets/Knight/pasprites.json');
        this.load.tilemapTiledJSON('map', 'assets/Map.json');
        this.load.image('tiles', 'assets/tiles.png', {frameWidth: 16, frameHeight: 16});
    }

    create() {

        /* LOAD MAP & PLAYER & NPCs*/
        map = this.make.tilemap({key: 'map'});
        const groundTiles = map.addTilesetImage('tiles');
        var interactive = map.createDynamicLayer('Interactive', groundTiles, 0, 0);
        var backgroundLayer = map.createStaticLayer('Background', groundTiles, 0, 0);
        var terrain = map.createStaticLayer('Terrain', groundTiles, 0, 0);
        var clipped = map.createDynamicLayer('Clipped', groundTiles, 0, 0);
        clipped.setCollisionByProperty({collides: true});
        var fade1 = map.createStaticLayer('Fade1', groundTiles, 0, 0);
        var fade2 = map.createStaticLayer('Fade2', groundTiles, 0, 0);
        var fade3 = map.createStaticLayer('Fade3', groundTiles, 0, 0);
        fade1.setCollisionByProperty({collides: true});
        fade2.setCollisionByProperty({collides: true});
        fade3.setCollisionByProperty({collides: true});
        gameState.xloc = 250;
        gameState.yloc = 250;
        gameState.player = this.physics.add.sprite(gameState.xloc, gameState.yloc, 'player').setScale(1.2);
        loadNPCs(this, 'SceneOne');
        var OnTop = map.createStaticLayer('OnTop', groundTiles, 0, 0);
    
    
        console.log("Loaded Map & Player")
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        
        this.cameras.main.setZoom(2.2);
        this.physics.world.setBounds(0, 0, 2000, 1500);
        
        gameState.player.setCollideWorldBounds(true);
        gameState.player.hitpoints = 100;
        console.log("Player will not hit walls.")
        this.cameras.main.startFollow(gameState.player, true);
        console.log("Camera is following Player.")
        gameState.cursors = this.input.keyboard.createCursorKeys();
    
        gameState.gameActive = true;
        gameState.attacking = false;
        const debugGraphics = this.add.graphics().setAlpha(0);

        gameState.playerDisplay = this.add.text(200, 200).setScrollFactor(0).setFontSize(10).setColor('#fcba03');;
        
    
        clipped.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
        
        
        this.physics.add.collider(gameState.player, clipped);
        this.physics.add.collider(npcId['boss2'], clipped);

        this.physics.add.overlap(npcId['boss2'], gameState.player, () => {
            gameState.player.hitpoints -= npcId['boss2'].attPower;
            console.log(gameState.player.hitpoints)
        });

        this.anims.create({
            key: 'playAtt',
            frames: this.anims.generateFrameNames('playAtt', {prefix: 'sprite0', start: 4, end: 8, zeroPad: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', {prefix: 'sprite', start: 1, end: 7, zeroPad: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'sprite1'}],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walkBoss',
            frames: this.anims.generateFrameNames('boss2', {prefix: 'sprite', start: 1, end: 7, zeroPad: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleBoss',
            frames: [{key: 'boss2', frame: 'sprite1'}],
            frameRate: 10,
            repeat: -1
        });

        npcId['boss2'].move = 0;
    }

update() {
    /** ACTIONS IF GAME PLAYING */
    if (gameState.gameActive == true) {
            gameState.playerDisplay.setText([
            'Health: '+gameState.player.hitpoints
            ]);

        /** IF OUT OF HITPOINTS */
        if(gameState.player.hitpoints <= 0) {
            gameState.gameActive = false;
        }
        var npc = npcId['boss2']
        /** IF CLOSE TO BOSS, AND BOSS ALIVE, CHASE. IF NOT CLOSE, DON'T MOVE*/
        if (isClose(npcId['boss2'], 100) && npc.alive == true) {
            
            chasePlayer(npcId['boss2'], 1, 150);
            npcId['boss2'].move += 1;
        } else if (npc.alive === true) {
                if (npcId['boss2'].move >= 500){
                    npc['boss2'].x = bosses[1][1];
                    npc['boss2'].y = bosses[1][2];
                }
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
            this.time.delayedCall(400, ()=> {
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
        this.physics.pause();
        gameState.player.body.setVelocityX(0)
        gameState.player.body.setVelocityY(0)
        /** Waits for Space Input */
        if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
            this.scene.stop();
            this.scene.start('MainScreen')
        }
    }
}

}