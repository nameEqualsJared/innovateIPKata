(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Use object destructuring to import the relevant functions
const { getInputColors, getColorFrequencies } = require("./utils");

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

    // get the frequency of every chip color in the input sequence (i.e., the pairs of colors)
    const colorFreqs = getColorFrequencies(inputColors.slice(2)) // we use .slice(2) to exlude the start and end color definitions

    console.log(colorFreqs);

}

// Start the application
initApp();

},{"./utils":2}],2:[function(require,module,exports){
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

function arrayCount(elem, arr) {
    /*
        Input:
            elem, the element to return the count of 
            arr, the array to get the count from
        Output: the count of the element in the array
        Example: 
            say elem = 3 and arr = [2,4,3,45,32,52,3]
            then return value would be 2
    */
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (elem === arr[i]) {
            count++;
        }
    }
    return count;

    /*
    Could also implement in a more functional style like this:
        return (arr.filter(entry => (entry === elem))).length
    But I think the method above is more readable
    */

}

function getColorFrequencies(inpColorArr) {
    /*
    Input: inpColorArr, an array of the input colors (generated as defined above)
    Output: an object/map/associative array, where each key is a unique color from the input array, and each associated value is the count of that color in the input array
    Example:
        say inpColorArr = ["blue", "red", "red", "blue", "red", "yellow"] 
        Then the return object will be {"red": 3, "blue": 2, "yellow": 1}
    */
    const uniqColors = [...new Set(inpColorArr)];
    let res = {};
    for (let color of uniqColors) {
        res[color] = arrayCount(color, inpColorArr);
    }
    return res;

}


// export the relevant functions
module.exports = { getInputColors, arrayCount, getColorFrequencies };

},{}]},{},[1]);
