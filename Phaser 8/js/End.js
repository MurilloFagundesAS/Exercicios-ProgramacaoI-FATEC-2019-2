Chicken.End = function(){}

Chicken.End.prototype = {
    create:function(){
        var forest = this.add.image(0, 0, 'forest');
        this.add.image(0,0,'end');
        
        forest.inputEnabled = true;
        forest.events.onInputDown.add(this.start, this); 
        
        var estilo1 ={font:'bold 30px Arial', fill:'#ffffff'}
        this.pontosTxt = this.add.text(this.world.centerX, 290, 'Pontos: ' + Chicken.pontos, estilo1);
        this.pontosTxt.setShadow(3, 3, 'rgba(0,0,0,0.8)', 3);
        this.pontosTxt.anchor.set(.5);
        
        var space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.addOnce(this.start, this);
    },
    start: function(){
        Chicken.deadAud.play();
        this.state.start('Menu');
        Chicken.musica.stop();
    }
}