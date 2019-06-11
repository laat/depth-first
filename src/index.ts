export type Edge<T> = [T, T];
export type Edges<T> = Array<Edge<T>>;

export default function depthFirst<T>(
  edges: Edges<T>,
  node: T,
  opts?: { reverse: boolean }
): Array<T> {
  const { reverse } = Object.assign({}, { reverse: false }, opts);
  edges = reverse ? edges.map(([from, to]) => [to, from]) : edges;
  const result = [];
  const visited = new Map();
  const dfs = v => {
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
