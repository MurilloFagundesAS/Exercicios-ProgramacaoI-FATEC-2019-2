Chicken.Preloader = function(){}

Chicken.Preloader.prototype = {
    preload:function(){        
        var carregando = this.add.sprite(this.world.centerX,this.world.centerY,'carregando');
        carregando.anchor.setTo(.5);
        this.load.setPreloadSprite(carregando);
        
        
        this.load.image('forest','assets/images/forest.jpg');
        this.load.image('menu','assets/images/menu.png');
        this.load.image('end','assets/images/end.png');
        
        this.load.spritesheet('galinha','assets/images/chick.png',16,18);
        this.load.image('couveflor','assets/images/couveflor.png');
        this.load.spritesheet('frutas','assets/images/frutas.png', 32, 32);
        this.load.image('parede','assets/images/paredeV.png');
        this.load.image('plataforma','assets/images/paredeH.png');
        this.load.spritesheet("pimenta", "assets/images/pepper.png", 262,320);

        this.load.audio('musica',['assets/audio/one.mp3','assets/audio/one.ogg']);
        this.load.audio('jumpAud',['assets/audio/jump.mp3','assets/audio/jump.ogg']);
        this.load.audio('eatAud',['assets/audio/eat.mp3','assets/audio/eat.ogg']);
        this.load.audio('deadAud',['assets/audio/dead.mp3','assets/audio/dead.ogg']);
    },
    create:function(){


        Chicken.deadAud = this.add.audio('deadAud');
        
        Chicken.musica = this.add.audio('musica');
        Chicken.musica.volume = .5;
        Chicken.musica.loop = true;
    },
    update:function(){
        if (this.cache.isSoundDecoded('musica'))
            this.state.start('Menu');
    }
}
