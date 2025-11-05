import { INPUT } from './input';
import { getHousesReceivedLeastOncePresent } from './solution';

const puzzleResult = getHousesReceivedLeastOncePresent(INPUT);

console.log({
  title: '--- Day 3: Perfectly Spherical Houses in a Vacuum ---',
  result: puzzleResult,
});
