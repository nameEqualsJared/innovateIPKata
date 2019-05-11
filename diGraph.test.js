// Unit testing diGraph.js (i.e. testing the methods in the diGraph class)

// import the class we wish to test
const diGraph = require('./diGraph');


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


// -- Unit tests for: .isNumConCompsUndirOne() --------------------------------------------------------------------
test(".isNumConCompsUndirOne(), routine input 1", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b"],
        b: [],
        c: ["b"]
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumConCompsUndirOne();

    expect(actualNum).toBe(true);
});

test(".isNumConCompsUndirOne(), routine input 2", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b"],
        b: ["c"],
        c: ["b"]
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumConCompsUndirOne();

    expect(actualNum).toBe(true);
});

test(".isNumConCompsUndirOne(), routine input 3", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b"],
        b: [],
        c: ["d"],
        d: []
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumConCompsUndirOne();

    expect(actualNum).toBe(false);
});

test(".isNumConCompsUndirOne(), routine input 3", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b"],
        b: [],
        c: ["d"],
        d: []
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumConCompsUndirOne();

    expect(actualNum).toBe(false);
});

test(".isNumConCompsUndirOne(), routine input 4", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b"],
        b: ["a"],
        c: ["d"],
        d: ["c"]
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumConCompsUndirOne();

    expect(actualNum).toBe(false);
});

test(".isNumConCompsUndirOne(), routine input 5", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b"],
        b: ["a", "d"],
        c: ["d"],
        d: ["c", "b"]
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumConCompsUndirOne();

    expect(actualNum).toBe(true);
});

test(".isNumConCompsUndirOne(), routine input 6", function () {
    // evaluate what we actually get
    const adjList = {
        b: ["y"],
        y: ["r"],
        r: ["o", "g"],
        o: ["p"],
        p: [],
        g: []
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumConCompsUndirOne();

    expect(actualNum).toBe(true);
});

test(".isNumConCompsUndirOne(), routine input 7", function () {
    // evaluate what we actually get
    const adjList = {
        b: ["y"],
        y: ["r"],
        r: ["o", "g"],
        o: ["r"],
        g: []
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumConCompsUndirOne();

    expect(actualNum).toBe(true);
});

test(".isNumConCompsUndirOne(), routine input 8", function () {
    // evaluate what we actually get
    const adjList = {
        b: ["g", "y"],
        g: ["y"],
        y: ["b", "r"],
        r: ["o", "g"],
        o: ["r"]
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumConCompsUndirOne();

    expect(actualNum).toBe(true);
});

test(".isNumConCompsUndirOne(), routine input 9", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b", "e"],
        b: ["c", "a"],
        c: ["d"],
        d: ["e"],
        e: ["d", "a"]
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumConCompsUndirOne();

    expect(actualNum).toBe(true);
});

test(".isNumConCompsUndirOne(), routine input 10", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b"],
        b: ["a"],
        c: ["d"],
        d: ["a"],
        e: []
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumConCompsUndirOne();

    expect(actualNum).toBe(false);
});

test(".isNumConCompsUndirOne(), boundary input 1", function () {
    // evaluate what we actually get
    const adjList = {
        a: [],
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumConCompsUndirOne();

    expect(actualNum).toBe(true);
});

test(".isNumConCompsUndirOne(), boundary input 0", function () {
    // evaluate what we actually get
    const adjList = {}
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumConCompsUndirOne();

    expect(actualNum).toBe(false);
});


// -- Unit tests for: isNumStrongConComps() ----------------------------------------------------------------------------------------------
test(".isNumStrongConCompsOne(), routine input 1", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b"],
        b: [],
        c: ["b"]
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumStrongConCompsOne();

    expect(actualNum).toBe(false);
});

test(".isNumStrongConCompsOne(), routine input 2", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b"],
        b: ["c"],
        c: ["b"]
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumStrongConCompsOne();

    expect(actualNum).toBe(false);
});

test(".isNumStrongConCompsOne(), routine input 3", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b"],
        b: [],
        c: ["d"],
        d: []
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumStrongConCompsOne();

    expect(actualNum).toBe(false);
});

test(".isNumStrongConCompsOne(), routine input 4", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b"],
        b: ["a"],
        c: ["d"],
        d: ["c"]
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumStrongConCompsOne();

    expect(actualNum).toBe(false);
});

test(".isNumStrongConCompsOne(), routine input 5", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b"],
        b: ["a", "d"],
        c: ["d"],
        d: ["c", "b"]
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumStrongConCompsOne();

    expect(actualNum).toBe(true);
});

