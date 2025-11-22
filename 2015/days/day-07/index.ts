import { INPUT } from './input';
import { findSpecificWireSignal } from './solution';

const puzzleResult = findSpecificWireSignal(INPUT);

console.log({
  title: '--- Day 7: Some Assembly Required ---',
  result: puzzleResult,
});
