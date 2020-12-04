var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.state.add('Boot', Chicken.Boot);
game.state.add('Preloader', Chicken.Preloader);
game.state.add('Menu', Chicken.Menu);
game.state.add('Play', Chicken.Play);
game.state.add('End', Chicken.End);


game.state.start('Boot');