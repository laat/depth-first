// @flow
export default function depthFirst<T>(
  edges: Array<Array<T>>,
  node: T,
  opts?: { reverse: boolean },
): Array<T> {
  const { reverse } = Object.assign({}, { reverse: false }, opts);
  edges = reverse ? edges.map(e => e.reverse()) : edges; // eslint-disable-line no-param-reassign
  const result = [];
  const visited = new Map();
  const dfs = (v) => {
    result.push(v);
    visited.set(v, true);
    edges
    .filter(([from]) => from === v)
    .forEach(([, to]) => {
      if (!visited.has(to)) {
        dfs(to);
      }
    });
  };
  dfs(node);
  if (result.length === 0) {
    result.push(node);
  }
  return result;
}
