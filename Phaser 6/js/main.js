var game=new Phaser.Game(320, 320, Phaser.CANVAS, 'Example', {preload: preload, create: create, update: update});

function preload(){
    game.load.tilemap('lab', 'assets/mapas/lab.json', null, Phaser.Tilemap.TILED_JSON); 
    game.load.image('lab', 'assets/images/lab.png');
    
    game.load.spritesheet('player', 'assets/images/pacman.png', 32, 32);
}

function create(){
    lab = game.add.tilemap('lab');
    lab.addTilesetImage('lab');
    
    lab.createLayer('roxo');
    azul = lab.createLayer('azul');

    player = game.add.sprite(84, 125, 'player');
    player.anchor.setTo(0.1);
    player.animations.add('walkD', [36, 45], 10, false);
    player.animations.add('walkR', [6, 7, 8], 10, false);
    player.animations.add('walkU', [36,45], 10, false);
    player.animations.add('walkL', [1, 2, 3], 10, false);
    
    cursors = game.input.keyboard.createCursorKeys();
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(player);
    
    //player.body.setSize(14, 5, 1, 16);//1 = altura, 16 = largura
	//seta a colisão num determinado ponto (os números indicam onde), tipo no ponto
    lab.setCollisionBetween(0, 700, true, 'azul'); //seta a colisão no mapa1 só nos elementos

}
function update(){
    player.body.velocity.setTo(0);
    
    if (cursors.up.isDown)
    {
        player.animations.play('walkU');
        player.body.velocity.y = -128;
    }
    else if (cursors.down.isDown)
    {
        player.animations.play('walkD');
        player.body.velocity.y = 128;
    } 
    else if (cursors.left.isDown)
    {
        player.animations.play('walkL');
        player.body.velocity.x = -128;
    }
    else if (cursors.right.isDown)
    {
        player.animations.play('walkR');
        player.body.velocity.x = 128;
    }
    else
        player.frame = 5;    
    
        game.physics.arcade.collide(player, azul, function(){
            //console.log("Aconteceu uma colisão!");
        });        
}