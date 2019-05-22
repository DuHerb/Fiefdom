var sprite;

let ratio = 720 / 216;

//create canvas objects
function createBackgrounds() {
	//Add backgrounds
	this.bg1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg1').setOrigin(0, 0).setScrollFactor(0);
	this.bg2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg2').setOrigin(0, 0).setScrollFactor(0);
	this.bg3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg3').setOrigin(0, 0).setScrollFactor(0);
	this.bg4 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg4').setOrigin(0, 0).setScrollFactor(0);
	this.bg5 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg5').setOrigin(0, 0).setScrollFactor(0);

	this.bg1.setDisplaySize(game.config.width, game.config.height);
	this.bg1.setScale(ratio);
	this.bg2.setDisplaySize(game.config.width, game.config.height);
	this.bg2.setScale(ratio);
	this.bg3.setDisplaySize(game.config.width, game.config.height);
	this.bg3.setScale(ratio);
	this.bg4.setDisplaySize(game.config.width, game.config.height);
	this.bg4.setScale(ratio);
	this.bg5.setDisplaySize(game.config.width, game.config.height);
	this.bg5.setScale(ratio);

	this.castle = this.add.tileSprite(2000, 164, 560, 556, 'castle').setOrigin(0, 0);

	this.marketBackground = this.add.tileSprite(0, 0, 821, 507, 'marketBorder').setOrigin(0, 0).setScrollFactor(0);
	this.buttonRight = this.add.image(400,400,'arrow').setOrigin(0,0).setScrollFactor(0);
	this.buttonRight.setInteractive().on('pointerdown', buy);
	this.buttonLeft = this.add.image(350,400,'arrow').setOrigin(0,0).setScrollFactor(0);
	this.buttonLeft.setInteractive().on('pointerdown', sell);

	//ground
	this.ground = this.add.tileSprite(0, game.config.height -20, game.config.width, 20,  'bg').setOrigin(0,0);
	this.ground.setScale(ratio);
	// this.ground.body.immovable = true;

	//buildings
	this.home = this.physics.add.staticImage(1925, 620, 'home').setDisplaySize(350, 250).refreshBody();

	//build menu group
	this.foodIcon = this.add.image(0,0, 'foodIcon').setDisplaySize(100,100).setVisible(false);
	this.foodIcon.Id = "BuildSelect Farm";
	this.woodIcon = this.add.image(0,0, 'woodIcon').setDisplaySize(100,100).setVisible(false);
	this.woodIcon.Id = "BuildSelect WoodCutter";
	this.stoneIcon = this.add.image(0,0, 'stoneIcon').setDisplaySize(100,100).setVisible(false);
	this.stoneIcon.Id = "BuildSelect Quarry";
	this.barracksIcon = this.add.image(0,0, 'barracksIcon').setDisplaySize(100,100).setVisible(false);
	this.barracksIcon.Id = "BuildSelect Barracks";
	this.innIcon = this.add.image(0,0, 'innIcon').setDisplaySize(100,100).setVisible(false);
	this.innIcon.Id = "BuildSelect Inn";
	this.goldIcon = this.add.image(0,0, 'goldIcon').setDisplaySize(100,100).setVisible(false);
	this.goldIcon.Id = "BuildSelect Gold";
	this.buildMenu = [this.foodIcon, this.woodIcon, this.stoneIcon, this.barracksIcon, this.innIcon, this.goldIcon];

	//confirm menu group
	this.confirmIcon = this.add.image(0,0, 'upgradeIcon').setDisplaySize(100,100).setVisible(false);
	this.confirmName = this.add.text(0, 0, 'Building Name:').setVisible(false);
	this.confirmCost = this.add.text(0,0, ' Cost').setVisible(false);
	this.confirmGroup = [this.confirmIcon, this.confirmName, this.confirmCost];

	//voteing window
	this.voteBG = this.add.image(650, 200, 'voteBG').setScrollFactor(0).setVisible(false);
	this.voteText = this.add.text(400, 120, "edict text goes here").setScrollFactor(0).setVisible(false);
	this.voteYes = this.add.image(800, 250, "thumbsUp").setDisplaySize(75,75).setScrollFactor(0).setVisible(false);
	this.voteYes.id = "Vote Fore";
	this.voteNo = this.add.image(900, 270, "thumbsDown").setDisplaySize(75,75).setScrollFactor(0).setVisible(false);
	this.voteNo.id = "Vote Nay";
	this.voteGroup = this.add.group([this.voteBG, this.voteText, this.voteYes, this.voteNo]);
	this.voteYes.setInteractive().on('pointerdown', (item) => {
		handleClick.call(this.item.id);
	})

	this.voteNo.setInteractive().on('pointerdown', (item) => {
		handleClick.call(this.item.id);
	})


	this.buildMenu.forEach((item) =>{
		item.setInteractive().on('pointerdown', (id) => {
			handleClick.call(this, item.Id)
		});
	})

	this.confirmIcon.setInteractive().on('pointerdown',(item) =>{
		handleClick.call(this, "Build")

	});

	this.gold = this.add.text(40, 60, "Fiefdom", {
		font: "40px Alagard",
		fill: "#000000",
		align: "center"
	}).setScrollFactor(0);
	this.food = this.add.text(40, 95, "Fiefdom", {
		font: "40px Alagard",
		fill: "#000000",
		align: "center"
	}).setScrollFactor(0);
	this.wood = this.add.text(40, 130, "Fiefdom", {
		font: "40px Alagard",
		fill: "#000000",
		align: "center"
	}).setScrollFactor(0);
	this.stone = this.add.text(40, 165, "Fiefdom", {
		font: "40px Alagard",
		fill: "#000000",
		align: "center"
	}).setScrollFactor(0);
	this.ballots = this.add.text(40, 190, "Fiefdom", {
		font: "40px Alagard",
		fill: "#000000",
		align: "center"
	}).setScrollFactor(0);
	this.edicts = this.add.text(40, 310, "Fiefdom", {
		font: "40px Alagard",
		fill: "#000000",
		align: "center"
	}).setScrollFactor(0);

	this.date = this.add.text(40, 20, "Fiefdom", { font: "40px Alagard", fill: "#000000", align: "center" }).setScrollFactor(0);


	this.marketMenu = this.add.group([this.marketBackground, this.gold, this.buttonLeft, this.buttonRight]);
};