test(".isNumStrongConCompsOne(), routine input 6", function () {
    // evaluate what we actually get
    const adjList = {
        b: ["y"],
        y: ["r"],
        r: ["o", "g"],
        o: ["p"],
        p: [],
        g: []
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumStrongConCompsOne();

    expect(actualNum).toBe(false);
});

test(".isNumStrongConCompsOne(), routine input 7", function () {
    // evaluate what we actually get
    const adjList = {
        b: ["y"],
        y: ["r"],
        r: ["o", "g"],
        o: ["r"],
        g: []
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumStrongConCompsOne();

    expect(actualNum).toBe(false);
});

test(".isNumStrongConCompsOne(), routine input 8", function () {
    // evaluate what we actually get
    const adjList = {
        b: ["g", "y"],
        g: ["y"],
        y: ["b", "r"],
        r: ["o", "g"],
        o: ["r"]
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumStrongConCompsOne();

    expect(actualNum).toBe(true);
});

test(".isNumStrongConCompsOne(), routine input 9", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b", "e"],
        b: ["c", "a"],
        c: ["d"],
        d: ["e"],
        e: ["d", "a"]
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumStrongConCompsOne();

    expect(actualNum).toBe(true);
});

test(".isNumStrongConCompsOne(), routine input 10", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b"],
        b: ["a"],
        c: ["d"],
        d: ["a"],
        e: []
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumStrongConCompsOne();

    expect(actualNum).toBe(false);
});

test(".isNumStrongConCompsOne(), routine input 11", function () {
    // evaluate what we actually get
    const adjList = {
        a: ["b"],
        b: ["c"],
        c: ["a"]
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumStrongConCompsOne();

    expect(actualNum).toBe(true);
});

test(".isNumStrongConCompsOne(), boundary input 1", function () {
    // evaluate what we actually get
    const adjList = {
        a: [],
    }
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumStrongConCompsOne();

    expect(actualNum).toBe(true);
});

test(".isNumStrongConCompsOne(), boundary input 2", function () {
    // evaluate what we actually get
    const adjList = {}
    const dGraph = new diGraph(adjList);
    const actualNum = dGraph.isNumStrongConCompsOne();

    expect(actualNum).toBe(false);
});

// -- Unit tests for: .reverse() --------------------------------------------------------------------------------------------------
test(".reverse(), routine input 1", function () {
    // evaluate what we actually get
    const adjListActual = {
        a: ["b"],
        c: ["a", "d"],
        b: ["c"],
        d: ["a"]
    }
    const actualGraph = new diGraph(adjListActual);
    actualGraph.reverse();

    // set up what we expect
    const adjListExpect = {
        a: ["c", "d"],
        c: ["b"],
        b: ["a"],
        d: ["c"]
    }
    const expectedGraph = new diGraph(adjListExpect);

    expect(actualGraph).toStrictEqual(expectedGraph);
});

test(".reverse(), routine input 2", function () {
    // evaluate what we actually get
    const adjListActual = {
        a: ["b"],
        b: ["c"],
        c: ["b", "a"]
    }
    const actualGraph = new diGraph(adjListActual);
    actualGraph.reverse();

    // set up what we expect
    const adjListExpect = {
        a: ["c"],
        b: ["a", "c"],
        c: ["b"]
    }
    const expectedGraph = new diGraph(adjListExpect);

    expect(actualGraph).toStrictEqual(expectedGraph);
});

test(".reverse(), routine input 3", function () {
    // evaluate what we actually get
    const adjListActual = {
        a: ["c"],
        b: [],
        c: [],
        d: ["a", "b", "c"]
    }
    const actualGraph = new diGraph(adjListActual);
    actualGraph.reverse();

    // set up what we expect
    const adjListExpect = {
        a: ["d"],
        b: ["d"],
        c: ["a", "d"],
        d: []
    }
    const expectedGraph = new diGraph(adjListExpect);

    expect(actualGraph).toStrictEqual(expectedGraph);
});

test(".reverse(), boundary input 1", function () {
    // evaluate what we actually get
    const adjListActual = {
        a: ["c"],
        c: []
    }
    const actualGraph = new diGraph(adjListActual);
    actualGraph.reverse();

    // set up what we expect
    const adjListExpect = {
        c: ["a"],
        a: []
    }
    const expectedGraph = new diGraph(adjListExpect);

    expect(actualGraph).toStrictEqual(expectedGraph);
});

test(".reverse(), boundary input 2", function () {
    // evaluate what we actually get
    const adjListActual = {}
    const actualGraph = new diGraph(adjListActual);
    actualGraph.reverse();

    // set up what we expect
    const adjListExpect = {}
    const expectedGraph = new diGraph(adjListExpect);

    expect(actualGraph).toStrictEqual(expectedGraph);
});



// -- Unit tests for: .deleteEdge() --------------------------------------------------------------------------------------------

test(".deleteEdge(), routine input 1", function () {
    // evaluate what we actually get
    const adjListActual = {
        a: ["b"],
        b: ["c"],
        c: ["b"]
    }
    const actualGraph = new diGraph(adjListActual);
    actualGraph.deleteEdge("b", "c");

    // set up what we expect
    const adjListExpect = {
        a: ["b"],
        b: [],
        c: ["b"]
    }
    const expectedGraph = new diGraph(adjListExpect);

    expect(actualGraph).toStrictEqual(expectedGraph);
});

test(".deleteEdge(), routine input 2", function () {
    // evaluate what we actually get
    const adjListActual = {
        a: ["b"],
        b: ["c"],
        c: ["b"]
    }
    const actualGraph = new diGraph(adjListActual);
    actualGraph.deleteEdge("a", "b");

    // set up what we expect
    const adjListExpect = {
        b: ["c"],
        c: ["b"]
    }
    const expectedGraph = new diGraph(adjListExpect);

    expect(actualGraph).toStrictEqual(expectedGraph);
});

test(".deleteEdge(), routine input 3", function () {
    // evaluate what we actually get
    const adjListActual = {
        a: ["b"],
        b: ["c"],
        c: ["b"]
    }
    const actualGraph = new diGraph(adjListActual);
    actualGraph.deleteEdge("c", "b");

    // set up what we expect
    const adjListExpect = {
        a: ["b"],
        b: ["c"],
        c: []
    }
    const expectedGraph = new diGraph(adjListExpect);

    expect(actualGraph).toStrictEqual(expectedGraph);
});

test(".deleteEdge(), routine input 4", function () {
    // evaluate what we actually get
    const adjListActual = {
        b: ["g", "y"],
        g: ["y"],
        y: ["b"]
    }
    const actualGraph = new diGraph(adjListActual);
    actualGraph.deleteEdge("g", "y");

    // set up what we expect
    const adjListExpect = {
        b: ["g", "y"],
        g: [],
        y: ["b"]
    }
    const expectedGraph = new diGraph(adjListExpect);

    expect(actualGraph).toStrictEqual(expectedGraph);
});


test(".deleteEdge(), routine input 5 -- should delete isolated vertices and work with consecutive calls", function () {
    // evaluate what we actually get
    const adjListActual = {
        b: ["g", "y"],
        g: ["y"],
        y: ["b"]
    }
    const actualGraph = new diGraph(adjListActual);
    actualGraph.deleteEdge("b", "g");
    actualGraph.deleteEdge("g", "y");

    // set up what we expect
    const adjListExpect = {
        b: ["y"],
        y: ["b"]
    }
    const expectedGraph = new diGraph(adjListExpect);

    expect(actualGraph).toStrictEqual(expectedGraph);
});

test(".deleteEdge(), boundary input 1", function () {
    // evaluate what we actually get
    const adjListActual = {
        a: ["b"],
        b: []
    }
    const actualGraph = new diGraph(adjListActual);
    actualGraph.deleteEdge("a", "b");

    // set up what we expect
    const adjListExpect = { b: [] }
    const expectedGraph = new diGraph(adjListExpect);

    expect(actualGraph).toStrictEqual(expectedGraph);
});

// -- Unit tests for: .getNumEdges() ----------------------------------------------------------------------------------------------------
test(".getNumEdges(), routine input 1", function () {
    // evaluate what we actually get
    const adjListActual = {
        a: ["b"],
        b: ["a", "c"],
        c: ["b"]
    }
    const actualGraph = new diGraph(adjListActual);
    const actualNumEdges = actualGraph.getNumEdges();

    expect(actualNumEdges).toBe(4);
});

test(".getNumEdges(), routine input 2", function () {
    // evaluate what we actually get
    const adjListActual = {
        a: ["b", "c"],
        b: ["a", "c"],
        c: ["b"]
    }
    const actualGraph = new diGraph(adjListActual);
    const actualNumEdges = actualGraph.getNumEdges();

    expect(actualNumEdges).toBe(5);
});


test(".getNumEdges(), routine input 3", function () {
    // evaluate what we actually get
    const adjListActual = {
        a: ["b", "c"],
        b: ["a", "c"],
        c: ["b", "a"]
    }
    const actualGraph = new diGraph(adjListActual);
    const actualNumEdges = actualGraph.getNumEdges();

    expect(actualNumEdges).toBe(6);
});

test(".getNumEdges(), routine input 4", function () {
    // evaluate what we actually get
    const adjListActual = {
        a: [],
        b: ["a", "c"],
        c: []
    }
    const actualGraph = new diGraph(adjListActual);
    const actualNumEdges = actualGraph.getNumEdges();

    expect(actualNumEdges).toBe(2);
});

test(".getNumEdges(), routine input 5", function () {
    // evaluate what we actually get
    const adjListActual = {
        a: ["b"],
        b: []
    }
    const actualGraph = new diGraph(adjListActual);
    const actualNumEdges = actualGraph.getNumEdges();

    expect(actualNumEdges).toBe(1);
});

test(".getNumEdges(), boundary input 1", function () {
    // evaluate what we actually get
    const adjListActual = {
        a: [],
        b: []
    }
    const actualGraph = new diGraph(adjListActual);
    const actualNumEdges = actualGraph.getNumEdges();

    expect(actualNumEdges).toBe(0);
});