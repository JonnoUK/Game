class SceneOne extends Phaser.Scene {
    constructor() {
        super( {key: 'SceneOne'});

        this.sceneId = 'SceneOne'
    }

    

    preload() {
        gameState.xloc = 250;
        gameState.yloc = 250;
        loadNPCs(this, this.sceneId, 1);
        loadPlayer(this, this.sceneId, 1);
        loadFloorObjects(this, this.sceneId, 1);

        this.load.tilemapTiledJSON('map', 'assets/Map.json');
        this.load.image('tiles', 'assets/tiles.png', {frameWidth: 16, frameHeight: 16});
    }

    create() {
        /* LOAD MAP */
        gameState.cursors = this.input.keyboard.createCursorKeys();
        map = this.make.tilemap({key: 'map'});
        const groundTiles = map.addTilesetImage('tiles');
        var interactive = map.createDynamicLayer('Interactive', groundTiles, 0, 0);
        var backgroundLayer = map.createStaticLayer('Background', groundTiles, 0, 0);
        var terrain = map.createStaticLayer('Terrain', groundTiles, 0, 0);
        gameState.clipped = map.createDynamicLayer('Clipped', groundTiles, 0, 0);
        gameState.clipped.setCollisionByProperty({collides: true});
        var fade1 = map.createStaticLayer('Fade1', groundTiles, 0, 0);
        var fade2 = map.createStaticLayer('Fade2', groundTiles, 0, 0);
        var fade3 = map.createStaticLayer('Fade3', groundTiles, 0, 0);
        fade1.setCollisionByProperty({collides: true});
        fade2.setCollisionByProperty({collides: true});
        fade3.setCollisionByProperty({collides: true});

        /* LOAD SPRITES BELOW 'ON TOP' LAYER OF MAP*/
        loadPlayer(this, this.sceneId, 2);
        loadNPCs(this, this.sceneId, 2);



        /*LOAD FINAL LAYER OF MAP*/
        var OnTop = map.createStaticLayer('OnTop', groundTiles, 0, 0);

        /* LOAD PLAYER AND PLAYER VARIABLES*/
        loadFloorObjects(this, this.sceneId, 2);
        loadPlayer(this, this.sceneId, 3);
        
        

         this.physics.add.overlap(gameState.player, onFloorObj[2],  () => {
            inventoryManage(2, this, 2);
         });
         this.physics.add.overlap(gameState.player, onFloorObj[3],  () => {
            inventoryManage(3, this, 3);
         });
         this.physics.add.overlap(gameState.player, onFloorObj[4],  () => {
            inventoryManage(4, this, 4);
         });
         this.physics.add.overlap(gameState.player, onFloorObj[5],  () => {
            inventoryManage(2, this, 5);
         });
         this.physics.add.overlap(gameState.player, onFloorObj[6],  () => {
            inventoryManage(2, this, 6);
         });
         this.physics.add.overlap(gameState.player, onFloorObj[7],  () => {
            inventoryManage(2, this, 7);
         });






        const debugGraphics = this.add.graphics().setAlpha(0.5);        
    
        gameState.clipped.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });

        this.physics.add.overlap(npcId['boss2'], gameState.player, () => {
            gameState.hitpoints -= npcId['boss2'].attPower;
            console.log(gameState.hitpoints)
        });

        
         /*   gameState.invSlots['item2'].on('pointerup', function() {
                console.log("Clicked")
                gameState.invSlots['item2'].destroy();
        });*/

        createAnims(this);

        
    }

update() {
    gameUpdateLogic(this, this.sceneId);
}

}
