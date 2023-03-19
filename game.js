var config = {
    type: Phaser.CANVAS,
    backgroundColor: 'black',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'container',
        width: 1920,
        height: innerHeight
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var sleepBar;
var foodBar;
var gameBar;
var bathBar;

function preload ()
{
    this.load.image('bg', 'assets/image/background/background.png');
    this.load.image('titleMain','assets/image/main/title.png');
    this.load.image('playButton','assets/image/main/playbutton.png');
    this.load.image('sleepBar', 'assets/image/topbar/insidebar.png');
    this.load.image('foodBar', 'assets/image/topbar/insidebar.png');
    this.load.image('gameBar', 'assets/image/topbar/insidebar.png');
    this.load.image('bathBar', 'assets/image/topbar/insidebar.png');
    this.load.image('outsideBar', 'assets/image/topbar/outsidebar.png');
    this.load.image('sleepIcon', 'assets/image/topbar/icon/sleep.png');
    this.load.image('eatIcon', 'assets/image/topbar/icon/eat.png');
    this.load.image('gameIcon', 'assets/image/topbar/icon/gaming.png');
    
}

function create ()
{
    this.add.image(0, 0, 'bg').setOrigin(0);
    this.add.image(960, 150, 'titleMain').setOrigin(0.5);
    this.add.image(960, 800, 'playButton').setOrigin(0.5);

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
}

function update () {
    updateSleepBar(50);
    updateFoodBar(100);
    updateGameBar(100);
    updateBathBar(100);
}

function updateSleepBar(amount) {
    // Set the width of the sleep bar based on the amount of sleep remaining
    var width = Phaser.Math.Clamp((amount / 100) * sleepBar.width, 0, sleepBar.width);
    sleepBar.setCrop(0, 0, width, sleepBar.height);
}

function updateFoodBar(amount) {
    // Set the width of the sleep bar based on the amount of sleep remaining
    var width = Phaser.Math.Clamp((amount / 100) * foodBar.width, 0, foodBar.width);
    foodBar.setCrop(0, 0, width, foodBar.height);
}

function updateGameBar(amount) {
    // Set the width of the sleep bar based on the amount of sleep remaining
    var width = Phaser.Math.Clamp((amount / 100) * gameBar.width, 0, gameBar.width);
    gameBar.setCrop(0, 0, width, gameBar.height);
}

function updateBathBar(amount) {
    // Set the width of the sleep bar based on the amount of sleep remaining
    var width = Phaser.Math.Clamp((amount / 100) * bathBar.width, 0, bathBar.width);
    bathBar.setCrop(0, 0, width, bathBar.height);
}

var game = new Phaser.Game(config);