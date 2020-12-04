Breakout.Preloader = function(){}

Breakout.Preloader.prototype = {
    preload:function(){       
        var carregando = this.add.sprite(this.world.centerX,this.world.centerY,'carregando');
        carregando.anchor.setTo(.5);
        this.load.setPreloadSprite(carregando); //escreve
        
        this.load.image('background', 'assets/images/bg.png');
        this.load.image('menu', 'assets/images/menu.png');
        this.load.image('gameover', 'assets/images/gameover.png');
        this.load.image('bola', 'assets/images/bola.png');
        this.load.image('barra', 'assets/images/barra.png');
        this.load.spritesheet('tijolos', 'assets/images/breakouts.png',40,40);

        this.load.audio('bounceAud', ['assets/audio/bounce.m4a','assets/audio/bounce.ogg']);
        this.load.audio('hitAud', ['assets/audio/hit.mp3','assets/audio/hit.ogg']);
        this.load.audio('missedAud', ['assets/audio/missed.mp2','assets/audio/missed.ogg']);
        this.load.audio('winAud', ['assets/audio/win.mp2','assets/audio/win.ogg']);
        this.load.audio('musica', ['assets/audio/heroImmortal.mp2','assets/audio/heroImmortal.ogg']);
        
    },
    create:function(){
        Breakout.hitAud = this.add.audio('hitAud');
        
        Breakout.musica = this.add.audio('musica');
        Breakout.musica.volume = .2; //volume20%
        Breakout.musica.loop = true; //loopa a musica pra tocar sempre
    },
    update:function(){
        if (this.cache.isSoundDecoded('musica'))
            this.state.start('Menu');
    }
}


   
    
