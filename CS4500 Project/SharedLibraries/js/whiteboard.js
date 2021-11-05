var i = 0;
$( document ).ready(async function() {
    carousel(carouselText, images, "#feature-text");
  });
  
  async function typeSentence(sentence, eleRef, delay = 50) {
    const letters = sentence.split("");
    let i = 0;
    while(i < letters.length) {
      await waitForMs(delay);
      $(eleRef).append(letters[i]);
      i++
    }
    return;
  }
  
  async function carousel(carouselList, ImagesList, eleRef) {
    await deleteSentence();
    await waitForMs(300);
    await typeSentence(carouselList[i].text, eleRef);
    $("#images").attr("src", ImagesList[i].img);
    await waitForMs(300);
    handleAdvance(i);
    i++;
  }

  document.getElementById("images").onload = function(e){
    document.getElementById("images").style.width = "60vw";
    document.getElementById("images").style.opacity = 1;
    document.getElementById("images").style.height = ((document.getElementById("images").naturalHeight/document.getElementById("images").naturalWidth)*60).toString() + "vw";
  }

  function deleteSentence(){
    $("#feature-text").empty();
  }
  
  function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  function callNext(){
    carousel(carouselText, images, "#feature-text");
    document.getElementById("images").style.opacity = 0;
    document.getElementById("advance").style.display="none";
    document.getElementById("multiplechoice").style.display = "none"; 
    document.getElementById("choiceone").style.color = "black";
    document.getElementById("choicetwo").style.color = "black";
    document.getElementById("choicethree").style.color = "black";
  }
