Chicken.Play = function(){}

Chicken.Play.prototype = {
    create:function(){
        this.nivel = 1;
        this.vidas = 2;
        this.velocidade = 200;
        var randomico = game.rnd.pick([1000, 2000, 5000, 10000]);
        
        this.add.image(0, 0, 'forest');
        this.galinha = this.add.sprite(this.world.centerX, 300, 'galinha');
        this.galinha.animations.add('walk', [0, 2], 10, false);
        this.galinha.anchor.setTo(0.5);
        this.galinha.scale.setTo(1.5);
        
        this.jumpAud = this.add.audio('jumpAud');
        this.eatAud = this.add.audio('eatAud');
        
        this.physics.arcade.enable(this.galinha);
        this.galinha.body.gravity.y = 2000;
        this.galinha.body.setSize(12, 14, 2, 4);
        this.galinha.body.collideWorldBounds = true;
    
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.criaUi();
        this.criaMundo();
        this.posicionaFrutas();
        
        this.couveflores = this.add.group()
        this.couveflores.createMultiple(20, 'couveflor');
        this.physics.enable(this.couveflores);
        for(i = 0; i<4; i++)
            this.novoCouveflor(i);	
  
        var timerEvent = this.time.events.loop(1500, this.novoCouveflor, this); //tempo
        var eventTimer = this.time.events.loop(randomico, this.surgePimenta, this);   
    },
    criaUi:function(){
        var estilo = { font: '18px Arial', fill: '#ffffff' };
        this.vidasTxt = this.add.text(700, 30, 'Vidas: ' + this.vidas, estilo);
        this.nivelTxt = this.add.text(30, 30, 'Nivel: ' + this.nivel, estilo);
        this.pontosTxt = this.add.text(this.world.centerX, 30, 'Pontos: ' + Chicken.pontos, estilo);
        this.pontosTxt.anchor.setTo(.5,0);
    },
    criaMundo:function(){
        this.paredes = this.add.group();
        // paredes em cima
        this.paredes.create(0, 0, 'plataforma');
        this.paredes.create(200, 0, 'plataforma');
        this.paredes.create(400, 0, 'plataforma');
        this.paredes.create(600, 0, 'plataforma');
        // paredes em baixo
        this.paredes.create(0, 580, 'plataforma');
        this.paredes.create(200, 580, 'plataforma');
        this.paredes.create(400, 580, 'plataforma');
        this.paredes.create(600, 580, 'plataforma');
        // paredes laterais
        this.paredes.create(0, 60, 'parede');
        this.paredes.create(0, 330, 'parede');
        this.paredes.create(780, 60, 'parede');
        this.paredes.create(780, 330, 'parede');
        // esquema
        this.paredes.create(600, 520, 'plataforma');
        this.paredes.create(0, 520, 'plataforma');

        this.paredes.create(450, 420, 'plataforma');
        this.paredes.create(150, 420, 'plataforma');

        this.paredes.create(300, 320, 'plataforma');

        this.paredes.create(0, 260, 'plataforma');
        this.paredes.create(600, 260, 'plataforma');

        this.paredes.create(150, 150, 'plataforma');
        this.paredes.create(450, 150, 'plataforma');

        this.paredes.create(600, 60, 'plataforma');
        this.paredes.create(0, 60, 'plataforma');

        this.physics.enable(this.paredes);
        this.paredes.setAll('body.immovable', true);
    },
    posicionaFrutas:function(){
        this.frutas = this.add.group();

        var posicao = [
            // 1 linha
            {x: 60, y: 160}, {x: 400, y: 80}, {x: 740, y: 160}, 
            // 2 linha
            {x: 60, y: 340}, {x: 400, y: 480}, {x: 740, y: 340}, 
            // 3 linha
            {x: 60, y: 560}, {x: 740, y: 560}
        ];
        for (var i = 0; i < posicao.length; i++)
            this.frutas.create(posicao[i].x, posicao[i].y, 'frutas', (this.nivel - 1) % 10);
        this.frutas.setAll('anchor.x', .5);
        this.frutas.setAll('anchor.y', .5);
        this.frutas.setAll('scale.x', .8);
        this.frutas.setAll('scale.y', .8);

        this.physics.arcade.enable(this.frutas);
    },
    novoCouveflor:function(dir){
        var couveflor = this.couveflores.getFirstDead();
        if (!couveflor)
            return;
        
        couveflor.anchor.setTo(.5);
        couveflor.body.gravity.y = 500;
        couveflor.body.bounce.setTo(1, .4);
        couveflor.checkWorldBounds = true;
        couveflor.outOfBoundsKill = true;

        var entradas = [
          {x:0, y:50, dir:1},
          {x:800, y:50, dir:-1},
          {x:0, y:300, dir:1},
          {x:800, y:300, dir:-1}
        ];

        if(dir == undefined)
            dir = this.rnd.pick([0, 1, 2, 3]);
        couveflor.reset(entradas[dir].x, entradas[dir].y);
        couveflor.body.velocity.x = entradas[dir].dir * 100;  
    },
    surgePimenta:function(){
        this.pimenta = this.add.sprite(this.world.centerX, this.world.centerY-100, "pimenta");
        this.pimenta.anchor.setTo(0.5);
        this.pimenta.scale.setTo(.2);
        this.physics.arcade.enable(this.pimenta);
        this.pimenta.body.gravity.y = 2000;
    },
    update:function(){
        this.atualizaUi();
        
        this.physics.arcade.overlap(this.galinha, this.frutas, this.come, null, this);
        this.physics.arcade.overlap(this.couveflores, this.galinha, this.mata, null, this);
        this.physics.arcade.overlap(this.pimenta, this.galinha, this.mudaCor, null,this);
        this.physics.arcade.collide(this.galinha, this.paredes);
        this.physics.arcade.collide(this.couveflores, this.paredes);
        this.physics.arcade.collide(this.pimenta, this.paredes);

        if(this.cursors){
            if(this.cursors.left.isDown) {
                this.galinha.body.velocity.x = -this.velocidade; 
                this.galinha.scale.x=-1.5;
                this.galinha.animations.play('walk');
            }
            else if(this.cursors.right.isDown) {
                this.galinha.body.velocity.x = this.velocidade;
                this.galinha.scale.x=1.5;
                this.galinha.animations.play('walk');
            }
            else{
                this.galinha.body.velocity.x = 0;
                this.galinha.frame=0;
            }

            if(this.cursors.up.isDown && this.galinha.body.touching.down){
                this.galinha.body.velocity.y = -700;
                this.jumpAud.play();
            }

            if(!this.galinha.body.touching.down)
                this.galinha.frame = 1;
        }

    },
    atualizaUi:function(){
        this.vidasTxt.text = 'Vidas: ' + (this.vidas >= 0?this.vidas:0);
        this.nivelTxt.text = 'Nivel: ' + this.nivel;
        this.pontosTxt.text = 'Pontos: ' + Chicken.pontos; 
    },
    come:function(s1, s2){
        s2.kill();
        Chicken.pontos += 10;
        this.eatAud.play();
        if(this.frutas.countLiving()==0){
            this.nivel++;
            this.posicionaFrutas();
            this.novoNivel();
        }
    },
    mata:function(galinha, couveflores){
        if(!this.galinha.alive) return;
        if (this.galinha.tint==0xff00ff){
            couveflores.kill();
            Chicken.pontos +=10;
            }
        else{
            Chicken.deadAud.play();
            this.vidas--;
            this.galinha.angle=-90;
            this.galinha.frame = 3;
            this.galinha.alive = false;
            this.galinha.body.velocity.x=0;
            this.galinha.body.velocity.y=-600;
            this.galinha.scale.x = 1.5;
            this.galinha.body.checkCollision.down=false;
            this.cursors = null;
                if(this.vidas >=0)
                    this.time.events.add(1000, this.novoNivel, this);
                else
                    this.time.events.add(1000, function(){
                        this.state.start('End');
                    }, this);
    }
    },
    mudaCor:function(pimenta, galinha){
        this.pimenta.kill();
        this.eatAud.play();
        this.galinha.tint=0xff00ff;
        this.velocidade +=100;
        var furia = this.time.events.add(5000, this.galinhaFuriosa, this);
    },
    galinhaFuriosa:function(){
        this.galinha.tint =0xffffff;
        this.velocidade -=100;
    },
    novoNivel:function(){
        this.galinha.position.setTo(this.world.centerX, 300);
        this.galinha.angle=0;    
        this.galinha.alive=true;
        this.galinha.body.checkCollision.down=true;

        this.cursors = this.input.keyboard.createCursorKeys();
    },
}