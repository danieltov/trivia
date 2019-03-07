/*
Psuedz 

Array of objects. Example object:
    [{
        question: 'What is 1+1?',
        choices: {a: '4', b: '11', c: '3', d: '2'},
        answer: 'd',
        gif: 'images/example.gif',
    }, ..., ..., ...]

Use Handlebars.js to populate the question/multiple choices. Keep track of what question to display with questionIndex. i.e. questionsArray[questionIndex].

Place click listeners on every choice.

Start 30 second timer.

On click, clear timer, and compare choice value to answer value. 

    If match, display correcty answer message and add 1 to `correct` store, if doesn't match, display incorrect answer message and add one to `incorrect` score. Either way, add 1 to questionIndex.
    (Correct/Incorrect answer messages are Handlebars templates)

After a question is answered, wait 5 seconds and transition to next question
    Use jQuery to slide up the content and HandlebarsJS to dynamically replace it with the next question. Use jQuery to slide the content down again.

Gameplay:
game.start();
    (GAME LOOP)
        -> game.timer();
        -> USER CLICKS 
            -> game.compare();
                -> game.answerCorrect() || game.answerIncorrect()
        ->  game.nextQuestion(); 
    (/GAME LOOP)
    -> game.end()

Variables:

timer = setInterval(count,1000)
correct = 0
incorrect = 0
questionIndex = 0

*/

let game = {
    counter: 30,
    correct: undefined,
    incorrect: undefined,
    questionIndex: undefined,
    timer: undefined,
    start: function() {
        this.startTimer();
    },
    startTimer: function() {
        this.timer = setInterval(function() {
            if (game.counter > 0) {
                //$('#timer').text(game.countDown());
                console.log(game.countDown());
            } else {
                clearInterval(game.timer);
                game.answerIncorrect();
            }
        }, 1000);
    },
    countDown: function() {
        this.counter--;
        return this.counter;
    }
};
