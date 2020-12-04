var Breakout = {
    hitAud:null,
    musica:null,
    pontos:0
};

Breakout.Boot = function(){}

Breakout.Boot.prototype={
    preload:function(){
        this.load.image('carregando','assets/images/phaser.png');
    },
    create:function(){
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.state.start('Preloader');
    }
}