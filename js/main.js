let score=0;
let questionBox = document.querySelector('#question');
let result = document.querySelector('#result');
let startQuizBtn = document.querySelector('#start-quiz-btn');
let restartQuizBtn = document.querySelector('#restart-quiz-btn');
let finalScore = document.querySelector('#score');
let finalGrade = document.querySelector('#grade');
let one = 'O(1)';
let n = 'O(n)';
let log = 'O(Log(n))';
let nlogn = 'O(nLog(n))';
let n2logn = `O(${pow('n', 2)}Log(n))`;
let n2 = `O(${pow('n', 2)})`;
let n3 = `O(${pow('n', 3)})`;
let n4 = `O(${pow('n', 4)})`;
let p2n = `O(${pow(2, 'n')})`;
let p3n = `O(${pow(2, 'n')})`;
let p4n = `O(${pow(2, 'n')})`;
let sqrt = `O(&radic;n)`;
let nsqrt = `O(n&radic;n)`;
let n2sqrt = `O(${pow('n', 2)}&radic;n)`;

let questions = [
    createQuestion(1, one, n, n2, log, 2),
    createQuestion(2, n, nlogn, n2, p2n, 3),
    createQuestion(3, n, n2, log, nlogn, 3),
    createQuestion(4, n, nlogn, n2, n3, 1),
    createQuestion(5, n, nlogn, n2, log, 3),
    createQuestion(6, one, n, n2, log, 2),
    createQuestion(7, n, n2, nlogn, n3, 2),
    createQuestion(8, n2, n, n3, p2n, 3),
    createQuestion(9, n, n2, nlogn, p2n, 1),
    createQuestion(10, n, n2, nlogn, sqrt, 2),
    createQuestion(11, nsqrt, sqrt, n2, nlogn, 1),
    createQuestion(12, nsqrt, n2, nlogn, p2n, 2),
    createQuestion(13, n, log, nlogn, sqrt, 2),
    createQuestion(14, n, nlogn, n2, nsqrt, 3),
    createQuestion(15, n, n2logn, n2, n3, 3),
    createQuestion(16, n2sqrt, n2, p2n, n4, 3),
    createQuestion(17, n, nlogn, n2, sqrt, 1),
    createQuestion(18, n, nlogn, n2, nsqrt, 1),
    createQuestion(19, n, nlogn, n2, nsqrt, 2),
    createQuestion(20, one, log, n, sqrt, 1),
    createQuestion(21, n, nlogn, one, log, 3),
    createQuestion(22, one, n, n2, nlogn, 2),
    createQuestion(23, p2n, n2, n3, n4, 4),
    createQuestion(24, n, n2, nlogn, n2logn, 4),
    createQuestion(25, nsqrt, log, nlogn, n2, 4),
    createQuestion(26, nlogn, n2, n3, n2logn, 4),
    createQuestion(27, n2, n2logn, n2sqrt, nsqrt, 3),
    createQuestion(28, n2sqrt, n2, n2logn, n3, 2),
    createQuestion(29, `O(x)`, `O(Log min(x,y))`, 'O(y)', `O(&radic;min(x,y))`, 2),
    createQuestion(30, nlogn, log, n, n2, 3)
];
function pow(n, p) {
    return `${n}<sup>${p}</sup>`;
}
function createQuestion(img, a, b, c, d, corret) {
    return {
        img: `./imgs/${img}.png`,
        answers: [
            {
                name: a,
                value: 1
            },
            {
                name: b,
                value: 2
            },
            {
                name: c,
                value: 3
            },
            {
                name: d,
                value: 4
            }
        ],
        corret
    };
}

startQuizBtn.addEventListener('click',function() {
    $('#home').fadeOut(500,function() {
        displayQuestion(0);
    });
});
restartQuizBtn.addEventListener('click',function() {
    $('#result').fadeOut(500,function() {
        score=0;
        displayQuestion(0);
    });
});

function getWord(x) {
    let k = (x/questions.length)*100;
    if(k==100) return 'Perfect!';
    if(k >= 85) return 'Excellant!';
    if(k >= 75) return 'Very Good!';
    if(k >= 60) return 'Good!';
    return `That's okay, you can do better next time!`;
}
function createOption(i, j) {
    return `
        <div class="col-sm-6 col-12 px-3 py-2">
            <button class="option rounded-4 py-2" onclick="nextQuestion(${i},${questions[i].answers[j].value})">
                <p class="h2 text-center">${questions[i].answers[j].name}</p>
            </button>
        </div>
    `
}
function createQuestionHtml(i) {
    let box = `
    <div class="row mt-3">
        <div class="col-12 q-box">
            <h3 class="m-auto mb-2">${i+1} of ${questions.length}</h3>
            <h3 class="h3 m-auto mb-3">Analyze the time complexity of the following code</h3>
            <div class="img-box">
                <img src="${questions[i].img}" class="m-auto" alt="">
            </div>
        </div>
        <div class="col-12">
            <div class="answer-container px-3 py-1 m-auto mt-3">
               <div class="row">
    `;
    for (let j = 0; j < questions[i].answers.length; j++) {
        box += createOption(i, j);
    }
    box += `
                </div>
            </div>
        </div>
    </div>
    `
    return box;
}
function nextQuestion(i, val) {
    if (questions[i].corret == val) score++;
    displayQuestion(i + 1);
}
function displayQuestion(i) {
    if(i >= questions.length){
        displayAnswer();
        return;
    }
    $('#question').fadeOut(200, function () {
        questionBox.innerHTML = createQuestionHtml(i);
        setTimeout(function () { $('#question').fadeIn(200); }, 100)
    });
}
function displayAnswer(){
    $('#question').fadeOut(500,function(){
        loadResult();
        $('#result').fadeIn(500);
    });
}
function loadResult(){
    finalGrade.innerHTML = getWord(score);
    finalScore.innerHTML = `Your score is ${score}/${questions.length}`;
}