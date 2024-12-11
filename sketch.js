var player;
var playerImg;

var playerW = 50;
var playerH = 50;

var playerSound;

var walls;
var badWords;

var gameIsOver;
var gameWon;

var winText = ["LET'S GOOOOOOOOOOOOOO", "YOU ARE AMAZING!", "YOU CAN!", "YOU ARE GOOD!"];
var loseText = ["FAILURE","SUCKER", "LOSER", "YOU CAN'T","NO"];
var ranTextVal;

function initGame(){

	var ranTotal = Math.min(winText.length, loseText.length);
	ranTextVal = Math.floor(random(0,ranTotal));
	gameIsOver = false;
	gameWon = false;

	player = new Sprite(400,600,50,50);
	playerImg = loadImage("assets/SMILE2.png");
	player.addImage(playerImg);

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
				var badWord = new Sprite(height/6 + (height/6 * j),height/8 + (height/6 * i), 60, 20);
				badWord.textSize = 10;
				badWord.color = 'red';
				var badWordFill = Math.floor(random(0,3));
				console.log(badWordFill);
				badWord.text = loseText[badWordFill];
				badWords.add(badWord);
				continue;
			}
			var wall = new Sprite(height/6 + (height/6 * j),height/8 + (height/6 * i), 100, 19);
			var edges1 = new Sprite(-5,200,10,800);
			var edges2 = new Sprite(805,200,10,800);
			wall.shapeColor = color(255,255,255);
			walls.add(wall);
			walls.add(edges1);
			walls.add(edges2);
			walls.color='black';
		}
	}
	var goodword = createSprite(400,25,800,50);
	goodwordImg = loadImage("assets/youcan.png");
	goodword.addImage(goodwordImg);
	goodWords.add(goodword);
	goodword.collider = 'static';
	
}
	

var theVoice;
var triggerVoice = false;

function setup(){
	createCanvas(800,600);
	background(255);
	initGame();
	
}

function draw(){
	background(200);
	fill(255,255,0);
	
  if (gameIsOver){
		fill(0,0,0);
		textAlign(CENTER);
		
		textSize(48);

		if (gameWon){
			fill(0,255,0);
			text(winText[ranTextVal], width/2, height/2+40);
			fill(0,0,0);
		}
		else{
			fill(255,0,0);
			text(loseText[ranTextVal], width/2, height/2+40);
			fill(0,0,0);
		}
		textSize(16);
		text("(Click to play again)", width/2, height/2 + 60);
  }
  else{
		checkKeyPress();
		checkEdges();
		player.moveTowards(mouseX, mouseY, 0.08);
		player.collide(walls);
		if (player.collide(badWords)){
		 	gameIsOver = true;
			triggerVoice = true;
			console.log("Game Is Over!");
		 }
		if (player.collide(goodWords)){
			gameIsOver = true;
			gameWon = true;
			triggerVoice = true;
		}
		fill(255,0,0);
		textAlign(CENTER);
		textSize(32);
  }
  
}

function checkKeyPress(){
	
	player.collide(walls);
	 if (player.collide(badWords)){
		  	gameIsOver = true;
		 	triggerVoice = true;
		 	console.log("Game Is Over!");
  }
  walls.collider = 'static';
  
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
		walls.remove();
		badWords.remove();
		player.remove();
		initGame();
	}
}