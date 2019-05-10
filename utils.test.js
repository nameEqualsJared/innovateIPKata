// Unit testing utils.js

// import the diGraph class
const diGraph = require("./diGraph");
// import the functions we want to test
const { getInputColors, arrayCount, isUnlockable } = require("./utils");

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

// --Unit tests for: isUnlockable() ---------------------------------------------------------------------------------------------------
test("isUnlockable(), routine input test 1", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "b";
    const adjList = {
        a: ["c"],
        c: ["b"],
        b: []
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(true);
});

test("isUnlockable(), routine input test 2", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "b";
    const adjList = {
        a: ["c"],
        c: [],
        b: ["c"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});


test("isUnlockable(), routine input test 3", function () {
    // evaluate what we actually get
    const startColor = "a";
    const endColor = "b";
    const adjList = {
        a: ["c"],
        c: ["b"],
        b: ["c"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

test("isUnlockable(), routine input test 4", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "c";
    const adjList = {
        a: ["c"],
        c: ["b"],
        b: ["c"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(true);
});


test("isUnlockable(), routine input test 5", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "c";
    const adjList = {
        a: ["c", "b"],
        c: ["b"],
        b: ["c", "a"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(true);
});

test("isUnlockable(), routine input test 6", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "c";
    const adjList = {
        a: ["c", "b"],
        c: ["b", "a"],
        b: ["c", "a"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

test("isUnlockable(), routine input test 7", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "a";
    const adjList = {
        a: ["b"],
        b: ["a"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(true);
});

test("isUnlockable(), routine input test 8", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "a";
    const adjList = {
        a: ["b", "c"],
        b: ["a"],
        c: ["a"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(true);
});

test("isUnlockable(), routine input test 8", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "a";
    const adjList = {
        a: ["b", "c"],
        b: ["a"],
        c: ["a", "b"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

test("isUnlockable(), routine input test 8", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "a";
    const adjList = {
        a: ["b", "c"],
        b: ["a", "c"],
        c: ["a", "b"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(true);
});

test("isUnlockable(), routine input test 9", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "a";
    const adjList = {
        a: ["b"],
        b: ["c"],
        c: ["d", "a"],
        d: ["c"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(true);
});

test("isUnlockable(), routine input test 10", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "a";
    const adjList = {
        a: ["b"],
        b: ["c", "a"],
        c: ["d", "a"],
        d: ["c"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

test("isUnlockable(), routine input test 11", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "d";
    const adjList = {
        a: ["b"],
        b: ["a"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

test("isUnlockable(), routine input test 12", function () {
    // evaluate what we actually get
    const startColor = "d"
    const endColor = "a";
    const adjList = {
        a: ["b"],
        b: ["a"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

test("isUnlockable(), routine input test 13", function () {
    // evaluate what we actually get
    const startColor = "d"
    const endColor = "y";
    const adjList = {
        a: ["b"],
        b: ["a"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

test("isUnlockable(), routine input test 14", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "a";
    const adjList = {
        a: ["b"],
        b: ["a"],
        c: ["d"],
        d: ["c"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

test("isUnlockable(), routine input test 15", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "a";
    const adjList = {
        a: ["b"],
        b: ["a", "c"],
        c: []
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

test("isUnlockable(), routine input test 16", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "a";
    const adjList = {
        a: ["b"],
        b: ["a", "c"],
        c: ["b"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(true);
});

test("isUnlockable(), routine input test 17", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "a";
    const adjList = {
        a: ["b"],
        b: ["a", "c"],
        c: ["a"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

test("isUnlockable(), routine input test 18", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "b";
    const adjList = {
        a: ["b"],
        b: [],
        c: []
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

test("isUnlockable(), routine input test 19", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "b";
    const adjList = {
        a: ["b"],
        b: ["c"],
        c: []
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});


test("isUnlockable(), routine input test 20", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "c";
    const adjList = {
        a: ["b"],
        b: ["c"],
        c: []
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(true);
});

test("isUnlockable(), routine input test 21", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "c";
    const adjList = {
        a: ["b"],
        b: ["c", "a"],
        c: []
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

test("isUnlockable(), routine input test 22", function () {
    // evaluate what we actually get
    const startColor = "c"
    const endColor = "b";
    const adjList = {
        a: ["b"],
        b: ["c"],
        c: ["b", "a"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(true);
});

test("isUnlockable(), routine input test 23", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "b";
    const adjList = {
        a: ["b"],
        b: ["a"],
        c: ["d"],
        d: ["c"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});


test("isUnlockable(), routine input test 24", function () {
    // evaluate what we actually get
    const startColor = "b"
    const endColor = "b";
    const adjList = {
        a: ["b"],
        b: ["a"],
        c: ["d"],
        d: ["c"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

test("isUnlockable(), routine input test 25", function () {
    // evaluate what we actually get
    const startColor = "b"
    const endColor = "b";
    const adjList = {
        a: ["b"],
        b: ["a"],
        c: ["d"],
        d: ["c"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

test("isUnlockable(), routine input test 26", function () {
    // evaluate what we actually get
    const startColor = "b"
    const endColor = "g";
    const adjList = {
        b: ["g", "y"],
        g: ["y"],
        o: ["r"],
        r: ["g", "o", "p"],
        y: ["b", "r"],
        p: ["r"]
    }
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(true);
});

test("isUnlockable(), boundary input test 1", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "a";
    const adjList = {}
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

test("isUnlockable(), boundary input test 2", function () {
    // evaluate what we actually get
    const startColor = "a"
    const endColor = "b";
    const adjList = {}
    const diGraphRep = new diGraph(adjList);
    const actual = isUnlockable(startColor, endColor, diGraphRep);

    expect(actual).toBe(false);
});

