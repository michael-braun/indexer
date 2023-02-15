import BTreeNode from './BTreeNode';

type BTreeLeafValue<T> = {
    key: T;
    value: any;
};

export default class BTreeLeafNode<T> extends BTreeNode<T> {
    protected values: BTreeLeafValue<T>[] = []; // max-length: pageSize

    public insert(key: T, value: any): [BTreeNode<T>, T] | null {
        // get the correct index for insertion (insertion sort)
        const idx = this.values.findIndex(k => k.key > key);
        if (idx === -1) {
            this.values.push({
                key,
                value,
            });
        } else {
            this.values.splice(idx, 0, {
                key,
                value,
            });
        }

        // check whether there is a split required
        if (this.values.length > this._pageSize) {
            return this.split(); // save the response to return it later
        }

        return null;
    }

    public getMinKeyValue(): T {
        return this.values[0].key;
    }

    toJSON() {
        return {
            values: this.values,
        };
    }

    private split(): [BTreeLeafNode<T>, T] {
        const splitIdx = Math.floor(this.values.length / 2);
        const newValues = this.values.splice(splitIdx);

        const bTreeLeafNode = new BTreeLeafNode<T>(this._pageSize);
        bTreeLeafNode.values = newValues;

        const splitKey = newValues[0].key;

        return [bTreeLeafNode, splitKey];
    }
}
