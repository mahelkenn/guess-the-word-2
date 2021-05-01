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

/* Function to replace letters of word with circles */
const circles = function (word) {
    let output = [];
    for (let letter in word) {
        output.push("●")
    }
    wordInProgress.innerText = output.join("");
};

circles(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    let letterInput = textInput.value;
    console.log(letterInput);
    textInput.value = "";
});