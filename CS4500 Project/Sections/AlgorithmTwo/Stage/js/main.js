const carouselText = [
  {text: "Now that we have successfully determined how to resize the dart board, we need to figure out how to determine what the average score is for a completely random thrower. The score is made up of each successful throw gaining you one point, plus one point just for playing. So, if you miss the first throw, your final score is 1."},
  {text: "To start out, we can look at a simple dartboard. If the board has never been shrunk before, and for simplicity sake, we say the radius of the board is 1, then the odds of a dart hitting the board on the first shot is the same as the odds of two numbers in the plane of the board equaling less than 1 when summed."},
  {text: "This might seem odd, but it's actually a geometric principle. It's formed by the area of the circle dividing the area of the bounding square formed by the circle. If you look below, you can see a circle with a bounding square, these two things are always in play, just constantly shrinking the longer you play."},
  {text: "So, we determined that the first point is free, and all subsiquent throws are a function of the bounding square divided by the area of the circular plane. On the second point, this idea continues. Now though, we have 3 dimensions, so it's the area of our bounding sphere divided by a bounding cube."},
  {text: "You might be questioning why dividing the circular object for the given dimension by the square object formed by the bounds of the circlular object works, but it's actually pretty simple: You're removing all the points that count as a miss from all the possible points for each throw. It's similar to trying to find all even numbers between 0 and 10 by removing all non-even numbers. You're left with only even ones."},
  {text: "Now, for our third throw, we need to continue this pattern, but we have run out of identifiable dimensions. There is no observable 4-dimensional sphere we can work with, so we're going to have to use theorhetical volumes. These volumes are formed essentially the same way as we formed the first two, but with calculus to determine their theorhetical values."},
  {text: "Because of this, we are just going to take the answers for these volumes at face value, and go with it, since proving them is far above the bounds of this program, and is something far more akin to vector calculus in college. All theoretical higher-dimension volumes are shown below."},
  {text: "So with these volumes, we can continue to churn out probabilities. However, now we need to turn these probabilities into a useful score. To do this, we need to come up with a relation that is infinite and non-static, that is, it need to be able to adjust to any value we desire to know."},
  {text: "While this sounds very complex and scary, it's not nearly as bad as you might think it is. If we look at the equation formed, we can see it is an infinite series. Think of this series as a template more than an algorithm. The template formed is shown below. Take a good look at it before moving on."},
  {text: "This template is made up of a bunch of weird looking expressions. You might be asking, what is 'P' and what is 'S', and these are valid questions. These variables are placeholders for yet another algorithm. Think of it like a bunch of tiny algorithms nested together into one giant algorithm!"},
  {text: "These tiny algorithms are defined as 'The number of desired throws minus one, minus all other probabilities on larger amounts. So, every time you see P(S=n), what you're really seeing is P[S=n] = P(S>n-1) - P(S>n). This allows us to look only at the desired throws amount that we're investigating."},
  {text: "Here's another way to look at it: If you have candies, and 4 are blue, 2 are red, and 6 are green, to figure out how many red ones you have, you have to add all the candies up (12) and subtract the non-red ones from it (10), which leaves you with 2 red candies! The idea is the same with P(s=n), it just looks scarier."},
  {text: "Now that we understand why we have these smaller equations, it's time to expand them out and get our final equation. To start we do what we did above, take each score and subtract the previous score (n-1) from all other scores. The reason we do this is because the previous number contains both the number we're looking for, as well as all the others, just like with our candies!"},
  {text: "Once we have these numbers expanded out, we are able to do some cancellation. To start, we see that we have P(s>1) twice, once where we subtract one, and then add 2, so we can just write one because two cancel each other out. Under that we see that we have P(s>2) twice, but this time we are subtracting 2 and adding 3, so just like above, we can just put 1 in the final equation, since 4 of them cancel out. This is pattern continues for the other equations"},
  {text: "If we continue this, we end up getting a fully formed equation which looks pretty linear in design, with each possibility just being 1 unit by itself. This makes sense because if we add all of the possible throws up, we get the total possible scores, just like when we add up all the different colored candies, we get the total amount of candies."},
  {text: "So now, we need to use our template to form our final equation. The chance that we have a score larger than 0 is 100%, or 1 since we get 1 point just for starting. "}, 
  {text: "The chance of getting a number larger than 1 but less than 3 is pi/4, like we formed earlier from calculating the possibility by dividing the area of the circle by the area of the square."},
  {text: "We continue this into the score of 3, and 4, and voilà, we have our equation!"},
  {text: "What? It doesn't seem very useful? We that's because it's long and arduous to look at or work with. However, we can extract a single value out of this large mess."},
  {text: "Note that the series has a pattern, the main factor keeps increasing by 1 and the denominator keeps increasing by 1. This is useful, because another famous number is mathematics follows this same pattern. While you have likely never worked with this number before, you will learn to hate it in calculus later. This number is known as 'e'"},
  {text: "The specific variant we are going to look at is 'e' raised to the 'x' power, or infinite power. If I draw out the sequence for e^x, you should start to notice a similarity between our algorithm and the pattern formed by e^x"},
  {text: "We can see that we have our denominators increasing in the same way, and that e^x has an 'x' where we have pi/4. This means that we can substitute out the x in the e^x equation for pi/4. And since we known that the series formed by e^x is equal to e^x, when we can say our series is equal to e^(pi/4)."},
  {text: "With this number we can finally conclude that the average score that any random player will get on our shrinking board is equal to e^(pi/4), which is a little over 2. Which means most people will make only one successful shot."},
  {text: "Now that we have gone through all of this math, and figured out our average for playing this game, it's time that you go play a few rounds yourself and see these calculations in action! Enjoy the dart board and make sure to break the bell-curve and beat the average!"},
]

