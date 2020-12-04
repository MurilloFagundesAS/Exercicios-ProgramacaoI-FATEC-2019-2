var game=new Phaser.Game(500, 340, Phaser.CANVAS, 'Example', {preload: preload, create: create, update: update});

function preload(){
    // carregamento assets
    game.load.image('cogomelo', 'assets/images/cogomelo.png');
}

var result='Drag a sprite';

function create(){
    game.stage.backgroundColor='#00f';


    cogomelo = game.add.sprite(game.world.centerX, game.world.centerY, 'cogomelo');
    cogomelo.anchor.setTo(0.5);

        //ativa e permite arrastar
        cogomelo.inputEnabled = true;
        cogomelo.input.enableDrag();
        cogomelo.events.onDragStart.add(onDragStart,this);
        cogomelo.events.onDragStop.add(onDragStop,this);
}
function update(){
}