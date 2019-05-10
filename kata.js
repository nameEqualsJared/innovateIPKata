// Use object destructuring to import the relevant functions
const diGraph = require('./diGraph');
const { getInputColors, getColorFrequencies, isUnlockable } = require("./utils");

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

    // create the directed graph representation of the problem
    const diGraphRep = diGraph.helperConstructor(chipColors);

    // figure out if problem solvable (isUnlockable returns a boolean)
    const panelUnlockable = isUnlockable(startColor, endColor, diGraphRep);

    if (panelUnlockable) {


    } else {
        outputTA.value = "Cannot unlock master panel";
    }
}

// Start the application
initApp();

// const startColor = "a"
// const endColor = "a";
// const adjList = {
//     a: ["b"],
//     b: ["a"],
//     c: ["d"],
//     d: ["c"]
// }
// const diGraphRep = new diGraph(adjList);
// isUnlockable(startColor, endColor, diGraphRep);