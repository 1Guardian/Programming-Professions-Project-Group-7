//GLOBAL VARS
/////////////////////////////////////

//get the board's position for later use
//Added: Phys V2
var boardRealPosition = 0;
var throwableX = 0;
var throwableXStart = 0;
var throwableY = 0;
var throwableYStart = 0;
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    setTimeout(function(){
      boardRealPosition = $("#board").position();
      //alert("Top position: " + boardRealPosition.top + " Left position: " + boardRealPosition.left);
      throwableXStart = boardRealPosition.left;
      throwableYStart = boardRealPosition.top;
      throwableX = boardRealPosition.left+500;
      throwableY = boardRealPosition.top+500;
    },500);
  }
}

//vars to hold where the ball will fly to
var ballFlyX = 0;
var ballFlyY = 0;

//throws successfully made
successfulThrows = -1;

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

//flipbit to sync pre-2.0 Phys code and post 2.0 Phys code
var lineReady = 1;

//flip-bit to check if they missed a throw
missedThrow = -2;

//Target height to look for
TargetHeight =0;

//Has Arced Flip-Bit
hasArced = -1;

//previous motion tracker for acceleration function
previousDartPosTop = 0;

//tracking var for the check on arc
previousPosition = 9999;

//FUNCTIONS
//////////////////////////////////////////////////

//Function for Controls Overlay 
//Credit: Pedro Benoit
//codepen.io/pedrobenoit91
$(function(){
  var overlay = $('#overlay');
  $('.popup').show();
  $('.close').click(function(){
  $('.popup').hide();
  overlay.appendTo(document.body).remove();
  return false;
});

$('.x').click(function(){
  $('.popup').hide();
    overlay.appendTo(document.body).remove();
    return false;
  });
});

//function to end the game
function endGame(){

  //update the button text
  $('.close')[0].innerHTML = "Replay";

  //update the natural text
  $('.headerTitle')[0].innerHTML = "Game Over";
  $('.textToUpdate')[0].innerHTML = "You scored " + parseFloat(successfulThrows-1) + " points! That's an exact deviation of<br>" + parseFloat(successfulThrows-1)/2 + " times from the average player!<br><br><br><br>";
  var overlay = $('#overlay');
  $('.cmt223').append( "<a href='' style='color:red'><h3>Replay</h3></a>" );

  //fade out the container
  $('.container').fadeOut();

  //show ending screen
  $('.popup').show();
  $('.close').click(function(){
  $('.popup').hide();
  overlay.appendTo(document.body).remove();
    return false;
  });
}

//Starting the function on page load
////////////////////////////////////
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
  //hide the marker (in the event of a miss)
  $('.non-throwable-dart')[0].style.display = "none";

  //update hasarced
  hasArced = -1;

  //increase the successful throws count
  successfulThrows += 1;

  //buffer for first two calls
  if(missedThrow == -1){
    missedThrow = 0;
  }
  else if (missedThrow == -2){
    missedThrow = -1;
  }

  //end game if throw was missed
  if(missedThrow == 1)
  endGame();
  
  //update the flip-bit back to normal
  if(missedThrow != -1)
    missedThrow= 1;

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

    //log the number for later use 
    //Phys V2
    ballFlyX = showBall.value;
    
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

    //log the number for later use 
    //Phys V2
    ballFlyY = pitchSlider.value;
    
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

//simple function to check if elements are overlapping
function isObjOnObj(){

  //get the board pos
  boardAllPos = $("#board").position();
  markerAllPos = $('.non-throwable-dart')[0];

  //get board dimensions
  boardMathObj = document.getElementById("board");
  boardHeight = boardMathObj.style.height.slice(0,-2);
  boardWidth = boardMathObj.style.width.slice(0,-2);

  //get center of circle
  centerPointX = boardAllPos.left+(boardWidth/2);
  centerPointY = boardAllPos.top+(boardHeight/2);

  //user marker pos to get exact point
  markerleft = markerAllPos.style.left;
  markertop = markerAllPos.style.top;

  //get third necessary point for pythag theorem
  thirdPointX = centerPointX;
  thirdPointY = markertop;

  //get length of ray from center to new point
  rayLength = Math.sqrt((Math.abs(parseFloat(centerPointX) - parseFloat(markerleft))*Math.abs(parseFloat(centerPointX) - parseFloat(markerleft))) + (Math.abs(parseFloat(centerPointY) - parseFloat(markertop))*Math.abs(parseFloat(centerPointY) - parseFloat(markertop))));

  //use board pos to get bounds
  var boardl = parseFloat(boardAllPos.left);
  var boardr = (parseFloat(boardAllPos.left)+parseFloat(boardWidth));

  //get radius length
  radiusLength = Math.abs(boardl - boardr)/2;

  //check if dart is overlapping image
  if(rayLength <= radiusLength){
    return true;
  }

  return false;
}

