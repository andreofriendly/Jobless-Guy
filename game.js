const sharedData = {
    startTime: 0,
    timer: null
  };
var sharedPreload = function(){
    this.load.image('logo', 'assets/image/topbar/icon/logo.png');
    this.load.image('sleepBar', 'assets/image/topbar/insidebar.png');
    this.load.image('foodBar', 'assets/image/topbar/insidebar.png');
    this.load.image('playBar', 'assets/image/topbar/insidebar.png');
    this.load.image('healthBar', 'assets/image/topbar/insidebar.png');
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
    playBar = this.add.image(1320, 50, 'playBar').setOrigin(0);
    playBar.setCrop(0, 0, 0, playBar.height);
    this.add.image(1316, 47, 'outsideBar').setOrigin(0);
    this.add.image(1240, 25, 'gameIcon').setOrigin(0);
    
    //Bath Bar
    healthBar = this.add.image(1620, 50, 'healthBar').setOrigin(0);
    healthBar.setCrop(0, 0, 0, healthBar.height);
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
        var leftButton = this.add.image(750, 370, 'leftbutton').setOrigin(0).setInteractive({cursor: 'pointer'}) ;
        var rightButton = this.add.image(1070, 370, 'rightbutton').setOrigin(0).setInteractive({cursor: 'pointer'});
        sharedPreload.call(this);

        //input
        var element = this.add.dom(960, 700).createFromCache('username');
        var text = this.add.text(70, 30, '', { color: 'white', fontSize: '20px '});
        
        //character
        //character current Index
        var imageKeys = ["firstmaleidle", "secondmaleidle", "thirdmaleidle"];
        var currentImageIndex = 0;
        
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

        //change the 0 to 9000

        this.time.delayedCall(9000, () => {
            sharedData.startTime = Date.now();
            sharedData.timer = new Timer(this, sharedData.startTime);
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
        this.load.image('summonMorning', 'assets/image/background/SummonMorning.png');
        this.load.spritesheet('fire', 'assets/image/background/fire.png', { frameWidth: 377, frameHeight: 212 });
        this.load.image('frontFirePlace', 'assets/image/background/frontFirePlace.png');
        this.load.image('monitor', 'assets/image/background/monitor.png');
        this.load.image('RightButton', 'assets/image/background/RightButton.png');
        
        //Top Bar
        sharedPreload.call(this);
    },
    
    create: function ()
    {
        
        this.cameras.main.fadeIn(500); 
        
        //background
        this.background = this.add.image(0,-100, 'summonMorning').setOrigin(0);
        
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
        const MainMenuScene = this.scene.get('MainMenuScene');
        const currentImageIndex = MainMenuScene.currentImageIndex;
        var x = 1050,y = 600, z = 0.8;
        
        //Character Animation
        var idle = ["firstmaleidle", "secondmaleidle", "thirdmaleidle"];
        var dance = ["firstmaledance", "secondmaledance", "thirdmaledance"];
        var wave = ["firstmalewave", "secondmalewave", "thirdmalewave"];
        
        const male = this.add.sprite(x, y, idle[currentImageIndex]);

        this.male = male;
        this.male.setPosition(1050, 600);
        this.male.setScale(0.8);
        
        this.anims.create({
            key: idle[currentImageIndex],
            frames: this.anims.generateFrameNumbers(idle[currentImageIndex], { start: 1, end: 118 }),
            frameRate: 20,
            repeat: -1
        }); 
        
        this.anims.create({
            key: wave[currentImageIndex],
            frames: this.anims.generateFrameNumbers(wave[currentImageIndex], { start: 1, end: 98 }),
            frameRate: 20,
            repeat: -1
        }); 
        
        this.anims.create({
            key: dance[currentImageIndex],
            frames: this.anims.generateFrameNumbers(dance[currentImageIndex], { start: 1, end: 102 }),
            frameRate: 20,
            repeat: -1
        }); 
    
        male.anims.play(idle[currentImageIndex]);
        let del = 5900;
        
        const callback = () => {
            const randomNum = Math.random();
            if (randomNum < 0.5) {
                del = 5900;
                male.anims.play(idle[currentImageIndex]);
            } else if(randomNum < 0.9){
                del = 4900;     
                male.anims.play(wave[currentImageIndex]);
            } else{
                del = 5100;
                male.anims.play(dance[currentImageIndex]);
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
        setInterval(updateBars, 1200);

        this.time.addEvent({
            delay: 1000,
            callback: this.updateBars,
            callbackScope: this,
            loop: true
        });

        //timer
        this.timer = new Timer(this, sharedData.startTime);
          
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

}, update:function(){
    
    if(level == 0){
        this.male.setPosition(1050, 600);
        this.male.setScale(0.8);
    } else if(level == 1){
        this.male.setPosition(1050, 540);
        this.male.setScale(1);
    }

    if(day == "morning"){
        this.background.setTexture('summonMorning');
    }else if(day == "night"){
        this.background.setTexture('summonNight');
    }

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
        this.load.image('sleepMorning', 'assets/image/background/SleepMorning.png');
        this.load.image('sleepNight', 'assets/image/background/SleepNight.png');
        this.load.image('light', 'assets/image/sleep/light.png')
        this.load.image('lamp', 'assets/image/sleep/lamp.png')
        sharedCreate.call(this);
        this.load.image('LeftButton', 'assets/image/background/LeftButton.png');
        this.load.image('sleepButton','assets/image/sleep/sleep.png');
        this.load.image('wakeupButton','assets/image/sleep/wakeup.png');
    },

    create: function ()
    {
        this.cameras.main.fadeIn(200);
        this.background = this.add.image(0, -40, 'SleepMorning').setOrigin(0);
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
        
        //Character
        //character Sleep
        const MainMenuScene = this.scene.get('MainMenuScene');
        const currentImageIndex = MainMenuScene.currentImageIndex;
        var x = 1050,y = 800, z = 1;
        
        //Character Animation
        var idle = ["firstmaleidle", "secondmaleidle", "thirdmaleidle"];
        var dance = ["firstmaledance", "secondmaledance", "thirdmaledance"];
        var wave = ["firstmalewave", "secondmalewave", "thirdmalewave"];
        
        const male = this.add.sprite(x, y, idle[currentImageIndex]);

        this.male = male;
        
        this.anims.create({
            key: idle[currentImageIndex],
            frames: this.anims.generateFrameNumbers(idle[currentImageIndex], { start: 1, end: 118 }),
            frameRate: 20,
            repeat: -1
        }); 
        
        this.anims.create({
            key: wave[currentImageIndex],
            frames: this.anims.generateFrameNumbers(wave[currentImageIndex], { start: 1, end: 98 }),
            frameRate: 20,
            repeat: -1
        }); 
        
        this.anims.create({
            key: dance[currentImageIndex],
            frames: this.anims.generateFrameNumbers(dance[currentImageIndex], { start: 1, end: 102 }),
            frameRate: 20,
            repeat: -1
        }); 
    
        male.anims.play(idle[currentImageIndex]);
        let del = 5900;
        
        const callback = () => {
            const randomNum = Math.random();
            if (randomNum < 0.5) {
                del = 5900;
                male.anims.play(idle[currentImageIndex]);
            } else if(randomNum < 0.9){
                del = 4900;     
                male.anims.play(wave[currentImageIndex]);
            } else{
                del = 5100;
                male.anims.play(dance[currentImageIndex]);
            }
            event.delay = del;
        };
    
        const event = this.time.addEvent({
            delay: del,
            loop: true,
            callback: callback   
        });

        //Timer
        this.timer = new Timer(this, sharedData.startTime);

        //Button Sleep
        var sleepInterval = null;

        //Button Left
        var rightButton = this.add.image(120, 400, 'LeftButton')
        .setInteractive({
            cursor: 'pointer'
        })
        .on('pointerdown', function () {
            clearInterval(sleepInterval);
            sleepInterval = null;
            sleepButton.visible = true;
            wakeupButton.visible = false;

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
                clearInterval(sleepInterval);
                sleepInterval = null;
                sleepButton.visible = true;
                wakeupButton.visible = false;

                this.cameras.main.fadeOut(200);
                this.time.delayedCall(200, function() {
                    this.scene.start('EatScene');
                }, [], this);
    }, this);

    
    //Button Wake UP
    var wakeupButton = this.add.image(180, 850, 'wakeupButton')
    .setInteractive({
        cursor: 'pointer'
    })
    .on('pointerdown', function () {
        clearInterval(sleepInterval);
        sleepInterval = null;
        
        male.visible = true;
        sleepButton.visible = true;
        wakeupButton.visible = false;
    }, this);
    
    //Button Sleep
    var sleepButton = this.add.image(180, 850, 'sleepButton')
    .setInteractive({
        cursor: 'pointer'
    })
    .on('pointerdown', function () {
        sleepInterval = setInterval(function(){ 
            sleep(); 
            needEat();
            needGames();
        }, 2000); // call sleep() every 5 seconds

        male.visible = false;
        sleepButton.visible = false;
        wakeupButton.visible = true;
    }, this);

    }, update:function(){
        if(level == 0){
            this.male.setPosition(1050, 580);
            this.male.setScale(1);
        } else if(level == 1){
            this.male.setPosition(1050, 520);
            this.male.setScale(1.2);
        }

        if(day == "morning"){
            this.background.setTexture('sleepMorning');
        }else if(day == "night"){
            this.background.setTexture('sleepNight');
        }
    
    
    },
    
});

var EatScene = new Phaser.Class({
    
    Extends: Phaser.Scene,
    
    initialize:
    
    
    function EatScene ()
    {
        Phaser.Scene.call(this, { key: 'EatScene' });
    },

    pizza: null,
    sandwich: null,
    koreanfood: null,
    
    preload: function ()
    {
        this.load.image('eatRoom', 'assets/image/background/EatRoom.png');
        sharedCreate.call(this);
        this.load.image('foodtable', 'assets/image/eat/foodtable.png');

        this.load.image('koreanfood', 'assets/image/eat/koreanfood.png');
        this.load.image('pizza', 'assets/image/eat/pizza.png');
        this.load.image('sandwich', 'assets/image/eat/sandwich.png');

        this.load.image('LeftButton', 'assets/image/background/LeftButton.png');

    },

    create: function ()
    {
        this.cameras.main.fadeIn(200);
        this.add.image(0, -40, 'eatRoom').setOrigin(0);
        //Character
        //character Sleep
        const MainMenuScene = this.scene.get('MainMenuScene');
        const currentImageIndex = MainMenuScene.currentImageIndex;
        var x = 1050,y = 800, z = 1;
        
        //Character Animation
        var idle = ["firstmaleidle", "secondmaleidle", "thirdmaleidle"];
        var dance = ["firstmaledance", "secondmaledance", "thirdmaledance"];
        var wave = ["firstmalewave", "secondmalewave", "thirdmalewave"];
        
        const male = this.add.sprite(x, y, idle[currentImageIndex]);

        this.male = male;
        
        this.anims.create({
            key: idle[currentImageIndex],
            frames: this.anims.generateFrameNumbers(idle[currentImageIndex], { start: 1, end: 118 }),
            frameRate: 20,
            repeat: -1
        }); 
        
        this.anims.create({
            key: wave[currentImageIndex],
            frames: this.anims.generateFrameNumbers(wave[currentImageIndex], { start: 1, end: 98 }),
            frameRate: 20,
            repeat: -1
        }); 
        
        this.anims.create({
            key: dance[currentImageIndex],
            frames: this.anims.generateFrameNumbers(dance[currentImageIndex], { start: 1, end: 102 }),
            frameRate: 20,
            repeat: -1
        }); 
    
        male.anims.play(idle[currentImageIndex]);
        let del = 5900;
        
        const callback = () => {
            const randomNum = Math.random();
            if (randomNum < 0.5) {
                del = 5900;
                male.anims.play(idle[currentImageIndex]);
            } else if(randomNum < 0.9){
                del = 4900;     
                male.anims.play(wave[currentImageIndex]);
            } else{
                del = 5900;
                male.anims.play(idle[currentImageIndex]);
            }
            event.delay = del;
        };
    
        const event = this.time.addEvent({
            delay: del,
            loop: true,
            callback: callback   
        });

        //FOODTABLE
        this.add.image(80,650, 'foodtable').setOrigin(0);

        const pizza = this.add.image(300, 670, 'pizza').setOrigin(0).setInteractive();
        const sandwich = this.add.image(650, 650, 'sandwich').setOrigin(0).setInteractive();
        const koreanfood = this.add.image(1000, 660, 'koreanfood').setOrigin(0).setInteractive();
        
        this.input.setDraggable(pizza);
        this.input.setDraggable(sandwich);
        this.input.setDraggable(koreanfood);
        
        const dropZone = this.add.zone(800, 400, 300, 300).setRectangleDropZone(10, 10);
        
        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
          gameObject.x = dragX;
          gameObject.y = dragY;
        });
        
        this.input.on('dragend', function(pointer, gameObject) {
          if (dropZone.getBounds().contains(gameObject.x, gameObject.y)) {
            if (gameObject === pizza) {
                pizzaFood--;
                eatFood();
                needSleep5();
            }else if(gameObject === sandwich){
                sandwichFood--;
                eatFood();
                eatFood();
                eatFood();
                needSleep5();
            }else if(gameObject === koreanfood){
                koreanfoodFood--;
                eatFood();
                eatFood();
                eatFood();
                eatFood();
                eatFood();
                needSleep5();
            }

            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
          } else {
            // Return the image to its original position
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
          }
        });
        this.pizza = pizza;
        this.koreanfood = koreanfood;
        this.sandwich = sandwich;
        
        
        //Eat Scene Bar
        sharedCreate.call(this);

        //timer
        this.timer = new Timer(this, sharedData.startTime);
        
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

    },update:function(){
        //dragable
        //foodies
        if(pizzaFood == 0){
            this.pizza.visible = false;
        }else if(pizzaFood>0){
            this.pizza.visible = true;
        }

        if(koreanfoodFood == 0){
            this.koreanfood.visible = false;
        }else if(pizzaFood>0){
            this.koreanfood.visible = true;
        }

        if(sandwichFood == 0){
            this.sandwich.visible = false;
        }else if(pizzaFood>0){
            this.sandwich.visible = true;
        }
        if(level == 0){
            this.male.setPosition(800, 680);
            this.male.setScale(1);
        } else if(level == 1){
            this.male.setPosition(800, 600);
            this.male.setScale(1.2);
        }

    },
    
    
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


        //timer
        this.timer = new Timer(this, sharedData.startTime);
        
        box = this.add.image(320,100, 'box').setOrigin(0);
        box.setInteractive({
            cursor: 'pointer'
        })
        box.on('pointerdown', function () {
            this.cameras.main.fadeOut(200);
            this.time.delayedCall(200, function() {
                this.scene.start('flappybird');
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
        this.load.image('store', 'assets/image/desktop/store.png');
        this.load.image('pesostore', 'assets/image/desktop/pesostore.png');
        this.load.image('snake', 'assets/image/desktop/snake.png');
        this.load.image('buy', 'assets/image/desktop/buybutton.png');
        this.load.image('notenough', 'assets/image/desktop/notenough.png');
        this.load.image('purchased','assets/image/desktop/purchased.png');
        this.load.image('exit','assets/image/desktop/exit.png');
    },
    
    create: function ()
    {
        this.cameras.main.fadeIn(200);
        this.add.image(0, -200, 'desktop').setOrigin(0);
        
        leave = this.add.image(1800, 40, 'leave').setOrigin(0);
        leave.setScale(0.8);
        leave.setInteractive({
            cursor: 'pointer'
        })
        leave.on('pointerdown', function () {
            this.cameras.main.fadeOut(200);
            this.time.delayedCall(200, function() {
                this.scene.start('GameScene');
            }, [], this);
        }, this);

        pesostore = this.add.image(600,150, 'pesostore').setOrigin(0);
        pesostore.visible = false;
        //snake
        snake = this.add.image(50, 40, 'snake').setOrigin(0);
        snake.setScale(0.8);
        snake.setInteractive({
            cursor: 'pointer'
        })
        snake.on('pointerdown', function () {
            this.cameras.main.fadeOut(200);
            this.time.delayedCall(200, function() {
                this.scene.start('snakeGame');
            }, [], this);
        }, this);

        notenough = this.add.image(950, 650,'notenough').setOrigin(0);
        notenough.visible = false;
        purchased = this.add.image(1050, 650,'purchased').setOrigin(0);
        purchased.visible = false;
        
        //buy sandwich
        sandwich = this.add.image(735, 550, 'buy').setOrigin(0);
        sandwich.visible = false;
        sandwich.setInteractive({
            cursor: 'pointer'
        })
        sandwich.on('pointerdown', function () {
            if(money >= 20){
                money - 20;
                sandwichFood++;
                purchased.visible = true;
                notenough.visible = false;
            }else{
                notenough.visible = true;
                purchased.visible = false;
            }
        }, this);

        //buy koreanfood
        koreanfood = this.add.image(1055, 550, 'buy').setOrigin(0);
        koreanfood.visible = false;
        koreanfood.setInteractive({
            cursor: 'pointer'
        })
        koreanfood.on('pointerdown', function () {
            if(money >= 30){
                money - 30;
                koreanfoodFood++;
                purchased.visible = true;
                notenough.visible = false;
            }else{
                notenough.visible = true;
                purchased.visible = false;
            }
        }, this);

        //buy pizza
        pizza = this.add.image(1370, 550, 'buy').setOrigin(0);
        pizza.visible = false;
        pizza.setInteractive({
            cursor: 'pointer'
        })
        pizza.on('pointerdown', function () {
            if(money >= 10){
                money -= 10;
                pizzaFood++;
                purchased.visible = true;
                notenough.visible = false;
            }else{
                notenough.visible = true;
                purchased.visible = false;
            }
        }, this);

        //exit
        exit = this.add.image(1600, 160, 'exit').setOrigin(0);
        exit.visible = false;

        exit.setInteractive({
            cursor: 'pointer'
        })
        exit.on('pointerdown', function () {
            purchased.visible = false;
            notenough.visible = false;
            pizza.visible = false;
            sandwich.visible = false;
            pesostore.visible=false;
            koreanfood.visible = false;
            exit.visible = false;
        }, this);


        //store
        store = this.add.image(50, 200, 'store').setOrigin(0);
        store.setScale(0.8);
        store.setInteractive({
            cursor: 'pointer'
        })
        store.on('pointerdown', function () {
            pesostore.visible = true;
            sandwich.visible = true;
            koreanfood.visible = true;
            pizza.visible = true;
            exit.visible = true;
        }, this);
    }
});

var SnakeGame = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SnakeGame ()
    {
        Phaser.Scene.call(this, { key: 'snakeGame' });
        
        this.direction = Phaser.Math.Vector2.DOWN;

        this.snake = null;
        this.food = null;
        this.cursors = null;
        this.score = 0;
        this.scoreText = null;
        this.speed = 100;
        this.lastMoveTime = 0;
        
    },

    preload: function ()
    {
        this.load.image('food', 'assets/food.png');
        this.load.image('body', 'assets/body.png');
    },

    create: function ()
    {
        
        this.direction = Phaser.Math.Vector2.DOWN;
        this.food = this.add.image(0, 0, 'food');
        this.placeFood();

        this.snake = this.add.group();

        for (var i = 0; i < 3; i++)
        {
            this.snake.create(16 + i * 16, 16, 'body');
        }

        this.cursors = this.input.keyboard.createCursorKeys();

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '16px', fill: '#fff' });
    },


    update: function (time)
    {
        if (time >= this.lastMoveTime + this.speed)
        {
            this.lastMoveTime = time;
            this.moveSnake();
        }

        if (this.checkCollision())
        {
            this.gameOver();
        }

        if (this.checkFoodCollision())
        {
            this.score += 10;
            this.speed -= 5;

            this.scoreText.setText('score: ' + this.score);

            this.snake.create(this.snake.getLast(true).x, this.snake.getLast(true).y, 'body');
            this.placeFood();
        }

        this.checkInput();
    },

    moveSnake: function ()
    {
        var head = this.snake.getFirst(true);
        var body = this.snake.getChildren();

        Phaser.Actions.ShiftPosition(body, head.x + this.direction.x * 16, head.y + this.direction.y * 16, 1);

        if (this.direction.x !== 0)
        {
            head.angle = this.direction.x === 1 ? 90 : -90;
        }
        else if (this.direction.y !== 0)
        {
            head.angle = this.direction.y === 1 ? 0 : 180;
        }
    },

    checkInput: function ()
    {
        if (this.cursors.left.isDown && this.direction.x !== 1)
        {
            this.direction = Phaser.Math.Vector2.LEFT;
        }
        else if (this.cursors.right.isDown && this.direction.x !== -1)
        {
            this.direction = Phaser.Math.Vector2.RIGHT;
        }
        else if (this.cursors.up.isDown && this.direction.y !== 1)
        {
            this.direction = Phaser.Math.Vector2.UP;
        }
        else if (this.cursors.down.isDown && this.direction.y !== -1)
        {
            this.direction = Phaser.Math.Vector2.DOWN;
        }
    },

    checkCollision: function ()
    {
        var head = this.snake.getFirst(true);

        return Phaser.Actions.GetFirst(this.snake.getChildren(), { x: head.x, y: head.y }, 1) !== null || head.x < 0 || head.x >= this.sys.game.config.width || head.y < 0 || head.y >= this.sys.game.config.height;
    },

    checkFoodCollision: function ()
    {
        var head = this.snake.getFirst(true);

        return head.x === this.food.x && head.y === this.food.y;
    },

    placeFood: function ()
    {
        var x = Phaser.Math.Between(0, this.sys.game.config.width / 16 - 1) * 16;
        var y = Phaser.Math.Between(0, this.sys.game.config.height / 16 - 1) * 16;

        this.food.setPosition(x, y);
    },

    gameOver: function ()
    {

        if(this.score >= 30){
            money += 5;
            playGames();
            playGames();
            playGames();
            needSleep5();
            needEat();
            needEat();
            needEat();
            console.log("cool");
            this.scoreText.setText('score: 0');
            this.score = 0;
            this.scene.start('DesktopScene');
        }else{
            playGames();
            needSleep5();
            needEat();
            needEat();
            needEat();
            this.score = 0;
            this.speed = 100;
            this.scoreText.setText('score: 0');
            this.score = 0;
            this.scene.start('DesktopScene')
        }
    }

});
 

