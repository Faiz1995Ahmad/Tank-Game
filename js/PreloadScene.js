export default class PreloadScene extends Phaser.Scene 
{
    constructor() 
    {
        super('PreloadScene'); 
    }
    init()
    {  
    }
    preload() 
    {
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.spritesheet('tile', 'assets/images/tile.png', { frameWidth: (218/3), frameHeight: 74 });
        this.load.spritesheet('tank', 'assets/images/tank.png', { frameWidth: (216/3), frameHeight: 92 });
        this.load.on('complete',this.LoadComplete );
    }
    create() 
    {
    }
    LoadComplete()/*After loading all the file*/
    {
        console.log("load complete",this);
        this.scene.scene.start("GameScene");
    }
   
}