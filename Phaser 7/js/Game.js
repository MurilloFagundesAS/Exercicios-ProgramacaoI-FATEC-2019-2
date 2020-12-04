var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game');

game.state.add('Boot', Breakout.Boot);
game.state.add('Preloader', Breakout.Preloader);
game.state.add('Menu', Breakout.Menu);
game.state.add('Play', Breakout.Play);
game.state.add('End', Breakout.End);


game.state.start('Boot');