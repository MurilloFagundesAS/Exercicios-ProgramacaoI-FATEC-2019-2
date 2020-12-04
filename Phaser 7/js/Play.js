Breakout.Play = function(){}

Breakout.Play.prototype = {
    create:function(){
        this.add.image(0,0,'background');
        this.bola = this.add.sprite(this.world.centerX, this.world.centerY, 'bola');
        this.barra = this.add.sprite(this.world.centerX, 500, 'barra');
        this.bola.anchor.setTo(.5);
        this.barra.anchor.setTo(.5);

        this.bounceAud = this.add.audio('bounceAud');
        this.missedAud = this.add.audio('missedAud');
        this.winAud = this.add.audio('winAud');

        this.physics.enable([this.bola, this.barra]);
    
        this.bola.body.collideWorldBounds = true; //colide com as bordas
        this.bola.body.bounce.setTo(1);//
    
        this.barra.body.collideWorldBounds = true; //colide com as bordas
        this.barra.body.immovable = true;

        this.bola.body.onWorldBounds = new Phaser.Signal();
        this.bola.body.onWorldBounds.add(this.retorno, this);

        this.esqKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);//
        this.dirKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);//
        
        Breakout.pontos = 0;
        this.winAud.volume = 1;
        this.vidas = 3;
        this.nivel = 1;
        this.doisToques = 0;

        this.iniciaTexto();
        this.novoEsquema();
        this.resetBola();
    },
    iniciaTexto:function(){ //escreve
        var estilo1 ={font:'bold 30px Arial', fill:'#ffffff'}
        var estilo2 ={font:'bold 18px Arial', fill:'#ffffff'}
        this.pontosTxt = this.add.text(20, 20, 'Pontos: 0', estilo2);
        this.pontosTxt.setShadow(3, 3, 'rgba(0,0,0,0.8)', 2);
        this.vidasTxt = this.add.text(550, 20, 'Vidas: 2', estilo2);
        this.vidasTxt.setShadow(3, 3, 'rgba(0,0,0,0.8)', 2);
        this.nivelTxt = this.add.text(320, 20, 'Nivel: 1', estilo2);
        this.nivelTxt.setShadow(3, 3, 'rgba(0,0,0,0.8)', 2);
        this.nivelTxt.anchor.set(.5);
        
        this.prontoTxt = this.add.text(this.world.centerX, this.world.centerY-30, 'Pronto?', estilo1);
        this.prontoTxt.visible = false;//deixa invisivel o texto
        this.prontoTxt.setShadow(5, 5, 'rgba(0,0,0,0.8)', 3);
        this.prontoTxt.anchor.set(.5);  
    },
    novoEsquema:function(){
        this.tijolos = this.add.group();
        var centralizar = (this.world.width-450)/2; //centralizar, diz onde está o centro
        for(var j=0; j<3; j++){//3 linhas, 5 colunas
            for(var i=0; i<5; i++){
                var tijolo = this.add.sprite(centralizar + i*90,50+j*40,'tijolos', game.rnd.pick([0,1,2,3]));//i é linha e j coluna
                this.physics.enable(tijolo);
                tijolo.body.immovable = true;
                tijolo.body.setSize(30,30,0,0); //esticar
                tijolo.scale.setTo(2.5,.8);
                this.tijolos.add(tijolo); //coloca cada tijolo ao grupo
            }
        }
    },
    resetBola:function(){
        this.prontoTxt.visible = true;//apresenta texto
        this.bola.body.velocity.setTo(0);
        this.bola.position.setTo(this.world.centerX, this.world.centerY);
        this.barra.position.setTo(this.world.centerX, 500);
        this.time.events.add(Phaser.Timer.SECOND * .5,function(){
            this.physics.arcade.velocityFromAngle(this.rnd.between(45, 135),
		300 + this.nivel * 10, this.bola.body.velocity);//velocidade aumenta de acordo com nivel
            this.prontoTxt.visible = false;
        } ,this);
    },
    retorno:function(sprite, up, down, left, right){ //se setas
        if(up || left || right)//se tocar toca o som
            this.bounceAud.play();
        else
        if(down){//se tocar embaixo, toca musica, tira vida, e se a vida for menor q zero, acaba o jogo
            this.missedAud.play();
            this.vidas--;
        if(this.vidas==0)
            this.state.start('End');
            
            this.resetBola();
        }
    },
    update:function(){
        this.atualizaUi();//escritas
    
        if(this.esqKey.isDown)//setas e parado
            this.barra.body.velocity.x = -600 - this.nivel * 10;
        else if(this.dirKey.isDown)
            this.barra.body.velocity.x = 600 + this.nivel * 10;
        else
            this.barra.body.velocity.x = 0;  

        this.physics.arcade.collide(this.bola, this.barra, this.tocaBarra, null, this);
        this.physics.arcade.collide(this.bola, this.tijolos, this.eliminaTijolo, null, this);     
    }, //colisões
    atualizaUi:function(){
        this.pontosTxt.text = 'Pontos: ' + Breakout.pontos;
        this.vidasTxt.text  = 'Vidas: ' + this.vidas;
        this.nivelTxt.text  = 'Nivel: ' + this.nivel;
    },
    eliminaTijolo:function(bola, tijolo){

        if (tijolo.frame==0) {//VERMELHO = tijolo comum
            tijolo.kill();
            this.bounceAud.play();
            Breakout.pontos+=10;    
        }
        if (tijolo.frame==1) {//ROXO = tijolo que quebra com 2 toques
            this.doisToques++;
            this.bounceAud.play();
                if (this.doisToques==2){
                    tijolo.kill();
                    Breakout.pontos+=10;
                    this.doisToques=0;
                }    
        }
        if (tijolo.frame==2) { //AMARELO = tijolo indestrutível
            this.bounceAud.play();
        }
        if (tijolo.frame==3) {//AZUL = tijolo com chance de bônus
            tijolo.kill();
            this.bounceAud.play();
            Breakout.pontos+=10;
            chanceBonus = game.rnd.pick([0,1]);
                if(chanceBonus==1){
                this.vidas++;
                }               
        }
        if(this.tijolos.countLiving()==0){//conta tijolos
            this.winAud.play();
            this.nivel++;
            this.novoEsquema();//
            this.resetBola();
        }
    },
    tocaBarra:function(bola, barra){//
        Breakout.hitAud.play();
        var angulo;
        var segmento = Math.floor((bola.x - barra.x)/15);
        if (segmento > 3)
            segmento = 3; 
        else if (segmento < -3)
            segmento = -3;
        angulo = (segmento - 6) * 15;
        this.physics.arcade.velocityFromAngle(angulo, 300 + this.nivel*10, bola.body.velocity);
    },
}