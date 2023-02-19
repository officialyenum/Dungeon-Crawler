import Phaser from 'phaser'
import { debugDraw } from '../utils';
export class Game extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private fauna?: Phaser.Physics.Arcade.Sprite;
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
        // const { width, height } = this.scale
        // this.add.circle(width* 0.5,height *0.5, 50, 0xffffff) 
        // this.add.image(0, 0, 'tiles');
        const map = this.make.tilemap({
            key: 'dungeon'
        })
        const tileSet = map.addTilesetImage('dungeon', 'tiles')
        // console.log(tileSet);
        
        map.createLayer('Ground',tileSet, 0, 0)
        const wallsLayer = map.createLayer('Walls',tileSet, 0, 0)

        wallsLayer.setCollisionByProperty({collides: true})
        debugDraw(wallsLayer, this)

        this.fauna = this.physics.add.sprite(120,120,'fauna', 'walk-down-3.png')
        this.fauna.body.setSize(this.fauna.width * 0.5, this.fauna.body.height * 0.8)
        this.anims.create({
            key: 'fauna-idle-down',
            frames: [{key: 'fauna', frame: 'walk-down-3.png'}]
        })
        this.anims.create({
            key: 'fauna-idle-up',
            frames: [{key: 'fauna', frame: 'walk-up-3.png'}]
        })
        this.anims.create({
            key: 'fauna-idle-side',
            frames: [{key: 'fauna', frame: 'walk-side-3.png'}]
        })
        this.anims.create({
            key: 'fauna-run-down',
            frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'run-down-',suffix: '.png' }),
            repeat: -1,
            frameRate: 15
        })

        this.anims.create({
            key: 'fauna-run-up',
            frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'run-up-',suffix: '.png' }),
            repeat: -1,
            frameRate: 15
        })


        this.anims.create({
            key: 'fauna-run-side',
            frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'run-side-',suffix: '.png' }),
            repeat: -1,
            frameRate: 15
        })

        this.fauna.anims.play('fauna-idle-side')
        this.physics.add.collider(this.fauna, wallsLayer)
        this.cameras.main.startFollow(this.fauna, true)
    }


    update() {
        if (!this.cursors || !this.fauna) {
            return
        } 
        const speed = 100;
        if (this.cursors.up?.isDown) {
            this.fauna.anims.play('fauna-run-up',true)
            this.fauna.setVelocity(0,-speed)
        } else if (this.cursors.down?.isDown) {
            this.fauna.anims.play('fauna-run-down',true)
            this.fauna.setVelocity(0,speed)
        } else if (this.cursors.left?.isDown) {
            this.fauna.anims.play('fauna-run-side',true)
            this.fauna.setVelocity(-speed,0)
            this.fauna.scaleX = -1
            this.fauna.body.offset.x = 24
        } else if (this.cursors.right?.isDown) {
            this.fauna.anims.play('fauna-run-side',true)
            this.fauna.setVelocity(speed,0)
            this.fauna.scaleX = 1
            this.fauna.body.offset.x = 8
        } else {
            const parts = this.fauna.anims.currentAnim.key.split('-')
            this.fauna.anims.play(`fauna-idle-${parts[2]}`)
            this.fauna.setVelocity(0,0)
        }
        
    }

}
