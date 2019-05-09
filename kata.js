// Use object destructuring to import the relevant functions
const { getInputColors, getColorFrequencies } = require("./utils");
const diGraph = require('./diGraph');

// const inputTA = document.querySelector("#input");

// function initApp() {
//     // refresh the output whenever the input changes
//     inputTA.addEventListener("blur", generateNewOutput);
// }

// function generateNewOutput() {
//     // get all input colors as an array. I.e., tokenize the input
//     const allInputColors = getInputColors(inputTA.value);

//     // save the start and end color markers
//     const startColor = allInputColors[0];
//     const endColor = allInputColors[1];

//     // create the chipColors arrays, which notably excludes the start and end color definitions
//     const chipColors = allInputColors.slice(2);

//     console.log(diGraph.helperConstructor(chipColors));


// }

// // Start the application
// initApp();

console.log(diGraph.helperConstructor(["blue", "red"]));
