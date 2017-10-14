/* eslint-env jest */
// @flow
import dfs from '.';

it('finds nodes DFS', async () => {
  const edges = [
    ['put on your shoes', 'tie your shoes'],
    ['put on your shirt', 'put on your jacket'],
    ['put on your shorts', 'put on your jacket'],
    ['put on your shorts', 'put on your shoes'],
  ];
  expect(dfs(edges, 'put on your shorts').sort()).toEqual([
    'put on your shorts',
    'put on your jacket',
    'put on your shoes',
    'tie your shoes',
  ].sort());
  expect(dfs(edges, 'put on your shirt').sort()).toEqual([
    'put on your shirt',
    'put on your jacket',
  ].sort());
});

it('finds nodes DFS reverse', async () => {
  const edges = [
    ['put on your shoes', 'tie your shoes'],
    ['put on your shirt', 'put on your jacket'],
    ['put on your shorts', 'put on your jacket'],
    ['put on your shorts', 'put on your shoes'],
  ];
  expect(dfs(edges, 'put on your jacket', { reverse: true }).sort()).toEqual([
    'put on your jacket',
    'put on your shirt',
    'put on your shorts',
  ].sort());
  expect(dfs(edges, 'put on your shoes', { reverse: true }).sort()).toEqual([
    'put on your shoes',
    'put on your shorts',
  ].sort());
});

it('DFS handles cycles', async () => {
  const edges = [
    ['put on your shoes', 'tie your shoes'],
    ['tie your shoes', 'put on your shoes'],
  ];
  expect(dfs(edges, 'put on your shoes').sort()).toEqual([
    'put on your shoes',
    'tie your shoes',
  ].sort());
});

it('supports nodes without edges', async () => {
  const edges = [
    ['put on your shoes', 'tie your shoes'],
    ['put on your shirt', 'put on your jacket'],
    ['put on your shorts', 'put on your jacket'],
    ['put on your shorts', 'put on your shoes'],
  ];
  expect(dfs(edges, 'listen to audiobook', { reverse: true }).sort()).toEqual([
    'listen to audiobook',
  ].sort());
});
