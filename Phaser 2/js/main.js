var game=new Phaser.Game(739, 415, Phaser.CANVAS, 'game', {preload: preload, create: create, update: update});

function preload(){
    game.load.image('GameUI','assets/images/GameUI.jpg');
    game.load.bitmapFont('AlexBrush-Regular','assets/fonts/AlexBrush-Regular.png','assets/fonts/AlexBrush-Regular.fnt');
    
}

function create(){
    game.add.image(0,0,'GameUI');
   
        game.add.bitmapText(10,10,'AlexBrush-Regular','Game Over!',72);
        //text.anchor.setTo(.5);
        //text.x = game.world.centerX;
        //text.y = game.world.centerY;
 
}

function update(){

}