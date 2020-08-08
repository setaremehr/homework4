const $home = $("#main");
const $timer = $("#timer");
const $quiz = $("#quiz");
const $question = $("#question");
const $btn0 = $("#btn0");
const $btn1 = $("#btn1");
const $btn2 = $("#btn2");
const $btn3 = $("#btn3");
const $results = $("#results");
const $userScoreEl = $("#user-score");
let $seconds = $("#seconds");
let counter = 60;
let userScore = 0;
let $userInitialsEl = $("#initials-input");
let scores = [];
let interval;
let questions = [
    {
        question: "Who is making the Web standards?",
        choices: ["Google", "The World Wide Web Consortium", "Mozilla", "Microsoft"],
        answer: "The World Wide Web Consortium",
    },
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language  ", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "none"],
        answer: "Hyper Text Markup Language  ",
    },
    {
        question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        choices: ["alt", "src", "title", "longdesc"],
        answer: "alt",
    }

];
$(document).ready(function () {
  
    // Start timer
    function startTimer() {
        interval = setInterval(function () {
            counter--;
            if (counter <= 0) {
                clearInterval(interval);
                $timer.html("Times Up!");
                endQuiz();
            } else {
                $seconds.text(counter);
            }
        }, 1000);
    }

    // Start quiz
    function startQuiz() {
        $home.hide();
        $quiz.show();
        $timer.show();
        startTimer();
        setNextQuestion();
    }

    // Set next question
    function setNextQuestion() {
        let currentQuestion = questions[0];
        $question.append(currentQuestion.question);
        $btn0.attr("value", currentQuestion.choices[0]);
        $btn1.attr("value", currentQuestion.choices[1]);
        $btn2.attr("value", currentQuestion.choices[2]);
        $btn3.attr("value", currentQuestion.choices[3]);
        $btn0.append(currentQuestion.choices[0]);
        $btn1.append(currentQuestion.choices[1]);
        $btn2.append(currentQuestion.choices[2]);
        $btn3.append(currentQuestion.choices[3]);
    }

    // Clear last question/gets new question
    function getNewQuestion() {
        $question.html("");
        $btn0.text("");
        $btn1.text("");
        $btn2.text("");
        $btn3.text("");
        if (questions.length === 0) {
            endQuiz();
        } else {
            setNextQuestion();
        }
    }

    // Check answer
    function result() {
        if (event.target.value === questions[0].answer) {
            userScore += 1;
            $("#correct").show();
            setTimeout(function () { $("#correct").hide(); }, 1000);
            questions.shift();
            getNewQuestion();
        } else {
            counter -= 1;
            $("#incorrect").show();
            setTimeout(function () { $("#incorrect").hide(); }, 1000);
            questions.shift();
            getNewQuestion();
        }
    }

    // End quiz
    function endQuiz() {
        clearInterval(interval);
        $results.show();
        $quiz.hide();
        $timer.hide();
        $userScoreEl.append(userScore);
    }


    // Save score and initials to array
    function saveScore() {
        let userInitials = $userInitialsEl.val().trim();
        let savedScore = (userInitials + " " + userScore);
        if (userInitials === "") {
            return;
        }
        scores.push(savedScore);
        $userInitialsEl.val("");
        showHighScores();
        storeScores();
        renderScores();
    }

    // Reloads quiz
    function reload() {
        location.reload();
    }

    // Check local storage
    function init() {
        if (localStorage.getItem("scores")) {
            const savedScores = JSON.parse(localStorage.getItem("scores"));
            scores.push(...savedScores);
            renderScores();
        }
    }



    // Event listeners
    $("#start-btn").on("click", startQuiz);
    $(".answer-btn").on("click", result);
    $("#save-score").on("click", saveScore);
    $("#start-over").on("click", reload);
});