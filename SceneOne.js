class SceneOne extends Phaser.Scene {
    constructor() {
        super( {key: 'SceneOne'});
        
    }

    preload() {
    
        for(var i =0; i < bosses.length; i++) {
            this.load.atlas(bosses[i][0], 'assets/NPCs/'+bosses[i][0]+'spritesheet.png', 'assets/NPCs/'+bosses[i][0]+'sprites.json');
        }
        this.load.atlas('player', 'assets/Knight/spritesheet.png', 'assets/Knight/sprites.json');
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
        loadNPCs(this);
        var OnTop = map.createStaticLayer('OnTop', groundTiles, 0, 0);
    
    
        console.log("Loaded Map & Player")
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        
        this.cameras.main.setZoom(2.2);
        this.physics.world.setBounds(0, 0, 2000, 1500);
        
        gameState.player.setCollideWorldBounds(true);
        console.log("Player will not hit walls.")
        this.cameras.main.startFollow(gameState.player);
        console.log("Camera is following Player.")
        gameState.cursors = this.input.keyboard.createCursorKeys();
    
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        
    
    
    
        clipped.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
        
        
        this.physics.add.collider(gameState.player, clipped);
        this.physics.add.overlap(npcId['boss1'], gameState.player)
        //this.physics.add.collider(gamestate.player, npcId['boss1'], attacked, null, game);
    
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
    }

    update() {
   
        var cam = this.cameras.main;
        if(gameState.cursors.space.isDown){
        }
    
        if(gameState.cursors.left.isDown){
            gameState.player.flipX = true;
            gameState.player.anims.play('walk', true);
            gameState.player.setVelocityX(-70)
            
        } else if (gameState.cursors.right.isDown) {
            gameState.player.flipX = false;
            gameState.player.anims.play('walk', true);
            gameState.player.body.setVelocityX(70)
        } else {
            gameState.player.anims.play('idle', true);
            gameState.player.body.setVelocityX(0)
        }
        if(gameState.cursors.up.isDown){
            gameState.player.anims.play('walk', true);
            gameState.player.setVelocityY(-70)
            
        } else if (gameState.cursors.down.isDown) {
            gameState.player.anims.play('walk', true);
            gameState.player.body.setVelocityY(70)
            
        } else {
            gameState.player.body.setVelocityY(0)
        }
    }


render() {

    game.debug.cameraInfo(game.camera, 32, 32);
}



}