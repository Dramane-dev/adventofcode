import { INPUT } from './input';
import { findSantaLowestPositiveNumber } from './solution';

const puzzleResult = findSantaLowestPositiveNumber({ input: INPUT });

console.log({
  title: '--- Day 4: The Ideal Stocking Stuffer ---',
  result: puzzleResult,
});

const puzzlePart2Result = findSantaLowestPositiveNumber({
  input: INPUT,
  isSearchStartWithSixZeroes: true,
});

console.log({
  title: '--- Day 4: The Ideal Stocking Stuffer - Part 2 ---',
  result: puzzlePart2Result,
});
