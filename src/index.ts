export type Edge<T> = [T, T];
export type Edges<T> = Edge<T>[];

export default function depthFirst<T>(
  edges: Edges<T>,
  node: T,
  opts: { reverse?: boolean } = {}
): Array<T> {
  const { reverse = false } = opts;
  const outEdges = new Map<T, T[]>();
  edges.forEach(([a, b]) => {
    const from = reverse ? b : a;
    const to = reverse ? a : b;
    if (!outEdges.has(from)) outEdges.set(from, []);
    outEdges.get(from)!.push(to);
  });
  const result: Array<T> = [];
  const visited = new Set<T>();
  const dfs = (v: T) => {
    result.push(v);
    visited.add(v);
    for (const to of outEdges.get(v) ?? []) {
      if (!visited.has(to)) {
        dfs(to);
      }
    }
  };
  dfs(node);
  return result;
}
