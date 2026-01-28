// ------------------------Game State------------------------
// Store the current game mode
// "CPU" = Player vs Computer
// "PvP" = Player vs Player

let aMode = "cpu";

// In PvP mode, Player 1 picks first. 
// We temporarily store Player 1's choice
// Until Player 2 makes their choice

let aPendingChoice = "";

//Track Player 1's total wins
let aP1Score = 0;
//Track Player 2's total wins
let aP2Score = 0;
//Tracks how many tie rounds occurred
let aTies = 0;

// -----------------------API Config-----------------------
//Change this to our API endpoint that returns a random move as a string.
//Example options your API could return "Rock","Paper","Scissors"
//Create a variable to hold our URL https://rpsdemov1-bad6e5b0eff8bxdc.westus3-01.azurewebsites.net/api/rps/rps
const aCPUApiUrl = "https://cpulecturebackendbe-bfdghgcxbjepbmhk.westus3-01.azurewebsites.net/CPURPSLS/rpsls";

// -----------------------DOM References-----------------------
// Gets the CPU mode button from the HTML
const aBtnModeCpu = document.getElementById("btnModeCpu");

// Gets the PVP mode button from the HTML
const aBtnModePvp = document.getElementById("btnModePvp");

// Gets the text element that explains the current mode
const aModeHint = document.getElementById("modeHint");

// Gets the element that displays Player 1's choice
const aP1PickEl = document.getElementById("p1Pick");

// Gets the element that displays Player 2's choice
const aP2PickEl = document.getElementById("p2Pick");

// Gets the element that displays the result of the round
const aRoundResultEl = document.getElementById("roundResult");

// Gets the entire Player 2 section (hidden in CPU mode)
const aP2Section = document.getElementById("p2Section");

// Gets the hint text shown to Player 2
const aP2Hint = document.getElementById("p2Hint");

// Gets the element that displays Player 1's score
const aP1ScoreEl = document.getElementById("p1Score");

// Gets the element that displays Player 2's score
const aP2ScoreEl = document.getElementById("p2Score");

// Gets the element that displays tie count
const aTiesEl = document.getElementById("ties");

// Gets the "Play Again" button
const aBtnPlayAgain = document.getElementById("btnPlayAgain");

// Gets the "Reset Game" button
const aBtnReset = document.getElementById("btnReset");

// Player 1 choice buttons
const aBtnP1Rock = document.getElementById("btnP1Rock");
const aBtnP1Paper = document.getElementById("btnP1Paper");
const aBtnP1Scissors = document.getElementById("btnP1Scissors");

// Player 2 choice buttons (only used in PVP mode)
const aBtnP2Rock = document.getElementById("btnP2Rock");
const aBtnP2Paper = document.getElementById("btnP2Paper");
const aBtnP2Scissors = document.getElementById("btnP2Scissors");

// ------------------------DOM Event Listeners------------------------
// When CPU mode button is clicked
aBtnModeCpu.addEventListener("click", function () {

    // Switch the game mode to CPU
    aSetMode("cpu");
});

// When PVP mode button is clicked
aBtnModePvp.addEventListener("click", function () {

    // Switch the game mode to PVP
    aSetMode("pvp");
});

// ----- Player 1 buttons -----

// Player 1 clicks Rock
aBtnP1Rock.addEventListener("click", function () {

    // Pass "rock" into Player 1 handler
    aHandleP1Pick("rock");
});

// Player 1 clicks Paper
aBtnP1Paper.addEventListener("click", function () {

    // Pass "paper" into Player 1 handler
    aHandleP1Pick("paper");
});

// Player 1 clicks Scissors
aBtnP1Scissors.addEventListener("click", function () {

    // Pass "scissors" into Player 1 handler
    aHandleP1Pick("scissors");
});


// ----- Player 2 buttons -----

// Player 2 clicks Rock
aBtnP2Rock.addEventListener("click", function () {

    // Pass "rock" into Player 2 handler
    aHandleP2Pick("rock");
});

// Player 2 clicks Paper
aBtnP2Paper.addEventListener("click", function () {

    // Pass "paper" into Player 2 handler
    aHandleP2Pick("paper");
});

// Player 2 clicks Scissors
aBtnP2Scissors.addEventListener("click", function () {

    // Pass "scissors" into Player 2 handler
    aHandleP2Pick("scissors");
});


// ----- Play again button -----

aBtnPlayAgain.addEventListener("click", function () {

    // Clear any stored Player 1 choice
    aPendingP1Choice = "";

    // Clear the UI picks (question marks, messages, etc.)
    aClearPicksUI();

    // Reset hint text for PVP mode
    if (aMode === "pvp") {
        aP2Hint.textContent = "Waiting for Player 1...";
    }
});

// ----- Reset game button -----

aBtnReset.addEventListener("click", function () {

    // Reset all scores back to zero
    aP1Score = 0;
    aP2Score = 0;
    aTies = 0;

    // Clear stored Player 1 choice
    aPendingP1Choice = "";

    // Clear the UI for picks and messages
    aClearPicksUI();

    // Update the score display on the screen
    aUpdateScoreUI();

    // Reset Player 2 hint if in PVP mode
    if (aMode === "pvp") {
        aP2Hint.textContent = "Waiting for Player 1...";
    }
});

// ------------------------Helper Functions------------------------
//Create a function that switches the game modes between CPU and PvP mode.
//This function will also reset the values and update our UI.

