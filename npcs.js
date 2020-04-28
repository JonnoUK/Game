/* ['Name', XLoc, YLoc, Scale, Range, WayToFace, SpriteFacing, Scale, Health, 'Scene']  */
var bosses = [
    ['boss2', 450, 250, 1.2, 50, 'left', 'right', 0.5, 20, 'SceneOne'],
];

/* Loads NPCs into scene and assigns attributes */
/* [0:'Name', 1:XLoc, 2:YLoc, 3:Scale, 4:Range, 5:WayToFace, 6:SpriteFacing, 7:AttPower, 8:Health, 9:'Scene']  */
function loadNPCs(game, scene, stage) {
    /*PRELOAD FUNCTIONS*/
    if(stage == 1) {
        console.log("%cPreloading " + bosses.length +" NPCs", conCre);
        for(var i =0; i < bosses.length; i++) {
            if(bosses[i][9] == scene) {
                game.load.atlas(bosses[i][0], 'assets/NPCs/'+bosses[i][0]+'spritesheet.png', 'assets/NPCs/'+bosses[i][0]+'sprites.json');
            }
        }
        if (i = bosses.length) {
            console.log("%cLoaded " + i + " NPCs", conCom);
        } else {
            console.log("%cError loading NPCs. Stuck at iteration "+i, conErr);
        }
    }
    /*CREATE FUNCTIONS*/
    if(stage == 2) {
        console.log("%cCreating NPCs", conCom)
        for(var i =0; i < bosses.length; i++) {
            if(bosses[i][9] == scene) {
                npcId[bosses[i][0]] = game.physics.add.sprite(bosses[i][1], bosses[i][2], bosses[i][0]).setScale(bosses[i][3]);
                npcId[bosses[i][0]].setCollideWorldBounds(true);
                npcId[bosses[i][0]].attPower = bosses[i][7];
                npcId[bosses[i][0]].health = bosses[i][8];
                npcId[bosses[i][0]].alive = true;
                npcId[bosses[i][0]].range = bosses[i][4];
                npcId[bosses[i][0]].setInteractive();
                npcId[bosses[i][0]].move = 0;
                game.physics.add.collider(npcId[bosses[i][0]], gameState.clipped);

                if(bosses[i][5] == 'left') {
                    if(bosses[i][6] == 'right') {
                        npcId[bosses[i][0]].flipX = true;
                        npcId[bosses[i][0]].direction = 'left';
                    
                    } else {
                        npcId[bosses[i][0]].flipX = false;
                        npcId[bosses[i][0]].direction = 'left';
                    }
                } else if(bosses[i][5] == 'right') {
                    if(bosses[i][6] == 'left') {
                        npcId[bosses[i][0]].flipX = true;
                        npcId[bosses[i][0]].direction = 'right';
                    } else {
                        npcId[bosses[i][0]].flipX = false;
                        npcId[bosses[i][0]].direction = 'right';
                    }
                }
            }
        }
    }
}

function chasePlayer(npcId) {
    var playerX = gameState.player.x
    var playerY = gameState.player.y
    //If player larger
        if(playerX > npcId.x) {
            if(npcId.direction == 'left') {
                npcId.flipX = !npcId.flipX;
                npcId.direction = 'right';
            } else {
                npcId.flipX = npcId.flipX;
            }
                npcId.setVelocityX(40)
                npcId.play('walkBoss', true);
                
    //If player smaller
        } else if (playerX < npcId.x) {
            if(npcId.direction == 'right') {
                npcId.flipX = !npcId.flipX;
                npcId.direction = 'left';
            } else {
                npcId.flipX = npcId.flipX
            }
            npcId.setVelocityX(-40)
            npcId.play('walkBoss', true);
        }
    //If player larger
        if(playerY > npcId.y) {
            npcId.setVelocityY(40)
            npcId.play('walkBoss', true);
    //If player smaller
        } else if (playerY < npcId.y) {
            npcId.setVelocityY(-40)
            npcId.play('walkBoss', true);
        }
    
    }

function attackNpc() {
    for (var i = 0; i < bosses.length; i++) {
        if (npcId[bosses[i][0]] != undefined) {
            var npc = npcId[bosses[i][0]]
            var facing = false;
            if(npc.x < gameState.player.x && gameState.player.direction == 'left') {
                facing = true;
            } else if (npc.x > gameState.player.x && gameState.player.direction == 'right') {
                facing = true;
            } else {
                facing = false;
            }

            if(isClose(npc, npc.range) && facing) {
                //if(gameState)
                npc.health -= 2;
                console.log("%cSuccess attack on "+bosses[i][0]+". Health: "+npc.health, conCom)
            } else if(npc.alive == false) {
                console.log("Npc Dead")
            } else if(!facing) {
                console.log("%cFace your attacker!", conCre)
            } else {
                console.log("%cNot close enough", conCre)
            }
        }
    }
}


function npcUpdates() {
    for (var i = 0; i < bosses.length; i++) {
        if (npcId[bosses[i][0]] != undefined) {
            var npc = npcId[bosses[i][0]]

            /** Checks if boss is still alive... */
            if(npc.alive == true && npc.health <= 0) {
                npc.alive = false;
                npc.destroy();
            }
            /** IF CLOSE TO BOSS, AND BOSS ALIVE, CHASE. IF NOT CLOSE, DON'T MOVE*/
            if (isClose(npc, 100) && npc.alive == true) {
                chasePlayer(npc, 1, 150);
                npc.move += 1;
            } else if (npc.alive === true) {
                    if (npc.move >= 500){
                        npc.x = bosses[0][1];
                        npc.y = bosses[0][2];
                    }
                npc.play('idleBoss', true);
                npc.setVelocityX(0);
                npc.setVelocityY(0);
            }
        
        }
    }
}