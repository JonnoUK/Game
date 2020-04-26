
const players = {};

const config = {
    type: Phaser.HEADLESS,
    parent: 'phaser-example',
    width: 800,
    height: 600,
autoFocus: false,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 0 }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
   
  function preload() {
        this.load.atlas('player', 'assets/Knight/spritesheet.png', 'assets/Knight/sprites.json');
        this.load.tilemapTiledJSON('map', 'assets/Map.json');
        this.load.image('tiles', 'assets/tiles.png', {frameWidth: 16, frameHeight: 16});
  }
   
  function create() {
          /* LOAD MAP */
    map = this.make.tilemap({key: 'map'});
    const groundTiles = map.addTilesetImage('tiles');

    this.clipped = map.createDynamicLayer('Clipped', groundTiles, 0, 0);
    this.clipped.setCollisionByProperty({collides: true});
    var fade1 = map.createStaticLayer('Fade1', groundTiles, 0, 0);
    var fade2 = map.createStaticLayer('Fade2', groundTiles, 0, 0);
    var fade3 = map.createStaticLayer('Fade3', groundTiles, 0, 0);
    fade1.setCollisionByProperty({collides: true});
    fade2.setCollisionByProperty({collides: true});
    fade3.setCollisionByProperty({collides: true});

    const self = this;
    this.players = this.physics.add.group();
    this.npcs = this.physics.add.group();
 
    var bosses = [
        ['boss1', 450, 250, 1.2, 50, 'left', 'right', 0.5, 20],
    ];

    


    io.on('connection', function (socket) {
        for (var i = 0; i<bosses.length;i++) {

            self.npcs[i] = {
                name: bosses[i][0],
                x: bosses[i][1],
                y: bosses[i][2],
                scale: bosses[i][3],
                flipX: false,
                direction: 'right',
                npcId: i,
            };
            if(bosses[i][5] == 'left') {
                if(bosses[i][6] == 'right') {
                    self.npcs[i].flipX = true;
                    self.npcs[i].direction = 'left';
                
                } else {
                    self.npcs[i].flipX = false;
                    self.npcs[i].direction = 'left';
                }
            } else if(bosses[i][5] == 'right') {
                if(bosses[i][6] == 'left') {
                    self.npcs[i].flipX = true;
                    self.npcs[i].direction = 'right';
                } else {
                    self.npcs[i].flipX = false;
                    self.npcs[i].direction = 'right';
                }
            }
        }

    console.log('a user connected');
    // create a new player and add it to our players object
    players[socket.id] = {
        x: 250,
        y: 350,
        animActive: 'idle',
        hitpoints: 100,
        flipX: false,
        playerId: socket.id,
        scale: 1.2,
        attacking: false,
        input: {
            left: false,
            right: false,
            up: false,
            down: false,
      },

    };
        // add player to server
        addPlayer(self, players[socket.id]);
        // send the players object to the new player
        socket.emit('currentPlayers', players);

        // update all other players of the new player
        socket.broadcast.emit('newPlayer', players[socket.id]);

        /* DISCONNECTION HANDLING */
        socket.on('disconnect', function () {

            console.log('user disconnected')
            // remove player from server
            removePlayer(self, socket.id);

            // remove this player from our players object
            delete players[socket.id];

            // emit a message to all players to remove this player
            io.emit('disconnect', socket.id);
        });
        /*END OF DISCONNECTION HANDLING*/

        // listens for Player Input
        socket.on('playerInput', function (inputData) {
            handlePlayerInput(self, socket.id, inputData);
          });
          for (var i = 0; i<bosses.length;i++) {
            console.log(self.npcs[i].npcId)
            addNPC(self, bosses, self.npcs[i]);
            socket.emit('npcLoad', self.npcs[i]);
          }
      });


  }
   
  function update() {
    this.players.getChildren().forEach((player) => {
      const input = players[player.playerId].input;
      player.animPlay = 'idle';

      if (input.left) {
        player.setVelocityX(-70);
        player.animPlay = 'walk';
        player.flipX = true;
       // player.anims.play('walk', true);
      } else if (input.right) {
        player.setVelocityX(70);
        player.animPlay = 'walk';
        player.flipX = false;
      } else {
        player.setVelocityX(0);
      }
     
      if (input.up) {
          player.setVelocityY(-70);
          player.animPlay = 'walk';
      } else if (input.down) {
          player.setVelocityY(70);
          player.animPlay = 'walk';
      } else {
          player.setVelocityY(0);
      }

      if(input.space){
        player.animPlay = 'playAtt';
        player.attacking = true;
        player.scale = 1;
    } else if (player.attacking == true) {
        this.time.delayedCall(400, ()=> {
            player.attacking = false;
            player.scale = 1.2;
        });
      }

      if(player.attacking == true) {
        player.animPlay = 'playAtt';
      }

      if(!player.attacking && !input.left && !input.right && !input.up && !input.down ){
        player.animPlay = 'idle';
    }
      players[player.playerId].x = player.x;
      players[player.playerId].y = player.y;
      players[player.playerId].animActive = player.animPlay;
      players[player.playerId].flipX = player.flipX;
      players[player.playerId].scale = player.scale;
    this.npcs.getChildren().forEach((npc) => {
        //console.log(npc.Id, player.playerId)
        if(isClose(player.x, player.y, npc.npcId, 100)) {
            console.log("player ID: "+player.playerId+" is close to NPC ID: "+npc.npcId)
    }   
    });

    });
    


    //this.physics.world.wrap(this.players, 5);

    io.emit('playerUpdates', players);
  }


/* Checks whether player is in radius around Npc (parsed) */
function isClose(npcId, range) {
    if(npcId.alive == true) {
    var maxX = npcId.x + range;
    var minX = npcId.x - range;
    var maxY = npcId.y + range;
    var minY = npcId.y - range;

    if(gameState.player.x >= minX && gameState.player.x <= maxX && gameState.player.y >= minY && gameState.player.y <= maxY) {
    return true;
    }
}
}

   
function addPlayer(self, playerInfo) {
    self.physics.world.setBounds(0, 0, 800, 600);
  const player = self.physics.add.image(playerInfo.x, playerInfo.y, 'player').setOrigin(0, 0).setScale(1.2);
  player.setCollideWorldBounds(true);
  self.physics.add.collider(player, self.clipped);
  player.setDrag(100);
  player.setAngularDrag(100);
  player.setMaxVelocity(200);
  
  player.playerId = playerInfo.playerId;
  self.players.add(player);
}


function addNPC(self, bosses, npcInp) {
        const npc = self.physics.add.image(npcInp.x, npcInp.y, npcInp.name).setOrigin(0, 0).setScale(npcInp.scale);
        npc.setCollideWorldBounds(true);
        npc.name = npcInp.name
        npc.uId = npcInp.npcId
        console.log("Logged Npc Id: "+npc.uId)
        self.npcs.add(npc);
    }

function removePlayer(self, playerId) {
  self.players.getChildren().forEach((player) => {
    if (playerId === player.playerId) {
      player.destroy();
    }
  });
}

function handlePlayerInput(self, playerId, input) {

    self.players.getChildren().forEach((player) => {
        /*IF SOCKET IS YOURS THEN UPDATE YOUR CORRESPONDING PLAYER ID*/
        if (playerId === player.playerId) {
            /*SETS INPUT TO PARSED VARIABLE*/
            players[player.playerId].input = input;
        }
    });
}



  const game = new Phaser.Game(config);
  window.gameLoaded();