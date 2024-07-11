const option = document.querySelectorAll('.option');
const questionArea = document.querySelector('.question');
const firstOption = document.querySelector('#option-1');
const secondOption = document.querySelector('#option-2');
const thirdOption = document.querySelector('#option-3');
const fourthOption = document.querySelector('#option-4');
let scoreDisplay = document.querySelector('.score');
let data = [
    {
        'question': 'What is capital of INDIA',
        'optionOne': 'Mumbai',
        'optionTwo': 'Delhi',
        'optionThree': 'Chennai',
        'optionFour': 'Bangalore',
        'correctOption': 'Delhi'
    },
    {
        'question': 'What is capital of USA',
        'optionOne': 'California',
        'optionTwo': 'Chicago',
        'optionThree': 'Washington DC',
        'optionFour': 'San Francisco',
        'correctOption': 'Washington DC'
    },
    {
        'question': 'Which river is the longest in the world?',
        'optionOne': 'Amazon',
        'optionTwo': 'Mississippi',
        'optionThree': 'Nile',
        'optionFour': 'Yangtze',
        'correctOption': 'Nile'
    },
    {
        'question': 'What animal is the national symbol of Australia?',
        'optionOne': 'Kangaroo',
        'optionTwo': 'Koala',
        'optionThree': 'Emu',
        'optionFour': 'Crocodile',
        'correctOption': 'Kangaroo'
    },
    {
        'question': 'What is the name of the process by which plants convert sunlight into energy?',
        'optionOne': 'Respiration',
        'optionTwo': 'Photosynthesis',
        'optionThree': 'Oxidation',
        'optionFour': 'Evolution',
        'correctOption': 'Photosynthesis'
    },
    {
        'question': 'What chemical element is designated as “Hg”?',
        'optionOne': 'Silver',
        'optionTwo': 'Tin',
        'optionThree': 'Copper',
        'optionFour': 'Mercury',
        'correctOption': 'Mercury'
    },
    {
        'question': 'Hitler party is known as:',
        'optionOne': 'Labour Party',
        'optionTwo': 'Nazi Party',
        'optionThree': 'Ku-Klux-Klan',
        'optionFour': 'Democratic Party',
        'correctOption': 'Nazi Party'
    },
    {
        'question': 'What is the official currency of Japan?',
        'optionOne': 'Won',
        'optionTwo': 'Yuan',
        'optionThree': 'Yen',
        'optionFour': 'Dollars',
        'correctOption': 'Yen'
    },
    {
        'question': 'Which animal can be seen on the Porsche logo?',
        'optionOne': 'Horse',
        'optionTwo': 'Cougar',
        'optionThree': 'Dog',
        'optionFour': 'Cheetah',
        'correctOption': 'Horse'
    },
]
let questionNo = 0;
let checkStatus = false;
let score = 0;
let currentQuestion = data[questionNo];
// Check if there is saved data in localStorage
if (localStorage.getItem('quizScore')) {
    score = parseInt(localStorage.getItem('quizScore'));
    scoreDisplay.innerHTML = score;
}

if (localStorage.getItem('quizQuestionNo')) {
    questionNo = parseInt(localStorage.getItem('quizQuestionNo'));
    currentQuestion = data[questionNo];
}
startQuiz();
function startQuiz(){
    questionArea.innerHTML = currentQuestion.question;
    firstOption.innerHTML = currentQuestion.optionOne;
    secondOption.innerHTML = currentQuestion.optionTwo;
    thirdOption.innerHTML = currentQuestion.optionThree;
    fourthOption.innerHTML = currentQuestion.optionFour;
    option.forEach(element =>{
    element.addEventListener('click',handleClick);
});

}
function handleClick(e){
    e.stopPropagation();
    if(checkStatus) return;
    let selectedOption = e.target;
    let answer = e.target.textContent; 
    evaluateResult(selectedOption,answer);
    if(questionNo < data.length - 1){
        nextQuestion();
    }
    else{
        scoreDisplay.innerHTML = `Your final score: <span>${score}</span>`;
        option.forEach(element => {
        element.removeEventListener('click', handleClick);
    });
    clearLocalStorage();
    }
}

function evaluateResult(elementInfo,a){
    if(a === currentQuestion.correctOption){
        score++;
        localStorage.setItem('quizScore', score);
        // alert('Right answer')
        checkStatus = true;
    }
    else{
        checkStatus = true;
        // alert('Wrong answer');
    }
     option.forEach(element => {
        element.removeEventListener('click', handleClick);
    });
    scoreDisplay.innerHTML = score;
}

function nextQuestion(){
    questionNo++;
    localStorage.setItem('quizQuestionNo', questionNo);
    checkStatus = false;
    currentQuestion = data[questionNo];
    startQuiz();
}

function clearLocalStorage() {
    localStorage.removeItem('quizScore');
    localStorage.removeItem('quizQuestionNo');
}