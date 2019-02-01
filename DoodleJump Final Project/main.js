let character = new Image();
let platformImg = new Image();
character.src = 'doodle.png';
platformImg.src = 'platform.png';
let moveImg = new Image(); 
moveImg.src = 'moving.png'; 
let dispearImg = new Image(); 
dispearImg.src = 'disappearing.png';
let ctx;
let x = 400;
let y = 700;
let platforms = [];
let xVel = 0;
let yVel = -15;
let grav = 1;
let jumping;
let score = 0;
let chrH = 100;
let chrW = 75;
let highest = 0;
let n; 
let pVel = 5; 

let hitbox = {
  xbase: 350,
  ybase: 750,
  width: 100,
  height: 20
};

let canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');

function setup() {
  startJump();
  randomizer();
  

}

function draw() {
  ctx.clearRect(0,0,800,800);
  for (let i = 0; i < platforms.length; i++) {
    ctx.drawImage(platformImg, platforms[i].xbase, platforms[i].ybase, platforms[i].width, platforms[i].height);
    if(platforms[i].move){
      ctx.drawImage(moveImg, platforms[i].xbase, platforms[i].ybase, platforms[i].width, platforms[i].height);
    }
    if(platforms[i].dispear){
      ctx.drawImage(dispearImg, platforms[i].xbase, platforms[i].ybase, platforms[i].width, platforms[i].height);
    }
  }
  ctx.drawImage(character, x, y);
  ctx.font= "40px Arial";
  ctx.fillText('Score: ' + score, 25, 35);
}

function startJump() {
  jumping = setInterval(
    function(){
      y += yVel;
      yVel += grav;
      n = Math.random(); 
      scrollScreen();
      movePlatform(); 
      hitDetection();
      draw();
      walkThrough();
      gameOver();
    }, 30)
}
function checkN(){
  if(n <0.2){
    return true; 
  }
    return false; 
}
function checkD(){
  if(n > 0.9){
    return true; 
  }
    return false; 
}
function randomizer() {
  platforms.push(hitbox);
  for (let i = 1; i < 11; i++) {
    platforms.push(
      {
        xbase: Math.random()*700,
        ybase: Math.random()*700,
        width: 100,
        height: 20,
        move:checkN(),
        dispear:false,
       
      }
    );
    highest = platforms[i-1].ybase; 
    if(platforms[i].ybase < highest){
      highest = platforms[i].ybase; 
  }
  
  }
}



function hitDetection(){ 
  for (let i = 0; i < platforms.length; i++) {
    if ((yVel > 0) && (y + chrH - 10 >= platforms[i].ybase && y <= platforms[i].ybase + platforms[i].height && x + chrW - 15 > platforms[i].xbase && x <= platforms[i].xbase + 90)) {
      yVel = -28;
      if (platforms[i].dispear == true){
        platforms[i].ybase = 850; 
      }
    }
  }
}

function walkThrough() {
  if (x > 800) {
    x = 0;
  } else if (x < 0) {
    x = 800;
  }
}

function scrollScreen() { 
  if (y <= 350) {
    y = 350;
      platforms.push(
        {
          xbase: Math.random()*700,
          ybase: highest - 40 - 100 * Math.random(),
          width: 100,
          height: 20,
          move:checkN(),
          dispear:checkD()
        }
      );
      
      for(let i =0; i<platforms.length; i++){
        highest = platforms[0].ybase; 
        if(platforms[i].ybase < highest){
        highest = platforms[i].ybase; 
       }
      if (yVel < 0) {
        platforms[i].ybase -= yVel;
        
      }
      if(platforms[i].ybase >= 800){
      platforms.splice(i,1);
      } 
    }
    score ++;
  }
}


function keydowned(event){
  if(event.key == "ArrowLeft"){
    x -= 20;
    x += xVel;
		xVel -= 0.5;
	}else if(event.key == "ArrowRight"){
    x += 20;
    x += xVel;
    xVel += 0.5;
  }
  if (xVel > 8) {
    xVel = 8;
  }
  if (xVel < -8) {
    xVel = -8;
  }
  
}
function keyupped(event){
  if (event.key == "ArrowLeft" || event.key =="ArrowRight"){
    xVel = 0;
  }
}
function movePlatform(){
 
  for(let i =0;i<platforms.length;i++){
    if(platforms[i].move){
      platforms[i].xbase += pVel;
    }
    if(platforms[i].xbase >= 800){
      platforms[i].xbase = 0; 
    }
  }
}

function gameOver(){
  if (y >= 800){
    ctx.clearRect(0,0, 800,800);
    ctx.fillText('Your Score is '+score+ ' .', 200, 350);
    }
  }

 