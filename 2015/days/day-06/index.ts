import { INPUT } from './input';
import { findHowManyLightsAreLit } from './solution';

const puzzleResult = findHowManyLightsAreLit(INPUT);

console.log({
  title: '--- Day 6: Probably a Fire Hazard ---',
  result: puzzleResult,
});
