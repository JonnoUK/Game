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
        frames: game.anims.generateFrameNames('player', {prefix: 'Varis_Walk ', start: 0, end: 5, zeroPad: 0}),
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'varis_walk_sword',
        frames: game.anims.generateFrameNames('varis_walk_sword', {prefix: 'Varis_Walk_Sword ', start: 0, end: 5, zeroPad: 0}),
        frameRate: 10,
        repeat: -1,
    });

    game.anims.create({
        key: 'idle',
        frames: game.anims.generateFrameNames('plIdle', {prefix: 'Varis_Idle ', start: 0, end: 1, zeroPad: 0}),
        frameRate: 1,
        repeat: 1
    });

    game.anims.create({
        key: 'varis_idle_sword',
        frames: game.anims.generateFrameNames('varis_idle_sword', {prefix: 'varis_Idle_Sword ', start: 0, end: 1, zeroPad: 0}),
        frameRate: 1,
        repeat: 1
    });

    game.anims.create({
        key: 'walkBoss',
        frames: game.anims.generateFrameNames('boss1', {prefix: 'sprite', start: 1, end: 7, zeroPad: 0}),
        frameRate: 10,
        repeat: 1
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