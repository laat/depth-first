// @flow
export default function depthFirst<T>(
  edges: Array<[T, T]>,
  node: T,
  opts?: { reverse: boolean },
): Array<T> {
  const { reverse } = Object.assign({}, { reverse: false }, opts);
  // eslint-disable-next-line no-param-reassign
  edges = reverse ? edges.map(([from, to]) => [to, from]) : edges;
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
  return result;
}
