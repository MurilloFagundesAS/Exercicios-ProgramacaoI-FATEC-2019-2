Breakout.Play = function(){}

Breakout.Play.prototype = {
    create:function(){
        this.add.image(0,0,'background');
        this.bola = this.add.sprite(this.world.centerX, this.world.centerY, 'bola');
        this.barra = this.add.sprite(this.world.centerX, 500, 'barra');
        this.bola.anchor.setTo(.5);
        this.barra.anchor.setTo(.5);
        
        this.posBarra = 500;

        if(!this.game.device.desktop){
            this.esqBtn = this.add.sprite(0, 410, 'tijolos', 38);
            this.esqBtn.scale.setTo(2.5, 2);
            this.esqBtn.alpha = .7;
            this.dirBtn = this.add.sprite(560, 410, 'tijolos', 39);
            this.dirBtn.scale.setTo(2.5, 2);
            this.dirBtn.alpha = .7;
            
            this.posBarra = 400;
            
            this.esq = false;
            this.dir = false;
            
            this.esqBtn.inputEnabled = true;
            this.dirBtn.inputEnabled = true;
            this.esqBtn.events.onInputDown.add(function(){
                this.esq=true;
            }, this);
            this.esqBtn.events.onInputUp.add(function(){
                this.esq=false;
            }, this);
            this.dirBtn.events.onInputDown.add(function(){
                this.dir=true;
            }, this);
            this.dirBtn.events.onInputUp.add(function(){
                this.dir=false;
            }, this);
        }
        
        this.bounceAud = this.add.audio('bounceAud');
        this.missedAud = this.add.audio('missedAud');
        this.winAud = this.add.audio('winAud');

        this.physics.enable([this.bola, this.barra]);
    
        this.bola.body.collideWorldBounds = true;
        this.bola.body.bounce.setTo(1);
    
        this.barra.body.collideWorldBounds = true;
        this.barra.body.immovable = true;

        this.bola.body.onWorldBounds = new Phaser.Signal();
        this.bola.body.onWorldBounds.add(this.retorno, this);

        this.esqKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.dirKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        
        Breakout.pontos = 0;
        this.winAud.volume = 1;
        this.vidas = 2;
        this.nivel = 1;
        this.doisToques = 0;
        
        this.iniciaTexto();
        this.novoEsquema();
        this.resetBola();
    },
    iniciaTexto:function(){
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
        this.prontoTxt.visible = false;
        this.prontoTxt.setShadow(5, 5, 'rgba(0,0,0,0.8)', 3);
        this.prontoTxt.anchor.set(.5);  
    },
    novoEsquema:function(){
        this.tijolos = this.add.group();
        var centralizar = (this.world.width-450)/2;
        for(var j=0; j<3; j++){
            for(var i=0; i<5; i++){
                var tijolo = this.add.sprite(centralizar + i*90,50+j*40,'tijolos',game.rnd.pick([0,1,2,3,5]));
                this.physics.enable(tijolo);
                tijolo.body.immovable = true;
                tijolo.body.setSize(30,30,0,0);
                tijolo.scale.setTo(2.5,.8);
                this.tijolos.add(tijolo);
            }
        }
    },
    resetBola:function(){
        this.prontoTxt.visible = true;
        this.bola.body.velocity.setTo(0);
        this.bola.position.setTo(this.world.centerX, this.world.centerY);
        this.barra.position.setTo(this.world.centerX, this.posBarra);
        this.time.events.add(Phaser.Timer.SECOND * .5,function(){
            this.physics.arcade.velocityFromAngle(this.rnd.between(45, 135), 
		300 + this.nivel * 10, this.bola.body.velocity);
            this.prontoTxt.visible = false;
        } ,this);
    },
    retorno:function(sprite, up, down, left, right){
        if(up || left || right)
            this.bounceAud.play();
        else if(down){
            this.missedAud.play();
            this.vidas--;
            if(this.vidas<0)
                this.state.start('End');
            
            this.resetBola();
        }
    },
    update:function(){
        this.atualizaUi();
        
        if(this.esqKey.isDown || this.esq)
            this.barra.body.velocity.x = -600 - this.nivel * 10;
        else if(this.dirKey.isDown || this.dir)
            this.barra.body.velocity.x = 600 + this.nivel * 10;
        else
            this.barra.body.velocity.x = 0;  

        this.physics.arcade.collide(this.bola, this.barra, this.tocaBarra, null, this);
        this.physics.arcade.collide(this.bola, this.tijolos, this.eliminaTijolo, null, this);     
    },
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
        if (tijolo.frame==2) { //AMARELO = tijolo menos valioso
            tijolo.kill();
            this.bounceAud.play();
            Breakout.pontos+=5;
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
        if (tijolo.frame==5){ //VERDE = tijolo armadilha
            tijolo.kill();
            this.bounceAud.play();
            chanceArmadilha = game.rnd.pick([0,1]);
                if(chanceArmadilha==0){
                    Breakout.pontos-=5;
                }
        }
        if(this.tijolos.countLiving()==0){//conta tijolos
            this.winAud.play();
            this.nivel++;
            this.novoEsquema();//
            this.resetBola();
        }
    },
    tocaBarra:function(bola, barra){
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