Breakout.End = function(){}

Breakout.End.prototype = {
    create:function(){
        this.add.image(0,0,'background');
        this.add.image(0,0,'gameover');
        
        var estilo1 ={font:'bold 30px Arial', fill:'#ffffff'}
        this.pontosTxt = this.add.text(this.world.centerX, 350, 'Pontos: ' + Breakout.pontos, estilo1);
        this.pontosTxt.setShadow(5, 5, 'rgba(0,0,0,0.8)', 3);
        this.pontosTxt.anchor.set(.5);
        var space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.addOnce(this.startGame,this);
    },
    startGame: function(){
        Breakout.hitAud.play();
        this.state.start('Menu');
        Breakout.musica.stop();
    }
}