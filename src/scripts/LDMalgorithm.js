const Heap = require('heap');

const difference = heap => {
    let a = heap.pop();
    let b = heap.pop();

    a.value = a.value - b.value;
    a.children = a.children.concat(b);
    heap.push(a);
};

const routing = (node, result, level = 0) => {

    if (level % 2) {
        result.set1.push(node.payload);
    } else {
        result.set2.push(node.payload);
    }

    level++;

    node.children.forEach(child => {
        routing(child, result, level)
    });
};

export const LDM = arr => {
    let result = {
        set1: [],
        set2: []
    };

    if (arr.length === 0) return result;

    let heap = new Heap((a, b) => {
        if (a.value === b.value) return b.node - a.node;
        return b.value - a.value;
    });

    arr.forEach(item => {
        heap.push(
            {
                value: item,
                node: item,
                children: [],
                payload: item,
            });
    });

    while (heap.size() > 1) {
        difference(heap);
    }

    routing(heap.peek(), result, 0);

    return result;
}