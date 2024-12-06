var player;
var playerImg;

var playerW = 60;
var playerH = 60;

var playerSound;

var walls;
var badWords;

var timer;
var timeLimit = 1800;

var gameIsOver;
var gameWon;

var winText = ["LET'S GO!!!", "YOU ARE AMAZING!", "YOU CAN!", "YOU ARE GOOD!"];
var loseText = ["FAILURE","SUCKER", "LOSER", "YOU CAN'T","NO"];
var ranTextVal;

function initGame(){

	var ranTotal = Math.min(winText.length, loseText.length);
	ranTextVal = Math.floor(random(0,ranTotal));
	timer = 0;
	gameIsOver = false;
	gameWon = false;

	player = Sprite(400,600,60,60);
	playerImg = loadImage("assets/SMILE2.png");
	player.addImage(playerImg);


	// walls = new Group();
	// for (var i = 0; i < 7; i++){
	// 	var skipX = Math.floor(random(0,7));
	// 	//console.log(skipY);
	// 	for (var j = 0; j < 7; j++){
	// 		if (j === skipX){
	// 			continue;
	// 		}
	// 		var wall = createSprite(height/6 + (height/6 * j),height/8 + (height/6 * i), 130, 30);
	// 		wall.shapeColor = color(255,0,0);
	// 		walls.add(wall);
	// 	}
	// }
	walls = new Group();
	badWords = new Group();//hold badwords
	goodWords = new Group();
	for (var i = 0; i < 6; i++){
		var skipX = Math.floor(random(0,7));
		var badWordPos = Math.floor(random(0,7));
		while (badWordPos == skipX){
			badWordPos = Math.floor(random(0,7));
		} 
		for (var j = 0; j < 7; j++){
			if (j === skipX){
				continue;
			}
			if (j === badWordPos){//create badword
				var badWord = new Sprite(height/6 + (height/6 * j),height/8 + (height/6 * i), 80, 20);
				badWord.shapeColor = color(255,0,0);
				badwordsImg = loadImage("assets/failure.png");
				badWord.addImage(badwordsImg);
				
				badWords.add(badWord);
				continue;
			}
			var wall = createSprite(height/6 + (height/6 * j),height/8 + (height/6 * i), 130, 19);
			wall.shapeColor = color(255,255,255);
			walls.add(wall);
		}
	}
	var goodword = createSprite(0,0,800,50);
	goodwordImg = loadImage("assets/youcan.png");
	goodword.addImage(goodwordImg);
	goodWords.add(goodword);
}
	
	

function preload(){
	// playerSound = loadSound('assets/rocket_sound.mp3');
	playerSound = loadSound('assets/walk.wav');
	// playerSound.playMode = 'restart';
}

var theVoice;
var triggerVoice = false;

function setup(){
	createCanvas(800,600);
	background(255);
	initGame();
	playerSound.setVolume(0.05);
	theVoice = new p5.Speech(27); // new P5.Speech object
}

function draw(){
	background(200);
	fill(255,255,0);
	ellipse(mouseX,mouseY,50,50);
	drawSprites();
	
  if (gameIsOver){
		fill(255,0,0);
		textAlign(CENTER);
		
		textSize(48);

		if (gameWon){
			if (triggerVoice){
				theVoice.speak(winText[ranTextVal]);
				triggerVoice = false;
				
			}
			text(winText[ranTextVal], width/2, height/2);
			fill(0,255,0);
		}
		else{
			if (triggerVoice){
				theVoice.speak(loseText[ranTextVal]);
				triggerVoice = false;	
				
			}
			text(loseText[ranTextVal], width/2, height/2);
			fill(255,0,0);
		}
		textSize(16);
		text("(Click to play again)", width/2, height/2 + 50);
  }
  else{
		checkKeyPress();
		checkEdges();
		console.log('moving towards');
		player.moveTowards(mouseX, mouseY, 8);
		// player.collide(walls);
		// if (player.collide(badWords)){
		//  	gameIsOver = true;
		// 	triggerVoice = true;
		// 	console.log("Game Is Over!");
		//  }
		
		
		timer++;
		var curTime = timeLimit/60 - Math.floor(timer/60);
		fill(255);
		textAlign(CENTER);
		textSize(32);
		text("Time Remain:"+curTime, 130, 30);
		if (timer > timeLimit){
			gameIsOver = true;
			triggerVoice = true;
			console.log("Game Is Over!");
		}
  }
  
}

var playTheSound = false;

function checkKeyPress(){
	if (keyDown('a')){
		player.position.x -= 5;
		if (!playerSound.isPlaying()){
			playerSound.play();
		}
	}
	if (keyDown('d')){
		player.position.x += 5;
		if (!playerSound.isPlaying()){
			playerSound.play();
		}
	}
	if (keyDown('w')){
		player.position.y -= 5;
		if (!playerSound.isPlaying()){
			playerSound.play();
		}
	}
	if (keyDown('s')){
		player.position.y += 5;
		if (!playerSound.isPlaying()){
			playerSound.play();
		}
	}
	player.collide(walls);
	 if (player.collide(badWords)){
		  	gameIsOver = true;
		 	triggerVoice = true;
		 	console.log("Game Is Over!");
  }
}

function checkEdges(){
	if (player.position.x < playerW/2){
		player.position.x = playerW/2;
	}
	if (player.position.y < playerH/2){
		player.position.y = playerH/2;
	}
	if (player.position.y > height - playerH/2){
		player.position.y = height - playerH/2;
	}
	if (player.position.y < 50){
		gameIsOver = true;
		gameWon = true;
		triggerVoice = true;
	}
}

function mousePressed(){
	if (gameIsOver){
		walls.removeSprites();
		badWords.removeSprites();
		player.remove();
		initGame();
	}
}