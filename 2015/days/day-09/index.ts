import { INPUT } from './input';
import { findMostLongWay, findMostShortWay } from './solution';

const puzzleResult = findMostShortWay(INPUT);

console.log({
  title: '--- Day 9: All in a Single Night ---',
  result: puzzleResult,
});

const puzzlePart2Result = findMostLongWay(INPUT);

console.log({
  title: '--- Day 9: All in a Single Night - Part 2 ---',
  result: puzzlePart2Result,
});
