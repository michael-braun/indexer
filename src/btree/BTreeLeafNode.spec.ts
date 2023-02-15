import assert from 'node:assert';
import BTreeLeafNode from './BTreeLeafNode';

describe('BTreeLeafNode', () => {
    describe('insert', () => {
        it('simple insert', () => {
            const bTreeLeafNode = new BTreeLeafNode(5);
            assert.strictEqual(bTreeLeafNode.insert(1, { hello: 'world' }), null);
            assert.deepStrictEqual(bTreeLeafNode.toJSON(), {
                values: [{
                    key: 1,
                    value: {
                        hello: 'world',
                    },
                }],
            })
        });

        it('sorted insert', () => {
            const bTreeLeafNode = new BTreeLeafNode(5);
            assert.strictEqual(bTreeLeafNode.insert(1, { hello: 'world1' }), null);
            assert.strictEqual(bTreeLeafNode.insert(2, { hello: 'world2' }), null);
            assert.strictEqual(bTreeLeafNode.insert(0, { hello: 'world3' }), null);
            assert.deepStrictEqual(bTreeLeafNode.toJSON(), {
                values: [{
                    key: 0,
                    value: {
                        hello: 'world3',
                    },
                }, {
                    key: 1,
                    value: {
                        hello: 'world1',
                    },
                }, {
                    key: 2,
                    value: {
                        hello: 'world2',
                    },
                }],
            })
        });

        it('split insert (original)', () => {
            const bTreeLeafNode = new BTreeLeafNode(2);
            assert.strictEqual(bTreeLeafNode.insert(1, { hello: 'world1' }), null);
            assert.strictEqual(bTreeLeafNode.insert(2, { hello: 'world2' }), null);
            assert.deepStrictEqual(bTreeLeafNode.toJSON(), {
                values: [{
                    key: 1,
                    value: {
                        hello: 'world1',
                    },
                }, {
                    key: 2,
                    value: {
                        hello: 'world2',
                    },
                }],
            })
            assert.deepStrictEqual(bTreeLeafNode.insert(0, { hello: 'world3' })?.[0]?.toJSON(), {
                values: [{
                    key: 1,
                    value: {
                        hello: 'world1',
                    },
                }, {
                    key: 2,
                    value: {
                        hello: 'world2',
                    },
                }],
            });
            assert.deepStrictEqual(bTreeLeafNode.toJSON(), {
                values: [{
                    key: 0,
                    value: {
                        hello: 'world3',
                    },
                }],
            })
        });

        it('split insert (splitted)', () => {
            const bTreeLeafNode = new BTreeLeafNode(2);
            assert.strictEqual(bTreeLeafNode.insert(1, { hello: 'world1' }), null);
            assert.strictEqual(bTreeLeafNode.insert(2, { hello: 'world2' }), null);
            assert.deepStrictEqual(bTreeLeafNode.toJSON(), {
                values: [{
                    key: 1,
                    value: {
                        hello: 'world1',
                    },
                }, {
                    key: 2,
                    value: {
                        hello: 'world2',
                    },
                }],
            })
            assert.deepStrictEqual(bTreeLeafNode.insert(3, { hello: 'world3' })?.[0]?.toJSON(), {
                values: [{
                    key: 2,
                    value: {
                        hello: 'world2',
                    },
                }, {
                    key: 3,
                    value: {
                        hello: 'world3',
                    },
                }],
            });
            assert.deepStrictEqual(bTreeLeafNode.toJSON(), {
                values: [{
                    key: 1,
                    value: {
                        hello: 'world1',
                    },
                }],
            })
        });
    });
});