function handleClick(id)
{
	var type = id.split(' ');

	if (type[0] == "BuildSelect")
	{
		setVisible(this.confirmGroup, true);
		this.buildItem = type[1];
		this.confirmName.setText(type[1]);
		this.confirmCost.setText(100);
	}

	if (type[0] == "Build")
	{
		console.log(this.selectedPlot, this.buildItem);
		BuildPlot(this.selectedPlot, this.buildItem);
		setVisible(this.confirmGroup, false);
		setVisible(this.buildMenu, false);
		this.hammer.play();
	}

	if(type[0] == "Vote")
	{
		//submitVote(string, type[1])
		this.order.play();
	}


	// BuildPlot(this.selectedPlot, id);
	// setVisible(this.confirmGroup, false);

	// displayConfirmMenu(this.selectedPlot, item.id);
	// // BuildPlot(this.selectedPlot, item.Id)
	// console.log("Done");
	// // setVisible(this.buildMenu, false);
	// UpdateFiefdom();
}

function build(id){
	console.log(id);
}

function toggleVote(){
	this.voteGroup.toggleVisible();
	this.rabble.play();
	// setVisible(this.voteGroup, true);
}

function createPlayer() {

	//Add Character
	this.player = this.physics.add.sprite(1925, game.config.height, 'character');
	this.player.setBounce(0.2);
	this.player.setCollideWorldBounds(true);
	this.player.setScale(3);
	//this.player.body.setSize(14, 7, 31, 35);
	this.player.body.setSize(25, 32, false);
	this.player.body.setOffset(14, 4);
}

