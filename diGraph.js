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

        In other words, it works like so:
            if adjList = {vertex1: ["vertex2", "vertex3"], vertex2: ["vertex2", "vertex5"], ...etc}, then this tells us that the graph has a directed edge from v1 to v2, a directed edge from v1 to v3, one from v2 to v2, one from v2 to v5, and etc.         
        */
        this.adjList = adjList;
    }

    describeVertices() {
        // return
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

        return new diGraph(adjList);
    }

}

module.exports = diGraph;