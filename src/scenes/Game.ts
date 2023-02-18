import Phaser from 'phaser'
export class Game extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	constructor()
	{
		super('game')
	}

    
    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create()
    {
        const { width, height } = this.scale
        this.add.circle(width* 0.5,height *0.5, 50, 0xffffff) 
    }


    update() {
        
    }

}