const images = [
  {img: "imgs/first.PNG"},
  {img: "imgs/second.PNG"},
  {img: "imgs/third.PNG"},
  {img: "imgs/fourth.PNG"},
  {img: "imgs/fifth.PNG"},
  {img: "imgs/sixth.PNG"},
  {img: "imgs/seventh.PNG"},
  {img: "imgs/eighth.PNG"},
  {img: "imgs/ninth.PNG"},
  {img: "imgs/tenth.PNG"},
  /*Here*/{img: "imgs/eleventh.PNG"},
  {img: "imgs/twelfth.PNG"},
  {img: "imgs/thirteenth.PNG"},
  {img: "imgs/fourteenth.PNG"},
  {img: "imgs/fifteenth.PNG"},
  {img: "imgs/sixteenth.PNG"},
  /*Here*/{img: "imgs/seventeenth.PNG"},
  {img: "imgs/eighteenth.PNG"},
  {img: "imgs/ninteenth.PNG"},
  {img: "imgs/twentieth.PNG"},
  {img: "imgs/twenty-first.PNG"},
  {img: "imgs/twenty-second.PNG"},
  {img: "imgs/twenty-third.PNG"},
  {img: "imgs/twenty-fourth.PNG"},
]

function handleAdvance(i){
  if(i != 23){
    document.getElementById("advance").style.display="block";
  }
  else if (i == 25){
    document.getElementById("choiceone").innerHTML = "25^.5 or 5";
    document.getElementById("choicetwo").innerHTML = "7^.5 or 2.6";
    document.getElementById("choicethree").innerHTML = "1^.5 or 1";
    $("#choicetwo").attr("onclick", "wrongAnswer(this)");
    $("#choicethree").attr("onclick", "wrongAnswer(this)");
    document.getElementById("multiplechoice").style.display = "initial"; 
  }
  else if (i == 29){
    document.getElementById("choiceone").innerHTML = "22^.5 or 4.6";
    document.getElementById("choicetwo").innerHTML = "205^.5 or 14.3";
    document.getElementById("choicethree").innerHTML = "180^.5 or 13.4";
    $("#choiceone").attr("onclick", "wrongAnswer(this)");
    $("#choicetwo").attr("onclick", "callNext()");
    $("#choicethree").attr("onclick", "wrongAnswer(this)");
    document.getElementById("multiplechoice").style.display = "initial"; 
  }
  else if (i == 216){
    document.getElementById("choiceone").innerHTML = "9^.5 or 3";
    document.getElementById("choicetwo").innerHTML = "1^.5 or 1";
    document.getElementById("choicethree").innerHTML = "42^.5 or 6.4";
    $("#choicetwo").attr("onclick", "wrongAnswer(this)");
    $("#choiceone").attr("onclick", "callNext()");
    $("#choicethree").attr("onclick", "wrongAnswer(this)");
    document.getElementById("multiplechoice").style.display = "initial"; 
  }
  else if (i == 217){
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