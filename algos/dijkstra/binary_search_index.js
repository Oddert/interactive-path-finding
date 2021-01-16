

class Tree {
  constructor () {
    this.data = []
  }

  insert (val) {
    return this.insertNode(0, val)
  }
  
  insertNode (rootIdx, val) {
    const node = this.getNode(rootIdx)
    if (!node) this.data[rootIdx] = val
    if (val < node) return this.insertNode(this.getLeftIdx(rootIdx), val)
    if (val >= node) return this.insertNode(this.getRightIdx(rootIdx), val)
  }
  
  delete (target) {
    const del = this.deleteNode(0, target)
    console.log(`[done]: idx set to ${del}`)
    this.data[0] = del
    if (this.data[this.data.length - 1] === undefined) {
      while (this.data[this.data.length - 1] === undefined) {
        this.data.pop()
      }
    }
  }
  
  deleteNode (rootIdx, target) {
    // if the tree is empty return
    let node = this.getNode(rootIdx)
    console.log(`### searching idx ${rootIdx} with value ${node}. target: ${target}`)
    if (!node) {
      return null
    }

    // the value is lower, search the left subtree
    else if (target < node) {
      const leftIdx = this.getLeftIdx(rootIdx)
      console.log(`> target less than node, searching left at idx ${leftIdx}`)
      this.data[leftIdx] = this.deleteNode(leftIdx, target)
      return node
    }
    
    // the value is higher, search the right subtree
    else if (target > node) {
      const rightIdx = this.getRightIdx(rootIdx)
      console.log(`> target greater than node, searching right at idx ${rightIdx}`)
      this.data[rightIdx] = this.deleteNode(rightIdx, target)
      return node
    }

    // the value is found, time to remove
    else {
      // the node has no children, remove and return 
      const hasLeftChild = this.hasLeftChild(rootIdx)
      const hasRightChild = this.hasRightChild(rootIdx)

      if (!hasLeftChild && !hasRightChild) {
        console.log(`# no children, returning null to idx ${rootIdx}`)
        return null
      }
      
      // the node has item(s) to the left, assign its right to its position
      if (!hasLeftChild) {
        const rigthVal = this.getRightChild(rootIdx)
        delete this.data[this.getRightIdx(rootIdx)]
        console.log(`# no left child, returning to ${rootIdx} right child of val ${rigthVal}`)
        return rigthVal
      }
      
      // the node has item(s) to the right, assign its left to its position
      if (!hasRightChild) {
        const leftVal = this.getLeftChild(rootIdx)
        console.log(`# no right child, returning to ${rootIdx} left child of val ${leftVal}`)
        delete this.data[this.getLeftIdx(rootIdx)]
        return leftVal
      }

      console.log(`/node to be deleted has two children`)

      // Deleting a node with two children means potentially two sub-trees
      // everything to its right is garunteed to be larger, so the smallest value
      // from the right becomes the new "middle"
      const nextOrderSuccessor = this.getMinChild(this.getRightIdx(rootIdx))
      const nextOrderData = this.getNode(nextOrderSuccessor)
      console.log(`next order successor is idx ${nextOrderSuccessor}`)

      // this method first coppies the data of the smallest to this position...
      // one option is to use the commented line and remove the final `return node`
      // hoever this breaks the pattern of recursive assignment to rebuild the tree
      console.log(`setting rootIdx ${rootIdx} to value of NOS ${nextOrderData}`)
      // this.data[rootIdx] = nextOrderData
      node = nextOrderData
      
      // ...then deletes the min node from which it copied
      console.log(`setting right to result of delete node right idx`)
      this.data[this.getRightIdx(rootIdx)] = this.deleteNode(this.getRightIdx(rootIdx), nextOrderData)

      console.log(`return node ${node}`)
      return node
    }
  }

  getMinChild (rootIdx) {
    const hasLeftChild = this.hasLeftChild(rootIdx)
    if (!hasLeftChild) return rootIdx
    else return this.getMinChild(this.getLeftIdx(rootIdx))
  }
  
  preOrder () {
    this.preOrderNode(0)
    return this.data
  }
  
  preOrderNode (rootIdx) {
    const node = this.getNode(rootIdx)
    if (!node) return
    console.log(node)
    if (this.hasLeftChild(rootIdx)) {
      this.preOrderNode(this.getLeftIdx(rootIdx))
    }
    if (this.hasRightChild(rootIdx)) {
      this.preOrderNode(this.getRightIdx(rootIdx))
    }
  }
  
  inOrder () {
    return this.inOrderNode(0)
  }
  
  inOrderNode (rootIdx) {
    if (this.hasLeftChild(rootIdx)) {
      this.inOrderNode(this.getLeftIdx(rootIdx))
    }
    const node = this.getNode(rootIdx)
    if (node) console.log(node)
    if (this.hasRightChild(rootIdx)) {
      this.inOrderNode(this.getRightIdx(rootIdx))
    }
  }
  
  postOrder () {
    return this.postOrderNode(0)
  }
  
  postOrderNode (rootIdx) {
    if (this.hasLeftChild(rootIdx)) {
      this.postOrderNode(this.getLeftIdx(rootIdx))
    }
    if (this.hasRightChild(rootIdx)) {
      this.postOrderNode(this.getRightIdx(rootIdx))
    }
    const node = this.getNode(rootIdx)
    if (!node) return
    if (node) console.log(node)
  }

  getNode (idx) {
    return this.data[idx]
  }
  hasLeftChild (idx) {
    return !!this.data[this.getLeftIdx(idx)]
  }
  hasRightChild (idx) {
    return !!this.data[this.getRightIdx(idx)]
  }
  getLeftIdx (idx) {
    return (idx * 2) + 1
  }
  getRightIdx (idx) {
    return (idx * 2) + 2
  }
  getLeftChild (idx) {
    return this.data[this.getLeftIdx(idx)]
  }
  getRightChild (idx) {
    return this.data[this.getRightIdx(idx)]
  }
}

const t = new Tree()

t.insert(20)
t.insert(8)
t.insert(22)
t.insert(4)
t.insert(12)
t.insert(10)
t.insert(14)
t.insert(15)
// console.log(t.getMinChild(2))
// console.log('=================')
// console.log('preOrder')
// console.log(t.preOrder())
console.log('=================')
console.log('inOrder')
console.log(t.inOrder())
// console.log('=================')
// console.log('postOrder')
// console.log(t.postOrder())
t.delete(12)

console.log('=================')
console.log(t.data)
console.log('=================')
console.log('inOrder')
console.log(t.inOrder())



/*********************
    20
   /  \
  8    22
 /  \
4    12
   /   \
  10    14
         \
          15
*/