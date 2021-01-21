
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

// const costs = {
//   A: 5,
//   B: 2,
//   finish: Infinity,
// }

/**
 * Take in the processed array, within the costs object, find the lowest value not already processed
 * 
 * Costs as Object variant
 * 
 * @param {Object}  costs     -Object of each cell cost
 * @param {Array}   processed -Array of items already processed
 * @return {Object} -The shortest path cell
 */
// const lowestCostNode = (costs, processed) => {
//   return Object.keys(costs).reduce((acc, each) => {
//     if (acc === null || costs[each] < costs[acc]) {
//       if (!processed.includes(each)) {
//         acc = each
//       }
//     }
//     return acc
//   }, null)
// }



/**
 * 
 * @param {Object} graph The graph to be evaluated with structure graph = { [node]: { [edge]: [edge value], ... } }
 * @return {Array} The labels for the shortest path
 */
const dijkstra = graph => {
  // const costs = Object.assign({ finish: Infinity }, graph.start)
  const costDictionary = Object.assign({ finish: Infinity }, graph.start)
  const parents = { finish: null }

  const costs = new MinHeap ()
  costs.accessMethod = node => node.cost
  Object.keys(graph.start).forEach(label => {
    costs.insert({ label, cost: graph.start[label] })
  })
  costs.insert({ label: 'finish', cost: Infinity })

  // Add the children of the start node
  for (let child in graph.start) {
    parents[child] = 'start'
  }

  // const processed = []

  // Initialise the first node
  // let node = lowestCostNode(costs, processed)
  let node = costs.peak().label
  // console.log({costs, processed, node})

  // console.log({ heap: costs.heap, costDictionary, parents, node })

  while (node) {
    // console.log(`checking node ${node}`)

    // Get the cost of the current node
    let cost = costDictionary[node]

    // Get all the nieghbors / children of the current node
    let children = graph[node]

    // console.log({ node, cost, children })

    // Loop through all the children && calc the cost to reach that child
    for (let child in children) {
      let newCost = cost + children[child]
      // console.log(`checking ${node} child ${child}`)

      // Update the cost of this node if it is the cheapest or only cost available
      // const existingChildCost = costs[child]

      // child has never been visited
      if (!costDictionary[child]) {
        // console.log(`child not found in costs`)
        costs.insert({ label: child, cost: newCost })
        costDictionary[child] = newCost
        parents[child] = node
      }
      
      // child has been visited and this path is shorter
      if (costDictionary[child] > newCost) {
        // console.log(`previous child cost is greater than current cost`)
        costs.insert({ label: child, cost: newCost })
        costDictionary[child] = newCost
        parents[child] = node
      }
      
      // console.log(costs.heap)
      // Remember: a "costed" node has only one parent set; the one with the shortest path
    }

    // ensure future calls to lowestCostNode() ignore this node
    // processed.push(node)
    costs.extract()

    // fid the next lowest cost
    // node = lowestCostNode(costs, processed)
    const peak = costs.peak()
    node = peak ? peak.label : null
    // console.log({costs, processed, node})
  }


  const path = ['finish']

  let parent = parents.finish
  // console.log(parents)

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