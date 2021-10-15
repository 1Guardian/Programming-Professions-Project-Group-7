const carouselText = [
  {text: "This program will teach you about two specific and useful algorithms that revolve around a simple game of darts. One of these algorithms is tied specifically to the game itself, but one of these algorithms will allow you, the student, to easily calculate the length of chords on a plane without calculus."},
  {text: "The main idea in this lesson, is that in a game of darts, you can calculate the most likely average for someone's score if everytime they throw a dart, the board's radius becomes the chord formed by the point they hit, and the sides of the circle."},
  {text: "If we assume this proposition is true for a moment, there is a glaring issue before we can get to the testing of this algorithm: how do we calculate the chord?"},
  {text: "This is the first algorithm we are going to try to form, and test, so that we can calculate the necessary chord to shrink our board during the second algorithm."},
  {text: "If you remember back to your geometry class, I'm sure you will recall that there is an algorithm known as the Pythagorean theorem, this theorem allows us to calculate the hypotenuse of a triangle (c) if we know the lengths of the other two sides (a and b)."},
  /*Line 5*/{text: "As you can see below, we have a triangle, and we have two lengths: 3 and 4, with these two lengths, we should be able to calculate the hypotenuse. Which of the answers below is the correct calculation of the hypotenuse? (Remember: a^2 + b^2 = c^2)"},
  {text: "Exactly! The hypoetenuse of this triangle equals 5!"},
  {text: "Now that we have determined what the Pythagorean algoritm is, we can expand this idea out to more shapes! Take for example this square."},
  {text: "Lets say that we have a point on each adjacent corner of the square, and we wanted to figure out the distance across the square (or between the points). Believe it or not, we already have the necessary algorithm for this!"},
  /*Line 9*/{text: "All we have to do is think of the square as a triangle, and then apply the Pythagorean theorem to it! So, if we know the length of each leg of the square is 13, and 6, we can easily calculate the distance across the square! So, with this in mind, which of the answers below is correct?"},
  {text: "Exactly! The answer is approximately 14 or (14.317....)! Now, we have shown you can use Pythagorean theorem on a triangle, a square, and now, for the final part, we are going to use it on a circle!"},
  {text: "If we look at this dartboard, and we see that someone threw a dart over in the upper-left area, we can calulate the length of the chord by using nothing more than Pythagoeran theorem!"},
  {text: "This may seem odd, and it may not be apparent how we can use Pythagorean theorem to solve this, but if I draw a few lines, the answer become much more apparent. "},
  {text: "Does that look familar now? We now have two triangles to work with!"},
  {text: "Now in the last problem we had the length of the legs, and we calculated the hypotenuse, but this time we have the length of the hypotenuse, and the lenght of one leg. How do we have the hypotenuse? Because it's a circle! The hypotenuse is equal to the radius of the circle!"},
  {text: "So if we have the hypotenuse and a leg, we need to calculate the length of the other leg. All this requires is rearranging the Pythagorean theorem as such:"},
  /*Line 16*/{text: "So with this rearranged equation and the knowledge that the hypotenuse is 5 and the known leg is 4, what would the length of the unknown leg on the triangle be?"},
  /*Line 17*/{text: "Exactly! It's 3! So, with this leg now known, we are nearly done calculating the chord's length. All we have to do now is double the value since the chord equals two of the unknown legs. So the final length of the chord is:"},
  {text: "Exactly! It's 6! So with the equation shown below, you are now able to calculate the length of a chord on a circular plane without any calculus! We are now going to use this equation to move on to the next algorithm, and resize our dart board with each throw!"},
]

const images = [
  {img: "imgs/DartBoard.PNG"},
  {img: "imgs/DartBoard_Thrown.PNG"},
  {img: "imgs/Dart_Thrown_With_Chord.PNG"},
  {img: "imgs/Dart_Thrown_With_Chord.PNG"},
  {img: "imgs/Pythagorean_Theorem.PNG"},
  {img: "imgs/First_Triangle.PNG"},
  {img: "imgs/First_Triangle_Solved.PNG"},
  {img: "imgs/Square.PNG"},
  {img: "imgs/Square_Two_Dots.PNG"},
  {img: "imgs/Square_Made_Triangle.PNG"},
  /*Here*/{img: "imgs/Square_Made_Triangle_Solved.PNG"},
  {img: "imgs/DartBoard_Thrown.PNG"},
  {img: "imgs/Dart_Thrown_With_Chord.PNG"},
  {img: "imgs/DartBoard_With_Triangles.PNG"},
  {img: "imgs/DartBoard_Triangle_Labeled.PNG"},
  {img: "imgs/Rearranged_Theorem.PNG"},
  /*Here*/{img: "imgs/DartBoard_With_Triangles_And_Equation.PNG"},
  {img: "imgs/Dart_Calc_Needs_2.PNG"},
  {img: "imgs/Finished.PNG"}
]

function handleAdvance(i){
  if(i != 5 && i != 9 && i != 16 && i != 17 && i < 18){
    document.getElementById("advance").style.display="block";
  }
  else if (i == 5){
    document.getElementById("choiceone").innerHTML = "25^.5 or 5";
    document.getElementById("choicetwo").innerHTML = "7^.5 or 2.6";
    document.getElementById("choicethree").innerHTML = "1^.5 or 1";
    $("#choicetwo").attr("onclick", "wrongAnswer(this)");
    $("#choicethree").attr("onclick", "wrongAnswer(this)");
    document.getElementById("multiplechoice").style.display = "initial"; 
  }
  else if (i == 9){
    document.getElementById("choiceone").innerHTML = "22^.5 or 4.6";
    document.getElementById("choicetwo").innerHTML = "205^.5 or 14.3";
    document.getElementById("choicethree").innerHTML = "180^.5 or 13.4";
    $("#choiceone").attr("onclick", "wrongAnswer(this)");
    $("#choicetwo").attr("onclick", "callNext()");
    $("#choicethree").attr("onclick", "wrongAnswer(this)");
    document.getElementById("multiplechoice").style.display = "initial"; 
  }
  else if (i == 16){
    document.getElementById("choiceone").innerHTML = "9^.5 or 3";
    document.getElementById("choicetwo").innerHTML = "1^.5 or 1";
    document.getElementById("choicethree").innerHTML = "42^.5 or 6.4";
    $("#choicetwo").attr("onclick", "wrongAnswer(this)");
    $("#choiceone").attr("onclick", "callNext()");
    $("#choicethree").attr("onclick", "wrongAnswer(this)");
    document.getElementById("multiplechoice").style.display = "initial"; 
  }
  else if (i == 17){
    document.getElementById("choiceone").innerHTML = "2.4";
    document.getElementById("choicetwo").innerHTML = "1.5";
    document.getElementById("choicethree").innerHTML = "6.0";
    $("#choicetwo").attr("onclick", "wrongAnswer(this)");
    $("#choicethree").attr("onclick", "callNext()");
    $("#choiceone").attr("onclick", "wrongAnswer(this)");
    document.getElementById("multiplechoice").style.display = "initial"; 
  }
  else{
    document.getElementById("nextSection").style.display="block";
  }
}

function wrongAnswer(obj){
  obj.innerHTML = "Nope, Try Again!"
  obj.style.color = "red";
}