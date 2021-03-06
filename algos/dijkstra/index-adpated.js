
// import MinHeap from './min_heap'
const MinHeap = require('./min-heap-adapted')
// const Tree = require('./binary_search_index')

const graph = {
  start: { A: 5, B: 2 },
  A: { C: 4, D: 2 },
  B: { A: 8, D: 7 },
  C: { D: 6, finish: 3 },
  D: { finish: 4, R: 2 },
  R: { S: 1 },
  S: { T: 2 },
  T: { U: 1 },
  U: {},
  finish: {},
}

// a layout sample from the main app
// shortened to 3 rows and three cols 
// with start at x: ?, y: ? and finish at x: ?, y: ?
const layout = [
  [
    { mode: 1, weight: 1, visited: false },
    { mode: 1, weight: 1, visited: false },
    { mode: 1, weight: 1, visited: false },
  ],
  [
    { mode: 1, weight: 1, visited: false },
    { mode: 1, weight: 1, visited: false },
    { mode: 1, weight: 1, visited: false },
  ],
  [
    { mode: 1, weight: 1, visited: false },
    { mode: 1, weight: 1, visited: false },
    { mode: 1, weight: 1, visited: false },
  ],
]


/**
 * 
 * The use of a heap removes the need for the function to find the minimum value
 * This has the added effect of no longer requiring the 'processed' array to store values to ommit
 * Saving time and memory, nodes only exist in one location, only as long as they are needed
 * 
 * Costs are stored in both the heap (for fast retrieval of min value), and in this object (for lookup by child nodes)
 * 
 * @param {Object} graph The graph to be evaluated with structure graph = { [node]: { [edge]: [edge value], ... } }
 * @return {Array} The labels for the shortest path
 */
const dijkstra = (graph) => {

  // standard js object for value lookup by child nodes
  const costDictionary = Object.assign({ finish: Infinity }, graph.start)
  
  // min heap for O(1) retrieval of minimum cost
  const costs = new MinHeap ()

  // costs will be stored in format { label: String, cost: Number }
  costs.accessMethod = node => node.cost

  // parents tracks the shortest path parent for each node (or only parent)
  const parents = { finish: null }

  // Initialised the costs with the children of start and the target (finish) node
  Object.keys(graph.start).forEach(label => {
    costs.insert({ label, cost: graph.start[label] })
  })
  costs.insert({ label: 'finish', cost: Infinity })

  // Add the children of the start node to the knowen parents 
  for (let child in graph.start) {
    parents[child] = 'start'
  }

  // Initialise the first node
  let node = costs.peak().label

  while (node) {

    // Get the cost of the current node
    let cost = costDictionary[node]

    // Get all the nieghbors / children of the current node
    let children = graph[node]

    // Loop through all the children && calc the cost to reach that child
    for (let child in children) {
      let newCost = cost + children[child]

      // Update the cost of this node if it is the cheapest or only cost available

      // child has never been visited
      if (!costDictionary[child]) {
        costs.insert({ label: child, cost: newCost })
        costDictionary[child] = newCost
        parents[child] = node
      }
      
      // child has been visited and this path is shorter
      if (costDictionary[child] > newCost) {
        costs.insert({ label: child, cost: newCost })
        costDictionary[child] = newCost
        parents[child] = node
      }
      
      // Remember: a "costed" node has only one parent set; the one with the shortest path
    }

    // node is processed, remove it from the heap
    costs.extract()

    // fid the next lowest cost
    const peak = costs.peak()
    node = peak ? peak.label : null
  }

  const path = ['finish']

  let parent = parents.finish

  // work backwards from the parent to find the shortest path
  while (parent) {
    path.unshift(parent)
    parent = parents[parent]
  }

  return {
    distance: costDictionary.finish,
    path
  }
}

console.log(dijkstra(graph))