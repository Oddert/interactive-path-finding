


class MinHeap {
  constructor () {
    this.heap = []
  }
  insert(val) {
    this.heap.push(val)
    this.bubble()
  }
  extract() {
    const val = this.heap.shift()
    this.heap.unshift(this.heap.pop())
    this.drill()
    return val
  }
  peak() {
    return this.heap[0]
  }
  traverse() {
    this.heap.forEach(each => console.log(each))
  }
  bubble() {
    let idx = this.heap.length - 1
    while (idx > 0 && this.getParent(idx) > this.heap[idx]) {
      const parentIdx = this.getParentIdx(idx)
      this.swap(idx, parentIdx)
      idx = parentIdx
    }
  }
  drill() {
    let idx = 0
    while (this.hasLeftChild(idx)) {
      let smaller = this.getLeftIdx(idx)
      if (
        this.hasRightChild(idx) &&
        this.getRightChild(idx) < this.getLeftChild(idx)
      ) {
        smaller = this.getRightIdx(idx)
      }
      if (this.heap[idx] < this.heap[smaller]) break
      else this.swap(idx, smaller)
      idx = smaller
    }
  }

  hasLeftChild(idx) {
    return this.getLeftIdx(idx) < this.heap.length
  }
  hasRightChild(idx) {
    return this.getRightIdx(idx) < this.heap.length
  }

  getLeftIdx(idx) {
    return idx * 2 + 1
  }
  getRightIdx(idx) {
    return idx * 2 + 2
  }
  getParentIdx(idx) {
    if (idx < 2) return 0 // Math.round((1-2)/2) === -0
    return Math.round((idx - 2) / 2)
  }

  getRightChild (idx) {
    return this.heap[this.getRightIdx(idx)]
  }
  getLeftChild(idx) {
    return this.heap[this.getLeftIdx(idx)]
  }
  getParent(idx) {
    return this.heap[this.getParentIdx(idx)]
  }

  swap(leftIdx, rightIdx) {
    let temp = this.heap[leftIdx]
    this.heap[leftIdx] = this.heap[rightIdx]
    this.heap[rightIdx] = temp
  }

}

export default MinHeap