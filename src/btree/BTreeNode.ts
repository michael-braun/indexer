export default abstract class BTreeNode<T> {
    protected readonly _pageSize: number;

    constructor(pageSize: number) {
        this._pageSize = pageSize;
    }

    abstract insert(key: T, value: any): [BTreeNode<T>, T] | null;

    abstract toJSON(): any;

    abstract getMinKeyValue(): T;
}
