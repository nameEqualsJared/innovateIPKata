const diGraph = require("./diGraph");

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

function isUnlockable(startColor, endColor, diGraphRep) {
    /*
    Input:
        startColor, a string specifying the start color (same as the start vertex from the graph perspective)
        endColor, a string specifying the end color (same as the end vertex from the graph perspective)
        diGraphRep: a diGraph object representing the problem
    Returns:
        true if the panel is unlockable, false if it is not.
    */
    const vertices = Object.keys(diGraphRep.adjList);

    // if diGraph is empty (which will happen if no chips were specified, and corresponds to the vertices array being empty) can immediatedly return false
    if (vertices.length === 0) return false;

    // check that start and end color are in the vertices of the diGraphRep to start; certainly won't have a solution if they are not!
    if (!(vertices.includes(startColor))) return false;
    if (!(vertices.includes(endColor))) return false;

    // next determine if we need a eulerian cycle (eulerian cycles are more restrictive, in some sense)
    const needEulCycle = (startColor === endColor); // === checking is valid because strings are primitive type

    if (needEulCycle) {
        // check the two eulerian cycle criteria (all must be true)

        // Criteria 1: every vertex has equal in and out degree
        const degreeDescs = diGraphRep.describeVertices();
        for (let vertice of vertices) {
            if (degreeDescs[vertice].in != degreeDescs[vertice].out) return false;
        }

        // Criteria 2: all vertices with nonzero degree belong to the same strongly connected component (note: all vertices will have nonzero degree. Since chip definitions come in pairs, each vertice will have at least one outgoing edge)
        if (!(diGraphRep.isNumStrongConCompsOne())) return false;

        // If we reach here, we have a eulerian cycle and problem has a solution (possibly more than one too)!
        return true;

    } else {
        // check the four eulerian path criteria (all must be true)

        const degreeDescs = diGraphRep.describeVertices();

        // Criteria 1: the vertice corresponding to the start color must have indeg(v)-outdeg(v) == -1
        if (degreeDescs[startColor].in - degreeDescs[startColor].out != -1) return false;

        // Criteria 2: the vertice corresponding to the the end color must have indeg(v)-outdeg(v) == 1
        if (degreeDescs[endColor].in - degreeDescs[endColor].out != 1) return false;

        // Criteria 3: all other vertices (not the start and end vertices) must have equal in and out degree
        for (let vertice of vertices) {
            if ((vertice != startColor) && (vertice != endColor)) {
                if (degreeDescs[vertice].in != degreeDescs[vertice].out) return false;
            }
        }

        // Critera 4: all vertices with nonzero degree belong to a single connected component of the underlying undirected graph
        if (!(diGraphRep.isNumConCompsUndirOne())) return false;

        // if we reach here, hooray, there is at least one euler path in the graph and solution exists!
        return true;

    }
}

function getUnlockOrder(startColor, endColor, diGraphRep) {
    /*
    Input:
        startColor: a string speciying the start color/vertice
        endColor: a string specifying the end color/vertice
        diGraphRep: the directed graph representation of the problem
    Output:
        An array, giving an order of colors (vertices) that will unlock the panel. 
        I.e., returns a eulerian path through the directed graph (which is a eulerian cycle if startColor == endColor)

    In other words, this algorithm solves the eulerian path problem. It is based on Fleury's algorithm.

    NOTE: this function assumes that the problem is solvable! It may give incorrect output if problem is actually not solvable. The function is only intended to return an order that solves the problem once we already know the problem is solvable.

    Example:
        Say startColor = "a", endColor = "b", and diGraphRep = diGraph{ adjList{
            a: ["b"],
            b: ["c"], 
            c: ["b"]
        }}
        Then function returns ["a", "b", "c", "b"] because this eulerian path solves the problem
    */
    let res = [];
    res.push(startColor);

    const numEdges = diGraphRep.getNumEdges(); // recall the number of edges = the number of input chips. Out eulerian path needs to hit every edge to be a valid solution

    let onVertex = startColor; // this is the vertex we are "on" as the algorithm runs
    for (let i = 0; i < numEdges; i++) {
        // algorithm will run exactly numEdges times.

        // Idea is to determine an edge whose deletion would not disconnected the graph. I.e., determine an edge coming out of onVertex such that deleting the edge would not disconnected the graph (in the undirected sense).

        const adjListCopy = JSON.parse(JSON.stringify(diGraphRep.adjList)); // make a copy of adjList; used to restore the graph if we happen to delete an edge that does disconnect the graph (in that case we need to restore the graph and keep looking). Recall, we are looking for an edge whose deletion will not disconnect the graph

        const outgoingVerts = diGraphRep.adjList[onVertex];
        const outgoingVertsCopy = outgoingVerts.slice(0); // create a copy of the outgoingVerts array, as it will get modified in the .deleteEdge() call and you shouldn't mutate something you are looping over
        for (let outgoingVert of outgoingVertsCopy) {

            diGraphRep.deleteEdge(onVertex, outgoingVert); // will mutate the underlying diGraph, I.e. will mutate diGraph.adjList (by deleting the edge of course)

            if (diGraphRep.isNumConCompsUndirOne()) {
                // in this case we did delete an edge whose deletion did not disconnect the graph. Great! So just update the result and the onVertex and ready to continue
                res.push(outgoingVert);
                onVertex = outgoingVert;
                break;

            } else {
                // woops, should not be deleting this edge. So restore graph and keep looking
                diGraphRep.adjList = adjListCopy;

            }
        }

    }
    return res;

}

// export the relevant functions
module.exports = { getInputColors, arrayCount, isUnlockable, getUnlockOrder };
