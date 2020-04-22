var npcId = new Object();

var bosses = [
    ['boss1', 250, 250, 1.2, true, 150, 0.5, 20],
    ['boss2', 450, 250, 1.2, true, 150, 0.5, 20],
];

class MainScreen extends Phaser.Scene {
    constructor() {
        super({key: 'MainScreen'})
    }

    create() {
        this.add.text(350, 350, "Click to Start")

        this.input.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start('SceneOne')
        });
    }


}


function loadNPCs(game) {
    for(var i =0; i < bosses.length; i++) {
        npcId[bosses[i][0]] = game.physics.add.sprite(bosses[i][1], bosses[i][2], bosses[i][0]).setScale(bosses[i][3]);
        npcId[bosses[i][0]].flipX = bosses[i][4];
        npcId[bosses[i][0]].setCollideWorldBounds(true);
        npcId[bosses[i][0]].attPower = bosses[i][6];
        npcId[bosses[i][0]].health = bosses[i][7];
        npcId[bosses[i][0]].setInteractive();
    }
}

const gameState = {
}

const config = {
    type: Phaser.AUTO,
    width: 700,
    height: 700,
    backgroundColor: '000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            enableBody: true,
            debug: true,
        }
    },
    scene: [MainScreen, SceneOne]
    }

var map;
var player;
const game = new Phaser.Game(config);