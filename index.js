export default function depthFirst(edges, node, opts = {}) {
  const { reverse = false } = opts;
  const outEdges = new Map();
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
  const result = [];
  const visited = new Set();
  const dfs = (v) => {
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
