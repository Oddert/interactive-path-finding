

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

// const costs = {
//   A: 5,
//   B: 2,
//   finish: Infinity,
// }

/**
 * Take in the processed array, within the costs object, find the lowest value not already processed
 * 
 * @param {Object}  costs     -Object of each cell cost
 * @param {Array}   processed -Array of items already processed
 * @return {Object} -The shortest path cell
 */
const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((acc, each) => {
    console.log({ acc, each }, costs[each], costs[acc], costs[each] < costs[acc])
    if (acc === null || costs[each] < costs[acc]) {
      if (!processed.includes(each)) {
        acc = each
      }
    }
    return acc
  }, null)
}


/**
 * 
 * @param {Object} graph The graph to be evaluated with structure graph = { [node]: { [edge]: [edge value], ... } }
 * @return {Array} The labels for the shortest path
 */
const dijkstra = graph => {
  const costs = Object.assign({ finish: Infinity }, graph.start)
  // const costs = new Tree ()
  // costs.accessMethod = node => node.value
  // costs.add({ label: 'finish', value: Infinity })

  const parents = { finish: null }

  // Add the children of the start node
  for (let child in graph.start) {
    parents[child] = 'start'
  }

  const processed = []

  // Initialise the first node
  let node = lowestCostNode(costs, processed)

  console.log({costs, processed, node})

  while (node) {

    // Get the cost of the current node
    let cost = costs[node]

    // Get all the nieghbors / children of the current node
    let children = graph[node]

    // Loop through all the children && calc the cost to reach that child
    for (let child in children) {
      let newCost = cost + children[child]

      // Update the cost of this node if it is the cheapest or only cost available

      // child has never been visited
      if (!costs[child]) {
        costs[child] = newCost
        parents[child] = node
      }
      
      // child has been visited and this path is shorter
      if (costs[child] > newCost) {
        costs[child] = newCost
        parents[child] = node
      }
      
      // Remember: a "costed" node has only one parent set; the one with the shortest path
    }

    // ensure future calls to lowestCostNode() ignore this node
    processed.push(node)

    // fid the next lowest cost
    node = lowestCostNode(costs, processed)
    console.log({costs, processed, node})
  }


  const path = ['finish']

  let parent = parents.finish

  while (parent) {
    path.unshift(parent)
    parent = parents[parent]
  }

  return {
    distance: costs.finish,
    path
  }
}

console.log(dijkstra(graph))