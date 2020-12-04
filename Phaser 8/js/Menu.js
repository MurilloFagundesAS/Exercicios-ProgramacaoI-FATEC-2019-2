Chicken.Menu = function(){}

Chicken.Menu.prototype = {
    create:function(){
        var forest = this.add.image(0,0,'forest');
        this.add.image(0,0,'menu');
        
        Chicken.musica.play();
        
        forest.inputEnabled = true;
        forest.events.onInputDown.add(this.start, this); 
        
        var space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.addOnce(this.start, this);
    },
    start: function(){
        Chicken.deadAud.play();
        this.state.start('Play');
    }
}