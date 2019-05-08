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

function isCombinationValid(inpColors){
    /*
    
}


// export the relevant functions
module.exports = { getInputColors, arrayCount, getColorFrequencies };
