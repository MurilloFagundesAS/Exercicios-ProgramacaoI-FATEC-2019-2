Breakout.Menu = function(){}

Breakout.Menu.prototype = {
    create:function(){
        this.add.image(0,0,'background');
        this.add.image(0,0,'menu');
        
        Breakout.musica.play();
        
        var space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //adiciona a tecla barra
        space.onDown.addOnce(this.startGame, this); //se tocado inicia
    },
    startGame: function(){
        Breakout.hitAud.play();
        this.state.start('Play');
    }
}