let gameSeq=[];
let userSeq=[];
let highScore=0;

let started=false;
let level=0;
  
let btns=["pink","green","orange","blue"];
let h2=document.querySelector('h2');
let body=document.querySelector('body');
let high_score=document.querySelector('.high-score');
let spacebar=document.querySelector('.spacebar');

 
spacebar.addEventListener('click',function(){
   if(started==false){
      console.log("game is started!");
      level=0;
      gameSeq=[];
      levelUp();

   }
});
 

function gameFlash(btn){
   btn.classList.add("flash");
   setTimeout( function() {
   btn.classList.remove("flash");
   }, 500);
}
function userFlash(btn){
   btn.classList.add('userflash');
   setTimeout(() => {
      btn.classList.remove('userflash');
   }, (250));
} 

function levelUp(){
   level++;
   console.log(`level-${level}`);
   userSeq=[];
   h2.innerText=`Level-${level}`;
   let randIdx=Math.floor(Math.random()*4);//0 to 3 indexes
   let randColor=btns[randIdx];
   let randBtn=document.querySelector(`.${randColor}`);
   console.log(`button ${randIdx+1}`);
   gameSeq.push(randColor);
   console.log(`gameSequence-${gameSeq}`);
   gameFlash(randBtn);
}

function checkAns(idx){
   if(gameSeq[idx]==userSeq[idx]){
      if(gameSeq.length==userSeq.length){
      console.log("matched continue-");
      levelUp();
      }
   } else{
      h2.innerText=`Game over! Press space bar to start the game.${'\n'}
      Your score-${level-1}`;
      if((level-1)>=highScore){
         highScore=level-1;
         high_score.innerText=` HighestScore-${highScore}`;
      }
      body.classList.add('game-over','audio');
      setTimeout(() => {
         body.classList.remove('game-over','audio');
        document.querySelector('.audio').play();
      }, 100);
   }
}
function btnpress(){
   // console.log("button was pressed!");  
   let btn=this;
   let userColor=this.getAttribute('id');
   userSeq.push(userColor);
   console.log(`UserSequence-${userSeq}`);
   userFlash(btn);
   checkAns(userSeq.length-1);
}
let allBtns=document.querySelectorAll('.btn');
for(button of allBtns){
   button.addEventListener('click',btnpress);
}