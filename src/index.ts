export type Edge<T> = [T, T];
export type Edges<T> = Edge<T>[];

export default function depthFirst<T>(
  edges: Edges<T>,
  node: T,
  opts: { reverse?: boolean } = {}
): Array<T> {
  const { reverse = false } = opts;
  edges = reverse ? edges.map(([from, to]) => [to, from]) : edges;
  const outEdges = new Map<T, T[]>();
  edges.forEach(([from, to]) => {
    outEdges.get(from)?.push(to) ?? outEdges.set(from, [to]);
  });
  const result: Array<T> = [];
  const visited = new Map<T, boolean>();
  const dfs = (v: T) => {
    result.push(v);
    visited.set(v, true);
    for (const to of outEdges.get(v) ?? []) {
      if (!visited.has(to)) {
        dfs(to);
      }
    }
  };
  dfs(node);
  return result;
}