$(document).ready(function () {
   
  //hidden dart obj
  marker = $('.non-throwable-dart')[0];
   
  //dartboard obj
  board = document.getElementById("board");
  oldCarryNumber = 0;
   
  //dotted line diameter object 
  line = $('.dotted')[0];
   
  //get the calculation blocks
  leftCalc = $('.leftCalculationText')[0];
  rightCalc = $('.rightCalculationText')[0];
   
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
  setInterval(function() {
     
    //static vars
    var dartPos = $("#ball").position();
    var dartPosTrueHeight = document.documentElement.clientHeight+dartPos.top;
     
    //update board vars
    boardH = board.style.height.slice(0,-2);
    boardW = board.style.width.slice(0,-2);
    boardR = boardW/2;

    //only trigger if the ball is currently rendered in 3D space
    if (ball.classList.contains("ball")) {

      //check if ball has reached the peak of the throw (it arced)
      if(previousPosition > dartPosTrueHeight){
        hasArced = 1;
      }
      else{
        previousPosition = dartPosTrueHeight;
      }

      //if it is, calculate the translated position of the ball in 2.5-D Space
      var ball3DRealPositionX = ((throwableX - throwableXStart)*((ballFlyX)/100))+throwableXStart;
      var ball3DRealPositionY = ((throwableY - throwableYStart)*((ballFlyY)/100))+throwableYStart;

      //move the marker pre-emptively to it
      marker.style.top = ball3DRealPositionY + "px";
      marker.style.left = ball3DRealPositionX + "px";

      if(dartPosTrueHeight < ball3DRealPositionY + 50 && dartPosTrueHeight > ball3DRealPositionY - 50 && hasArced == 1){

        //Place Dart on board to show throw results && hide 3d ball
        ball.classList.remove("ball"); 
        marker.style.display = "block";

        //update the backwards-compatibility flipbit
        setTimeout(function(){
          lineReady=0;
        }, 1000);
      }
      
      //if the 3D rendered ball is within the bounds of the target area
      if(lineReady == 0 && isObjOnObj()){

        //set timeout for setting the hasArced flipbit
        setTimeout(function(){
          hasArced=-1;
        }, 500);
        
        //Define the magin number that makes this all work
        //Algorithm used: 2 * sqrt(R^2 - (OriginY-pointY)^2))
        magicNumber = (2*(Math.sqrt(((boardR*boardR)-((200-marker.style.top.slice(0,-2))*(200-marker.style.top.slice(0,-2)))))));

        //if magic number is not valid: Die.
        if(isNaN(magicNumber) || magicNumber < 2){
          missedThrow = 1;
        }
        else{
        
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

          //log that the throw was a successful throw
          missedThrow = 0;
            
          //Update Curent Left Board Stats
          leftCalc.innerHTML = "Current Diameter: "+Math.floor(board.style.height.slice(0,-2))+"<br> Current Radius: " +Math.floor(board.style.height.slice(0,-2)/2);

          //Update Current Right Board Stats
          rightCalc.innerHTML = "Current Score: "+(parseFloat(successfulThrows+1))+"<br><br> Chance (on Average) that <br>a Random Person Would Get <br>Another Point : " + 100*Math.pow(.5, parseFloat(successfulThrows+2)) + "%<br><br> Average Calculation Equation: <br> 100*(.5)^points+1";
            
          //reset line animation frames
          line.style.top = 200;
          line.style.transform = ""; 
            }, 9000);
        }
      }
     } 
     else {
        //set timeout for setting the hasArced flipbit
        setTimeout(function(){
          //hasArced=1;
        }, 1000);
     }
    }, 50);
   
  $('body').fadeIn();
});
