# depth-first [![npm][npm-image]][npm-url]

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

```js test
import dfs from "depth-first";

// First, we define our edges.
const edges = [
  ["put on your shoes", "tie your shoes"],
  ["put on your shirt", "put on your jacket"],
  ["put on your shorts", "put on your jacket"],
  ["put on your shorts", "put on your shoes"]
];

// List the vertices that can be reached starting at 'put on your shirt'
dfs(edges, "put on your shirt");
/* =>
[
  'put on your shirt',
  'put on your jacket',
]
*/
```

### Reverse edges

```js test
// List the vertices that can be reached starting at 'put on your jacket' when
// the edges are reversed
dfs(edges, "put on your jacket", { reverse: true });
/* =>
[
  'put on your jacket',
  'put on your shirt',
  'put on your shorts',
]
*/
```

## Inspired by

This package uses the same data structure as [toposort](https://github.com/marcelklehr/toposort)

## License

MIT © [Sigurd Fosseng](https://github.com/laat)
