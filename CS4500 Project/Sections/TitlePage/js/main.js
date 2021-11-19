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
