const MinHeap = require('./min-heap-adapted')

const t = new MinHeap ()

t.accessMethod = a => a.val
t.insert({ val: 20 })
t.insert({ val: 13 })
t.insert({ val: 22 })
t.insert({ val: 16 })
t.insert({ val: 21 })
t.insert({ val: 29 })

t.traverse()
