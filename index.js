class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  #head = null;
  #tail = null;

  #forEach(cb = (node) => {}) {
    let currentNode = this.#head;

    while (currentNode) {
      cb?.(currentNode);

      currentNode = currentNode.nextNode;
    }
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail.nextNode = newNode;
      this.#tail = newNode;
    }
  }

  prepend(value) {
    const newNode = new Node(value);

    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      newNode.nextNode = this.#head;
      this.#head = newNode;
    }
  }

  getHead() {
    return this.#head;
  }

  size(initialNode = this.#head) {
    if (!initialNode) return 0;
    return 1 + this.size(initialNode.nextNode);
  }

  getTail() {
    return this.#tail;
  }

  at(index = 0) {
    if (!this.#head) return null;

    if (index < 0) {
      index = this.size() + index;
    }

    if (index > this.size() - 1) {
      return null;
    }

    let currentNode = this.#head;
    let i = 0;

    while (i <= index) {
      if (i === index) return currentNode;

      i++;
      currentNode = currentNode.nextNode;
    }
  }

  pop() {
    this.#tail = this.at(-2);
    this.#tail.nextNode = null;
  }

  shift() {
    const node = this.at(0);
    this.#head = node.nextNode;
  }

  contain(value, startNode = this.#head) {
    if (!this.#head) return false;

    if (!startNode.nextNode && startNode.value !== value) return false;

    if (startNode.value === value) return true;

    return false || this.contain(value, startNode.nextNode);
  }

  find(value) {
    const maxIndex = this.size() - 1;

    for (let i = 0; i <= maxIndex; i++) {
      const currentValue = this.at(i).value;

      if (value === currentValue) {
        return i;
      }
    }

    return null;
  }

  toString() {
    const temp = [];

    this.#forEach((node) => {
      temp.push(node.value);

      if (!node.nextNode) {
        temp.push("null");
      }
    });

    console.log(temp.join(" -> "));
  }

  insertAt(value, index) {
    const maxIndex = this.size() - 1;

    switch (index) {
      case 0:
        this.prepend(value);
      case index > maxIndex:
        this.append(value);
      default: {
        const insertingNode = new Node(value);
        const beforeNode = this.at(index - 1);
        const afterNode = this.at(index);

        insertingNode.nextNode = afterNode;
        beforeNode.nextNode = insertingNode;
      }
    }
  }

  removeAt(index) {
    const maxIndex = this.size() - 1;

    switch (index) {
      case 0:
        this.shift();
      case maxIndex:
        this.pop();
      default: {
        const prev = this.at(index - 1);
        const next = this.at(index + 1);

        prev.nextNode = next;
      }
    }
  }
}

const guestList = new LinkedList();

guestList.append("John");
guestList.prepend("Amy");
guestList.append("Rose");
guestList.toString(); // Expect: Amy -> John -> Rose -> null

console.log("Size:", guestList.size());
console.log("Head: ", guestList.getHead());
console.log("Tail: ", guestList.getTail());

console.log("Index 0: ", guestList.at(0)); // Expect: {value:  "Amy", ...}
console.log("Index 1: ", guestList.at(1)); // Expect: {value:  "John", ...}
console.log("Index 2: ", guestList.at(2)); // Expect: {value:  "Rose", ...}
console.log("Index -1: ", guestList.at(-1)); // Expect: {value:  "Rose", ...}
console.log("Index -2: ", guestList.at(-2)); // Expect: {value:  "Amy", ...}

guestList.pop();
guestList.toString(); // Expect: Amy -> John -> null

console.log(guestList.contain("Kyle")); // Expect: false
console.log(guestList.contain("Amy")); // Expect: true

guestList.insertAt("Colt", 2);
guestList.toString(); // Expect: Amy -> John -> Colt -> null

guestList.removeAt(2);
guestList.toString(); // Expect: Amy -> John -> null
