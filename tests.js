var fails = 0;

function test(game) {
    var gameStateitemIds = gameState.itemIds;


/** ADD TO INVENTORY TESTS */
    addToInv(1, game, 2);
    if (inventory[1][0] != 1) {
        failed(1);
    }
    if (inventory[1][1] != 2) {
        failed(2);
    }
    if (invSlots[1] == undefined) {
        failed(3);
    }
    if (gameState.latestInv != 1) {
        failed(4);
    }
    if (gameState.invSuccess != true) {
        failed(5);
    }
    //fake the click
    gameState.itemClicked = items[inventory[1][0]][0];

    if (gameState.itemClicked != '1') {
        failed(6);
    }

    //Fill up the inventory...

    addToInv(1, game, 3);
    addToInv(1, game, 4);
    addToInv(1, game, 5);

    if (gameState.latestInv != 4) {
        failed(7);
    }

    if (gameState.itemIds != 6) {
        failed(8);
    }

    addToInv(1, game, 6);

    if (gameState.invSuccess != false) {
        failed(9);
    }

/**  DESTROY ITEM TEST */

    destroyItem(1);
    destroyItem(2);
    destroyItem(3);
    destroyItem(4);

    if (inventory[1][0] != 0 && inventory[1][1] != 0 && gameState.itemClicked != '') {
        failed(10);
    }



    if (fails < 1) {
        console.log("%cPassed all tests.", conCom)
    }
}



function failed (int) {
    fails++;
    console.log("%cFailed Test "+int+". Total failed: "+fails, conErr);
}