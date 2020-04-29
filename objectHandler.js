/** 1: NAME, 2: XLoc, 3: YLoc, 4: canTake, 5: replaceWith, 6: rechargeTime, 7: visible */
var gameObjects = [
    ['emptyBox', 250, 250, true, 'emptyBox', 0, false, 0],
    ['redBox', 399, 77, false, 'emptyBox', 7500, true, 3],
]


function loadObjects(game, stage) {
    /**PRE LOAD FUNCTIONALITY */
    var totalMade = 0;
    for (var i = 0; i < gameObjects.length; i++) {
        var name = gameObjects[i][0]
        var xLoc = gameObjects[i][1]
        var yLoc = gameObjects[i][2]
        var item = gameObjects[i][7]
        var replace = gameObjects[i][4]
        var timeDelay = gameObjects[i][5]
        if (stage == 1) {
            game.load.image(name, 'assets/Objects/'+name+'.png');
        }
        if (stage == 2 && gameObjects[i][6] == true) {
                gameObject[name] = game.add.image(xLoc, yLoc, name);
                var gameObj = gameObject[name]
                gameObj.visible = gameObjects[i][6]
                totalMade += 1;
                if(item != 0) {
                    gameObj.setInteractive();
                    gameObj.on('pointerup', () => {
                        if(isClose(gameObj, 50, 'object')) {
                            addToInv(item, game, gameState.itemIds);
                            var timeDelay2 = timeDelay
                            timeDelay2 = (Math.random()*timeDelay2) + (Math.random()*200) + 1500;
                            var success = gameState.invSuccess;
                            if (success) {
                                gameObj.visible = false;
                                var temporary = game.add.image(xLoc, yLoc, replace)
                                game.time.delayedCall(timeDelay2, ()=> {
                                    temporary.destroy();
                                    gameObj.visible = true;
                                });
                            }
                        } else {
                            console.log("%cNot close enough", conCre)
                        }
                    });
                }
        }
    }  
    if (stage == 1) {
        console.log("%cLoaded "+i+" Objects", conCom)
    } else {
        
        console.log("%cGenerated "+totalMade+" Objects", conCom)
    }
} 