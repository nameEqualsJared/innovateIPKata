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

}

module.exports = diGraph;