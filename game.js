var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function playSound(color) {
    let audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}

function animate(color) {
    $("#"+color).fadeOut(100);
    $("#"+color).fadeIn(100);
}

function animatePress(color) {
    $("#"+color).addClass("pressed");
    setTimeout(() => {
        $("#"+color).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    let randomNumber = Math.floor((Math.random() * 4));
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animate(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
}

function checkAnswer(currentColor) {
    let len = userClickedPattern.length;
    if (gamePattern[len-1] != currentColor) {
       stopGame();
       
    } else if (len == gamePattern.length) {
        setTimeout(() => {nextSequence()}, 1000);
       
    }

}

function buttonClickHandler(event) {
    let colorClicked = event.target.id;
    userClickedPattern.push(colorClicked);
    playSound(colorClicked);
    animatePress(colorClicked);
    
    checkAnswer(colorClicked);
}

function stopGame() {
    
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 300);
    $("#level-title").text("Game Over!!! Score: " + (level-1)+ " Press any key to restart");
    
    $(document).on("keydown", function() {
        startGame();
    })
}

function startGame() {
    $(document).off("keydown");
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    nextSequence();
}

$(".btn").on("click", buttonClickHandler);

$(document).on("keydown", function() {
    startGame();
})