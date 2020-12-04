var game=new Phaser.Game(1024,324, Phaser.CANVAS, 'game', {preload: preload, create: create, update: update});
    var score = 0; //define score igual a 0

function preload(){
    game.load.image('fundo2', 'assets/images/fundo2.png'); //carrega imagens/sprites
    game.load.spritesheet('moeda','assets/images/coin.png',100,100);
    game.load.spritesheet('player','assets/images/player.png',64,64);
    game.load.image('plataforma', 'assets/images/wallWoodH.png');
    
    game.load.audio('jump', ['assets/audio/jump.mp3', 'assets/audio/jump.ogg']);//carrega som
}

function create(){
        
    bg = game.add.image(0,0,'fundo2');//adicina fundo/backgroud
    bg.alpha = .9; //efeito "fantasma"

    var estilo = {font:"bold 18px Arial",fill:"#fff"};//adiciona o texto do score
    scoreText = game.add.text(10,10,"Pontos: "+ score,estilo);
    scoreText.setShadow(3,3,'rgba(0,0,0,0.5)',2);

    player = game.add.sprite(110,150, 'player'); //adiciona o player(mario)
    player.anchor.setTo(.5);
    player.scale.setTo(1.0);
    player.animations.add('walk', [6, 7, 8], 10, false);//animação "walk" do mario
    
    plataformas = game.add.group();//adiciona grupo de plataformas
    plataformas.create(0, 320, 'plataforma'); //adicina 1 plataforma
    plataformas.create(200, 200, 'plataforma');
    plataformas.create(600, 200, 'plataforma');
    plataformas.create(824, 320, 'plataforma');
    plataformas.setAll('anchor.x', 0); //ancora no meio da moeda
    plataformas.setAll('anchor.y', 1);

    moedas = game.add.group(); //adiciona grupo moedas
 
    for(i=0;i<50;i++){//cria moeda em local aleatório
        fx = game.rnd.between(0, 2048);
	    fy = game.rnd.between(0,100);
        moedas.create (fx, fy,'moeda');
    }

    moedas.setAll('anchor.x', .5); //ancora no meio da moeda
    moedas.setAll('anchor.y', .5);
    moedas.scale.set (.4,.4);//arruma a escala da moeda
    
    moedas.callAll("animations.add", "animations", "gira", [0,1,2,3,4,5,6,7,8,9], 10, true);

    game.physics.startSystem(Phaser.Physics.ARCADE);//adiciona fisica Arcade
    game.physics.arcade.enable([player, plataformas, moedas]); //seta a fisica nos 3 integrantes
    
    player.body.gravity.y = 1000;//adiciona gravidade para player (mario)
    player.body.checkCollision.up = false;

    plataformas.setAll('body.immovable', true);//adiciona física de plataforma imóvel

    moedas.setAll('body.checkCollision.up', false);//diz que a colisão por cima das moeda não existe
    moedas.setAll("body.checkCollision.left", true);//colisão existe em left e right
    moedas.setAll("body.checkCollision.right", true);
    moedas.setAll('body.gravity.y', 2000);//seta a gravidade em todas as moedas
    moedas.setAll('body.mass', 0); //torna a massa das moedas 0

    cursors = game.input.keyboard.createCursorKeys(); //adiciona setas do teclado para o jogo
    
    jump = game.add.audio('jump'); //adiciona o som "jump"
}

function update(){
    game.physics.arcade.collide(player, moedas);//introduz fisica entre o player, moeda e plataformas
    game.physics.arcade.collide(moedas, moedas);
    game.physics.arcade.overlap(moedas, player, coletar);//adiciona overlap e função coletar para "comer" moedas
    
    game.physics.arcade.collide(player, plataformas);
    game.physics.arcade.collide(moedas, plataformas);
    
    moedas.callAll ("play", null, "gira");

    if(!player.inWorld)//diz que, se o player não está no mundo, gera ele em tal posição
        player.position.setTo(110,150,);
    if(cursors.left.isDown) {//programa seta para left
        player.body.velocity.x = -200; 
        player.scale.x = -1.5;
        player.animations.play('walk');
    }
    else
    if(cursors.right.isDown) {//programa seta para right
        player.body.velocity.x = 200;
        player.scale.x = 1.5;
        player.animations.play('walk');
    }
    else{
        player.body.velocity.x = 0;//programa se parado fica no frame 6
        player.frame = 6;
    }
    if(cursors.up.isDown && player.body.touching.down){//programa para pular só se tocando embaixo
        player.body.velocity.y = -600;
        jump.play();
    }  
    if(!player.body.touching.down)//programa para se pular ficar no frame 45
        player.frame = 45;

}

function coletar(sprite1, sprite2){ //função coletar serve pra matar (kill) sprite, no caso moeda
    sprite2.kill();
    
    score += 1;
    scoreText.setText ("Pontos: " + score);
}