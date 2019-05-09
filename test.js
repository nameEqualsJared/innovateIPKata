// File for all the unit tests and integration tests ran by Jest

// import the functions we want to test
const { getInputColors, arrayCount, getColorFrequencies } = require("./utils");
const diGraph = require('./diGraph');

// ----- UNIT TESTS -----

// -- Unit tests for: getInputColors --------------------------------------------------------------------------------------------------
test("getInputColors, routine input test 1", function () {
    const actual = getInputColors("blue, red\nmagenta, blueberry         \n   blac1, bLac1\n      teal,         purple");
    expect(actual).toStrictEqual(["blue", "red", "magenta", "blueberry", "blac1", "bLac1", "teal", "purple"]);
});

test("getInputColors, routine input test 2", function () {
    const actual = getInputColors("blue, red\nmagen23,        blue324ry\nred,redred\nteal,purpleRedRedRed");
    expect(actual).toStrictEqual(["blue", "red", "magen23", "blue324ry", "red", "redred", "teal", "purpleRedRedRed"]);
});

test("getInputColors, routine input test 3", function () {
    const actual = getInputColors("    blACK, red         \n           apple,    puppy         \n asf, saffsaff      \nsafsaf,safsfa");
    expect(actual).toStrictEqual(["blACK", "red", "apple", "puppy", "asf", "saffsaff", "safsaf", "safsfa"]);
});

test("getInputColors, boundary input test 1", function () {
    const actual = getInputColors("a,b");
    expect(actual).toStrictEqual(["a", "b"]);
});

test("getInputColors, boundary input test 2", function () {
    const actual = getInputColors("");
    expect(actual).toStrictEqual([""]);
});

test("getInputColors, strange input test 1 -- should work with noncolors too", function () {
    const actual = getInputColors("123113,1331313    \n 313,3133 \n123,334\n 56,70");
    expect(actual).toStrictEqual(["123113", "1331313", "313", "3133", "123", "334", "56", "70"]);
});

// -- Unit tests for: diGraph.helperConstructor() ----------------------------------------------------------------------------------
test("diGraph.helperConstructor(), routine input 1", function () {
    // evaluate what we actually get
    const chipColors = ["blue", "red", "red", "blue", "yellow", "blue", "green", "blue"];
    const actualGraph = diGraph.helperConstructor(chipColors);

    // set up what we expect
    const adjList = { blue: ["red"], red: ["blue"], yellow: ["blue"], green: ["blue"] };
    const expectedGraph = new diGraph(adjList);

    expect(actualGraph).toStrictEqual(expectedGraph);
});

test("diGraph.helperConstructor(), routine input 2", function () {
    // evaluate what we actually get
    const chipColors = ["blue", "red", "blue", "yellow", "blue", "green", "blue", "red", "red", "blue"];
    const actualGraph = diGraph.helperConstructor(chipColors);

    // set up what we expect
    const adjList = { blue: ["red", "yellow", "green", "red"], red: ["blue"], yellow: [], green: [], };
    const expectedGraph = new diGraph(adjList);

    expect(actualGraph).toStrictEqual(expectedGraph);
});

test("diGraph.helperConstructor(), routine input 3", function () {
    // evaluate what we actually get
    const chipColors = ["blue", "red", "blue", "green", "red", "green", "red", "blue"];
    const actualGraph = diGraph.helperConstructor(chipColors);

    // set up what we expect
    const adjList = { blue: ["red", "green"], red: ["green", "blue"], green: [] };
    const expectedGraph = new diGraph(adjList);

    expect(actualGraph).toStrictEqual(expectedGraph);
});


test("diGraph.helperConstructor(), routine input 4", function () {
    // evaluate what we actually get
    const chipColors = ["black", "red", "purple", "black", "red", "green", "blue", "black", "black", "green", "black", "purple", "blue", "purple"];
    const actualGraph = diGraph.helperConstructor(chipColors);

    // set up what we expect
    const adjList = { black: ["red", "green", "purple"], purple: ["black"], red: ["green"], blue: ["black", "purple"], green: [] };
    const expectedGraph = new diGraph(adjList);

    expect(actualGraph).toStrictEqual(expectedGraph);
});

