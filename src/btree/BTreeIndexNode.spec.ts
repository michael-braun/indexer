import assert from 'node:assert';
import BTreeIndexNode from './BTreeIndexNode';

describe('BTreeIndexNode', () => {
    describe('insert', () => {
        it('simple insert', () => {
            const bTreeIndexNode = new BTreeIndexNode(5);
            assert.strictEqual(bTreeIndexNode.insert(1, { hello: 'world' }), null);
            assert.deepEqual(JSON.parse(JSON.stringify(bTreeIndexNode)), {
                keys: [1],
                children: [
                    { values: [] },
                    {
                        values: [{
                            key: 1,
                            value: {
                                hello: 'world',
                            },
                        }],
                    },
                ],
            })
        });

        it('sorted insert', () => {
            const bTreeIndexNode = new BTreeIndexNode(5);
            assert.strictEqual(bTreeIndexNode.insert(1, { hello: 'world1' }), null);
            assert.strictEqual(bTreeIndexNode.insert(2, { hello: 'world2' }), null);
            assert.strictEqual(bTreeIndexNode.insert(0, { hello: 'world3' }), null);
            assert.deepEqual(JSON.parse(JSON.stringify(bTreeIndexNode)), {
                keys: [1],
                children: [
                    {
                        values: [{
                            key: 0,
                            value: {
                                hello: 'world3',
                            },
                        }]
                    }, {
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
                    },
                ],
            })
        });

        it('simple split (internal)', () => {
            const bTreeIndexNode = new BTreeIndexNode(2);
            assert.strictEqual(bTreeIndexNode.insert(1, { hello: 'world1' }), null);
            assert.strictEqual(bTreeIndexNode.insert(2, { hello: 'world2' }), null);
            assert.deepEqual(JSON.parse(JSON.stringify(bTreeIndexNode)), {
                keys: [1],
                children: [
                    { values: [] },
                    {
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
                    },
                ],
            });

            assert.strictEqual(bTreeIndexNode.insert(3, { hello: 'world3' }), null);
            assert.deepEqual(JSON.parse(JSON.stringify(bTreeIndexNode)), {
                keys: [1, 2],
                children: [
                    { values: [] },
                    {
                        values: [{
                            key: 1,
                            value: {
                                hello: 'world1',
                            },
                        }],
                    },
                    {
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
                        }]
                    }
                ],
            })
        });

        it('split (external)', () => {
            const bTreeIndexNode = new BTreeIndexNode(2);
            assert.strictEqual(bTreeIndexNode.insert(1, { hello: 'world1' }), null);
            assert.strictEqual(bTreeIndexNode.insert(2, { hello: 'world2' }), null);
            assert.strictEqual(bTreeIndexNode.insert(3, { hello: 'world3' }), null);
            assert.deepEqual(JSON.parse(JSON.stringify(bTreeIndexNode)), {
                keys: [1, 2],
                children: [
                    { values: [] },
                    {
                        values: [{
                            key: 1,
                            value: {
                                hello: 'world1',
                            },
                        }],
                    },
                    {
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
                        }]
                    }
                ],
            });

            assert.deepEqual(JSON.parse(JSON.stringify(bTreeIndexNode.insert(4, { hello: 'world4' }))), [
                {
                    keys: [3],
                    children: [{
                        values: [{
                            key: 2,
                            value: {
                                hello: 'world2',
                            },
                        }]
                    }, {
                        values: [{
                            key: 3,
                            value: {
                                hello: 'world3',
                            },
                        }, {
                            key: 4,
                            value: {
                                hello: 'world4',
                            },
                        }],
                    }],
                },
                2,
            ]);
            assert.deepEqual(JSON.parse(JSON.stringify(bTreeIndexNode)), {
                keys: [1],
                children: [
                    { values: [] },
                    {
                        values: [{
                            key: 1,
                            value: {
                                hello: 'world1',
                            },
                        }],
                    },
                ],
            });
        });

    });
});
