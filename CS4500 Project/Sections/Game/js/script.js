//GLOBAL VARS
/////////////////////////////////////

//throwable ball
ball = document.getElementById("ball");

//Yaw slider ball (constantly sliding)
sliderBall = document.getElementById("myRange");
  
//yaw slider ball (For positioning purposes)
showBall = document.getElementById("showingRange");

//yaw slider ball (For positioning purposes)
pitchSlider = document.getElementById("pitchSlider");
  
//just check here to get summary check
checkNum =0;
checkNumPitch =0;

//flipbit to control ball launching
stepping = 1;
startedBit = -1;

//Target height to look for
TargetHeight =0;

//Has Arced Flip-Bit
hasArced = -1;

//previous motion tracker for acceleration function
previousDartPosTop = 0;

//FUNCTIONS
//////////////////////////////////////////////////

//Starting the function on page load
TriggerSliders();
////////////////////////////////////

//function to determine acceleration
function acceleration(){
  var dartPos = $("#ball").position();
  //check if the ball is moving up or down
  if(dartPos.top < previousDartPosTop){
    previousDartPosTop = dartPos.top;
    return -1;
  }
  else {
    previousDartPosTop = dartPos.top;
    return 1;
  }
}

//pretty self-explanatory
function throwBall(){  
  //added class
  ball.classList.add("ball");
  
  //remove class
  setTimeout(function(){
          ball.classList.remove("ball"); 
          }, 2000);
}

//Function to trigger the slider's beginnings
function TriggerSliders(){
  //update the button text & appearance
  document.getElementById("launchButton").innerHTML = "Lock In";
  document.getElementById("launchButton").style.display = "block";
  //bit to flip here too
  if(startedBit == -1){
    javascript:slideYaw(42, 1);
    javascript:slidePitch(2, 1);
    startedBit = startedBit *-1;
  }
  else{
    //show the active slider
    sliderBall.style.display="block";

    //hide the static slider
    showBall.style.display="none";
    
    //hide the pitch slider
    pitchSlider.style.display="none";
  }
}

//control the Yaw slider
function slideYaw(numvar, dir){
  //update the check variable
  checkNum = numvar;
  if (dir == 1){
    sliderBall.value = numvar;
    if(numvar == 59){
      dir = 2;}
      setTimeout(function(){
            slideYaw(numvar+1, dir);
            }, 30);
  }
  else{
        sliderBall.value = numvar;
    if(numvar == 41){
      dir = 1;}
      setTimeout(function(){
            slideYaw(numvar-1, dir);
            }, 30);
  }
}

//control the Pitch Slider
function slidePitch(numvar, dir){
  //update the check variable
  checkNumPitch = numvar;
  if (dir == 1){
    pitchSlider.value = numvar;
    if(numvar == 99){
      dir = 2;}
      setTimeout(function(){
            slidePitch(numvar+1, dir);
            }, 5);
  }
  else{
        pitchSlider.value = numvar;
    if(numvar == 2){
      dir = 1;}
      setTimeout(function(){
            slidePitch(numvar-1, dir);
            }, 5);
  }
}

//Stopping the sliding
function stopchoiceSliding(){
  //update flip-bit
  stepping = stepping * -1;
  
  if(stepping == -1){
    //update the ball's position in the yaw
    showBall.value=checkNum;

    //hide the active slider
    sliderBall.style.display="none";

    //show the static slider
    showBall.style.display="block";
    
    //show the pitch slider
    pitchSlider.style.display="block";
    
    //update the button text
    document.getElementById("launchButton").innerHTML = "Throw!";
  }
  else {
    //update the ball's position in the pitch
    checkNumPitch =pitchSlider.value;

    //hide the active slider
    pitchSlider.style.display="none";
    
    //FIXME: TEMPORARY
    ball.style.left=showBall.value+"vw";
    //alert(showBall.value+","+checkNumPitch);
    
    //hide the static slider
    showBall.style.display="none";
    
    //Set the TargetHeight
    TargetHeight = board.style.height.slice(0,-2)/100*checkNumPitch+(200-(board.style.height.slice(0,-2)/2));
    
    //hide the button
    document.getElementById("launchButton").style.display = "none";
    
    //throw the ball
    setTimeout(function(){
      throwBall();
    }, 500);
    
    //reset 
    setTimeout(function(){
      TriggerSliders();
    }, 11000);
  }
} 