test("diGraph.helperConstructor(), routine input 5", function () {
    // evaluate what we actually get
    const chipColors = ["red", "blue", "red", "green"];
    const actualGraph = diGraph.helperConstructor(chipColors);

    // set up what we expect
    const adjList = { red: ["blue", "green"], blue: [], green: [] };
    const expectedGraph = new diGraph(adjList);

    expect(actualGraph).toStrictEqual(expectedGraph);
});

test("diGraph.helperConstructor(), boudary input 1", function () {
    // evaluate what we actually get
    const chipColors = ["black", "red"];
    const actualGraph = diGraph.helperConstructor(chipColors);

    // set up what we expect
    const adjList = { black: ["red"], red: [] };
    const expectedGraph = new diGraph(adjList);

    expect(actualGraph).toStrictEqual(expectedGraph);
});


test("diGraph.helperConstructor(), boudary input 2", function () {
    // evaluate what we actually get
    const chipColors = [];
    const actualGraph = diGraph.helperConstructor(chipColors);

    // set up what we expect
    const adjList = {};
    const expectedGraph = new diGraph(adjList);

    expect(actualGraph).toStrictEqual(expectedGraph);
});


test("diGraph.helperConstructor(), strange input 1 -- should have no problem working with noncolors", function () {
    // evaluate what we actually get
    const chipColors = ["1", "12", "2", "1", "1", "2", "2", "12"];
    const actual = diGraph.helperConstructor(chipColors);

    // set up what we expect
    const adjList = { 1: ["12", "2"], 2: ["1", "12"], 12: [] };
    const expected = new diGraph(adjList);

    expect(actual).toStrictEqual(expected);
});

// -- Unit tests for: arrayCount() --------------------------------------------------------------------------------------------------
test("arrayCount(), routine input test 1", function () {
    const actual = arrayCount(4, [3, 2, 4, 5, 3, 5, 3, 5, 4, 34, 35, 434]);
    expect(actual).toBe(2);
});

test("arrayCount(), routine input test 2", function () {
    const actual = arrayCount(13, [13, 13, 13, 13, 13, 42]);
    expect(actual).toBe(5);
});

test("arrayCount(), routine input test 3 -- should NOT do type coercion, i.e. 3 != '3'", function () {
    const actual = arrayCount(3, [3, "3", 3]);
    expect(actual).toBe(2);
});

test("arrayCount(), routine input test 4", function () {
    const actual = arrayCount(2, [1, 2, 3, 43, "fsa", 3.43, 343, 2]);
    expect(actual).toBe(2);
});

test("arrayCount(), routine input test 5 -- should work fine with any type", function () {
    const actual = arrayCount("blue", ["blue", "blue", "red", "blue", "purple", 4]);
    expect(actual).toBe(3);
});

test("arrayCount(), boundary input test 1", function () {
    const actual = arrayCount("blue", ["blue"]);
    expect(actual).toBe(1);
});

test("arrayCount(), boundary input test 2", function () {
    const actual = arrayCount("blue", []);
    expect(actual).toBe(0);
});

test("arrayCount(), boundary input test 3", function () {
    const actual = arrayCount("", ["23", 23, 324, "", 24]);
    expect(actual).toBe(1);
});

test("arrayCount(), boundary input test 4", function () {
    const actual = arrayCount(null, ["2343", 23, 324, "hello"]);
    expect(actual).toBe(0);
});


// --Unit tests for: .describeVertices() -------------------------------------------------------------------------------
test(".describeVertices(), routine input 1", function () {
    // evaluate what we actually get
    const adjList = {
        b: ["r", "g", "o"],
        o: ["r", "o", "t"],
        t: ["r"],
        r: ["g"],
        g: ["e", "o"]
    }
    const dGraph = new diGraph(adjList);
    const actualDesc = dGraph.describeVertices();

    // set up what we expect
    const expectedDesc = {
        b: { in: 0, out: 3 },
        o: { in: 3, out: 3 },
        t: { in: 1, out: 1 },
        r: { in: 3, out: 1 },
        g: { in: 2, out: 2 }
    }

    expect(actualDesc).toStrictEqual(expectedDesc);
});

