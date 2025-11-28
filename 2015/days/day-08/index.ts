import fs from 'fs';
import {
  computeEncodedStrings,
  computeStringsCode,
  computeStringsInMemory,
  computeStringsLengthDifference,
} from './solution';

const INPUT = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');
const codeLength = computeStringsCode(INPUT);
const memoryLength = computeStringsInMemory(INPUT);
const puzzleResult = computeStringsLengthDifference({
  firstStringsLength: codeLength,
  secondStringsLength: memoryLength,
});

console.log({
  title: '--- Day 8: Matchsticks ---',
  result: puzzleResult,
});

const firstStringsLength = computeStringsCode(INPUT);
const secondStringsLength = computeEncodedStrings(INPUT);
const puzzlePart2Result = computeStringsLengthDifference({
  firstStringsLength,
  secondStringsLength,
});

console.log({
  title: '--- Day 8: Matchsticks - Part 2 ---',
  result: puzzlePart2Result,
});