function aSetMode(aNewMode) {
    //Update the global game mode
    aMode = aNewMode;

    //Clear any stored Player 1 choices
    aPendingChoice = "";

    //Reset the UI pick display(we have not created this yet)
    aClearPicksUI();

    // If CPU mode is Selected?
    if (aMode === "cpu") {
        //Highlight the CPU button
        aBtnModeCpu.classList.add("active");
        //Remove the highlight from the PvP button
        aBtnModePvp.classList.remove("active");
        //Hide Player 2 controls
        aP2Section.style.display = "none";
        //Update the instructions
        aModeHint.textContent = "Pick your move. The CPU will pick automatically."
    } else {
        // Highlight the PVP button
        aBtnModePvp.classList.add("active");

        // Remove highlight from CPU button
        aBtnModeCpu.classList.remove("active");

        // Show Player 2 controls
        aP2Section.style.display = "block";

        // Update instructions
        aModeHint.textContent = "Player 1 picks first, then Player 2 picks.";

        // Tell Player 2 to wait
        aP2Hint.textContent = "Waiting for Player 1...";
    }
};

//Clear the visuals display of the current round
//IMPORTANT! this does not reset the score
function aClearPicksUI() {
    //Reset Player 1 pick display
    aP1PickEl.textContent = "_";
    //Reset Player 2 pick display
    aP2PickEl.textContent = "_";

    //Reset the round message
    aRoundResultEl.textContent = "Make a pick to start";
};

//Updates the score numbers on the screen to match the internal score variables

function aUpdateScoreUI() {
    //Show Player 1 Score
    aP1ScoreEl.textContent = aP1Score;
    //Show Player 2 Score
    aP2ScoreEl.textContent = aP2Score;
    //Show Tie Count
    aTiesEl.textContent = aTies;
};

//Generate a random CPU choice
function aRandomCPUChoice() {
    //Generate a number 0, 1, or 2
    let aNum = Math.floor(Math.random() * 3);

    //Map number to a choice
    if (aNum === 0) return "rock";
    if (aNum === 1) return "paper";
    return "scissors";
};

//-------Get the CPU choice from our external API
//Expectations:
//We want the API to return either:
//1.Plain text: Ex. "rock"
//2.JSON {choice: "rock"}

function aGetCPUChoiceFromApi() {
    return fetch(aCPUApiUrl).then(function (response) {
        return response.text();
    }).then(function (text) {
        return text.trim().toLocaleLowerCase();
    });
}

//Determine the winner of round
function aGetWinner(aP1, aP2) {
    //Check if its a tie if they both picked the same choice
    if (aP1 === aP2) return "tie";

    //Player 1 win conditions
    if (aP1 === "rock" && aP2 === "scissors") return "p1";
    if (aP1 === "paper" && aP2 === "rock") return "p1";
    if (aP1 === "scissors" && aP2 === "paper") return "p1";
    return "p2";
};

//Execute a full round of the game.
function aPlayRound(aP1Choice, aP2Choice) {
    //Display Player 1's choice
    aP1PickEl.textContent = aP1Choice;
    //Display Player 2's choice
    aP2PickEl.textContent = aP2Choice;
    //Determine who won
    let aWinner = aGetWinner(aP1Choice, aP2Choice);
    //Handle tie case
    if (aWinner === "tie") {
        aTies += 1;
        aRoundResultEl.textContent = "Tie!"
    }
    //Handle Player 1 win
    else if (aWinner === "p1") {
        aP1Score += 1;
        aRoundResultEl.textContent = "Player 1 wins the round!"
    }
    //Handle Player 2 or CPU win
    else {
        aP2Score += 1;
        if (aMode === "cpu") {
            aRoundResultEl.textContent = "CPU wins the round!"
        }
        else {
            aRoundResultEl.textContent = "Player 2 wins the round!"
        };
    }
    //Refresh the score and display
    aUpdateScoreUI();
};

// ------------------------Click Handlers------------------------
//These functions run when players clicks buttons
function aHandleP1Pick(aChoice) {
    // This function runs when Player 1 picks rock, paper, or scissors
    // aChoice is the string passed in ("rock", "paper", or "scissors")

    // Check if the game is in CPU mode

    if (aMode === "cpu") {
        //Show quick status while waiting for API call
        aP1PickEl.textContent = aChoice;
        aP2PickEl.textContent = "....";
        aRoundResultEl.textContent = "CPU is making their choice....."
        //Get the CPU move from our API then play the round. This replacing the random function in our JavaScript.
        aGetCPUChoiceFromApi().then(function (aCpuChoice) {

            //Play the round immediately using Player 1's choice and CPU's choice
            aPlayRound(aChoice, aCpuChoice);
        })
        return;
    }

    // ----- PVP MODE LOGIC -----

    // Store Player 1's choice temporarily
    // Player 2 has not picked yet
    aPendingChoice = aChoice;

    // Show Player 1's choice on the screen
    aP1PickEl.textContent = aChoice;

    // Hide Player 2's choice until they pick
    aP2PickEl.textContent = "?";

    // Update the round message to tell Player 2 to pick
    aRoundResultEl.textContent = "Player 2, make your pick!";

    // Update Player 2 hint text
    aP2Hint.textContent = "Your turn!";
};

//handle Player 2's pick
function aHandleP2Pick(aChoice) {
    // This function runs when Player 2 clicks a button
    // aChoice is Player 2's selection

    // If Player 1 has NOT picked yet, do nothing
    if (aPendingChoice === "") {
        return;
    }

    // Both players have picked, so play the round
    aPlayRound(aPendingChoice, aChoice);

    // Clear Player 1's stored choice for the next round
    aPendingChoice = "";

    // If still in PVP mode, update the hint text
    if (aMode === "pvp") {
        aP2Hint.textContent = "Waiting for Player 1...";
    }
};