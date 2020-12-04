var game=new Phaser.Game(800, 600, Phaser.CANVAS, 'game', {preload: preload, create: create, update: update});


function preload(){
    game.load.image('1', "images/1.png");
    game.load.image('2', "images/2.png");
    game.load.image('3', "images/3.png");
    game.load.image('4', "images/4.png");
    game.load.image('5', "images/5.png");
    game.load.image('6', "images/6.png");
}
function create(){
    game.stage.backgroundColor = "#008000";

    var loadedDado =["1","2","3","4","5","6"];

    var d1 = this.game.rnd.pick(loadedDado);
    dado1 = this.game.add.sprite (game.world.centerX-150,game.world.centerY,d1);
    dado1.anchor.setTo(0.5);

    var d2 = this.game.rnd.pick(loadedDado);
    dado2 = this.game.add.sprite (game.world.centerX,game.world.centerY,d2);
    dado2.anchor.setTo(0.5);

    var d3 = this.game.rnd.pick(loadedDado);
    dado3 = this.game.add.sprite (game.world.centerX+150,game.world.centerY,d3);
    dado3.anchor.setTo(0.5);  
 
}
function update(){

}


/*
http://www.html5gamedevs.com/topic/17456-how-to-load-a-random-sprite-out-of-a-group/

var exampleState = {
    preload: function(){      
        game.load.image("redMonster", "assets/monsters/red.png");
        game.load.image("greenMonster", "assets/monsters/green.png");
        game.load.image("blueMonster", "assets/monsters/blue.png");  },
        create: function(){    // array of loaded monsters:
            var loadedMonsters = ["redMonster", "greenMonster", "blueMonster"];
            // pick one name from an array
            var monsterToload = this.game.rnd.pick(loadedMonsters);
            // add picked monster to stage at 0,0
            var monster = this.game.add.sprite(0, 0, monsterToLoad);  }}
*/