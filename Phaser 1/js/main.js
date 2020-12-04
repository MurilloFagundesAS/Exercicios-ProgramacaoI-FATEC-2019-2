var game=new Phaser.Game(800, 600, Phaser.CANVAS, 'game', {preload: preload, create: create, update: update});

function preload(){
    game.load.spritesheet('zombie', 'images/zombie_n_skeleton2.png', 32, 64);
}
function create(){
    game.stage.backgroundColor = "#008000";

    this.zombie_n_skeleton2 = game.add.sprite(50, 50, 'zombie');
    this.zombie_n_skeleton2.anchor.setTo(.5);
    this.zombie_n_skeleton2.scale.setTo(1.5);
    this.zombie_n_skeleton2.animations.add('correr', [0,1,2], 10, false);
    
    }
function update(){
    this.zombie_n_skeleton2.animations.play('correr');
}