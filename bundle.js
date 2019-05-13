(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// import arrayCount
const { arrayCount } = require('./utils')

// Following is a utility method used in depth-first-search.
function visit(graph, v, discovered) {
    /*
    Input: 
        graph is adjList representation of graph (an object)
        v is distinguished vertex to start at
        discovered is array of all vertices discovered so far
    Output:
        None. Just updates the discovered array really; is just used to perform the dfs traversal

    Gets used in isNumConCompsUndirOne() and in isNumStrongConCompsOne()
    */
    discovered.push(v); // label v as discovered
    const connectedVerts = graph[v];
    for (let connectedVert of connectedVerts) {
        if (!(discovered.includes(connectedVert))) {
            visit(graph, connectedVert, discovered)
        }
    }
}

// Use ES6 class syntax for readibitlity; though I do believe JS is still using constructor functions under the hood
class diGraph {
    /*
    This class bueprints out a simple directed graph (diGraph) object. 
    It uses an adjacency-list-like structure to represent the graph.
    */

    constructor(adjList) {
        /*
        Input: adjList, the adjacency list representation of the graph.
        This is an object, where each key is a vertex, and associated to each vertex v is an array of the names of vertices to which v has an outgoing edge (i.e. all vertices u such that (v,u) is in the edge set).
        
        Note that the adjacency list has an entry for every single vertex -- even if the vertex has no outgoing edges (in which case the associated array is just empty). In other words, the # of keys in the diGraph object must equal the # of nodes in the graph. This is done to make the calculaton of out degree easier. 

        In other words, it works like so:
            if adjList = {vertex1: ["vertex2", "vertex3"], vertex2: ["vertex1"], vertex3: []}, then this tells us that the graph has a directed edge from v1 to v2, from v1 to v3, from v2 to v1, and that v3 has no outgoing edges.        
        */
        this.adjList = adjList;
    }


    static helperConstructor(chipColors) {
        /*
        Helper function to construct a diGraph object from the raw chipColors

        Input: chipColors, an array of all the chip definitions (not including the start and end color)
        Output: the respective diGraph object for those chipColors

        Example:
            if chipColors = ["blue", "red", "red", "blue", "yellow", "blue", "red": "yellow"] 
            Then returned diGraph object is
                {
                    adjList: {"blue": ["red"], "red": ["blue", "yellow"], "blue": ["yellow"]}
                }
        */

        let adjList = {};
        for (let i = 0; i < chipColors.length; i = i + 2) {
            const source = chipColors[i];
            const dest = chipColors[i + 1];
            // We now need to add an edge from source to dest by updating the adjList

            // To do so, we will check: does this vertex already have an entry in the adjList? If so, we just the edge by updating the associated array; otherwise, we create an entry for it
            if (source in adjList) {
                // key exists in the adjList, so we need to add this destination into the associated array 
                const attachedVertices = adjList[source]
                attachedVertices.push(dest);
            } else {
                adjList[source] = [dest];
            }
        }
        // we now need to make sure each node with outdegree = 0 has an associated empty array in the adjList. This is done so that # of keys in the diGraph equals the # of nodes in the graph
        for (let color of chipColors) {
            if (!(color in adjList)) {
                adjList[color] = [];
            }
        }

        return new diGraph(adjList);
    }


    describeVertices() {
        /*
        Returns an object specifying the in and out degree of each vertex in the diGraph. 
        Used in the isUnlockable test.

        Example:
            Say the underlying diGraph is = {adjList: {
                blue: ["green", "red"],
                red: ["green"], 
                green: ["red"]
            }}
            Then the return object will be
                {
                    blue: {in: 0, out: 2},
                    red: {in: 2, out: 1}, 
                    green: {in: 2, out: 1}
                }
        */
        let res = {};
        // start by iterative over the properites / keys / vertices in this.adjList
        const verticesInAdjList = Object.keys(this.adjList);
        for (let vertice of verticesInAdjList) {
            // at this point, we can fill up the out property in the result for each vertice. out is just the lenght of the associated array, because that's the number of outgoing edges
            res[vertice] = {};
            res[vertice].out = this.adjList[vertice].length;
        }
        //Now need to fill in all the in degrees. To do this, will merge all the arrays in this.adjList, then just get counts for each vertice.
        let mergedArrsInAdjList = [];
        for (let vertice of verticesInAdjList) {
            mergedArrsInAdjList = mergedArrsInAdjList.concat(this.adjList[vertice]);
        }
        for (let vertice of verticesInAdjList) {
            res[vertice].in = arrayCount(vertice, mergedArrsInAdjList);
        }

        return res;
    }


    isNumConCompsUndirOne() {
        /*
        Returns whether the number of connected components in the underlying undirected graph is 1. Returns true if it is 1, and false otherwise.
        VERY NOTABLY, this method views the underlying graph as undirected -- NOT directed as it normally is. That is, it removes any notion of direction from each edge -- then just finds the number of connected components, as if the graph was undirected.
        In other words -- this algorithm returns whether the graph, when viewed as undirected, is connected -- whether the number of connected components is 1.
    
        Implemented via a depth-first-search (dfs) algorithm
    
        Gets used in isUnlockable()
    
        Example:
            Say the underlying graph was diGraph{ adjList: {
                a: ["b"], c: ["b"], b: []
            }}
            Then the method would return true, because if you view this graph as undirected, there is 1 connected component.
        */

        /*
        This algorithm will essentially work in 2 steps:
            Step 1: Copy the adjList representation of the graph, and modify it such that the graph becomes effectively undirected. 
            Step 2: Run dfs and count the number of connected components
        */

        /* 
        Step 1: Make the graph undirected. To do this, we modify the adjList such that if there is an edge from a to b, we also add an edge from b to a (if it's not already there)
        In other words, if this.adjList = {
            a: ["b", "c"], 
            c: ["b"],
            b: []
        ]}
        Then the undirAdjList generated here will be = {
            a: ["b", "c"],
            c: ["b", "a"],
            b: ["a", "c"]
        }
        */
        const undirAdjList = JSON.parse(JSON.stringify(this.adjList)) // make a copy of adjList
        const vertices = Object.keys(undirAdjList);
        for (let vertice of vertices) {
            const outGoingArr = this.adjList[vertice]; // outGoingArr is all the vertices connected to current vertice
            for (let outGoingVert of outGoingArr) {
                undirAdjList[outGoingVert].push(vertice);
            }
        }

        // Step 2: count the number of connected components with dfs.
        let discovered = [];
        let numConComps = 0;
        // every top level call to visit here discovers a new connected component. So just increment numConComps on each call
        for (let vertice of vertices) {
            if (!(discovered.includes(vertice))) {
                // i.e. if the vertex has not yet been discovered...
                numConComps++;
                if (numConComps > 1) break;
                visit(undirAdjList, vertice, discovered);
            }
        }

        return numConComps === 1;
    }

    isNumStrongConCompsOne() {
        /*
        Returns whether the number of strongly connected components in the underlying directed graph is 1. Returns a boolean.
        In other words, this method returns whether the directed graph is strongly connected -- whether the number of strongly connected components is 1.
        
        Implemented via the following algorithm:
            1) Run dfs form any vertex v. If that top-level dfs doesn't hit every vertex, return false.
            2) Reverse all the edges in the graph
            3) Run dfs from that same vertex v. If the dfs fails to reach a vertex, return false.
            4) If both dfs's hit all vertices, return true. 
    
        Gets Used in isUnlockable()
        
        Example:
            Say the underlying directed graph is diGraph{adjList: {
                a: ["b"],
                b: ["c"],
                c: ["b"]
            }}
            Then the method returns false, because there are two strongly connected components in this graph: one contains the vertex a, and the other contains vertices b and c.
        */

        // Step 1: run dfs from any vertex v. if that top-level dfs doesn't hit every vertex, return false
        const vertices = Object.keys(this.adjList);
        const distinguishedV = vertices[0];

        // if graph is empty, just return false (there is no strongly connected components I'd say)
        if (vertices.length === 0) return false

        let discovered = [];
        // recall that every top level call to visit discovers a new connected component. So to check if the dfs hits every component, we can just check that the length of discovered is = the number of vertices in the directed graph
        visit(this.adjList, distinguishedV, discovered);
        if (discovered.length != vertices.length) return false
        // Step 1 now complete

        // Step 2: reverse the edges in the underlying directed graph (this is only done temporarily)
        const oldAdjList = JSON.parse(JSON.stringify(this.adjList)); // make a copy of current adjList for easy restoring of graph later
        this.reverse();

        // Step 3: run dfs again from the distinguished vertex v. If we don't hit every node, return false. If we do hit every node, graph is strongly connected and return true.
        discovered = [];
        visit(this.adjList, distinguishedV, discovered);
        if (discovered.length != vertices.length) return false;

        // If we reach here, graph is strongly connected (i.e. number of strongly connected components is 1) :)
        // So just restore the graph (to it's unreversed state) and return true
        this.adjList = oldAdjList;
        return true;

    }

    reverse() {
        /*
        Reverses all the edges in the directed graph. Mutates the underlying graph.
        Example:
            If the underlying diGraph is diGraph{ adjList:{
                a: ["b"],
                c: ["a", "d"],
                b: ["c"],
                d: ["a"]
            }}
            Then the resulting mutated diGraph will be diGraph{ adjList:{
                a: ["c", "d"],
                c: ["b"],
                b: ["a"],
                d: ["c"]
            }} (this has all edges reversed)
        */
        let newAdjList = {};
        const vertices = Object.keys(this.adjList);
        for (let vertice of vertices) {
            let outgoingVerts = this.adjList[vertice];
            for (let outgoingVert of outgoingVerts) {
                if (!(outgoingVert in newAdjList)) {
                    // add an entry for it
                    newAdjList[outgoingVert] = [vertice];

                } else {
                    // update the entry for it
                    newAdjList[outgoingVert].push(vertice);
                }
            }
        }
        // populate any vertices with no outgoing edges with an empty array.
        for (let vertice of vertices) {
            if (!(vertice in newAdjList)) {
                newAdjList[vertice] = [];
            }
        }
        this.adjList = newAdjList;
    }

    deleteEdge(startVert, endVert) {
        /*
        Input:
            startVert, the starting vertex of the directed edge (a string)
            endVert, the ending vertex of the directed edge (a string)

        Deletes the directed edge going from startVert to endVert. Mutates the object / the directed graph.
        NOTE: if the startVertex is left isolated, this method also deletes that vertex.
        NOTE: there must be an edge from startVert to endVert for method to work properly

        Gets used in getUnlockOrder()

        Example:
            Say startVert = "a", endVert = "b", and underlying diGraph this method was called on is = diGraph{ adjList: {
                a: ["b"],
                b: ["c"],
                c: []
            }}
            Then the result is that edge ab will be deleted, and since vertex a is now isolated, vertex a will also be deleted. So the result will be that "this" will = diGraph{adjList:{
                b: ["c"],
                c: []
            }}
        */
        const outgoingVerts = this.adjList[startVert];
        const locToDelete = outgoingVerts.indexOf(endVert);
        outgoingVerts.splice(locToDelete, 1); // deletes the edge
        // Now need to check if startVert is left isolated (need to delete it if so). A vertex is isolated if it's in degree and out degree is 0

        // First we get the out degree of the startVert
        const outDeg = outgoingVerts.length;

        // Now get the indegree of the startVert
        const vertices = Object.keys(this.adjList);
        let allArrsInAdjList = [];
        for (let vertice of vertices) {
            allArrsInAdjList = allArrsInAdjList.concat(this.adjList[vertice]);
        }
        const inDeg = arrayCount(startVert, allArrsInAdjList);

        if (outDeg == 0 && inDeg == 0) {
            delete this.adjList[startVert]; // completely delete the vertex/property/key out of the adjList
        }
    }

    getNumEdges() {
        /*
        Returns the number of edges. We recall that in our model the # of edges in the graph = the # of input chips.
        Example:
            Say this = diGraph{ adjList: {
                a: ["b"],
                b: ["c", "a"],
                c: ["b"]
            }}
            Then function returns 4 because there are 4 edges in this graph.
        */
        let res = 0;
        const vertices = Object.keys(this.adjList);
        for (let vertice of vertices) {
            res += this.adjList[vertice].length;
        }
        return res;
    }

}

module.exports = diGraph;
},{"./utils":3}],2:[function(require,module,exports){
// Use object destructuring to import the relevant functions
const diGraph = require('./diGraph');
const { getInputColors, isUnlockable, getUnlockOrder } = require("./utils");

const inputTA = document.querySelector("#input");
const outputTA = document.querySelector("#output");


function initApp() {
    // refresh the output whenever the input changes
    inputTA.addEventListener("blur", generateNewOutput);
}

function generateNewOutput() {
    // get all input colors as an array. I.e., tokenize the input
    const allInputColors = getInputColors(inputTA.value);

    // save the start and end color markers
    const startColor = allInputColors[0];
    const endColor = allInputColors[1];

    // create the chipColors arrays, which notably excludes the start and end color definitions
    const chipColors = allInputColors.slice(2);

    // create the directed graph representation of the problem
    const diGraphRep = diGraph.helperConstructor(chipColors);
    console.log(JSON.stringify(diGraphRep));

    // figure out if problem solvable (isUnlockable returns a boolean)
    const panelUnlockable = isUnlockable(startColor, endColor, diGraphRep);

    if (panelUnlockable) {
        const outputOrder = getUnlockOrder(startColor, endColor, diGraphRep);
        // outputOrder is an array of the vertices in the eulerian path that solves the problem. Code below just print's out the output as the problem describes 
        console.log(outputOrder);
        let res = "";
        for (let i = 0; i < outputOrder.length - 1; i++) {
            res += outputOrder[i] + ", " + outputOrder[i + 1] + "\n";
        }
        outputTA.value = res;

    } else {
        outputTA.value = "Cannot unlock master panel";
    }
}

// Start the application
initApp();


},{"./diGraph":1,"./utils":3}],3:[function(require,module,exports){
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

},{"./diGraph":1}]},{},[2]);
