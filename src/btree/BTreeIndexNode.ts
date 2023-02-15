import BTreeNode from './BTreeNode';
import BTreeLeafNode from './BTreeLeafNode';

export default class BTreeIndexNode<T> extends BTreeNode<T> {
    public keys: T[] = []; // max-length: pageSize
    public children: BTreeNode<T>[] = []; // max-length: pageSize + 1

    public insert(key: T, value: any): [BTreeNode<T>, T] | null {
        if (!this.keys.length) {
            this.keys.push(key);
            this.children.push(new BTreeLeafNode(this._pageSize));
            this.children.push(new BTreeLeafNode(this._pageSize));
        }

        let foundIndex = this.keys.findIndex(k => key < k);
        if (foundIndex === -1) {
            foundIndex = this.keys.length - 1;
        }

        // we use either the left or the right child element
        // (based on whether the key to insert is smaller or bigger than the key on foundIndex)
        const childIndex = (key >= this.keys[foundIndex]) ? foundIndex + 1 : foundIndex
        const insertResponse = this.children[childIndex].insert(key, value);

        // we do not have to insert a new node, just return null
        if (!insertResponse) {
            return null;
        }

        // get the minimum subtree value
        const minInsertedTreeValue = insertResponse[0].getMinKeyValue();

        // get the position in the keys-array where the sub-tree should be inserted
        const foundInsertIndex = this.keys.findIndex(k => minInsertedTreeValue < k);

        // when no position was found, insert it on the end of the array
        if (foundInsertIndex === -1) {
            this.keys.push(minInsertedTreeValue);
            this.children.push(insertResponse[0]);
        } else { // otherwise insert it on the correct position inside the array
            this.keys.splice(foundInsertIndex, 0, minInsertedTreeValue);
            this.children.splice(foundInsertIndex, 0, insertResponse[0]);
        }

        if (this.keys.length > this._pageSize) {
            const [splittedResponse, pivot] = this.split(); // save the response to return it later

            return [splittedResponse, pivot];
        }

        return null;
    }

    toJSON() {
        return {
            keys: this.keys,
            children: this.children,
        };
    }

    getMinKeyValue(): T {
        return this.children[0].getMinKeyValue();
    }

    private split(): [BTreeNode<T>, T] {
        const splitIdx = Math.ceil(this.keys.length / 2);
        const newKeys = this.keys.splice(splitIdx);
        const newChildren = this.children.splice(splitIdx);
        const pivot = this.keys.pop()!;

        const bTreeIndexNode = new BTreeIndexNode<T>(this._pageSize);
        bTreeIndexNode.keys = newKeys;
        bTreeIndexNode.children = newChildren;

        return [bTreeIndexNode, pivot];
    }
}
