var sharedPreload = function(){
    this.load.image('logo', 'assets/image/topbar/icon/logo.png');
    this.load.image('sleepBar', 'assets/image/topbar/insidebar.png');
    this.load.image('foodBar', 'assets/image/topbar/insidebar.png');
    this.load.image('gameBar', 'assets/image/topbar/insidebar.png');
    this.load.image('bathBar', 'assets/image/topbar/insidebar.png');
    this.load.image('outsideBar', 'assets/image/topbar/outsidebar.png');
    this.load.image('sleepIcon', 'assets/image/topbar/icon/sleep.png');
    this.load.image('eatIcon', 'assets/image/topbar/icon/eat.png');
    this.load.image('gameIcon', 'assets/image/topbar/icon/gaming.png');
    this.load.image('healthIcon', 'assets/image/topbar/icon/health.png');
    this.load.html('username', 'element/username.html');

    //character
    this.load.spritesheet('firstmaleidle', 'assets/character/firstmaleidle.png', { frameWidth: 500, frameHeight: 760 });
    this.load.spritesheet('firstmaledance', 'assets/character/firstmaledance.png', { frameWidth: 600, frameHeight: 760 });
    this.load.spritesheet('firstmalewave', 'assets/character/firstmalewave.png', { frameWidth: 500, frameHeight: 760 });

    this.load.spritesheet('secondmaleidle', 'assets/character/secondmaleidle.png', { frameWidth: 500, frameHeight: 760 });
    this.load.spritesheet('secondmaledance', 'assets/character/secondmaledance.png', { frameWidth: 600, frameHeight: 760 });
    this.load.spritesheet('secondmalewave', 'assets/character/secondmalewave.png', { frameWidth: 500, frameHeight: 760 });

    this.load.spritesheet('thirdmaleidle', 'assets/character/thirdmaleidle.png', { frameWidth: 500, frameHeight: 760 });
    this.load.spritesheet('thirdmaledance', 'assets/character/thirdmaledance.png', { frameWidth: 600, frameHeight: 760 });
    this.load.spritesheet('thirdmalewave', 'assets/character/thirdmalewave.png', { frameWidth: 500, frameHeight: 760 });
}

var sharedCreate = function(){
    this.plugins.get('TweenPlugin');

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
    this.add.image(1545, 25, 'healthIcon').setOrigin(0);

    //const name = this.scene.get('MainMenuScene').variableToPass;
    //this.add.text(200, 850, `hi ${name}`, { color: 'white', fontSize: '20px '});
}

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
        this.load.image('overlay','assets/image/main/overlay.png');
        this.load.image('rightbutton','assets/image/main/rightbutton.png');
        this.load.image('leftbutton','assets/image/main/leftbutton.png');
        sharedPreload.call(this);

    },

    create: function ()
    {
        this.add.image(0, 0, 'bg').setOrigin(0);
        this.add.image(960, 500, 'overlay').setOrigin(0.5);
        this.add.image(960, 120, 'titleMain').setOrigin(0.5);
        var leftButton = this.add.image(750, 370, 'leftbutton').setOrigin(0).setInteractive();
        var rightButton = this.add.image(1070, 370, 'rightbutton').setOrigin(0).setInteractive();
        sharedPreload.call(this);

        //input
        var element = this.add.dom(960, 700).createFromCache('username');
        var text = this.add.text(70, 30, '', { color: 'white', fontSize: '20px '});

        //
        var imageKeys = ["firstmaleidle", "secondmaleidle", "thirdmaleidle"];
        var currentImageIndex = 0;
        
        //character
        var male = this.add.sprite(950, 400, imageKeys[currentImageIndex]);
        male.setScale(0.501);
        
        leftButton.on('pointerdown', function() {
            console.log("left button clicked");
            currentImageIndex = (currentImageIndex - 1 + imageKeys.length) % imageKeys.length;
            male.setTexture(imageKeys[currentImageIndex]);
            createAnimation();
        });
        
        rightButton.on('pointerdown', function() {
            console.log("right button clicked");
            currentImageIndex = (currentImageIndex + 1) % imageKeys.length;
            male.setTexture(imageKeys[currentImageIndex]);
            createAnimation();
        });
        male.anims.create({
            key: imageKeys[currentImageIndex],
            frames: this.anims.generateFrameNumbers(imageKeys[currentImageIndex], { start: 1, end: 118 }),
            frameRate: 20,
            repeat: -1
        });
        
        male.anims.play(imageKeys[currentImageIndex]);
        
        function createAnimation() {
            male.anims.stop(); 
            male.anims.remove(imageKeys[currentImageIndex]);
            male.anims.create({
                key: imageKeys[currentImageIndex],
                frames: this.anims.generateFrameNumbers(imageKeys[currentImageIndex], { start: 1, end: 118 }),
                frameRate: 20,
                repeat: -1
            });
            male.anims.play(imageKeys[currentImageIndex]);
        }
        createAnimation = createAnimation.bind(this);
        
        
        //submit button
        var button = this.add.image(960, 850, 'playButton')
        .setInteractive({
            cursor: 'pointer'
        })
            .on('pointerdown', function () {
                var inputText = element.getChildByName('nameField');
                if (inputText.value !== '')
                {
                    
                    this.currentImageIndex = currentImageIndex;
                    this.variableToPass = inputText.value;
                    game.scale.startFullscreen();
                    
                    game.scale.scaleMode = Phaser.Scale.NO_SCALE;
                    game.scale.pageAlignHorizontally = true;
                    game.scale.pageAlignVertically = true;
                    game.scale.refresh();
    
                    
                    this.scene.transition({
                    target: 'welcomeScene',
                    duration: 1000,
                    moveAbove:true,
                    onUpdate: function (progress) {
                        
                    },
                    onComplete: function () {
                        
                    }   
            });
                }else{
                    text.setText('Please Input Username Before Play')
                }
    }, this);

 
    }
});

var welcomeScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function DesktopScene ()
    {
        Phaser.Scene.call(this, { key: 'welcomeScene' });
    },

    preload: function ()
    {
        this.load.image('blackbg', 'assets/image/background/blackbg.png');
    },

    create: function ()
    {
        this.cameras.main.fadeIn(200);
        //fade animation
        const name = this.scene.get('MainMenuScene').variableToPass;

        var bg = this.add.image(0,0,'blackbg').setOrigin(0);
        let text = this.add.text(200, 100, `hi ${name}`, {fontSize:'32px',fill: '#ffffff'});
        text.alpha = 0;

        let tweenfirst = this.tweens.add({
            targets: text,
            duration: 500,
            alpha: 1,
            onComplete: () => {
                this.tweens.remove(tweenfirst);
            }
        });

        let tween = this.tweens.add({
            targets: text,
            duration: 1000,
            alpha: 0,
            delay: 3000,
            onComplete: () => {
                this.tweens.remove(tween);        
            }
        });

        let text2 = this.add.text(200, 100, 'welcome', {fontSize:'32px',fill: '#ffffff'});
        text2.alpha = 0;
        let tween2 = this.tweens.add({
            targets: text2,
            duration: 1000,
            alpha: 1,
            delay: 4000,
            onComplete: () => {
                this.tweens.remove(tween2);
            }
        });

        let tween3 = this.tweens.add({
            targets: text2,
            duration: 1000,
            alpha: 0,
            delay: 7000,
            onComplete: () => {
                this.tweens.remove(tween3);
            }
        });

        bg.alpha = 1;
        let tweenbg = this.tweens.add({
            targets: bg,
            duration: 1000,
            alpha: 0,
            delay: 8000,
            onComplete: () => {
                this.tweens.remove(tweenbg);        
            }
        });

        this.time.delayedCall(9000, () => {
            this.scene.start('GameScene');
          }, [], this);
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
        this.load.image('RightButton', 'assets/image/background/RightButton.png');

        //Top Bar
        sharedPreload.call(this);
    },

    create: function ()
    {
        const MainMenuScene = this.scene.get('MainMenuScene');
        const currentImageIndex = MainMenuScene.currentImageIndex;
        console.log("index" + currentImageIndex);

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
        
        //character
        let level = 1;
        let x = 1050,y = 540, z = 0.7;
        let idle = 'maleidle';
        
        if(level == 0){
            x = 1050;
            y = 600;
            z = 0.8;
        }else if(level == 1){
            x = 1050;
            y = 540;
            z = 1;
        }
        
        const male = this.add.sprite(x, y, 'maleidle');
        male.setScale(z); 
        
        this.anims.create({
            key: 'maleidle',
            frames: this.anims.generateFrameNumbers('maleidle', { start: 1, end: 118 }),
            frameRate: 20,
            repeat: -1
        }); 
    
        this.anims.create({
            key: 'malewave',
            frames: this.anims.generateFrameNumbers('malewave', { start: 1, end: 98 }),
            frameRate: 20,
            repeat: -1
        }); 
    
        this.anims.create({
            key: 'maledance',
            frames: this.anims.generateFrameNumbers('maledance', { start: 1, end: 102 }),
            frameRate: 20,
            repeat: -1
        }); 
    
        male.anims.play('maleidle');
        let del = 5900;
    
        const callback = () => {
            const randomNum = Math.random();
            if (randomNum < 0.5) {
                del = 5900;
                male.anims.play('maleidle');
            } else if(randomNum < 0.9){
                del = 4900;     
                male.anims.play('malewave');
            } else{
                del = 5100;
                male.anims.play('maledance');
            }
            event.delay = del;
        };
    
        const event = this.time.addEvent({
            delay: del,
            loop: true,
            callback: callback   
        });

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
        var desktop = this.add.image(150, 335, 'monitor').setOrigin(0)
        .setInteractive({
            cursor: 'pointer'
        })
        .on('pointerdown', function () {
            this.cameras.main.fadeOut(200);
            this.time.delayedCall(200, function() {
                this.scene.start('DesktopScene');
            }, [], this);
    }, this);
        
        //Top Bar
        sharedCreate.call(this);

        //Button Right
        var rightButton = this.add.image(1790, 400, 'RightButton')
        .setInteractive({
            cursor: 'pointer'
        })
        .on('pointerdown', function () {
            this.cameras.main.fadeOut(200);
            this.time.delayedCall(200, function() {
                this.scene.start('SleepScene');
            }, [], this);
    }, this);


    },
});


var SleepScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SleepScene ()
    {
        Phaser.Scene.call(this, { key: 'SleepScene' });
    },

    preload: function ()
    {
        this.load.image('SleepMorning', 'assets/image/background/SleepMorning.png');
        this.load.image('light', 'assets/image/sleep/light.png')
        this.load.image('lamp', 'assets/image/sleep/lamp.png')
        sharedCreate.call(this);
        this.load.image('LeftButton', 'assets/image/background/LeftButton.png');
    },

    create: function ()
    {
        this.cameras.main.fadeIn(200);
        this.add.image(0, -40, 'SleepMorning').setOrigin(0);
        const light = this.add.image(-40,410,'light').setOrigin(0);
        lamp = this.add.image(90,384,'lamp').setOrigin(0);
        sharedCreate.call(this);

        //Button Lamp
        light.setVisible(false);

        lamp.setInteractive({
            cursor: 'pointer'
        });
        lamp.on('pointerdown', function(){
            if(light.visible == true){
                light.setVisible(false);
            }else if(light.visible == false){
                light.setVisible(true);
            }
        })


        //Button Left
        var rightButton = this.add.image(120, 400, 'LeftButton')
        .setInteractive({
            cursor: 'pointer'
        })
        .on('pointerdown', function () {
            this.cameras.main.fadeOut(200);
            this.time.delayedCall(200, function() {
                this.scene.start('GameScene');
            }, [], this);
}, this);

        //Button Right
        var rightButton = this.add.image(1790, 400, 'RightButton')
        .setInteractive({
            cursor: 'pointer'
        })
        .on('pointerdown', function () {
            this.cameras.main.fadeOut(200);
            this.time.delayedCall(200, function() {
                this.scene.start('EatScene');
            }, [], this);
}, this);

    }
    
});

var EatScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function EatScene ()
    {
        Phaser.Scene.call(this, { key: 'EatScene' });
    },

    preload: function ()
    {
        this.load.image('eatRoom', 'assets/image/background/EatRoom.png');
        sharedCreate.call(this);
        this.load.image('foodtable', 'assets/image/eat/foodtable.png')
        this.load.image('LeftButton', 'assets/image/background/LeftButton.png');
    },

    create: function ()
    {
        this.cameras.main.fadeIn(200);
        this.add.image(0, -40, 'eatRoom').setOrigin(0);
        this.add.image(80,650, 'foodtable').setOrigin(0);

        sharedCreate.call(this);

        //Button Left
        var rightButton = this.add.image(120, 400, 'LeftButton')
        .setInteractive({
            cursor: 'pointer'
        })
        .on('pointerdown', function () {
            this.cameras.main.fadeOut(200);
            this.time.delayedCall(200, function() {
                this.scene.start('SleepScene');
            }, [], this);
}, this);

        //Button Right
        var rightButton = this.add.image(1790, 400, 'RightButton')
        .setInteractive({
            cursor: 'pointer'
        })
        .on('pointerdown', function () {
            this.cameras.main.fadeOut(200);
            this.time.delayedCall(200, function() {
                this.scene.start('BathScene');
            }, [], this);
}, this);

    }
    
});

var BathScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BathScene ()
    {
        Phaser.Scene.call(this, { key: 'BathScene' });
    },

    preload: function ()
    {
        this.load.image('bathroom', 'assets/image/background/Bathroom.png');
        this.load.image('box', 'assets/image/bath/box.png');
        sharedCreate.call(this);
        this.load.image('LeftButton', 'assets/image/background/LeftButton.png');
    },

    create: function ()
    {
        this.cameras.main.fadeIn(200);
        this.add.image(0, -40, 'bathroom').setOrigin(0);
        
        sharedCreate.call(this);

        box = this.add.image(320,100, 'box').setOrigin(0);
        box.setInteractive({
            cursor: 'pointer'
        })
        box.on('pointerdown', function () {
            this.cameras.main.fadeOut(200);
            this.time.delayedCall(200, function() {
                this.scene.start('GameScene');
            }, [], this);
}, this);


        //Button Left
        var rightButton = this.add.image(120, 400, 'LeftButton')
        .setInteractive({
            cursor: 'pointer'
        })
        .on('pointerdown', function () {
            this.cameras.main.fadeOut(200);
            this.time.delayedCall(200, function() {
                this.scene.start('EatScene');
            }, [], this);
}, this);

    }
    
});



var DesktopScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function DesktopScene ()
    {
        Phaser.Scene.call(this, { key: 'DesktopScene' });
    },

    preload: function ()
    {
        this.load.image('desktop', 'assets/image/background/desktop.png');
        this.load.image('leave', 'assets/image/desktop/leave.png');
    },

    create: function ()
    {
        this.cameras.main.fadeIn(200);
        this.add.image(0, -200, 'desktop').setOrigin(0);
        
        leave = this.add.image(20, 845, 'leave').setOrigin(0);
        leave.setInteractive({
            cursor: 'pointer'
        })
        leave.on('pointerdown', function () {
            this.cameras.main.fadeOut(200);
            this.time.delayedCall(200, function() {
                this.scene.start('GameScene');
            }, [], this);
}, this);

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

var gameWidth = 1920;
var gameHeight = 1080;

// check if the viewport width is less than 1920
if (window.innerWidth > 1920) {
    gameWidth = window.innerWidth;
}else{
    gameWidth = 1920;
}

// check height
if (window.innerHeight > 1080) {
    gameHeight = window.innerHeight;
}else{
    gameHeight = 930;
}

//Configuration
var config = {
    type: Phaser.CANVAS,
    backgroundColor: 'black',
    dom: {
        createContainer: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'container',
        width: gameWidth,
        height: 930,
    },
    scene:
    [
        MainMenuScene, welcomeScene, GameScene, SleepScene, EatScene, BathScene, DesktopScene
    ]
};

var game = new Phaser.Game(config);

