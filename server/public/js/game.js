//import { threadId } from "worker_threads";

var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
 
var game = new Phaser.Game(config);

var consoleCol = [
    "background-color: red; color: white; padding: 1px;",
    "background-color: orange; color: black; padding: 1px;",
    "background-color: green; color: black; padding: 1px;"
];

 
function preload() {
    this.load.atlas('player', 'assets/Knight/spritesheet.png', 'assets/Knight/sprites.json');
    this.load.atlas('boss1', 'assets/NPCs/boss1spritesheet.png', 'assets/NPCs/boss1sprites.json');
    this.load.atlas('otherPlayer', 'assets/Knight/spritesheet.png', 'assets/Knight/sprites.json');
    this.load.atlas('playAtt', 'assets/Knight/paspritesheet.png', 'assets/Knight/pasprites.json');
    this.load.tilemapTiledJSON('map', 'assets/Map.json');
    this.load.image('tiles', 'assets/tiles.png', {frameWidth: 16, frameHeight: 16});
    }
 
function create() {
    var self = this;
    this.socket = io();
    this.players = this.add.group();
    this.npcs = this.add.group();

    /* LOAD MAP */
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

    createAnims(this);

  this.socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
        displayPlayers(self, players[id], 'player');
        players[id].self = true;
        self.cameras.main.setBounds(0, 0, 1000, 800);
        self.cameras.main.setZoom(2.2);
        var OnTop = map.createStaticLayer('OnTop', groundTiles, 0, 0);
       // self.cameras.main.startFollow(, true);
      } else {
        displayPlayers(self, players[id], 'otherPlayer');
        var OnTop = map.createStaticLayer('OnTop', groundTiles, 0, 0);
      }
    });
  });
 
  this.socket.on('newPlayer', function (playerInfo) {
    displayPlayers(self, playerInfo, 'otherPlayer');
    var OnTop = map.createStaticLayer('OnTop', groundTiles, 0, 0);
  });
 
  this.socket.on('npcLoad', function (npcs) {
      loadNPCS(self, npcs);
      var OnTop = map.createStaticLayer('OnTop', groundTiles, 0, 0);
  });

  this.socket.on('disconnect', function (playerId) {
    self.players.getChildren().forEach(function (player) {
      if (playerId === player.playerId) {
        player.destroy();
      }
    });
  });
  this.socket.on('playerUpdates', function (players) {
    Object.keys(players).forEach(function (id) {
      self.players.getChildren().forEach(function (player) {
        if (players[id].playerId === player.playerId) {
          player.setPosition(players[id].x, players[id].y);
          player.anims.play(players[id].animActive, true);
          player.flipX = players[id].flipX;
          player.setScale(players[id].scale);
        }
      });
      if(players[id].playerId === self.socket.id) {
        self.playerDisplay.setText([
            'Health: '+players[id].hitpoints
            ]);
        
      }
    });
  });
    this.cursors = this.input.keyboard.createCursorKeys();
    this.playerDisplay = this.add.text(225, 175).setScrollFactor(0).setFontSize(10).setColor('#fcba03');
    /*READY FOR INPUT*/
    this.leftKeyPressed = false;
    this.rightKeyPressed = false;
    this.upKeyPressed = false;
    this.downKeyPress = false;
    this.spaceKeyPressed = false;
}
 
function update() {

const left = this.leftKeyPressed;
const right = this.rightKeyPressed;
const up = this.upKeyPressed;
const down = this.downKeyPressed;
const space = this.spaceKeyPressed;
 
if (this.cursors.left.isDown) {
  this.leftKeyPressed = true;
} else if (this.cursors.right.isDown) {
  this.rightKeyPressed = true;
} else {
  this.leftKeyPressed = false;
  this.rightKeyPressed = false;
}
 
if (this.cursors.up.isDown) {
  this.upKeyPressed = true;
} else if(this.cursors.down.isDown){
    this.upKeyPressed = false;
    this.downKeyPressed = true;
} else {
    this.upKeyPressed = false;
    this.downKeyPressed = false;
}

if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
    this.spaceKeyPressed = true;
} else {
    this.spaceKeyPressed = false;
}
 
/*CHECKS IF INTERACTION IS NOT EQUAL TO WHAT SERVER THINKS IT IS*/
if (left !== this.leftKeyPressed || right !== this.rightKeyPressed || up !== this.upKeyPressed || down !== this.downKeyPressed || space !== this.spaceKeyPressed) {
    /*EMITS ANY CHANGES*/
  this.socket.emit('playerInput', { left: this.leftKeyPressed , right: this.rightKeyPressed, up: this.upKeyPressed, down: this.downKeyPressed, space: this.spaceKeyPressed });

}

}


function loadNPCS(game, npcs) {
    const npc = game.add.sprite(npcs.x, npcs.y, npcs.name).setOrigin(0, 0);
    npc.id = npcs.npcId
    npc.flipX = npcs.flipX
    game.npcs.add(npc);
    console.log("%cLoad received for NPC name: "+npc.name+"\nFlipped?: "+npc.flipX+"\nUnique Id: "+npcs.npcId, consoleCol[2])
}


function createAnims(game) {
    game.anims.create({
        key: 'playAtt',
        frames: game.anims.generateFrameNames('playAtt', {prefix: 'sprite0', start: 4, end: 8, zeroPad: 0}),
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'walk',
        frames: game.anims.generateFrameNames('player', {prefix: 'sprite', start: 1, end: 7, zeroPad: 0}),
        frameRate: 10,
        repeat: -1
    });
    game.anims.create({
        key: 'idle',
        frames: [{key: 'player', frame: 'sprite1'}],
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'walkBoss',
        frames: game.anims.generateFrameNames('boss2', {prefix: 'sprite', start: 1, end: 7, zeroPad: 0}),
        frameRate: 10,
        repeat: -1
    });
    game.anims.create({
        key: 'idleBoss',
        frames: [{key: 'boss2', frame: 'sprite1'}],
        frameRate: 10,
        repeat: -1
    });
}


function displayPlayers(self, playerInfo, sprite) {
    const player = self.add.sprite(playerInfo.x, playerInfo.y, sprite).setOrigin(0, 0).setDisplaySize(53, 40);
    if (sprite == 'player') {
        self.cameras.main.startFollow(player, true);
    }
    player.playerId = playerInfo.playerId;
    self.players.add(player);
  }