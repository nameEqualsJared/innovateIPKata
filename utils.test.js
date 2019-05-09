// File for all the unit tests and integration tests ran by Jest

// import the functions we want to test
const { getInputColors, arrayCount, getColorFrequencies } = require("./utils");
const diGraph = require('./diGraph');

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

// -- Unit tests for: diGraph.helperConstructor()
test("routine input 1", function () {
    // evaluate what we actually get
    const chipColors = ["blue", "red", "red", "blue", "yellow", "blue", "green", "blue"];
    const actual = diGraph.helperConstructor(chipColors);

    // set up what we expect
    const adjList = { blue: ["red"], red: ["blue"], yellow: ["blue"], green: ["blue"] };
    const expected = new diGraph(adjList);

    expect(actual).toStrictEqual(expected);
})

test("routine input 2", function () {
    // evaluate what we actually get
    const chipColors = ["blue", "red", "blue", "yellow", "blue", "green", "blue", "red", "red", "blue"];
    const actual = diGraph.helperConstructor(chipColors);

    // set up what we expect
    const adjList = { blue: ["red", "yellow", "green", "red"], red: ["blue"] };
    const expected = new diGraph(adjList);

    expect(actual).toStrictEqual(expected);
})

test("routine input 3", function () {
    // evaluate what we actually get
    const chipColors = ["blue", "red", "blue", "green", "red", "green", "red", "blue"];
    const actual = diGraph.helperConstructor(chipColors);

    // set up what we expect
    const adjList = { blue: ["red", "green"], red: ["green", "blue"] };
    const expected = new diGraph(adjList);

    expect(actual).toStrictEqual(expected);
})


test("routine input 4", function () {
    // evaluate what we actually get
    const chipColors = ["black", "red", "purple", "black", "red", "green", "blue", "black", "black", "green", "black", "purple", "blue", "purple"];
    const actual = diGraph.helperConstructor(chipColors);

    // set up what we expect
    const adjList = { black: ["red", "green", "purple"], purple: ["black"], red: ["green"], blue: ["black", "purple"] };
    const expected = new diGraph(adjList);

    expect(actual).toStrictEqual(expected);
})

test("boudary input 1", function () {
    // evaluate what we actually get
    const chipColors = ["black", "red"];
    const actual = diGraph.helperConstructor(chipColors);

    // set up what we expect
    const adjList = { black: ["red"] };
    const expected = new diGraph(adjList);

    expect(actual).toStrictEqual(expected);
})


test("boudary input 2", function () {
    // evaluate what we actually get
    const chipColors = [];
    const actual = diGraph.helperConstructor(chipColors);

    // set up what we expect
    const adjList = {};
    const expected = new diGraph(adjList);

    expect(actual).toStrictEqual(expected);
})


test("strange input 1 -- should have no problem working with noncolors", function () {
    // evaluate what we actually get
    const chipColors = ["1", "12", "2", "1", "1", "2", "2", "12"];
    const actual = diGraph.helperConstructor(chipColors);

    // set up what we expect
    const adjList = { 1: ["12"], 2: ["1"], 1: ["2"], 2: ["12"] };
    const expected = new diGraph(adjList);

    expect(actual).toStrictEqual(expected);
})