function createPlayerAnimation() {
	this.anims.create({
		key: 'walk',
		frames: this.anims.generateFrameNumbers('character', { start: 8, end: 13 }),
		frameRate: 6,
		repeat: -1
	});

	this.anims.create({
		key: 'idle',
		frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
		frameRate: 2,
		repeat: -1
	});

	this.anims.create({
		key: 'jump',
		frames: this.anims.generateFrameNumbers('character', { start: 16, end: 23 }),
		frameRate: 8,
		repeat: 0
	});
};

function buildPlots(){
	var plotGroup = this.physics.add.staticGroup();
	this.plotGroup = plotGroup;
	this.plotGroup.sfx = {}
	var x = 0;
	var y = 690;
	var imgKey = "log";
	this.plots = [];

	for (var i = 0; i < fief.plots.length; i++) {
		x += 350;
		if(x == 1750){
			x = 2450;
		}
		this.plots[i] = plotGroup.create(x, y, imgKey);
		this.plots[i].Id = i;
	}
}

function buy(){
	console.log("buy");
}

function sell(){
	console.log("sell");
}


// update functions
function updateBackground() {
	this.bg1.tilePositionX = this.cameras.main.scrollX * .2 / ratio;
	this.bg2.tilePositionX = this.cameras.main.scrollX * .4 / ratio;
	this.bg3.tilePositionX = this.cameras.main.scrollX * .6 / ratio;
	this.bg4.tilePositionX = this.cameras.main.scrollX * .8 / ratio;
	this.bg5.tilePositionX = this.cameras.main.scrollX * 1 / ratio;
}

function updatePlayerUi() {
	var cursors = this.cursors;
	var player = this.player;

	let onGround = (player.body.touching.down || player.body.blocked.down);
	let moving = false;
	if (cursors.up.isDown && onGround) {
		player.setVelocityY(-330);
		this.grunt.play();
		//BuildPlot(6,'Farm')
		//UpdateFiefdom();
		//console.log(fief.plots);
		//console.log(fief.resources);
		//console.log("Title is " + fief.title);
	}

	if (cursors.left.isDown) {
		player.setVelocityX(-400); // move left
		moving = true;
		player.flipX = true;
	}

	else if (cursors.right.isDown) {
		player.setVelocityX(400);
		moving = true;
		player.flipX = false;
	}

	else {
		player.setVelocityX(0);
	}

	if (!onGround) {
		player.anims.play('jump', true);
	} else if (moving) {
		player.anims.play('walk', true);
	} else {
		player.anims.play('idle', true);
	}
}

function updateUi() {
	this.gold.setText("Gold " + fief.resources.Gold);
	this.food.setText("Food " + fief.resources.Food);
	this.wood.setText("Wood " + fief.resources.Wood);
	this.stone.setText("Stone " + fief.resources.Stone);
	this.date.setText("Day " + fief.gameState.day + "  Season " + fief.gameState.season + "  Year " + fief.gameState.year);
	//parse Text
	this.ballots.setText(fief.ballots[0] + fief.ballots[1] + fief.ballots[2]);
	if (fief.edicts.length === 3)
	{
		this.edicts.setText(fief.edicts[0].type + fief.edicts[1].type + fief.edicts[2].type);
	}
}



//keydown objects/events
function initKeys(){
	this.downKey = this.input.keyboard.addKey('DOWN');
	this.mKey = this.input.keyboard.addKey("M");
	this.vKey = this.input.keyboard.addKey("V");
}

function downIsDown(){
	if(Phaser.Input.Keyboard.JustDown(this.downKey)){
		return true;
	}
	return false;
}