//Money
var money = 10;

//Day
let day = "morning";

//Character
// Declare the level variable at the global scope
var level = 0;

//Food
var pizzaFood = 1
var koreanfoodFood = 0;
var sandwichFood = 0;

//Bar
var foodPercentage = 100;
var sleepPercentage = 100;
var healthPercentage = 100;
var gamePercentage = 100;

var foodBarDecreaseRate = 1 / 2.4;
var sleepBarDecreaseRate = 1 / 7.2; 
var healthBarDecreaseRate = 1 / 3.6; 
var playBarDecreaseRate = 1 / 1.8; 

function updateBars() {
    // Decrease food bar
    foodPercentage -= foodBarDecreaseRate;
    foodPercentage = Phaser.Math.Clamp(foodPercentage, 0, 100);
    updateFoodBar(foodPercentage);

    // Decrease sleep bar
    sleepPercentage -= sleepBarDecreaseRate;
    sleepPercentage = Phaser.Math.Clamp(sleepPercentage, 0, 100);
    updateSleepBar(sleepPercentage);

    // Decrease health bar
    healthPercentage -= healthBarDecreaseRate;
    healthPercentage = Phaser.Math.Clamp(healthPercentage, 0, 100);
    updateHealthBar(healthPercentage);

    // Decrease game bar
    gamePercentage -= playBarDecreaseRate;
    gamePercentage = Phaser.Math.Clamp(gamePercentage, 0, 100);
    updateplayBar(gamePercentage);
}

