/* -------------------------- Element Selection --------------------------------------- */
/* Unordered list where the player's guessed letters will appear */
const lettersList = document.querySelector(".guessed-letters");

/*The button with the text "Guess!" in it */
const guessButton = document.querySelector(".guess");

/* The text input where the player will guess a letter */
const textInput = document.querySelector(".letter");

/* The empty paragraph where the word in progress will appear */
const wordInProgress = document.querySelector(".word-in-progress");

/* The paragraph where the remaining guesses will display */
const remaining = document.querySelector(".remaining");

/* The span inside the paragraph where the remaining guesses will display  */
const span = document.querySelector("span");

/* The empty paragraph where messages will appear when the player guesses a letter  */
const message = document.querySelector(".message");

/* The hidden button that will appear prompting the player to play again  */
const newGameButton = document.querySelector(".play-again")

/* Word selected for testing */
let word = "magnolia";
/* Array of guessed letters */
const guessedLetters = [];
/* Remaining Number of Guesses */
let remainingGuesses = 8;

/* API call to pull words in */
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    circles(word);
};

getWord();

/* Function to replace letters of word with circles */
const circles = function (word) {
    let output = [];
    for (let letter in word) {
        output.push("●");
    }
    wordInProgress.innerText = output.join("");
};

/* Function to run during button click */
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    let letterInput = textInput.value;
    textInput.value = "";
    message.innerText = "";
    const letter = validate(letterInput);
    if (letter !== undefined) {
        makeGuess(letter);
    }
});

/* Function to check for correct input */
const validate = function(letterInput) {
    const acceptedLetter = /[a-zA-Z]/;
    if (letterInput === "") {
        message.innerText = "You forgot to enter your letter!";
    }
    else if (letterInput.length > 1) {
        message.innerText = "Please enter a single letter.";
    }
    else if (letterInput.match(acceptedLetter)) {
        return letterInput;
    }
    else {
        message.innerText = "Please enter a letter."
    }
};

/* Function to update guesses */
const makeGuess = function (letter) {
    const upper = letter.toUpperCase();
    if (guessedLetters.includes(upper)) {
        message.innerText = "You've already guessed that letter!";
    }
    else {
        guessedLetters.push(upper);
        displayLettersGuessed();
        updateGuessesRemaining(upper);
        updateWord(guessedLetters);
    }
};

/* Function to display already guessed letters */
const displayLettersGuessed = function () {
    lettersList.innerHTML = "";
    for (let letter of guessedLetters) {
        let li = document.createElement("li");
        li.innerText = letter;
        lettersList.append(li)
    }
} ;

/* Function to display word with correctly guessed letters displayed */
const updateWord = function (guessedLetters) {
    let wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    let output = [];
    for (let letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            output.push(letter);
        }
        else {
            output.push("●");
        }
        wordInProgress.innerText = output.join("");
        wonGame();
    }
};

/* Function to updated the number of guesses remaining */
const updateGuessesRemaining = function (guess) {
    let wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)) {
        message.innerText = "Good guess, that's a correct letter!";
    }
    else {
        remainingGuesses -= 1;
        message.innerText = "Nice try, but that letter isn't in the word."
        span.innerText = remainingGuesses;
    }
    if (remainingGuesses === 0) {
        message.innerText = `Sorry, you lost.  The correct word was ${wordUpper}.`;
    }
};

/* Function to check if game has been won */
const wonGame = function () {
    let wordUpper = word.toUpperCase();
    if (wordInProgress.innerText === wordUpper) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
    }
};