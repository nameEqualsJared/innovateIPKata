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

    console.log(startColor);
    console.log(endColor);
    console.log(diGraphRep);

    const vertices = Object.keys(diGraphRep.adjList);

    // if diGraph is empty (which will happen if no chips were specified, and corresponds to the vertices array being empty) can immediatedly return false
    if (vertices.length === 0) return false;
    console.log("HERE");


    // check that start and end color are in the vertices of the diGraphRep to start; certainly won't have a solution if they are not!
    if (!(vertices.includes(startColor))) return false;
    if (!(vertices.includes(endColor))) return false;


    // next determine if we need a eulerian cycle (eulerian cycles are more restrictive, in some sense)
    const needEulCycle = (startColor === endColor); // === checking is valid because strings are primitive type

    if (needEulCycle) {
        // check the two eulerian cycle criteria (all must be true)
        // Criteria 1: all vertices with nonzero degree belong to the same strongly connected component (note: all vertices will have nonzero degree. Since chip definitions come in pairs, each vertice will have at least one outgoing edge)
        if (!(diGraphRep.isNumStrongConCompsOne)) return false;

        // Criteria 2: every vertex has equal in and out degree
        const degreeDescs = diGraphRep.describeVertices();
        for (let vertice of vertices) {
            if (degreeDescs[vertice].in != degreeDescs[vertice].out) return false;
        }

        // If we reach here, we have a eulerian cycle and problem has a solution (possibly more than one too)!
        return true;

    } else {
        // check the four eulerian path criteria (all must be true)
        // Critera 1: all vertices with nonzero degree belong to a single connected component of the underlying undirected graph
        if (!(diGraphRep.isNumConCompsUndirOne)) return false;


        const degreeDescs = diGraphRep.describeVertices();
        console.log("here and", degreeDescs);

        // Criteria 2: the vertice corresponding to the start color must have indeg(v)-outdeg(v) == -1
        if (degreeDescs[startColor].in - degreeDescs[startColor].out != -1) return false;

        // Criteria 3: the vertice corresponding to the the end color must have indeg(v)-outdeg(v) == 1
        if (degreeDescs[endColor].in - degreeDescs[endColor].out != 1) return false;

        // Criteria 4: all other vertices (not the start and end vertices) must have equal in and out degree
        for (let vertice of vertices) {
            if ((vertice != startColor) && (vertice != endColor)) {
                if (degreeDescs[vertice].in != degreeDescs[vertice].out) return false;
            }
        }

        // if we reach here, hooray, there is at least one euler path in the graph and solution exists!
        return true;

    }
}


// export the relevant functions
module.exports = { getInputColors, arrayCount, isUnlockable };
