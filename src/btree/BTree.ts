import BTreeNode from './BTreeNode';
import BTreeLeafNode from './BTreeLeafNode';
import BTreeIndexNode from './BTreeIndexNode';

export default class BTree<T> extends BTreeNode<T> {
    private _node: BTreeNode<T> = new BTreeLeafNode<T>(this._pageSize);

    constructor(pageSize: number) {
        super(pageSize);
    }

    getMinKeyValue(): T {
        return this._node.getMinKeyValue();
    }

    insert(key: T, value: any): [BTreeNode<T>, T] | null {
        const insertResult = this._node.insert(key, value);

        if (insertResult) {
            const currentNode = this._node;
            const newIndexNode = new BTreeIndexNode<T>(this._pageSize);
            newIndexNode.keys = [insertResult[1]];
            newIndexNode.children = [currentNode, insertResult[0]];
            this._node = newIndexNode;
        }

        return null;
    }

    toJSON(): any {
        return {
            node: this._node,
        };
    }
}
