

class Node {
  constructor (_value) {
    this.value = _value
    this.leftChild = null
    this.rightChild = null
  }

  insert (val) {
    if (val < this.value) {
      if (this.left) this.left.insert(val)
      else this.left = new Node(val)
    }

    if (val > this.value) {
      if (this.right) this.right.insert(val)
      else this.right = new Node(val)
    } 
  }

  search (target) {
    if (this.value === target) return this

    if (target < this.value && this.left) return this.left.search(target)
    if (target > this.value && this.right) return this.right.search(target)
    else return null
  }

}

const n = new Node (5)
n.insert(3)
n.insert(7)
n.insert(2)
console.log(n.search(3))

// class BinarySearchTree {
//   constructor (_value) {
//     this.tree = []
//     this.rootNode = new Node(_value)
//   }

//   insert (val) {
//     if (val < this.rootNode.value) this.rootNode.insert(val)
//   }
//   search () {}
//   preOrder () {}
//   inOrder () {}
//   postOrder () {}
// }

// export default BinarySearchTree



class ONode {
  constructor (_value) {
    this.value = _value
    this.left = null
    this.right = null
  }
}

class BinarySearch {
  constructor () {
    this.root = null
  }

  insert (val) {
    const newNode = new ONode (val)
    if (this.root === null) {
      this.root = newNode
      return this
    }
    let current = this.root

    while (current) {
      if (val === current.value) return undefined

      if (val < current.value) {
        if (current.left === null) {
          current.left = node
          return this
        }
        current = current.left
      }

      if (val > current.value) {
        if (current.right === null) {
          current.right = newNode
          return this
        }
        current = current.right
      }

    }

  }

  search (target) {
    if (!this.root) return null

    let current = this.root
    let found = false

    while (current && !found) {
      if (target < current.value) current = current.left
      else if (target > current.value) current = current.right
      else found = current
    }

    if (!found) return undefined
    return found
  }






  findMinNode (node) {
    let current = node
    while (current.left) {
      current = current.left
    }
    return current
  }

  remove (data) {
    this.root = this.removeNode(this.root, data)
  }

  // I dont like this meathod...

  removeNode (node, key) {
    // if the tree is empty return
    if (node === null) {
      return null
    } 
    // the value is lower, search the left subtree
    else if (key < node.value) {
      node.left = this.removeNode(node.left, key)
      return node
    } 
    // the value is higher, search the right subtree
    else if (key > node.value) {
      node.right = this.removeNode(node.right, key)
      return node
    }
    // the value is found, time to remove
    else {

      // the node has no children, remove and return 
      if (node.left === null && node.right === null) {
        node = null
        return node
      }

      // the node has item(s) to the left, assign its right to its position
      if (node.left === null) {
        node = node.right
        return node
      }
      
      // the node has item(s) to the right, assign its left to its position
      if (node.right === null) {
        node = node.left
        return node
      }

      // Deleting a node with two children means potentially two sub-trees
      // everything to its right is garunteed to be larger, so the smallest value
      // from the right becomes the new "middle"

      // this method first coppies the data of the smallest to this position...
      let nextOrderSuccessor = this.findMinNode(node.right)
      node.data = nextOrderSuccessor.data

      // ...then deletes the min node from which it copied
      node.right = this.removeNode(node.right, nextOrderSuccessor.data)
      return node

    }
  }
  
}