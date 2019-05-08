
// All the following functions will be "public"

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

function getColorFrequencies(inpColorArr) {
    /*
    Input: inpColorArr, an array of the input colors (generated as defined above)
    Output: an object/map/associative array, where each key is a unique color from the input array, and each associated value is the count of that color in the input array
    Example:
        say inpColorArr = ["blue", "red", "red", "blue", "red", "yellow"] 
        Then the return object will be {"red": 3, "blue": 2, "yellow": 1}
    */
    const uniqColors = [...new Set(inpColorArr)];


}


// export the relevant functions
module.exports = { getInputColors, getColorFrequencies };
