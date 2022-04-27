import PreloadScene from './PreloadScene.js';
import GameScene from './GameScene.js';

// Load our scenes
var preloadScene = new PreloadScene();
var gameScene = new GameScene();

window.onload = function() {
    isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
     isIPad = /iPod|iPad/i.test(navigator.userAgent);
    
    var config = {
        type: Phaser.AUT0,
        backgroundColor: 0x00FFA4 ,
        parent: 'tank',
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        physics: {
            default: 'arcade',
            arcade: {
                // debug: true,
                gravity: { y: 0 }
            }
        },
        width: 1920,
        height: 1080,
        // banner: false
    };
    game = new Phaser.Game(config);
    scaleFactorX =  (config.width/ 1920);
    scaleFactorY =  (config.width/ 1080);
    window.focus();
    // load scenes
    game.scene.add('PreloadScene', preloadScene);
    game.scene.add("GameScene", gameScene);

    game.scene.start('PreloadScene');
    /* Version*/
}