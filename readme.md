# depth-first [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url]
[travis-image]: https://img.shields.io/travis/laat/depth-first.svg?style=flat
[travis-url]: https://travis-ci.org/laat/depth-first
[npm-image]: https://img.shields.io/npm/v/depth-first.svg?style=flat
[npm-url]: https://npmjs.org/package/depth-first

> Depth first search directed graphs

## Install

```
$ npm install --save depth-first
```

## Usage
We want to traverse the following graph.

![demo graph](https://cdn.rawgit.com/laat/depth-first/8cb655fe/graph.svg)

```js
import dfs from 'depth-first';

// First, we define our edges.
const edges = [
  ['put on your shoes', 'tie your shoes'],
  ['put on your shirt', 'put on your jacket'],
  ['put on your shorts', 'put on your jacket'],
  ['put on your shorts', 'put on your shoes'],
]

// Now, list the vertices that can be reached from 'put on your shirt'
dfs(edges, 'put on your shirt');
/* =>
[
  'put on your shirt',
  'put on your jacket',
]
*/
```

### Reverse edges
```js
// Now, list the vertices that can be from reached 'put on your jacket'
// when the edges are reversed
dfs(edges, 'put on your jacket', { reverse: true });
/* →
[
  'put on your jacket',
  'put on your shirt',
  'put on your shorts',
]
*/
```

### Forest

This library also supports unconnected nodes through a convenience method

```js
const nodes = [
  'put on your shorts',
  'put on your shoes',
  'tie your shoes',
  'put on your jacket',
  'listen to audiobook', // new, and disconnected!
]
dfs.array(edges, nodes, 'listen to audiobook', { reverse: true });
/* →
[
  'listen to audiobook',
]
*/
```

## Inspired by

This package uses the same data structure as [toposort](https://github.com/marcelklehr/toposort)

## License

MIT © [Sigurd Fosseng](https://github.com/laat)
