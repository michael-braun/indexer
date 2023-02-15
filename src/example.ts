import { BTree } from './index';

const index = new BTree<number>(5);
index.insert(11, '.');
index.insert(15, '.');
index.insert(34, '.');
index.insert(56, '.');
index.insert(67, '.');
index.insert(72, '.');
index.insert(73, '.');
index.insert(74, '.');
index.insert(83, '.');
index.insert(84, '.');
index.insert(87, '.');
index.insert(102, '.');
index.insert(105, '.');
index.insert(106, '.');
index.insert(110, '.');
index.insert(111, '.');
index.insert(123, '.');
index.insert(125, '.');
index.insert(128, '.');

console.log(index);
console.log(JSON.stringify(index));