test(".describeVertices(), routine input 2", function () {
    // evaluate what we actually get
    const adjList = {
        b: ["r", "t", "o"],
        o: ["r"],
        t: ["r", "q"]
    }
    const dGraph = new diGraph(adjList);
    const actualDesc = dGraph.describeVertices();

    // set up what we expect
    const expectedDesc = {
        b: { in: 0, out: 3 },
        o: { in: 1, out: 1 },
        t: { in: 1, out: 2 }
    }

    expect(actualDesc).toStrictEqual(expectedDesc);
});

test(".describeVertices(), routine input 3", function () {
    // evaluate what we actually get
    const adjList = {
        b: ["t", "o"],
        o: ["b", "t"],
        t: [],
    }
    const dGraph = new diGraph(adjList);
    const actualDesc = dGraph.describeVertices();

    // set up what we expect
    const expectedDesc = {
        b: { in: 1, out: 2 },
        o: { in: 1, out: 2 },
        t: { in: 2, out: 0 }
    }

    expect(actualDesc).toStrictEqual(expectedDesc);
});

test(".describeVertices(), routine input 4", function () {
    // evaluate what we actually get
    const adjList = {
        b: ["t"],
        o: ["t"],
        t: []
    }
    const dGraph = new diGraph(adjList);
    const actualDesc = dGraph.describeVertices();

    // set up what we expect
    const expectedDesc = {
        b: { in: 0, out: 1 },
        o: { in: 0, out: 1 },
        t: { in: 2, out: 0 }
    }

    expect(actualDesc).toStrictEqual(expectedDesc);
});

test(".describeVertices(), routine input 5", function () {
    // evaluate what we actually get
    const adjList = {
        b: ["g", "o"],
        o: ["t", "g"],
        g: ["o", "t"],
        t: []
    }
    const dGraph = new diGraph(adjList);
    const actualDesc = dGraph.describeVertices();

    // set up what we expect
    const expectedDesc = {
        b: { in: 0, out: 2 },
        o: { in: 2, out: 2 },
        g: { in: 2, out: 2 },
        t: { in: 2, out: 0 }
    }

    expect(actualDesc).toStrictEqual(expectedDesc);
});

test(".describeVertices(), boundary input 1", function () {
    // evaluate what we actually get
    const adjList = {
        b: ["g"],
        g: ["b"],
    }
    const dGraph = new diGraph(adjList);
    const actualDesc = dGraph.describeVertices();

    // set up what we expect
    const expectedDesc = {
        b: { in: 1, out: 1 },
        g: { in: 1, out: 1 },
    }

    expect(actualDesc).toStrictEqual(expectedDesc);
});

test(".describeVertices(), boundary input 2", function () {
    // evaluate what we actually get
    const adjList = {
        b: ["g"],
        g: [],
    }
    const dGraph = new diGraph(adjList);
    const actualDesc = dGraph.describeVertices();

    // set up what we expect
    const expectedDesc = {
        b: { in: 0, out: 1 },
        g: { in: 1, out: 0 },
    }

    expect(actualDesc).toStrictEqual(expectedDesc);
});


test(".describeVertices(), boundary input 3", function () {
    // evaluate what we actually get
    const adjList = {
        b: [],
        g: [],
    }
    const dGraph = new diGraph(adjList);
    const actualDesc = dGraph.describeVertices();

    // set up what we expect
    const expectedDesc = {
        b: { in: 0, out: 0 },
        g: { in: 0, out: 0 },
    }

    expect(actualDesc).toStrictEqual(expectedDesc);
});

test(".describeVertices(), boundary input 4", function () {
    // evaluate what we actually get
    const adjList = {
        b: [],
    }
    const dGraph = new diGraph(adjList);
    const actualDesc = dGraph.describeVertices();

    // set up what we expect
    const expectedDesc = {
        b: { in: 0, out: 0 },
    }

    expect(actualDesc).toStrictEqual(expectedDesc);
});

test(".describeVertices(), boundary input 5", function () {
    // evaluate what we actually get
    const adjList = {}
    const dGraph = new diGraph(adjList);
    const actualDesc = dGraph.describeVertices();

    // set up what we expect
    const expectedDesc = {}

    expect(actualDesc).toStrictEqual(expectedDesc);
});

// --Unit tests for: isUnlockable()

