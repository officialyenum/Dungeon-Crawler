import Phaser from 'phaser'
export class Preloader extends Phaser.Scene
{
	constructor()
	{
		super('preloader')
	}

    init()
    {

    }

	preload()
    {
        this.load.image('tiles','tiles/dungeon_tiles.png')
        // this.load.multiatlas('tankers', 'assets/tanker-game.json', 'assets');
        this.load.tilemapTiledJSON('dungeon', 'tiles/dungeon-01.json')
        this.load.atlas('fauna','character/fauna.png','character/fauna.json')
    }

    create()
    {
        this.createNewGame();  
    }


    update() {
        
    }

    private createNewGame() 
    {
        this.scene.start('game');
    }
}
