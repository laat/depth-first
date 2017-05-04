/* eslint-env jest */
// @flow
import dfs from '.';

it('finds nodes DFS', async () => {
  const edges = [
    ['tie your shoes', 'put on your shoes'],
    ['put on your jacket', 'put on your shirt'],
    ['put on your shoes', 'put on your shorts'],
    ['put on your jacket', 'put on your shorts'],
  ];
  expect(dfs(edges, 'tie your shoes').sort()).toEqual([
    'put on your shorts',
    'put on your shoes',
    'tie your shoes',
  ].sort());
  expect(dfs(edges, 'put on your shorts').sort()).toEqual([
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

it('can be reversed', async () => {
  const edges = [
    ['tie your shoes', 'put on your shoes'],
    ['put on your jacket', 'put on your shirt'],
    ['put on your shoes', 'put on your shorts'],
    ['put on your jacket', 'put on your shorts'],
  ];
  expect(dfs(edges, 'put on your shorts', { reverse: true }).sort()).toEqual([
    'put on your jacket',
    'put on your shorts',
    'put on your shoes',
    'tie your shoes',
  ].sort());
});
