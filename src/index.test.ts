import dfs, { Edges } from ".";

it("finds nodes DFS", async () => {
  const edges: Edges<string> = [
    ["put on your shoes", "tie your shoes"],
    ["put on your shirt", "put on your jacket"],
    ["put on your shorts", "put on your jacket"],
    ["put on your shorts", "put on your shoes"]
  ];
  expect(dfs(edges, "put on your shorts")).toEqual([
    "put on your shorts",
    "put on your jacket",
    "put on your shoes",
    "tie your shoes"
  ]);
  expect(dfs(edges, "put on your shirt")).toEqual([
    "put on your shirt",
    "put on your jacket"
  ]);
});

it("finds nodes DFS reverse", async () => {
  const edges: Edges<string> = [
    ["put on your shoes", "tie your shoes"],
    ["put on your shirt", "put on your jacket"],
    ["put on your shorts", "put on your jacket"],
    ["put on your shorts", "put on your shoes"]
  ];
  expect(dfs(edges, "put on your jacket", { reverse: true })).toEqual([
    "put on your jacket",
    "put on your shirt",
    "put on your shorts"
  ]);
  expect(dfs(edges, "put on your shoes", { reverse: true })).toEqual([
    "put on your shoes",
    "put on your shorts"
  ]);
});

it("DFS handles cycles", async () => {
  const edges: Edges<string> = [
    ["put on your shoes", "tie your shoes"],
    ["tie your shoes", "put on your shoes"]
  ];
  expect(dfs(edges, "put on your shoes")).toEqual([
    "put on your shoes",
    "tie your shoes"
  ]);
});

it("supports nodes without edges", async () => {
  const edges: Edges<string> = [
    ["put on your shoes", "tie your shoes"],
    ["put on your shirt", "put on your jacket"],
    ["put on your shorts", "put on your jacket"],
    ["put on your shorts", "put on your shoes"]
  ];
  expect(dfs(edges, "listen to audiobook", { reverse: true })).toEqual([
    "listen to audiobook"
  ]);
});
