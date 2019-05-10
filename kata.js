// Use object destructuring to import the relevant functions
const { getInputColors, getColorFrequencies, isUnlockable } = require("./utils");
const diGraph = require('./diGraph');

const inputTA = document.querySelector("#input");
const outputTA = document.querySelector("#output");


function initApp() {
    // refresh the output whenever the input changes
    inputTA.addEventListener("blur", generateNewOutput);
}

function generateNewOutput() {
    // get all input colors as an array. I.e., tokenize the input
    const allInputColors = getInputColors(inputTA.value);

    // save the start and end color markers
    const startColor = allInputColors[0];
    const endColor = allInputColors[1];

    // create the chipColors arrays, which notably excludes the start and end color definitions
    const chipColors = allInputColors.slice(2);

    const diGraphRep = diGraph.helperConstructor(chipColors);

    outputTA.value = isUnlockable(startColor, endColor, diGraphRep);
}

// Start the application
initApp();

// const dg = new diGraph({
//     a: ["b", "c"],
//     c: ["b"],
//     b: []
// })

// dg.numConnectedComponents();