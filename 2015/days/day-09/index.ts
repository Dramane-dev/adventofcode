import { INPUT } from './input';
import { findMostShortWay } from './solution';

const puzzleResult = findMostShortWay(INPUT);

console.log({
  title: '--- Day 9: All in a Single Night ---',
  result: puzzleResult,
});
