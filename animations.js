function createAnims(game) {

    game.anims.create({
        key: 'boss1Att',
        frames: game.anims.generateFrameNames('boss1Att', {prefix: 'sprite00', start: 1, end: 30, zeroPad: 0}),
        frameRate: 25,
        repeat: 1
    });

    game.anims.create({
        key: 'playAtt',
        frames: game.anims.generateFrameNames('playAtt', {prefix: 'sprite0', start: 4, end: 8, zeroPad: 0}),
        frameRate: 10,
        repeat: 1
    });

    game.anims.create({
        key: 'plDeath',
        frames: game.anims.generateFrameNames('plDeath', {prefix: 'anim', start: 1, end: 15, zeroPad: 0}),
        frameRate: 10,
        repeat: 1
    });

    game.anims.create({
        key: 'walk',
        frames: game.anims.generateFrameNames('player', {prefix: 'sprite', start: 1, end: 8, zeroPad: 0}),
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'idle',
        frames: game.anims.generateFrameNames('plIdle', {prefix: 'sprite', start: 1, end: 4, zeroPad: 0}),
        frameRate: 5,
        repeat: -1
    });

    game.anims.create({
        key: 'walkBoss',
        frames: game.anims.generateFrameNames('boss1', {prefix: 'sprite', start: 1, end: 7, zeroPad: 0}),
        frameRate: 10,
        repeat: -1
    });
    game.anims.create({
        key: 'idleBoss',
        frames: game.anims.generateFrameNames('boss1Idle', {prefix: 'sprite', start: 1, end: 2, zeroPad: 0}),
        frameRate: 1,
        repeat: -1
    });
    game.anims.create({
        key: 'boss1Death',
        frames: game.anims.generateFrameNames('boss1Death', {prefix: 'sprite0', start: 1, end: 40, zeroPad: 0}),
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'plDefend',
        frames: game.anims.generateFrameNames('plDefend', {prefix: 'sprite', start: 1, end: 7, zeroPad: 0}),
        frameRate: 20,
        repeat: 1
    });

    game.anims.create({
        key: 'plShield',
        frames: [{key: 'plDefend', frame: 'sprite7'}],
        frameRate: 10,
        repeat: -1
    });




 
}