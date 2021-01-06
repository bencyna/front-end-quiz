var start = document.querySelector("#start");
var questionOne = document.querySelector(".first-question");
var questionTwo = document.querySelector(".second-question");
var questionThree = document.querySelector(".third-question");
var questionFour = document.querySelector(".fourth-question");
var questionFive = document.querySelector(".fifth-question");
var rightText = document.querySelector("#right");
var wrongText = document.querySelector("#wrong");
var correctOne = document.querySelector(".correct1");
var correctTwo = document.querySelector(".correct2");
var correctThree = document.querySelector(".correct3");
var correctFour = document.querySelector(".correct4");
var correctFive = document.querySelector(".correct5");
var incorrect = document.querySelectorAll(".incorrect");
var incorrectOne = document.querySelectorAll(".incorrect1");
var incorrectTwo = document.querySelectorAll(".incorrect2");
var incorrectThree = document.querySelectorAll(".incorrect3");
var incorrectFour = document.querySelectorAll(".incorrect4");
var incorrectFive = document.querySelectorAll(".incorrect5");
var enterDetails = document.querySelector(".end-quiz");
var submitInitials = document.querySelector("#initials");
var submitButton = document.querySelector("#submit");
var scorecard = document.querySelector(".score-display");
var highscores = document.querySelector(".highscores");
var clearButton = document.querySelector(".clear");
var backButton = document.querySelector(".go-back");
var displayCurrentHighscore = document.querySelector("#highscore");
var displayTime = document.querySelector("#time");
var headerObject = document.querySelector(".header-object");
var yourScoreDisplay = document.querySelector(".your-score");
var smileHeader = document.querySelector("#smile");

var finalScore = 0;
var score = 0;
var details = [];
var detailsScore = [];
var questionNumber = 0;
var time = 120;
getItems();

function renderDetails() {
  scorecard.innerHTML = "";

  for (var i = 0; i < details.length; i++) {
    var participantDetails = details[i];
    var individualScore = detailsScore[i];

    var li = document.createElement("li");
    li.textContent = participantDetails;
    li.setAttribute("data-index", i);

    var displayIndividualScore = ": " + individualScore;
    scorecard.appendChild(li);
    li.append(displayIndividualScore);
  }
}

function getItems() {
  var storedDetails = JSON.parse(localStorage.getItem("details"));
  var storedDetailsScore = JSON.parse(localStorage.getItem("detailsScore"));

  if (storedDetails !== null) {
    details = storedDetails;
    detailsScore = storedDetailsScore;
  }
  renderDetails();
}

function storeDetails() {
  localStorage.setItem("details", JSON.stringify(details));
  localStorage.setItem("detailsScore", JSON.stringify(detailsScore));
}

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var detailsText = submitInitials.value;
  var individualScoreText = score;
  if (detailsText === "" || individualScoreText === 0) {
    return;
  }

  detailsScore.push(individualScoreText);
  details.push(detailsText);
  submitInitials.value = "";

  enterDetails.classList.add("hide");
  highscores.classList.remove("hide");

  storeDetails();
  renderDetails();

  // add page for this to display
});

clearButton.addEventListener("click", function (event) {
  var element = event.target;
  var index = element.parentElement.getAttribute("data-index");
  details.splice(index, details.length);
  detailsScore.splice(index, detailsScore.length);

  storeDetails();
  renderDetails();
});

backButton.addEventListener("click", function () {
  window.location.reload();
});

// add submit button to initials and store in local storage

function getMaxScore(detailsScore) {
  return Math.max.apply(null, detailsScore);
}

var maxScore = getMaxScore(detailsScore);
var displayMaxScore = maxScore.value;
if (maxScore >= 1) {
  displayCurrentHighscore.append(maxScore);
}

function toggleDisplay() {
  var introduction = document.querySelector(".openning");

  introduction.classList.add("hide");
  questionOne.classList.remove("hide");
  finalScore++;
  var timerInterval = setInterval(function () {
    time--;

    displayTime.innerHTML = "Time left: " + time;

    if (time === 0) {
      alert("You ran out of time! let's see how you did...");
      headerObject.classList.add("hide");
      questions[questionNumber].classList.add("hide");
      enterDetails.classList.remove("hide");
      score = finalScore;
    }
  }, 1000);
  function myStopFunction() {
    clearInterval(timerInterval);
    headerObject.classList.add("hide");
  }
  incorrectFive.forEach(function (incorrectFive) {
    incorrectFive.addEventListener("click", myStopFunction);
    correctFive.addEventListener("click", myStopFunction);
  });
}

var questions = [
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
  questionFive,
];

var correctResponses = [
  correctOne,
  correctTwo,
  correctThree,
  correctFour,
  correctFive,
];

var incorrectResponses = [
  incorrectOne,
  incorrectTwo,
  incorrectThree,
  incorrectFour,
  incorrectFive,
];

function correctQuestions() {
  var responseCorrect = questions[questionNumber];
  var newQuestionCorrect = questions[questionNumber + 1];

  rightText.classList.remove("hide");
  var timeLeft = 5;
  setInterval(function () {
    timeLeft--;

    if (timeLeft === 0) {
      responseCorrect.classList.add("hide");
      newQuestionCorrect.classList.remove("hide");
      rightText.classList.add("hide");

      questionNumber++;
      finalScore += 5;
    }
  }, 100);
}
function correctQuestionFive() {
  rightText.classList.remove("hide");

  var timeLeft = 5;
  setInterval(function () {
    timeLeft--;

    if (timeLeft === 0) {
      questionFive.classList.add("hide");
      enterDetails.classList.remove("hide");
      rightText.classList.add("hide");
      smileHeader.classList.remove("hide");

      finalScore += 5;
      score = finalScore;
    }
    yourScoreDisplay.innerHTML = score;
  }, 100);
}
function incorrectQuestions() {
  var responseIncorrect = questions[questionNumber];
  var newQuestionIncorrect = questions[questionNumber + 1];

  wrongText.classList.remove("hide");
  var timeLeft = 5;
  setInterval(function () {
    timeLeft--;

    if (timeLeft === 0) {
      responseIncorrect.classList.add("hide");
      newQuestionIncorrect.classList.remove("hide");
      wrongText.classList.add("hide");
      time = time - 10;
    }
  }, 100);
  questionNumber++;
  finalScore += 1;
}

function incorrectQuestionFive() {
  wrongText.classList.remove("hide");

  var timeLeft = 5;
  setInterval(function () {
    timeLeft--;

    if (timeLeft === 0) {
      questionFive.classList.add("hide");
      enterDetails.classList.remove("hide");
      wrongText.classList.add("hide");
      smileHeader.classList.remove("hide");
    }
  }, 100);
  finalScore += 1;
  score = finalScore;
  yourScoreDisplay.innerHTML = score;
}

start.addEventListener("click", toggleDisplay);
for (var j = 0; j < questions.length - 1; j++) {
  var responses = questions[j];
  correctResponses[j].addEventListener("click", correctQuestions);
}
correctFive.addEventListener("click", correctQuestionFive);

for (k = 0; k < questions.length - 1; k++) {
  incorrectResponses[k].forEach(function (incorrectResponses) {
    incorrectResponses.addEventListener("click", incorrectQuestions);
  });
}
incorrectFive.forEach(function (incorrectFive) {
  incorrectFive.addEventListener("click", incorrectQuestionFive);
});
