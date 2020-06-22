/* ADD ITEM TO INVENTORY */
function addToInv(object, game, indId) {
    //Sets a variable to 0....
    var trySlot = 0;
    //Runs i over as long as shorter than inventory length.
    for(var i = 0; i < inventory.length; i++) {
        //If inventory is empty at any points...
        if (inventory[i][0] == 0) {
            //Set inventory to the object...
            inventory[i][0] = object;
            //Set inventory secondary to the individual id (for controlling the sprite)
            inventory[i][1] = indId;
            //Add a new inventory sprite with the individual Id
            invSlots[indId] = game.add.sprite(slots[i][0], slots[i][1], items[inventory[i][0]][0]).setScrollFactor(0);
            invSlots[indId].setInteractive(); 
            //set latest inventory slot to i...
            gameState.latestInv = i;
            //reset trySlot for future use...
            trySlot = 0;
            //Set a gamestate boolean for external use
            gameState.invSuccess = true;
            //Exit the loop...
            i = inventory.length;
        } else {
            //for reiterating, so we know which slot we're in...
            trySlot += 1;
        }
            //If we run out of inventory then it's unsuccessful and we exit...
        if (trySlot >= inventory.length) {
            /*Inventory is Full*/
            gameState.invSuccess = false;
            console.log("%cInventory full!", conErr)
        }
    }
    //Once all of the above is done check if we added to inventory...

    if (gameState.invSuccess == true) {
        //the inventory we went into...
        var invSlot = gameState.latestInv;



        //Conditions on certain items being successfully picked up

        switch(object) {
            case 1:
                playerState.sword = true;
                

        }


        //wait for the click on inventory....
        invSlots[gameState.itemIds].on('pointerup', function () {
            //set the item clicked
            gameState.itemClicked = items[[inventory[invSlot][0]][0]];
            //send to itemHandler function
            itemHandler(gameState.itemClicked, invSlot, game)
        });
        //new unique id!
        gameState.itemIds += 1;
        //Send messages
        sendMessage("You add a "+items[inventory[invSlot][0]][1]+" to your inventory", game);
        console.log("%cAdded to inventory: "+gameState.invSuccess+"\n"+object, conCom);
    }
}




/*LOADS IN FLOOR OBJECTS*/
function loadFloorItems(game, scene, stage) {
    /*PRELOAD FUNCTIONS*/
    if(stage == 1) {
        console.log("%cLoading "+ items.length +" Floor Objects", conCre)
        for(var i =1; i < items.length; i++) {
            var ObjName = items[i][0];
            game.load.image(ObjName, 'assets/Inventory/'+ObjName+'.png');
        }
        console.log("%cFinished loading "+ i +" Floor Objects", conCom)
    }
    /*CREATE FUNCTIONS*/
    if(stage == 2) {
        console.log("%cCreating " + onFloor.length + " Floor Objects", conCom)
        for(var i =0; i < onFloor.length; i++) {
            var ObjName = onFloor[i][0];
                if(onFloor[i][5] == true) {
                    onFloorObj[i+1] = game.physics.add.sprite(onFloor[i][1], onFloor[i][2], onFloor[i][0]);
                    onFloorObj[i+1].setInteractive();
                    addToFloor(ObjName, onFloor[i][4], game);
                    console.log("%cCreated "+onFloor[i][0]+" on the floor at "+onFloor[i][1]+"/"+onFloor[i][2]+ "\n with ID: "+(i+1), conCom)
                }
        }
    }
}

/*DESTROY ITEM FUNCTION (removes from inventory)*/
function destroyItem(slot) {
invSlots[inventory[slot][1]].destroy();
inventory[slot][0] = 0;
inventory[slot][1] = 0;
gameState.itemClicked = '';
}


function addToFloor(id, item, game) {
    game.physics.add.overlap(gameState.player, onFloorObj[id],  () => {
        console.log(item);
        addToInv(item, game, gameState.itemIds);
        var invSlot = gameState.latestInv;
        var success = gameState.invSuccess;
        if (success) {
            onFloorObj[id].destroy();
            gameState.itemIds++;
        }
    });
}



/* ITEM FUNCTIONS */
function itemHandler(clicked, slot, game) {
    var itemIds = parseInt(clicked);
    var itemDesc = items[itemIds][2];
    if (itemIds== 1) {
        sendMessage(itemDesc, game)
    } else if (itemIds == 2) {
        destroyItem(slot);
    } else if (itemIds == 3) {
        if(gameState.hitpoints < 100) {
            gameState.hitpoints = 100;
            destroyItem(slot);
            sendMessage("You feel a rush and your hitpoints are restored to full!", game)
            gameState.particles.emitParticleAt(gameState.player.x, gameState.player.y)
            gameState.emitter.setBlendMode(Phaser.BlendModes.ADD);            
            //console.log("Player hitpoints restored");
        } else {
            sendMessage(itemDesc, game)

        }
    } else {
        //console.log("%cNothing interesting happens...", conCre)
    }   
    }
    