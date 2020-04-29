/* [0:'Name', 1:XLoc, 2:YLoc, 3:Scale, 4:Range, 5:WayToFace, 6:SpriteFacing, 7:AttPower, 8:Health, 9:'Scene', 10:Aggressive Bool, 11:Can-Be-Attacked Bool, 12:Normal Att Bool]  */
var bosses = [
    ['boss1', 450, 250, 1.2, 50, 'left', 'right', 0.5, 20, 'SceneOne', false, true, true],
];

/* Loads NPCs into scene and assigns attributes */
/* [0:'Name', 1:XLoc, 2:YLoc, 3:Scale, 4:Range, 5:WayToFace, 6:SpriteFacing, 7:AttPower, 8:Health, 9:'Scene', 10:Aggressive Bool, 11:Can-Be-Attacked Bool, 12:Normal Att Bool]  */
function loadNPCs(game, scene, stage) {
    /*PRELOAD FUNCTIONS*/
    if(stage == 1) {
        console.log("%cPreloading " + bosses.length +" NPCs", conCre);
        for(var i =0; i < bosses.length; i++) {
            if(bosses[i][9] == scene) {
                game.load.atlas(bosses[i][0], 'assets/NPCs/'+bosses[i][0]+'spritesheet.png', 'assets/NPCs/'+bosses[i][0]+'sprites.json');
                game.load.atlas(bosses[i][0]+'Att', 'assets/NPCs/'+bosses[i][0]+'Att.png', 'assets/NPCs/'+bosses[i][0]+'Att.json');
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
                var npc = npcId[bosses[i][0]]
                npc.setCollideWorldBounds(true);
                npc.range = bosses[i][4];

                /*5 + 6 HANDLED BELOW*/
                if(bosses[i][5] == 'left') {
                    if(bosses[i][6] == 'right') {
                        npc.flipX = true;
                        npc.direction = 'left';
                    
                    } else {
                        npc.flipX = false;
                        npc.direction = 'left';
                    }
                } else if(bosses[i][5] == 'right') {
                    if(bosses[i][6] == 'left') {
                        npc.flipX = true;
                        npc.direction = 'right';
                    } else {
                        npc.flipX = false;
                        npc.direction = 'right';
                    }
                }
                npc.attPower = bosses[i][7];
                npc.health = bosses[i][8];
                /* 9 HANDLED SEPERATELY*/
                npc.aggressive = bosses[i][10]
                npc.attackable = bosses[i][11]
                /** BOOLEAN - DOES NPC HANDLE ATTACKING DIFFERENTLY? */
                npc.gwAttFunc = bosses[i][12]
                npc.canAttack = true;
                npc.alive = true;
                npc.attacking = false;
                npc.setInteractive();
                npc.move = 0;
                game.physics.add.collider(npc, gameState.clipped);
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
            if(!npcId.attacking) {
                npcId.setVelocityX(40)
                npcId.play('walkBoss', true);
            }
                
    //If player smaller
        } else if (playerX < npcId.x) {
            if(npcId.direction == 'right') {
                npcId.flipX = !npcId.flipX;
                npcId.direction = 'left';
            } else {
                npcId.flipX = npcId.flipX
            }
            if(!npcId.attacking) {
                npcId.setVelocityX(-40)
                npcId.play('walkBoss', true);
            }
        }
    //If player larger
        if(playerY > npcId.y && !npcId.attacking) {
            npcId.setVelocityY(40)
            npcId.play('walkBoss', true);
    //If player smaller
        } else if (playerY < npcId.y && !npcId.attacking) {
            npcId.setVelocityY(-40)
            npcId.play('walkBoss', true);
        }
    
    }

function attackNpc(game) {
    
    for (var i = 0; i < bosses.length; i++) {
        if (npcId[bosses[i][0]] != undefined) {
            var npc = npcId[bosses[i][0]]
            if (npc.gwAttFunc) {

            var facing = false;
            if(npc.x < gameState.player.x && gameState.player.direction == 'left') {
                facing = true;
            } else if (npc.x > gameState.player.x && gameState.player.direction == 'right') {
                facing = true;
            } else {
                facing = false;
            }
            var name = bosses[i][0]
            game.physics.add.collider(npcId[bosses[i][0]], gameState.player, () => {
                npc.setBounce(0, 0);
                if(npc.canAttack && npc.aggressive) {
                    npc.anims.play(name+'Att', true);
                    npc.setVelocityX(0);
                    npc.setVelocityY(0);
                    npc.attacking = true;
                    game.time.delayedCall(500, ()=> {
                        if (npc.attacking && npc.canAttack) {
                            var defence = gameState.player.defending
                            var power = npc.attPower
                            var damage = (defence)/(Math.random()*100+85)  * power
                            console.log("%cSuccess defence against "+name+".", conCom)
                            if(defence == 0 || !facing) {
                                damage = (Math.random()+1)*power
                            }
                            gameState.hitpoints -= damage*20
                            console.log("%cTaken damage against "+name+". Damage taken: "+Math.round(damage*20)+".", conCom)
                        }
                        npc.canAttack = false;
                        damage = 0
                        game.time.delayedCall(2000, ()=> {
                            npc.attacking = false;
                            npc.canAttack = true;
                        });
                    });
                }
            });
            } else {
                /**IF NOT USING USUAL ATTACK CALCULATIONS */
                handleBosses(npc, game);
            }

            /** HANDLES PLAYER ATTACKS */
            npc.on('pointerup', function () {
                if(npc.x < gameState.player.x && gameState.player.direction == 'left') {
                    facing = true;
                } else if (npc.x > gameState.player.x && gameState.player.direction == 'right') {
                    facing = true;
                } else {
                    facing = false;
                }
                /** CHECKS IF PLAYER IN RANGE, FACING NPC, AND IS ATTACKABLE */
                if(isClose(npc, npc.range) && npc.attackable && gameState.player.canAttack) {
                    if (facing) {
                        gameState.player.canAttack = false;
                        gameState.attacking = true;
                        npc.aggressive = true;
                        gameState.player.defending = 0;
                        gameState.player.anims.play('playAtt', true);
                        gameState.player.setScale(1);
                        npc.health -= 2;
                        console.log("%cSuccess attack on "+name+". Health: "+npc.health, conCom)
                        game.time.delayedCall(400, ()=> {
                            gameState.attacking = false;
                            gameState.player.setScale(1.2);
                            game.time.delayedCall(800, ()=> {
                                gameState.player.canAttack = true;
                            });
                        });
                    } else if(npc.alive == false) {
                        console.log("Npc Dead")
                    } else if(!facing) {
                        console.log("%cFace your attacker!", conCre)
                    } else {
                        console.log("%cNot close enough", conCre)
                    }
                }   else if(!npc.attackable) {
                        console.log("%cNPC cannot be attacked", conCre)
                }
    });
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
            /** IF CLOSE TO BOSS, AND BOSS ALIVE, CHASE. IF NOT CLOSE, DON'T MOVE. IF NOT AGGRESSIVE, DON'T MOVE*/
            if (isClose(npc, 100) && npc.alive == true && npc.aggressive) {
                chasePlayer(npc, 1, npc.range);
                npc.move += 1;
            } else if (npc.alive === true) {
                    if (npc.move >= 500){
                        npc.x = bosses[i][1];
                        npc.y = bosses[i][2];
                        npc.aggressive = bosses[i][10]
                    }
                npc.play('idleBoss', true);
                npc.setVelocityX(0);
                npc.setVelocityY(0);
            }
        
        }
    }
}

function handleBosses(npc, game) {

}