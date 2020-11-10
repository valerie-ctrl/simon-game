var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$("body").on("keydown", function () {
    if (!started) {
        $("h1").text("Level 0");
        nextSequence();
        started = true;
    }
});


$(".btn").click(function (button) {
    var userChosenColour = $(button.target).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})



function nextSequence() {
    level++
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name) {
    var buttonSound = new Audio("sounds/" + name + ".mp3");
    buttonSound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}
    
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length){
            console.log("right");
            userClickedPattern = [];
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }else if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
        gamePattern = [];
        userClickedPattern = [];
        var gameOverSound = new Audio('sounds/wrong.mp3');
        gameOverSound.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }else {
        console.log("smth went wrong");
    }
}

function startOver() {
    level = 0;
    started = false;
}