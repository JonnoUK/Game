/*itemName (sprite), XLoc, YLoc, Scene, itemId, visible*/
var onFloor = [
    ['item1', 100, 150, 'SceneOne', 1, false],
    ['item2', 100, 200, 'SceneOne', 2, true],
    ['item3', 100, 250, 'SceneOne', 3, true],
];

var objects = [
    ["", 0],
    ["item1", 0],
    ['item2', 0],
    ["item3", 0], 
    ['item4', 0], 
    ['item5', 0]
]

var slots = [
    [15, 30],
    [35, 30],
    [55, 30],
    [75, 30],
    [95, 30]
];

/* ADD ITEM TO INVENTORY */
function addToInv(object, game, indId) {

    var trySlot = 0;
    for(var i = 0; i < inventory.length; i++) {
        if (inventory[i][0] == 0) {
            inventory[i][0] = object;
            inventory[i][1] = indId;
            invSlots[indId] = game.add.sprite(slots[i][0], slots[i][1], objects[inventory[i][0]][0]).setScrollFactor(0);
            invSlots[indId].setInteractive(); 
            //once object defined, set i to maximum to stop loop...
            gameState.latestInv = i;
            trySlot = 0;
            gameState.invSuccess = true;
            i = inventory.length;
        } else {
            trySlot += 1;
        }
        if (trySlot >= inventory.length) {
            /*Inventory is Full*/
            gameState.invSuccess = false;
            console.log("%cInventory full!", conErr)
        }
    }
    if (gameState.invSuccess == true) {
        onFloorObj[indId].destroy();
        console.log("%cDeleted Item from floor Id: "+indId, conCre)
        console.log("%cAdded to inventory: "+gameState.invSuccess+"\n"+object, conCom);
    }
}

/*LOADS IN FLOOR OBJECTS*/
function loadFloorObjects(game, scene, stage) {
    /*PRELOAD FUNCTIONS*/
    if(stage == 1) {
        console.log("%cLoading "+ onFloor.length +" Floor Objects", conCre)
        for(var i =0; i < onFloor.length; i++) {
            var ObjScene = onFloor[i][3];
            var ObjName = onFloor[i][0];
            if(ObjScene == scene) {
                game.load.image(ObjName, 'assets/Inventory/'+ObjName+'.png');
            }
        }
        console.log("%cFinished loading "+ i +" Floor Objects", conCom)
    }
    /*CREATE FUNCTIONS*/
    if(stage == 2) {
        console.log("%cCreating " + onFloor.length + " Floor Objects", conCom)
        for(var i =0; i < onFloor.length; i++) {
            var ObjScene = onFloor[i][3];
            var ObjName = onFloor[i][0];
            if(onFloor[i][3] == scene) {
                if(onFloor[i][5] == true) {
                    onFloorObj[i+1] = game.physics.add.sprite(onFloor[i][1], onFloor[i][2], onFloor[i][0]);
                    onFloorObj[i+1].setInteractive();
                    console.log("%cCreated "+onFloor[i][0]+" on the floor at "+onFloor[i][1]+"/"+onFloor[i][2]+ "\n with ID: "+(i+1), conCom)
                }
            }
        }
    }
}

/*DESTROY ITEM FUNCTION (removes from inventory)*/

function destroyItem(itemClicked, slot) {
invSlots[inventory[slot][1]].destroy();
inventory[slot][0] = 0;
inventory[slot][1] = 0;
gameState.itemClicked = '';
console.log("Destroyed Item Id: "+itemClicked)
}


/* PHYSICS OF FLOOR OBJECTS & CLICK WHILE IN INVENTORY */
function handleItems(game) {
if(onFloorObj[2] != undefined){
    game.physics.add.overlap(gameState.player, onFloorObj[2],  () => {
        addToInv(2, game, 2);
        var invSlot = gameState.latestInv;
        var success = gameState.invSuccess;
        if (success) {
        invSlots[2].on('pointerup', function () {
            gameState.itemClicked = objects[ [inventory[invSlot][0]] [0] ];
            itemHandler(gameState.itemClicked, invSlot, game)
        });
    }
    });
}


if(onFloorObj[3] != undefined){
    game.physics.add.overlap(gameState.player, onFloorObj[3],  () => {
        addToInv(3, game, 3);
        var invSlot = gameState.latestInv;
        var success = gameState.invSuccess;
        if (success) {
        invSlots[3].on('pointerup', function () {
            gameState.itemClicked = objects[ [inventory[invSlot][0]] [0] ];
            itemHandler(gameState.itemClicked, invSlot, game)
        });
    }
    });
}
if(onFloorObj[4] != undefined){
    game.physics.add.overlap(gameState.player, onFloorObj[4],  () => {
        addToInv(4, game, 4);
        var invSlot = gameState.latestInv;
        var success = gameState.invSuccess;
        if (success) {
        invSlots[4].on('pointerup', function () {
            gameState.itemClicked = objects[ [inventory[invSlot][0]] [0] ];
            itemHandler(gameState.itemClicked, invSlot, game)
        });
    }
    });
}
if(onFloorObj[5] != undefined){
    game.physics.add.overlap(gameState.player, onFloorObj[5],  () => {
        addToInv(2, game, 5);
        var invSlot = gameState.latestInv;
        var success = gameState.invSuccess;
        if (success) {
        invSlots[5].on('pointerup', function () {
            gameState.itemClicked = objects[ [inventory[invSlot][0]] [0] ];
            itemHandler(gameState.itemClicked, invSlot, game)
        });
    }
    });
}
if(onFloorObj[6] != undefined){
    game.physics.add.overlap(gameState.player, onFloorObj[6],  () => {
        addToInv(2, game, 6);
        var invSlot = gameState.latestInv;
        var success = gameState.invSuccess;
        if (success) {
        invSlots[6].on('pointerup', function () {
            gameState.itemClicked = objects[ [inventory[invSlot][0]] [0] ];
            itemHandler(gameState.itemClicked, invSlot, game)
            });
        }
    });
}
if(onFloorObj[7] != undefined){
    game.physics.add.overlap(gameState.player, onFloorObj[7],  () => {
        addToInv(2, game, 7);
        var invSlot = gameState.latestInv;
        var success = gameState.invSuccess;
        if (success) {
            invSlots[7].on('pointerup', function () {
                gameState.itemClicked = objects[ [inventory[invSlot][0]] [0] ];
                itemHandler(gameState.itemClicked, invSlot, game)
            });
        }
    });
}

}



/* ITEM FUNCTIONS */
function itemHandler(clicked, slot, game) {

    if (clicked[0] == 'item1') {

        

    } else if (clicked[0] == 'item2') {
    
        destroyItem(2, slot);
    } else if (clicked[0] == 'item3') {
        if(gameState.hitpoints < 100) {
            gameState.hitpoints = 100;
            destroyItem(3, slot);
            //console.log("Player hitpoints restored");
        } else {
            console.log("This item will restore your hitpoints")
        }
    } else {
        //console.log("%cNothing interesting happens...", conCre)
    }   
    }
    