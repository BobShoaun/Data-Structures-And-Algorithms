// import Queue from "./Queue.js";
const Queue = require("./Queue");

/*
An AVL tree is a binary search tree with the property of a balance factor
this one is my own modification that is easier to consume
*/
class AVLTree {
	constructor() {
		this.key = null;
		// this.value = 0;
		this.left = null;
		this.right = null;
		this.height = -1;
	}

	get leftHeight() {
		return this.left?.height ?? -1;
	}

	get rightHeight() {
		return this.right?.height ?? -1;
	}

	get balance() {
		return this.rightHeight - this.leftHeight;
	}

	updateHeight() {
		this.height = 1 + Math.max(this.leftHeight, this.rightHeight);
	}

	rightRotate() {
		let x = this.left;
		let transfer = x.right;

		// rotate
		x.right = this;
		this.left = transfer;

		// update heights
		this.updateHeight();
		x.updateHeight();

		// new root
		return x;
	}

	leftRotate() {
		let x = this.right;
		let transfer = x.left;

		// rotate
		x.left = this;
		this.right = transfer;

		// update heights
		this.updateHeight();
		x.updateHeight();

		// new root
		return x;
	}

	/* insert key into tree, return new tree. */
	insert(key) {
		if (!this.key) {
			this.key = key;
			this.height = 0;
			return this;
		}

		if (key < this.key) {
			if (!this.left) this.left = new AVLTree();
			this.left = this.left.insert(key);
		} else if (key > this.key) {
			if (!this.right) this.right = new AVLTree();
			this.right = this.right.insert(key);
		} else throw new Error("No duplicate values allowed");

		this.updateHeight();

		// left left
		if (this.balance < -1 && key < this.left.key) {
			return this.rightRotate();
		}

		// right right
		if (this.balance > 1 && key > this.right.key) {
			return this.leftRotate();
		}

		// left right
		if (this.balance < -1 && key > this.left.key) {
			this.left = this.left.leftRotate();
			return this.rightRotate();
		}

		// right left
		if (this.balance > 1 && key < this.right.key) {
			this.right = this.right.rightRotate();
			return this.leftRotate();
		}

		return this;
	}
	delete(key) {}

	*inOrderTraversal() {
		if (this.left) yield* this.left.inOrderTraversal();
		if (this.key) yield this.key;
		if (this.right) yield* this.right.inOrderTraversal();
	}

	*preOrderTraversal() {
		if (this.key) yield this.key;
		if (this.left) yield* this.left.preOrderTraversal();
		if (this.right) yield* this.right.preOrderTraversal();
	}

	*postOrderTraversal() {
		if (this.left) yield* this.left.postOrderTraversal();
		if (this.right) yield* this.right.postOrderTraversal();
		if (this.key) yield this.key;
	}

	*bfs() {
		let queue = new Queue();
		queue.enqueue(this);

		while (!queue.empty) {
			let curr = queue.dequeue();
			yield curr.key;

			if (curr.left) queue.enqueue(curr.left);
			if (curr.right) queue.enqueue(curr.right);
		}
	}

	// display() {
	//   let bfs = [...this.bfs()];

	// }

	insertAll(...keys) {
		let root = this;
		for (let key of keys) root = root.insert(key);
		return root;
	}
}

module.exports = AVLTree;

let tree = new AVLTree();
tree = tree.insert(7);
tree = tree.insert(5);
tree = tree.insert(6);
tree = tree.insert(8);
tree = tree.insert(3);
tree = tree.insert(4);

// tree = tree.insertAll(7, 5, 6, 8, 3, 4);

console.log([...tree.preOrderTraversal()]);

console.log([...tree.bfs()]);

// get total sum of keys from key >= onwards
function total(T, key) {
	if (T == null) return 0;
	if (key == T.key) return T.key + total(T.right, key);
	if (key > T.key) return total(T.right, key);
	return T.key + total(T.right, key) + total(T.left, key);
}

function average(T, start, end) {
  let tot = total(T, start) - total(T, end) + end;
  let count = end - start + 1;
  return tot / count
}

console.log(total(tree, 6));
console.log(average(tree, 6, 6));
