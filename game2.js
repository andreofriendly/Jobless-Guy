
var MainMenuScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MainMenuScene ()
    {
        Phaser.Scene.call(this, { key: 'MainMenuScene' });
    },

    preload: function ()
    {
        this.load.image('bg', 'assets/image/background/background.png');
        this.load.image('titleMain','assets/image/main/title.png');
        this.load.image('playButton','assets/image/main/playbutton.png');
    },

    create: function ()
    {
        this.add.image(0, 0, 'bg').setOrigin(0);
        this.add.image(960, 150, 'titleMain').setOrigin(0.5);
        var button = this.add.image(960, 800, 'playButton')
            .setInteractive()
            .on('pointerdown', function () {
                this.scene.transition({
                target: 'GameScene',
                duration: 3000,
                moveAbove:true,
                onUpdate: function (progress) {
                    
                },
                onComplete: function () {
                    // do something after the transition is complete
                }
                
        });
    }, this);

    }
});

var GameScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'GameScene' });
    },

    preload: function ()
    {
        //background
        this.load.image('summonNight', 'assets/image/background/SummonNight.png');
        this.load.spritesheet('fire', 'assets/image/background/fire.png', { frameWidth: 377, frameHeight: 212 });
        this.load.image('frontFirePlace', 'assets/image/background/frontFirePlace.png');
        this.load.image('monitor', 'assets/image/background/monitor.png');

        //Top Bar
        this.load.image('logo', 'assets/image/topbar/icon/logo.png');
        this.load.image('sleepBar', 'assets/image/topbar/insidebar.png');
        this.load.image('foodBar', 'assets/image/topbar/insidebar.png');
        this.load.image('gameBar', 'assets/image/topbar/insidebar.png');
        this.load.image('bathBar', 'assets/image/topbar/insidebar.png');
        this.load.image('outsideBar', 'assets/image/topbar/outsidebar.png');
        this.load.image('sleepIcon', 'assets/image/topbar/icon/sleep.png');
        this.load.image('eatIcon', 'assets/image/topbar/icon/eat.png');
        this.load.image('gameIcon', 'assets/image/topbar/icon/gaming.png');
    },

    create: function ()
    {

        this.cameras.main.fadeIn(500); 

        //background
        this.add.image(0,-100, 'summonNight').setOrigin(0);

        // Fireplace animation
        this.anims.create({
            key: 'fire',
            frames: this.anims.generateFrameNumbers('fire', { start: 1, end: 22 }),
            frameRate: 20,
            repeat: -1
        });

        const sprite = this.add.sprite(1520, 720, 'fire');
        sprite.anims.play('fire',true);

        //front fireplace
        front = this.add.image(1365,720,'frontFirePlace').setOrigin(0);

        sprite.setVisible(true);

        front.setInteractive({
            cursor: 'pointer'
        });
        front.on('pointerdown', function(){
            if(sprite.visible == true){
                sprite.setVisible(false);
            }else if(sprite.visible == false){
                sprite.setVisible(true);
            }
        })

        //Monitor
        this.add.image(150,335,'monitor').setOrigin(0);

        //Logo
        this.add.image(200,45, 'logo').setOrigin(0);

        //Sleep Bar
        sleepBar = this.add.image(700, 50, 'sleepBar').setOrigin(0);
        sleepBar.setCrop(0, 0, 0, sleepBar.height);
        this.add.image(696, 47, 'outsideBar').setOrigin(0);
        this.add.image(610, 25, 'sleepIcon').setOrigin(0);

        //Food Bar
        foodBar = this.add.image(1020, 50, 'foodBar').setOrigin(0);
        foodBar.setCrop(0, 0, 0, foodBar.height);
        this.add.image(1016, 47, 'outsideBar').setOrigin(0);
        this.add.image(920, 25, 'eatIcon').setOrigin(0);

        //Game Bar
        gameBar = this.add.image(1320, 50, 'gameBar').setOrigin(0);
        gameBar.setCrop(0, 0, 0, gameBar.height);
        this.add.image(1316, 47, 'outsideBar').setOrigin(0);
        this.add.image(1240, 25, 'gameIcon').setOrigin(0);

        //Bath Bar
        bathBar = this.add.image(1620, 50, 'bathBar').setOrigin(0);
        bathBar.setCrop(0, 0, 0, bathBar.height);
        this.add.image(1616, 47, 'outsideBar').setOrigin(0);
    },

    update: function()
    {
        updateSleepBar(50);
        updateFoodBar(100);
        updateGameBar(70);
        updateBathBar(40);
    }
});

function updateSleepBar(amount) {
    var width = Phaser.Math.Clamp((amount / 100) * sleepBar.width, 0, sleepBar.width);
    sleepBar.setCrop(0, 0, width, sleepBar.height);
}

function updateFoodBar(amount) {
    var width = Phaser.Math.Clamp((amount / 100) * foodBar.width, 0, foodBar.width);
    foodBar.setCrop(0, 0, width, foodBar.height);
}

function updateGameBar(amount) {
    var width = Phaser.Math.Clamp((amount / 100) * gameBar.width, 0, gameBar.width);
    gameBar.setCrop(0, 0, width, gameBar.height);
}

function updateBathBar(amount) {
    var width = Phaser.Math.Clamp((amount / 100) * bathBar.width, 0, bathBar.width);
    bathBar.setCrop(0, 0, width, bathBar.height);
}

//Configuration
var config = {
    type: Phaser.CANVAS,
    backgroundColor: 'black',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'container',
        width: 1920,
        height: innerHeight,
    },
    scene:
    [
        MainMenuScene, GameScene
    ]
};

var game = new Phaser.Game(config);
