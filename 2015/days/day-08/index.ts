import fs from 'fs';
import {
  computeCodeMemoryDifference,
  computeStringsCode,
  computeStringsInMemory,
} from './solution';

const INPUT = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');
const codeLength = computeStringsCode(INPUT);
const memoryLength = computeStringsInMemory(INPUT);
const puzzleResult = computeCodeMemoryDifference({ codeLength, memoryLength });

console.log({
  title: '--- Day 8: Matchsticks ---',
  result: puzzleResult,
});

// const puzzlePart2Result = findTotalBrightness(INPUT);

// console.log({
//   title: '--- Day 6: Probably a Fire Hazard - Part 2 ---',
//   result: puzzlePart2Result,
// });
