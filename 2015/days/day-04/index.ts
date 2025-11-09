import { INPUT } from './input';
import { findSantaLowestPositiveNumber } from './solution';

const puzzleResult = findSantaLowestPositiveNumber({ input: INPUT });

console.log({
  title: '--- Day 4: The Ideal Stocking Stuffer ---',
  result: puzzleResult,
});