function plotMenuDisplay(player, plot){
	this.foodIcon.x = plot.x - 120;
	this.foodIcon.y = plot.y - 150;

	this.woodIcon.x = plot.x;
	this.woodIcon.y = plot.y - 150;

	this.stoneIcon.x = plot.x + 120;
	this.stoneIcon.y = plot.y - 150;

	this.barracksIcon.x = plot.x - 120;
	this.barracksIcon.y = plot.y - 270;

	this.innIcon.x = plot.x;
	this.innIcon.y = plot.y - 270;

	this.goldIcon.x = plot.x + 120;
	this.goldIcon.y = plot.y - 270;

	buildConfirmMenu(plot, this.confirmGroup);

	this.selectedPlot = plot.Id;

	console.log(fief.plots[plot.Id]);
	if(fief.plots[plot.Id] != "Locked"){
		setVisible(this.buildMenu, true);
	}
}

function buildConfirmMenu(plot, confirmGroup){

	confirmGroup[1].x = plot.x -120;
	confirmGroup[1].y = plot.y -400;

	confirmGroup[2].x = plot.x;
	confirmGroup[2].y= plot.y -400;

	confirmGroup[0].x= plot.x + 180;
	confirmGroup[0].y= plot.y -400;
}

function toggleMarket(){
	// this.marketBackground.setVisible(false);
	this.marketMenu.toggleVisible();
}


function setVisible(array, value)
{
	array.forEach( function (item) {
		item.setVisible(value);
	});
}

function updatePlots(){
	// console.log(this.plots);
	for(i=0; i<fief.plots.length; i++)
	{
		switch(fief.plots[i]){
			case "Empty": this.plots[i].setTexture('log').refreshBody();
			break;
			case "Farm": this.plots[i].setTexture('mill').refreshBody();
			break;
			case "Locked": this.plots[i].setTexture('log').refreshBody();
			break;
			// case "Home": this.plots[i].setTexture('home').setDisplaySize(350,250).refreshBody();
			// 	break;
		}
	}
}

function homeOverTest(player, body){
	// console.log("overlap house");
}

class Fiefdom extends Phaser.Scene {

	preload() {
		//icons
		this.load.image('woodIcon', 'assets/icons/woodIcon.png');
		this.load.image('stoneIcon', 'assets/icons/stoneIcon.png');
		this.load.image('foodIcon', 'assets/icons/foodIcon.png');
		this.load.image('coinIcon', 'assets/icons/coinIcon.png');
		this.load.image('anvilIcon', 'assets/icons/anvilIcon.png');
		this.load.image('goldIcon', 'assets/icons/goldIcon.png');
		this.load.image('influenceIcon', 'assets/icons/influenceIcon.png');
		this.load.image('innIcon', 'assets/icons/innIcon.png');
		this.load.image('ironIcon', 'assets/icons/ironIcon.png');
		this.load.image('lockIcon', 'assets/icons/lockIcon.png');
		this.load.image('marketIcon', 'assets/icons/marketIcon.png');
		this.load.image('titleIcon', 'assets/icons/titleIcon.png');
		this.load.image('upgradeIcon', 'assets/icons/upgradeIcon.png');
		this.load.image('voteIcon', 'assets/icons/voteIcon.png');
		this.load.image('barracksIcon', 'assets/icons/barracksIcon.png');
		this.load.image('thumbsUp', 'assets/thumbsup.png');
		this.load.image('thumbsDown', 'assets/thumbsdown.png');


		//menu backgrounds
		// this.load.image('buildMenuBG', 'assets/blank.png');
		this.load.image('marketBorder', 'assets/marketWindow.png');
		this.load.image('voteBG', 'assets/scroll2.png');

		//Background Images

		this.load.image('arrow', 'assets/tempArrow.png');
		this.load.image('mill', 'assets/mill.png');
		this.load.image('log', 'assets/logPile.png');
		this.load.image('bg', 'assets/BG.png');
		this.load.image('bg1', 'assets/plx-1.png');
		this.load.image('bg2', 'assets/plx-2.png');
		this.load.image('bg3', 'assets/plx-3.png');
		this.load.image('bg4', 'assets/plx-4.png');
		this.load.image('bg5', 'assets/plx-5.png');
		this.load.image('castle', 'assets/castle.png');
		this.load.image('home', 'assets/house.png');

		//Sprite Sheets


		this.load.spritesheet('character', 'assets/adventurer-Sheet.png', { frameWidth: 50, frameHeight: 37 });


		// Music
		this.load.audio('synth', 'assets/audio/synth.mp3');
		//
		// // Sounds
		this.load.audio('anvil', 'assets/audio/anvil.mp3');
		this.load.audio('boo', 'assets/audio/boo.mp3');
		this.load.audio('hammer', 'assets/audio/build.mp3');
		this.load.audio('chaching', 'assets/audio/chaching.mp3');
		this.load.audio('cheers', 'assets/audio/cheers.mp3');
		this.load.audio('coins', 'assets/audio/coins.mp3');
		this.load.audio('frog', 'assets/audio/frog.mp3');
		this.load.audio('frog2', 'assets/audio/frog2.mp3');
		this.load.audio('grunt', 'assets/audio/grunt.mp3');
		this.load.audio('step', 'assets/audio/step.mp3');
		this.load.audio('synth', 'assets/audio/synth.mp3');
		this.load.audio('rabble', 'assets/audio/rabble.mp3');
		this.load.audio('order', 'assets/audio/order.mp3');
		this.load.audio('toot', 'assets/audio/toot.mp3');
	};


