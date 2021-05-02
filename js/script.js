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
const word = "magnolia";
/* Array of guessed letters */
const guessedLetters = [];

/* Function to replace letters of word with circles */
const circles = function (word) {
    let output = [];
    for (let letter in word) {
        output.push("●");
    }
    wordInProgress.innerText = output.join("");
};

circles(word);

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
}

const makeGuess = function (letter) {
    const upper = letter.toUpperCase();
    if (guessedLetters.includes(upper)) {
        message.innerText = "You've already guessed that letter!";
    }
    else {
        guessedLetters.push(upper);
        console.log(guessedLetters);
    }
}