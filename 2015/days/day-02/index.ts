import { INPUT } from './input';
import { getWrappingPaperSurfaceArea, getRequiredRebbonToWrapPresents } from './solution';

const puzzleResult = getWrappingPaperSurfaceArea(INPUT);

console.log({
  title: '--- Day 2: I Was Told There Would Be No Math ---',
  result: puzzleResult,
});

const puzzlePart2Result = getRequiredRebbonToWrapPresents(INPUT);

console.log({
  title: '--- Day 2: I Was Told There Would Be No Math - Part 2 ---',
  result: puzzlePart2Result,
});
