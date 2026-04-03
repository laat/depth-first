export type Edge<T> = [T, T];
export type Edges<T> = Edge<T>[];

export default function depthFirst<T>(
  edges: Edges<T>,
  node: T,
  opts: { reverse?: boolean } = {}
): Array<T> {
  const { reverse = false } = opts;
  const outEdges = new Map<T, T[]>();
  for (const [a, b] of edges) {
    const from = reverse ? b : a;
    const to = reverse ? a : b;
    let list = outEdges.get(from);
    if (list === undefined) {
      list = [];
      outEdges.set(from, list);
    }
    list.push(to);
  }
  const result: Array<T> = [];
  const visited = new Set<T>();
  const dfs = (v: T) => {
    result.push(v);
    visited.add(v);
    const neighbors = outEdges.get(v);
    if (neighbors !== undefined) {
      for (const to of neighbors) {
        if (!visited.has(to)) dfs(to);
      }
    }
  };
  dfs(node);
  return result;
}
