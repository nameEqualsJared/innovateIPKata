// import arrayCount
const { arrayCount } = require('./utils.js')

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
        
        Note that the adjacency list has an entry for every single vertex -- even if the vertex has no outgoing edges (in which case the associated array is just empty). In other words, the # of keys in the diGraph object must equal the # of nodes in the graph 

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

}

module.exports = diGraph;