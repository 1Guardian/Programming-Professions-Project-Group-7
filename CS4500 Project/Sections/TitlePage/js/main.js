//hide the main menu stuff
function startGame(){
    //load selection page
    document.getElementById("mainPanel").style.display="flex";
    //hide the darts
    document.getElementById("ball").style.display="none";
    document.getElementById("balltwo").style.display="none";
}

//function to show escape menu
function Pause(){
    var overlay = $('#overlay');
    overlay.show();
    $('.popup').show();
    $('.close').click(function(){
    $('.popup').hide();
    overlay.hide();
    return false;
  });
  $('.exitbtn').click(function(){
    $('.popup').hide();
    window.top.close();
    return false;
  });
}

//check window size
var w = window.innerWidth;
var h = window.innerHeight;

if(w < 1800 || h < 900){
  alert("WARNING: This program was designed to run on \na 1080p screen or 1080i screen as a minimum\nsize. The app has detected you have a resolution\nsmaller than 1080p/i. The app will \nrun as normal, but you may notice graphical\nglitches due to the low resolution.");
  console.log("WARNING: This program was designed to run on a 1080p screen or 1080i screen as a minimum size. The app has detected you have a resolution  smaller than 1080p/i. The app will run as normal, but you may notice graphical glitches due to the low resolution.")
}

//added a console log listener
const webview = document.querySelector('webview')
webview.addEventListener('console-message', (e) => {
  console.log('Guest page logged a message:', e.message)
})
