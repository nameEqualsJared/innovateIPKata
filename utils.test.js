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


// -- Unit tests for: arrayCount
test("routine input test 1", function () {
    const actual = arrayCount(4, [3, 2, 4, 5, 3, 5, 3, 5, 4, 34, 35, 434]);
    expect(actual).toBe(2);
});

test("routine input test 2", function () {
    const actual = arrayCount(13, [13, 13, 13, 13, 13, 42]);
    expect(actual).toBe(5);
});

test("routine input test 3 -- should NOT do type coercion, i.e. 3 != '3'", function () {
    const actual = arrayCount(3, [3, "3", 3]);
    expect(actual).toBe(2);
});

test("routine input test 4", function () {
    const actual = arrayCount(2, [1, 2, 3, 43, "fsa", 3.43, 343, 2]);
    expect(actual).toBe(2);
});

test("routine input test 5 -- should work fine with any type", function () {
    const actual = arrayCount("blue", ["blue", "blue", "red", "blue", "purple", 4]);
    expect(actual).toBe(3);
});

test("boundary input test 1", function () {
    const actual = arrayCount("blue", ["blue"]);
    expect(actual).toBe(1);
});

test("boundary input test 2", function () {
    const actual = arrayCount("blue", []);
    expect(actual).toBe(0);
});

test("boundary input test 3", function () {
    const actual = arrayCount("", ["23", 23, 324, "", 24]);
    expect(actual).toBe(1);
});

test("boundary input test 4", function () {
    const actual = arrayCount(null, ["2343", 23, 324, "hello"]);
    expect(actual).toBe(0);
});


// -- Unit tests for: getColorFrequencies. 
// I do believe these could also be considered integration tests, since getColorFrequencies calls arrayCount under the hood (and hence I'm testing how the two methods integrate together)
test("routine input test 1", function () {
    const actual = getColorFrequencies(["blue", "red", "red", "blue", "red", "yellow"]);
    expect(actual).toStrictEqual({ "red": 3, "blue": 2, "yellow": 1 });
});

test("routine input test 2", function () {
    const actual = getColorFrequencies(["white12", "black", "red", "blue", "turkey", "white12"]);
    expect(actual).toStrictEqual({ "white12": 2, "black": 1, "red": 1, "blue": 1, "turkey": 1 });
});

test("routine input test 3", function () {
    const actual = getColorFrequencies(["blue", "blue", "blue", "blue", "blue", "red"]);
    expect(actual).toStrictEqual({ "blue": 5, "red": 1 });
});

test("boundary input test 1", function () {
    const actual = getColorFrequencies(["blue"]);
    expect(actual).toStrictEqual({ "blue": 1 });
});

test("boundary input test 2", function () {
    const actual = getColorFrequencies([]);
    expect(actual).toStrictEqual({});
});

test("strange input test 1 -- should work with noncolors too", function () {
    const actual = getColorFrequencies(["123", "123", "3", "3", "3", "3", "323223442"]);
    expect(actual).toStrictEqual({ "123": 2, "3": 4, "323223442": 1 });
})