	//Create
	create() {


		createBackgrounds.call(this);
		buildPlots.call(this);
		initKeys.call(this);

		//keypresses
		// this.mKey.addListener(, toggleMarket);


		// var platforms = this.physics.add.staticGroup();
		// platforms.create(16 * 2, game.config.height - 16 * 2, 'bg').setScale(4).refreshBody();
		// groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
		//this.bg.setScrollFactor(0);


		createPlayer.call(this);
		createPlayerAnimation.call(this);


		// this.physics.add.collider(this.player, platforms);
		// this.physics.add.collider(this.player, this.ground);
		this.physics.add.overlap(this.player, this.plotGroup, plotMenuDisplay, downIsDown, this);
		this.physics.add.overlap(this.player, this.home, homeOverTest);



		this.physics.world.bounds.width = 6000;
		this.physics.world.bounds.height = 710;
		this.cameras.main.setBounds(0, 0, 6000, 720);
		this.cameras.main.startFollow(this.player);

		this.cursors = this.input.keyboard.createCursorKeys();


		this.music = this.sound.add('synth');
		this.anvil = this.sound.add('anvil');
		this.boo = this.sound.add('boo');
		this.hammer = this.sound.add('hammer');
		this.chaching = this.sound.add('chaching');
		this.coins = this.sound.add('coins');
		this.frog = this.sound.add('frog');
		this.frog2 = this.sound.add('frog2');
		this.grunt = this.sound.add('grunt');
		this.step = this.sound.add('step');
		this.rabble = this.sound.add('rabble');
		this.order = this.sound.add('order');
		this.toot = this.sound.add('toot');

		this.music.loop = true;
		this.music.play();



		var FKey = this.input.keyboard.addKey('F');

		FKey.on('down', function () {

			if (this.scale.isFullscreen) {
				//button.setFrame(0);
				this.scale.stopFullscreen();
			}
			else {
				//button.setFrame(1);
				this.scale.startFullscreen();
			}
		}, this);

	};


	update(time, theta) {
		updateBackground.call(this);
		updatePlayerUi.call(this);
		updateUi.call(this);
		if(Phaser.Input.Keyboard.JustDown(this.mKey)){
			toggleMarket.call(this);
		}
		if(Phaser.Input.Keyboard.JustDown(this.vKey)){
			toggleVote.call(this);
		}

		if (this.player.x > this.woodIcon.x + 150 || this.player.x < this.woodIcon.x - 150)
		{
			setVisible(this.buildMenu, false);
		}
		updatePlots.call(this);
	};

};

var config = {
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		parent: 'fiefdom-body',
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 1280,
		height: 720
	},
	pixelArt: true,
	antialias: false,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 500 },
			debug: true
		}
	}
};

var game = new Phaser.Game(config);
var newScene = game.scene.add('scene', Fiefdom, false);
