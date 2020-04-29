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

        this.load.tilemapTiledJSON('map', 'assets/Map/NewestMap.json');
        //this.load.image('trees', 'assets/tree.png');
        this.load.image('ground_tiles', 'assets/Map/ground_tiles.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('Castle2', 'assets/Map/Castle2.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('tiles3', 'assets/Map/tree-variations.png', {frameWidth: 32, frameHeight: 32});

        this.load.image('redBox', 'assets/redBox.png');

        console.log("%cFinished loading map in PreLoad",conCre)
    }

    create() {
        /* LOAD MAP */
        gameState.cursors = this.input.keyboard.createCursorKeys();
        console.log("%cCreating Map",conCre)
        map = this.make.tilemap({key: 'map'});
        console.log("%cFinished creating map",conCom)
        const groundTiles = map.addTilesetImage('ground_tiles');
        const castleTiles = map.addTilesetImage('Castle2');
        const trees = map.addTilesetImage('tiles3');

 
        console.log("%cFinished defining tile types",conCom)
 
        //var Layer2 = map.createDynamicLayer('Layer2', trees, 0, 0);
        gameState.clipped = map.createDynamicLayer('Clipped', groundTiles, 0, 0);
        gameState.clipped.setCollisionByProperty({collides: true});


        var backgroundLayer = map.createStaticLayer('Background', groundTiles, 0, 0);
        console.log("%cFinished defining background",conCom)

        var layer1 = map.createStaticLayer('Layer1', castleTiles, 0, 0);
        console.log("%cFinished defining Layer1",conCom)



        console.log("%cFinished defining clipped",conCom)



        /* LOAD SPRITES BELOW 'ON TOP' LAYER OF MAP*/
        loadPlayer(this, this.sceneId, 2);
        loadNPCs(this, this.sceneId, 2);

        var onTop1 = map.createStaticLayer('OnTop1', castleTiles, 0, 0);
        var onTop2 = map.createStaticLayer('OnTop2', castleTiles, 0, 0);
        var onTop3 = map.createStaticLayer('OnTop3', castleTiles, 0, 0);
        console.log("%cFinished defining map layers",conCom)

        /*LOAD FINAL LAYER OF MAP*/
        //var OnTop = map.createStaticLayer('OnTop', groundTiles, 0, 0);

        /* LOAD PLAYER AND PLAYER VARIABLES*/
        loadFloorObjects(this, this.sceneId, 2);
        loadPlayer(this, this.sceneId, 3);
        
        /*HANDLE ITEM OVERLAPS AND CLICKS*/
        handleItems(this);

        keyListen(this);
        attackNpc(this);

        var redBox = this.add.image(399, 77, 'redBox');

        

        const debugGraphics = this.add.graphics().setAlpha(0);        
    
        gameState.clipped.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
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
