import { expect, it } from "vitest";
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

it("handles empty edges", () => {
  expect(dfs([], "a")).toEqual(["a"]);
});

it("handles self-loops", () => {
  const edges: Edges<string> = [["a", "a"]];
  expect(dfs(edges, "a")).toEqual(["a"]);
});

it("visits shared nodes only once (diamond graph)", () => {
  const edges: Edges<number> = [
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 4]
  ];
  expect(dfs(edges, 1)).toEqual([1, 2, 4, 3]);
});

it("works with reverse on diamond graph", () => {
  const edges: Edges<number> = [
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 4]
  ];
  expect(dfs(edges, 4, { reverse: true })).toEqual([4, 2, 1, 3]);
});

it("traverses a linear chain in order", () => {
  const edges: Edges<string> = [
    ["a", "b"],
    ["b", "c"],
    ["c", "d"]
  ];
  expect(dfs(edges, "a")).toEqual(["a", "b", "c", "d"]);
});

it("only reaches the connected component", () => {
  const edges: Edges<number> = [
    [1, 2],
    [2, 3],
    [10, 11],
    [11, 12]
  ];
  expect(dfs(edges, 1)).toEqual([1, 2, 3]);
  expect(dfs(edges, 10)).toEqual([10, 11, 12]);
});

it("handles reverse with cycles", () => {
  const edges: Edges<string> = [
    ["a", "b"],
    ["b", "c"],
    ["c", "a"]
  ];
  expect(dfs(edges, "a", { reverse: true })).toEqual(["a", "c", "b"]);
});

it("leaf node has no outgoing edges in forward mode", () => {
  const edges: Edges<string> = [
    ["a", "b"],
    ["b", "c"]
  ];
  expect(dfs(edges, "c")).toEqual(["c"]);
});

it("root node has no incoming edges in reverse mode", () => {
  const edges: Edges<string> = [
    ["a", "b"],
    ["b", "c"]
  ];
  expect(dfs(edges, "a", { reverse: true })).toEqual(["a"]);
});

it("explicit reverse: false behaves like default", () => {
  const edges: Edges<number> = [
    [1, 2],
    [1, 3]
  ];
  expect(dfs(edges, 1, { reverse: false })).toEqual(dfs(edges, 1));
});

it("respects edge insertion order for traversal", () => {
  const edges: Edges<string> = [
    ["a", "c"],
    ["a", "b"]
  ];
  // c appears before b in the edge list, so DFS visits c first
  expect(dfs(edges, "a")).toEqual(["a", "c", "b"]);
});

it("handles a larger tree", () => {
  //       1
  //      / \
  //     2   3
  //    / \   \
  //   4   5   6
  const edges: Edges<number> = [
    [1, 2],
    [1, 3],
    [2, 4],
    [2, 5],
    [3, 6]
  ];
  expect(dfs(edges, 1)).toEqual([1, 2, 4, 5, 3, 6]);
  expect(dfs(edges, 2)).toEqual([2, 4, 5]);
  expect(dfs(edges, 6, { reverse: true })).toEqual([6, 3, 1]);
});
