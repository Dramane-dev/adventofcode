import { INPUT } from './input';
import { findSpecificWireSignalRecursively } from './recursive-solution';
import { findSpecificWireSignal } from './solution';
import { formatExecutionTime } from './utils';

let start = Date.now();
const puzzleResult = findSpecificWireSignal(INPUT);
let end = Date.now();

console.log({
  title: '--- Day 7: Some Assembly Required ---',
  result: puzzleResult,
  executionTime: formatExecutionTime(end - start),
});

start = Date.now();
const puzzleRecursiveResult = findSpecificWireSignalRecursively({
  inputs: INPUT,
  wireToSearch: 'a',
});
end = Date.now();

console.log({
  title: '--- Day 7: Some Assembly Required Recursive Version ---',
  result: puzzleRecursiveResult,
  executionTime: formatExecutionTime(end - start),
});
