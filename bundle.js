(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Use ES6 class for readability; though I do believe JS doesn't have "real" classes, and just uses constructor functions under the hood
class diGraph {
    /*
    This class bueprints out a simple directed graph object. 
    It uses an adjacency list representation for the graph.
    */

    constructor(vertices, adjList) {
        /*
        vertices is an array of all the vertices.
            Ex: ["green", "blue", ....etc]

        adjList is the adjacency list for the directed graph:
            Ex: {"vertex1": ["vertex3", "vertex5"], "vertex2": ["vertex1", "vertex5"], ...etc}
            This encodes the edges: i.e., it tells us there is a directed edge from vertex1 to vertex3, a directed edge from vertex1 to vertex5, a directed edge from vertex2 to vertex1, etc...
        */
        this.vertices = vertices;
        this.adjList = adjList;
    }

    static helperConstructor(chipColors) {
        /*
        Helper function to construct a diGraph object from the raw chipColors

        Input: chipColors, an array of all the chip definitions (not including the start and end color)
        Output: the respective diGraph object for those chipColors

        Example:
            if chipColors = ["blue", "red", "red", "blue", "yellow", "blue", "red": "yellow"] 
            Then returned diGraph object is
                {
                    vertices: ["blue", "red", "yellow"],
                    adjList: {"blue": ["red"], "red": ["blue", "yellow"], "blue": ["yellow"]}
                }
        */

        const vertices = [...new Set(chipColors)]; // vertices is an array of all the unique colors

        let adjList = {};
        for (let i = 0; i < chipColors.length; i = i + 2) {
            const source = chipColors[i];
            const dest = chipColors[i + 1];
            // We need to add an edge from source to dest...
            // To do so, we will check: does this vertex already have an entry in the adjList? If so, we just the edge by updating the array; otherwise, we create an entry for it
            if (source in adjList) {
                // key exists in the adjList, so we need to add this destination into the associated array 
                const attachedVertices = adjList[source]
                attachedVertices.push(dest);
            } else {
                adjList[source] = [dest];
            }
        }

        return new diGraph(vertices, adjList);
    }

}

module.exports = diGraph;
},{}],2:[function(require,module,exports){
// Use object destructuring to import the relevant functions
const { getInputColors, getColorFrequencies } = require("./utils");
const diGraph = require('./diGraph');

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
    const endColor = allInputColors[1];

    // create the chipColors arrays, which notably excludes the start and end color definitions
    const chipColors = allInputColors.slice(2);

    console.log(diGraph.helperConstructor(chipColors));


}

// Start the application
initApp();


},{"./diGraph":1,"./utils":3}],3:[function(require,module,exports){
function getInputColors(rawInput) {
    /*
     Input: rawInput, a string of the entire user input
     Output: all the colors in an array, properly tokenized.
     Example:
        Say rawInput = "blue, red\nmagenta, blueberry         \n   blac1, bLac1\n      teal,         purple" 
        Then the returned array will be ["blue", "red", "magenta", "blueberry","blac1","bLac1","teal","purple"]
    */
    const rawInputNoSpaces = rawInput.replace(/ /g, ""); // uses a regex to match all spaces
    const rawInputNoSpacesCommaSeparated = rawInputNoSpaces.replace(/\n/g, ","); //uses a regex to match all new lines
    return rawInputNoSpacesCommaSeparated.split(",");
}


// export the relevant functions
module.exports = { getInputColors };

},{}]},{},[2]);