function updateFoodBar(amount) {
    var width = Phaser.Math.Clamp((amount / 100) * foodBar.width, 0, foodBar.width);
    foodBar.setCrop(0, 0, width, foodBar.height);
}

function updateSleepBar(amount) {
    var width = Phaser.Math.Clamp((amount / 100) * sleepBar.width, 0, sleepBar.width);
    sleepBar.setCrop(0, 0, width, sleepBar.height);
}

function updateHealthBar(amount) {
    var width = Phaser.Math.Clamp((amount / 100) * healthBar.width, 0, healthBar.width);
    healthBar.setCrop(0, 0, width, healthBar.height);
}

function updateplayBar(amount) {
    var width = Phaser.Math.Clamp((amount / 100) * playBar.width, 0, playBar.width);
    playBar.setCrop(0, 0, width, playBar.height);
}

// Increase food bar when eating
function eatFood() {
    foodPercentage += 10;
    foodPercentage = Phaser.Math.Clamp(foodPercentage, 0, 100);
    updateFoodBar(foodPercentage);
}

// Increase sleep bar when sleeping
function sleep() {
    sleepPercentage += 1;
    sleepPercentage = Phaser.Math.Clamp(sleepPercentage, 0, 100);
    updateSleepBar(sleepPercentage);
}

