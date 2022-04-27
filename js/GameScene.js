import Obstacles from "./Obstacles.js";
export default class GameScene extends Phaser.Scene 
{
    constructor() 
    {
        super("GameScene");
       this.tank;
       this.left;
       this.right;
       this.up;
       this.down;
       this.obstacles ;//= [];
       this.spacebar = null;
       this.keys = [37, 38, 39, 40];
       this.movement = [];
       this.tank;
       this.fire = null;
       this.counter = null;
       this.lastFired = 0;
       this.bulletContainer;
       this.counter = null;
       this.timerOffset;
    }
    create() 
    {
        let x = 38;
        let y = 38;
        let name;
        console.log("GameScene",name);
        for (let i = 0; i < 50; i++) 
        {
            for (let j = 0; j < 50; j++) 
            {
                name  = this.add.sprite(x, y, 'tile').setOrigin(0.5);
                name.setFrame(2);
                x += name.width;                
            } 
            x = 38;          
            y += name.height;
        }
        this.tank = this.physics.add.image(game.config.width/2, game.config.height/2, 'tank').setOrigin(0.5).setScale(1).setCollideWorldBounds(true);
        this.tank .setSize(70, 70, true);
        this.tank.setFrame(0);
        this.CreateObstacles();
        this.BulletInstantiate();   
        //Camera propetry set
        this.cameras.main.startFollow(this.tank);
        this.cameras.main.setZoom(1.5)
        this.cameras.main.setBounds(0,0,game.config.width,game.config.height);
        this.SetOffset();
        console.log(this.tank.frame.name);
        this.input.keyboard.on('keydown', (event)=> {
            // console.dir(event.keyCode);
            if (
                this.keys.includes(event.keyCode) &&
                ((!this.movement.includes(event.keyCode)) || (this.movement.length == 0))
            ) 
            {
                this.movement.push(event.keyCode);
            } 
            else if (event.keyCode == 32) //space
            {
                // console.log("down ",this. movement);
                this.fire  = true;
            }
            else if (event.keyCode == 84) // key-T
            {
                if(this.tank.frame.name ==2)
                {
                    this.tank.setFrame(0);
                }
                else
                {
                    let temp = (this.tank.frame.name+1);
                    this.tank.setFrame(temp);
                } 
                this.SetOffset();
              
            }
        });
        this.input.keyboard.on('keyup', (event)=> 
        {
            // console.dir(event);
            if (this.movement.length > 0 && this.movement.includes(event.keyCode)) 
            {
                let index = this.movement.indexOf(event.keyCode);
                this.movement.splice(index, 1);
                console.log("up ", this.movement);
            } 
            else if (event.keyCode == 32) 
            {
                this.fire  = false;   
                this.SetOffset();  
            } 
        });    
    }
    update(time, delta)
    {
        this.tank.setVelocity(0);
        this.bulletContainer.x = this.tank.x;
        this.bulletContainer.y = this.tank.y;
        if (this.movement.length > 0) {
            if (this.movement[this.movement.length - 1] == 37) {
                this.tank.body.setVelocityX(-150); //left
                this.tank.angle = 270;
            } else if (this.movement[this.movement.length - 1] == 38) {
                this.tank.body.setVelocityY(-150); //up
                this.tank.angle = 0;
            } else if (this.movement[this.movement.length - 1] == 39) {
                this.tank.body.setVelocityX(150); //right
                this.tank.angle = 90;
            } else if (this.movement[this.movement.length - 1] == 40) {
                this.tank.body.setVelocityY(150); //down
                this.tank.angle = 180;
            }
        }
        if (this.fire && time > this.lastFired) 
        {
            // console.log("pp"+this.counter);
            if(this.counter)
            {
                if(this.counter > 0)
                {
                    this.Fire();
                    this.lastFired = (time+this.timerOffset );
                }
            }          
        }
    }
    BulletCreate()
    {
        if(this.tank.frame.name == 0)//blue3
        {
            console.log("blure");
            for (let i = 0; i < 3; i++) 
            {
                this.BulletInstantiate();
                
            }
        }
        if(this.tank.frame.name == 1)//red 1
        {
            this.BulletInstantiate();
        }
        if(this.tank.frame.name == 2)//green2
        {
            for (let i = 0; i < 2; i++) 
            {
               this.BulletInstantiate();
                
            }
        }
    }
    BulletInstantiate()
    { 
        this.bulletContainer =  this.add.container(this.tank.x, this.tank.y);
        for (let i = 0; i < 50; i++) 
        {   
            let bullet= this.physics.add.image(0,0, 'bullet').setOrigin(0.5).setScale(1);
            bullet.prevX = 0;
            bullet.prevY = 0;
            bullet.setVisible(false)
            bullet.setCollideWorldBounds(true);
            bullet.available = true;
            bullet.body.onWorldBounds = true;
            bullet.angle = this.tank.angle;
            this.bulletContainer.add(bullet);
            bullet.body.world.on('worldbounds', function(body) 
            {
                // console.log("sxs",this);
                if (body.gameObject === bullet) 
                {
                    bullet.available = true;
                    bullet.setVelocity(0);
                    // bullet.setActive(false);
                    bullet.x = bullet.prevX;
                    bullet.y = bullet.prevY;
                    bullet.setVisible(false);
                    // bullet.body.destroy();
                }
            });
            this.physics.add.collider(  bullet,   this.image,function(){
                // bullet.setActive(false);
                bullet.setVisible(false);
                bullet.setVelocity(0); 
                // bullet.body.destroy();
                bullet.x = bullet.prevX;
                bullet.y = bullet.prevY;
                bullet.available = true;
            });
            this.physics.add.collider( bullet, this.obstacles ,function(_a, _p){
                // bullet.setActive(false);
                // console.log("_a",_a);
                // console.log("_P",_p);
                if( _p.totalLifeLeft > 10)
                {
                    if(_p.totalLifeLeftText)
                    {
                        _p.totalLifeLeft -= 10;
                        _p.totalLifeLeftText.text = _p.totalLifeLeft+"%";
                    }
                }
                else
                {
                    // _p.setActive(false)
                    // _p.setVisible(false)
                    if(_p.totalLifeLeftText)
                    {
                        _p.totalLifeLeftText.setVisible(false)
                        _p.destroy();
                    }
                }
                bullet.setVelocity(0);
                bullet.setVisible(false);
                // bullet.body.destroy();
                bullet.x = bullet.prevX;
                bullet.y = bullet.prevY;
                bullet.available = true;
            });
        }
      
    }
    Fire()
    {
        let _bullet = this.bulletContainer.getRandom();
        if( _bullet.available == false)
        {
            this.Fire();
        }
        let radians = Phaser.Math.DegToRad(this.tank.angle - 90);
        _bullet.setVisible(true);
        _bullet.x = _bullet.prevX;
        _bullet.y = _bullet.prevY;
        _bullet.available = false;
        _bullet.angle = this.tank.angle;
        this.physics.velocityFromRotation(radians, 1500, _bullet.body.velocity);
        this.counter -= 1;
    }
    CreateObstacles()
    {
        let obj = new Obstacles();
        this.obstacles = this.physics.add.staticGroup(0, 0);
        let obs1 =  obj.CreateObstacles(this,'tile',game.config.width/4.8, game.config.height/3.23,true,100,1);
        let obs2 =  obj.CreateObstacles(this,'tile',game.config.width/1.23, game.config.height/3.23,true,100,1);
        let obs3 =  obj.CreateObstacles(this,'tile',game.config.width/1.23, game.config.height/9.6,true,100,1);
        let obs4 =  obj.CreateObstacles(this,'tile',game.config.width/2.52, game.config.height/9.6,true,100,1);
        let obs5 =  obj.CreateObstacles(this,'tile',game.config.width/2.52, game.config.height/1.17,true,100,1);
        let obs6 =  obj.CreateObstacles(this,'tile',game.config.width/5.9, game.config.height/1.4,true,100,1);
        let obs7 =  obj.CreateObstacles(this,'tile',game.config.width/1.12, game.config.height/1.4,true,100,1);
        let obs8 =  obj.CreateObstacles(this,'tile',game.config.width/1.122, game.config.height/5.8,false,100,0);
        let obs9 =  obj.CreateObstacles(this,'tile',game.config.width/7.4, game.config.height/10,false,100,0); 
        let obs10 =  obj.CreateObstacles(this,'tile',game.config.width/1.82, game.config.height/1.39,false,100,0);  
        let obs11 =  obj.CreateObstacles(this,'tile',game.config.width/1.51, game.config.height/5.8,false,100,0); 
        let obs12 =  obj.CreateObstacles(this,'tile',game.config.width/1.28, game.config.height/1.08,false,100,0); 
        let obs13 =  obj.CreateObstacles(this,'tile',game.config.width/10.4, game.config.height/1.17,false,100,0); 
        let obs14 =  obj.CreateObstacles(this,'tile',game.config.width/10.5, game.config.height/1.95,false,100,0); 
        let obs15 =  obj.CreateObstacles(this,'tile',game.config.width/1.122, game.config.height/1.95,false,100,0); 
        this.obstacles.add(obs1 ); 
        this.obstacles.add(obs2 ); 
        this.obstacles.add(obs3 ); 
        this.obstacles.add(obs4 ); 
        this.obstacles.add(obs5 ); 
        this.obstacles.add(obs6 ); 
        this.obstacles.add(obs7 ); 
        this.obstacles.add(obs8 ); 
        this.obstacles.add(obs9 ); 
        this.obstacles.add(obs10); 
        this.obstacles.add(obs11); 
        this.obstacles.add(obs12); 
        this.obstacles.add(obs13); 
        this.obstacles.add(obs14); 
        this.obstacles.add(obs15); 
        this.physics.add.collider(  this.obstacles, this.tank);
    }
    SetOffset()
    {
        if(this.tank.frame.name == 0)
        {
            this.counter  = 3 ;
            this.timerOffset = 100;
        }
        else if(this.tank.frame.name ==1)
        {
            this.counter  = 1 ;
            this.timerOffset = 300;
        }
        else if(this.tank.frame.name == 2)
        {
            this.counter  = 2 ;
            this.timerOffset = 150;
        }   
    }
}