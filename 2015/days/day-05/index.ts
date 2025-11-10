import { INPUT } from './input';
import { findHowManyNiceStrings, findHowManyNiceStringsNext } from './solution';

const puzzleResult = findHowManyNiceStrings(INPUT);

console.log({
  title: "--- Day 5: Doesn't He Have Intern-Elves For This? ---",
  result: puzzleResult,
});

const puzzlePart2Result = findHowManyNiceStringsNext(INPUT);

console.log({
  title: "--- Day 5: Doesn't He Have Intern-Elves For This? - Part 2 ---",
  result: puzzlePart2Result,
});
