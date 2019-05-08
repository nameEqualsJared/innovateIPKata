(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Use object destructuring to import the relevant functions
const { getInputColors } = require("./utils");

const inputTA = document.querySelector("#input");

function initApp() {
    // refresh the output whenever the input changes
    inputTA.addEventListener("blur", generateNewOutput);

}

function generateNewOutput() {
    // get the input value
    console.log(getInputColors("blue, red\nmagenta, blueberry         \n   blac1, bLac1\n      teal,         purple"));

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
    const rawInputNoSpacesCommaSeparated = rawInput.replace(/\n/g, ","); //uses a regex to match all new lines
    console.log(rawInputNoSpacesCommaSeparated.split(","))
    //return rawInputNoSpacesCommaSeparated.split(",");
}

// export the relevant functions
module.exports = { getInputColors };

},{}]},{},[1]);
