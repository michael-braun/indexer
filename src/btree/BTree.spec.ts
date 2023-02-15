import assert from 'node:assert';
import BTree from './BTree';

describe('BTree', () => {
    describe('insert', () => {
        it('simple insert', () => {
            const bTree = new BTree(5);
            assert.strictEqual(bTree.insert(1, { hello: 'world' }), null);
            assert.deepEqual(JSON.parse(JSON.stringify(bTree)), {
                node: {
                    values: [{
                        key: 1,
                        value: {
                            hello: 'world',
                        },
                    }],
                },
            })
        });

        it('split insert (internal)', () => {
            const bTree = new BTree(2);
            assert.strictEqual(bTree.insert(1, { hello: 'world1' }), null);
            assert.strictEqual(bTree.insert(2, { hello: 'world2' }), null);
            assert.strictEqual(bTree.insert(3, { hello: 'world3' }), null);
            assert.deepEqual(JSON.parse(JSON.stringify(bTree)), {
                node: {
                    keys: [2],
                    children: [{
                        values: [{
                            key: 1,
                            value: {
                                hello: 'world1',
                            },
                        }],
                    }, {
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
                    }]
                },
            })
        });

        it('complex', () => {
            const bTree = new BTree(2);
            assert.strictEqual(bTree.insert(9, '9'), null);
            assert.strictEqual(bTree.insert(7, '7'), null);
            assert.strictEqual(bTree.insert(11, '11'), null);
            assert.strictEqual(bTree.insert(21, '21'), null);
            assert.strictEqual(bTree.insert(31, '31'), null);
            assert.deepEqual(JSON.parse(JSON.stringify(bTree)), {
                node: {
                    keys: [11],
                    children: [{
                        keys: [9],
                        children: [{
                            values: [{
                                key: 7,
                                value: '7',
                            }],
                        }, {
                            values: [{
                                key: 9,
                                value: '9',
                            }],
                        }],
                    }, {
                        keys: [21],
                        children: [{
                            values: [{
                                key: 11,
                                value: '11',
                            }],
                        }, {
                            values: [{
                                key: 21,
                                value: '21',
                            }, {
                                key: 31,
                                value: '31',
                            }],
                        }]
                    }]
                },
            });

            assert.strictEqual(bTree.insert(10, '10'), null);
            assert.deepEqual(JSON.parse(JSON.stringify(bTree)), {
                node: {
                    keys: [11],
                    children: [{
                        keys: [9],
                        children: [{
                            values: [{
                                key: 7,
                                value: '7',
                            }],
                        }, {
                            values: [{
                                key: 9,
                                value: '9',
                            }, {
                                key: 10,
                                value: '10',
                            }],
                        }]
                    }, {
                        keys: [21],
                        children: [{
                            values: [{
                                key: 11,
                                value: '11',
                            }],
                        }, {
                            values: [{
                                key: 21,
                                value: '21',
                            }, {
                                key: 31,
                                value: '31',
                            }],
                        }],
                    }]
                },
            });

            assert.strictEqual(bTree.insert(26, '26'), null);
            assert.deepEqual(JSON.parse(JSON.stringify(bTree)), {
                node: {
                    keys: [11],
                    children: [{
                        keys: [9],
                        children: [{
                            values: [{
                                key: 7,
                                value: '7',
                            }],
                        }, {
                            values: [{
                                key: 9,
                                value: '9',
                            }, {
                                key: 10,
                                value: '10',
                            }],
                        }]
                    }, {
                        keys: [21, 26],
                        children: [{
                            values: [{
                                key: 11,
                                value: '11',
                            }],
                        }, {
                            values: [{
                                key: 21,
                                value: '21',
                            }],
                        }, {
                            values: [{
                                key: 26,
                                value: '26',
                            }, {
                                key: 31,
                                value: '31',
                            }]
                        }],
                    }]
                },
            });

            assert.strictEqual(bTree.insert(28, '28'), null);
            assert.deepEqual(JSON.parse(JSON.stringify(bTree)), {
                node: {
                    keys: [11, 26],
                    children: [{
                        keys: [9],
                        children: [{
                            values: [{
                                key: 7,
                                value: '7',
                            }],
                        }, {
                            values: [{
                                key: 9,
                                value: '9',
                            }, {
                                key: 10,
                                value: '10',
                            }],
                        }]
                    }, {
                        keys: [21],
                        children: [{
                            values: [{
                                key: 11,
                                value: '11',
                            }],
                        }, {
                            values: [{
                                key: 21,
                                value: '21',
                            }],
                        }],
                    }, {
                        keys: [28],
                        children: [{
                            values: [{
                                key: 26,
                                value: '26',
                            }]
                        }, {
                            values: [{
                                key: 28,
                                value: '28',
                            }, {
                                key: 31,
                                value: '31',
                            }]
                        }]
                    }]
                },
            });

        });

    });
});
