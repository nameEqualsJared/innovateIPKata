// Use object destructuring to import the relevant functions
const diGraph = require('./diGraph');
const { getInputColors, isUnlockable, getUnlockOrder } = require("./utils");

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
        const outputOrder = getUnlockOrder(startColor, endColor, diGraphRep);
        // outputOrder is an array of the vertices in the eulerian path that solves the problem. Code below just print's out the output as the problem describes 
        let res = "";
        for (let i = 0; i < outputOrder.length - 1; i++) {
            res += outputOrder[i] + ", " + outputOrder[i + 1] + "\n";
        }
        outputTA.value = res;

    } else {
        outputTA.value = "Cannot unlock master panel";
    }
}

// Start the application
initApp();

