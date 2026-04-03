import { it } from "node:test";
import assert from "node:assert/strict";
import dfs from "./index.js";

it("finds nodes DFS", async () => {
  const edges = [
    ["put on your shoes", "tie your shoes"],
    ["put on your shirt", "put on your jacket"],
    ["put on your shorts", "put on your jacket"],
    ["put on your shorts", "put on your shoes"]
  ];
  assert.deepStrictEqual(dfs(edges, "put on your shorts"), [
    "put on your shorts",
    "put on your jacket",
    "put on your shoes",
    "tie your shoes"
  ]);
  assert.deepStrictEqual(dfs(edges, "put on your shirt"), [
    "put on your shirt",
    "put on your jacket"
  ]);
});

it("finds nodes DFS reverse", async () => {
  const edges = [
    ["put on your shoes", "tie your shoes"],
    ["put on your shirt", "put on your jacket"],
    ["put on your shorts", "put on your jacket"],
    ["put on your shorts", "put on your shoes"]
  ];
  assert.deepStrictEqual(dfs(edges, "put on your jacket", { reverse: true }), [
    "put on your jacket",
    "put on your shirt",
    "put on your shorts"
  ]);
  assert.deepStrictEqual(dfs(edges, "put on your shoes", { reverse: true }), [
    "put on your shoes",
    "put on your shorts"
  ]);
});

it("DFS handles cycles", async () => {
  const edges = [
    ["put on your shoes", "tie your shoes"],
    ["tie your shoes", "put on your shoes"]
  ];
  assert.deepStrictEqual(dfs(edges, "put on your shoes"), [
    "put on your shoes",
    "tie your shoes"
  ]);
});

it("supports nodes without edges", async () => {
  const edges = [
    ["put on your shoes", "tie your shoes"],
    ["put on your shirt", "put on your jacket"],
    ["put on your shorts", "put on your jacket"],
    ["put on your shorts", "put on your shoes"]
  ];
  assert.deepStrictEqual(dfs(edges, "listen to audiobook", { reverse: true }), [
    "listen to audiobook"
  ]);
});

it("handles empty edges", () => {
  assert.deepStrictEqual(dfs([], "a"), ["a"]);
});

it("handles self-loops", () => {
  const edges = [["a", "a"]];
  assert.deepStrictEqual(dfs(edges, "a"), ["a"]);
});

it("visits shared nodes only once (diamond graph)", () => {
  const edges = [
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 4]
  ];
  assert.deepStrictEqual(dfs(edges, 1), [1, 2, 4, 3]);
});

it("works with reverse on diamond graph", () => {
  const edges = [
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 4]
  ];
  assert.deepStrictEqual(dfs(edges, 4, { reverse: true }), [4, 2, 1, 3]);
});

it("traverses a linear chain in order", () => {
  const edges = [
    ["a", "b"],
    ["b", "c"],
    ["c", "d"]
  ];
  assert.deepStrictEqual(dfs(edges, "a"), ["a", "b", "c", "d"]);
});

it("only reaches the connected component", () => {
  const edges = [
    [1, 2],
    [2, 3],
    [10, 11],
    [11, 12]
  ];
  assert.deepStrictEqual(dfs(edges, 1), [1, 2, 3]);
  assert.deepStrictEqual(dfs(edges, 10), [10, 11, 12]);
});

it("handles reverse with cycles", () => {
  const edges = [
    ["a", "b"],
    ["b", "c"],
    ["c", "a"]
  ];
  assert.deepStrictEqual(dfs(edges, "a", { reverse: true }), ["a", "c", "b"]);
});

it("leaf node has no outgoing edges in forward mode", () => {
  const edges = [
    ["a", "b"],
    ["b", "c"]
  ];
  assert.deepStrictEqual(dfs(edges, "c"), ["c"]);
});

it("root node has no incoming edges in reverse mode", () => {
  const edges = [
    ["a", "b"],
    ["b", "c"]
  ];
  assert.deepStrictEqual(dfs(edges, "a", { reverse: true }), ["a"]);
});

it("explicit reverse: false behaves like default", () => {
  const edges = [
    [1, 2],
    [1, 3]
  ];
  assert.deepStrictEqual(dfs(edges, 1, { reverse: false }), dfs(edges, 1));
});

it("respects edge insertion order for traversal", () => {
  const edges = [
    ["a", "c"],
    ["a", "b"]
  ];
  // c appears before b in the edge list, so DFS visits c first
  assert.deepStrictEqual(dfs(edges, "a"), ["a", "c", "b"]);
});

it("handles a larger tree", () => {
  //       1
  //      / \
  //     2   3
  //    / \   \
  //   4   5   6
  const edges = [
    [1, 2],
    [1, 3],
    [2, 4],
    [2, 5],
    [3, 6]
  ];
  assert.deepStrictEqual(dfs(edges, 1), [1, 2, 4, 5, 3, 6]);
  assert.deepStrictEqual(dfs(edges, 2), [2, 4, 5]);
  assert.deepStrictEqual(dfs(edges, 6, { reverse: true }), [6, 3, 1]);
});
