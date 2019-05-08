// Use object destructuring to import the relevant functions
const { getInputColors, getColorFrequencies } = require("./utils");

const inputTA = document.querySelector("#input");

function initApp() {
    // refresh the output whenever the input changes
    inputTA.addEventListener("blur", generateNewOutput);
}

function generateNewOutput() {
    // get all input colors as an array. I.e., tokenize the input
    const allInputColors = getInputColors(inputTA.value);

    // save the start and end color markers
    const startColor = allInputColors[0];
    const endColor = allIinputColors[1];

}

// Start the application
initApp();