// Increase health bar when exercising
function exercise() {
    healthPercentage += 15;
    healthPercentage = Phaser.Math.Clamp(healthPercentage, 0, 100);
    updateHealthBar(healthPercentage);
}

// Increase game bar when playing games
function playGames() {
    gamePercentage += 10;
    gamePercentage = Phaser.Math.Clamp(gamePercentage, 0, 100);
    updateplayBar(gamePercentage);
}

// Decrease game bar when playing games
function needGames() {
    gamePercentage -= 1;
    gamePercentage = Phaser.Math.Clamp(gamePercentage, 0, 100);
    updateplayBar(gamePercentage);
}

// decrease health bar when exercising
function needHealth() {
    healthPercentage-= 1;
    healthPercentage = Phaser.Math.Clamp(healthPercentage, 0, 100);
    updateHealthBar(healthPercentage);
}

// Increase sleep bar when sleeping
function needSleep() {
    sleepPercentage -= 1;
    sleepPercentage = Phaser.Math.Clamp(sleepPercentage, 0, 100);
    updateSleepBar(sleepPercentage);
}

function needSleep5() {
    sleepPercentage -= 1;
    sleepPercentage = Phaser.Math.Clamp(sleepPercentage, 0, 100);
    updateSleepBar(sleepPercentage);
}
// Increase food bar when eating
function needEat() {
    foodPercentage -= 1;
    foodPercentage = Phaser.Math.Clamp(foodPercentage, 0, 100);
    updateFoodBar(foodPercentage);
}


  
//Game ScreenSize

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
        MainMenuScene, welcomeScene, GameScene, SleepScene, EatScene, BathScene, DesktopScene, SnakeGame
    ]
};

var game = new Phaser.Game(config);


var startTime = Date.now();
