import { INPUT } from './input';
import { findHowManyLightsAreLit, findTotalBrightness } from './solution';

const puzzleResult = findHowManyLightsAreLit(INPUT);

console.log({
  title: '--- Day 6: Probably a Fire Hazard ---',
  result: puzzleResult,
});

const puzzlePart2Result = findTotalBrightness(INPUT);

console.log({
  title: '--- Day 6: Probably a Fire Hazard - Part 2 ---',
  result: puzzlePart2Result,
});
