let game = {
    counter: 30,
    correct: 0,
    incorrect: 0,
    questionIndex: 0,
    source: $('#questionTemplate').html(),
    timer: undefined,
    start: function() {
        this.counter = 30;
        this.correct = 0;
        this.incorrect = 0;
        this.questionIndex = 0;
        this.printQuestion(this.questionIndex);
        this.startTimer();
        this.gameplay();
    },
    startTimer: function() {
        $('h3').text(`Time Left: 30 seconds`);
        this.timer = setInterval(function() {
            if (game.counter > 0) {
                $('h3').text(`Time Left: ${game.countDown()} seconds`);
            } else {
                clearInterval(game.timer);
                game.incorrectAnswer();
            }
        }, 1000);
    },
    countDown: function() {
        this.counter--;
        return this.counter;
    },
    printQuestion: function(i) {
        let template = Handlebars.compile(game.source);
        let context = trivia[i];
        let html = template(context);
        $('main').html(html);
    },
    gameplay: function() {
        $('.answer').on('click', function() {
            clearInterval(game.timer);
            game.counter = 30;
            game.compareAnswer($(this)[0].innerText[0].toLowerCase());
        });
    },
    compareAnswer: function(x) {
        if (x !== trivia[this.questionIndex].answer) {
            this.incorrectAnswer();
        } else {
            this.correctAnswer();
        }
    },
    correctAnswer: function() {
        this.correct++;
        this.questionIndex++;
        $('#question').addClass('d-none');
        $('#correct').removeClass('d-none');
        this.timer = setTimeout(this.nextQuestion, 4000);
    },
    incorrectAnswer: function() {
        this.incorrect++;
        this.questionIndex++;
        $('#question').addClass('d-none');
        $('#incorrect').removeClass('d-none');
        setTimeout(this.nextQuestion, 4000);
    },
    nextQuestion: function() {
        if (game.questionIndex < 10) {
            game.printQuestion(game.questionIndex);
            game.startTimer();
            game.gameplay();
        } else {
            $('h3').text(`Thanks For Playing!`);
            $('main').html(
                `<div style="background: #00688c;"><h3>That's the end of the game. You got ${
                    game.correct
                } questions correct and ${
                    game.incorrect
                } incorrect.</h3><button class="btn btn-lg btn-block bg-warning" id="playAgain">Play Again</button></div>`
            );
            $('#playAgain').on('click', function() {
                game.start();
            });
        }
    }
};

$(function() {
    game.start();
});
