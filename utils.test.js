// File for all the unit tests and integration tests ran by Jest

// import the functions we want to test
const { getInputColors, arrayCount, getColorFrequencies } = require("./utils");

// ----- UNIT TESTS -----

// -- Unit tests for: getInputColors
test("routine input test 1", function () {
    const actual = getInputColors("blue, red\nmagenta, blueberry         \n   blac1, bLac1\n      teal,         purple");
    expect(actual).toStrictEqual(["blue", "red", "magenta", "blueberry", "blac1", "bLac1", "teal", "purple"]);
});

test("routine input test 2", function () {
    const actual = getInputColors("blue, red\nmagen23,        blue324ry\nred,redred\nteal,purpleRedRedRed");
    expect(actual).toStrictEqual(["blue", "red", "magen23", "blue324ry", "red", "redred", "teal", "purpleRedRedRed"]);
});

test("routine input test 3", function () {
    const actual = getInputColors("    blACK, red         \n           apple,    puppy         \n asf, saffsaff      \nsafsaf,safsfa");
    expect(actual).toStrictEqual(["blACK", "red", "apple", "puppy", "asf", "saffsaff", "safsaf", "safsfa"]);
});

test("boundary input test 1", function () {
    const actual = getInputColors("a,b");
    expect(actual).toStrictEqual(["a", "b"]);
})

test("boundary input test 2", function () {
    const actual = getInputColors("");
    expect(actual).toStrictEqual([""]);
})

test("strange input test 1 -- should work with noncolors too", function () {
    const actual = getInputColors("123113,1331313    \n 313,3133 \n123,334\n 56,70");
    expect(actual).toStrictEqual(["123113", "1331313", "313", "3133", "123", "334", "56", "70"]);
})




