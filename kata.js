// Use object destructuring to import the relevant functions
const { getInputColors } = require("./utils");

const inputTA = document.querySelector("#input");

function initApp() {
    // refresh the output whenever the input changes
    inputTA.addEventListener("blur", generateNewOutput);
}

function generateNewOutput() {
    // get the input colors as an array
    const inputColors = getInputColors(inputTA.value);

    // save the start and end colors
    const startColor = inputColors[0];
    const endColor = inputColors[1];

    // 

}

// Start the application
initApp();