$(document).ready(function () {
   
   //hidden dart obj
   marker = $('.non-throwable-dart')[0];
   
   //dartboard obj
   board = document.getElementById("board");
   oldCarryNumber = 0;
   
   //dotted line diameter object 
   line = $('.dotted')[0];
   
   //get the calculation block
   leftCalc = $('.leftCalculationText')[0];
   
   //board vars
   board.style.height =400+"px"
   board.style.width =400+"px"
   boardH = board.style.height.slice(0,-2);
   boardW = board.style.width.slice(0,-2);
   boardR = boardW/2;
   
   //Resizing the Board After throw
  function resize(size) {
    board.style.width = size+"px";
    board.style.height = size+"px";
  }
   
   //check dart's position
   //FIXME: CHANGES IN DART BOARD TARGET SIZE WILL DISRUPT THE CHECK
   setInterval(function() {
     
    //static vars
    var dartPos = $("#ball").position();
    var dartPosTrueHeight = document.documentElement.clientHeight+dartPos.top;
    var dispWidth = (window.innerWidth || document.documentElement.clientWidth);
    var dispHeight = (window.innerHeight || document.documentElement.clientHeight);
     
     //update board vars
     boardH = board.style.height.slice(0,-2);
     boardW = board.style.width.slice(0,-2);
     boardR = boardW/2;
     var trueCheckNum = (boardH / 100)*checkNumPitch;
    if (ball.style.display != "none" /*&& document.documentElement.clientHeight-(-1*dartPos.top) <= (boardH*.8) && dartPos.left >= 0*/) {
      //console.log(dartPosTrueHeight + " | " + TargetHeight);
      //console.log(acceleration());
      if(TargetHeight > dartPosTrueHeight- 20 && TargetHeight < dartPosTrueHeight+20 && ((200-(boardH/2))<dartPosTrueHeight) && (((200+boardH)-(boardH/2))>dartPosTrueHeight) && acceleration() == 1){
        //set timeout for setting the hasArced flipbit
        setTimeout(function(){
          hasArced=-1;
        }, 500);
        
        //Place Dart on board to show throw results && hide 3d ball
        ball.classList.remove("ball"); 
        marker.style.top = TargetHeight+"px";
        //FIXME: NEED LEFT/RIGHT CONTROLS
        marker.style.left = 50+"vw";
        marker.style.display = "block";
        
        //Define the magin number that makes this all work
        //Algorithm used: 2 * sqrt(R^2 - (OriginY-pointY)^2))
        magicNumber = (2*(Math.sqrt(((boardR*boardR)-((200-marker.style.top.slice(0,-2))*(200-marker.style.top.slice(0,-2)))))));
        
        //update the left-calc block
        leftCalc.innerHTML = "Current Diameter: "+Math.floor(boardH)+"<br> Current Radius: " +Math.floor(boardH/2)+"<br><br><br>Calculation for chord:<br> "+`2*(`+Math.floor(boardR)+`^2 + (200 - `+ Math.floor(marker.style.top.slice(0,-2)) +`)^2)^.5`+"<br>= " + Math.floor(magicNumber)+ "";
        
        //show the new diameter
        setTimeout(function(){
          //set the diameter line to intersect hit point
          line.style.top = marker.style.top; 
          //resize line
          line.width = magicNumber+"px";
          //move to center with image
          line.style.left = (((window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)/2)-(line.width.slice(0,-2)/2))+"px";
          //display line
          line.style.display = "block";
          
          //animation to move the line to the center of the board
          setTimeout(function(){
          line.style.transform = "translate3d(0px, "+(-1)*(line.style.top.slice(0,-2)-200)+"px, 0px)"; 
          }, 1000);
        }, 3000);
        
        
        //shrink the board
        setTimeout(function(){
          //get old height for margin adjustments
          oldHeight = board.style.height.slice(0,-2);
          resize(magicNumber); 
          //set new board margins
          board.style.marginTop=(oldCarryNumber+ ((oldHeight-magicNumber)/2))+"px";
          oldCarryNumber = (oldCarryNumber+ ((oldHeight-magicNumber)/2));
          marker.style.display = "none";}, 6000);
        
        //reset everything
        setTimeout(function(){
        line.style.display = "none";
          
        //Update Curent Left Board Stats
        leftCalc.innerHTML = "Current Diameter: "+Math.floor(board.style.height.slice(0,-2))+"<br> Current Radius: " +Math.floor(board.style.height.slice(0,-2)/2);
          
        //reset line animation frames
        line.style.top = 200;
        line.style.transform = ""; 
          }, 9000);
        }
     } else if(TargetHeight > dartPosTrueHeight- 20 && TargetHeight < dartPosTrueHeight+20 && hasArced == 1 && ((200-(boardH/2))>dartPosTrueHeight) && (((200+boardH)-(boardH/2))<dartPosTrueHeight)){
       alert("MISSED");
     } else {
        //set timeout for setting the hasArced flipbit
        setTimeout(function(){
          hasArced=1;
        }, 500);
     }
    }, 50);
   
  $('body').fadeIn();
});
