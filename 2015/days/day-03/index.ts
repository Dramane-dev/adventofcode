import { INPUT } from './input';
import {
  getHousesReceivedLeastOncePresent,
  getHousesReceivedLeastOncePresentWithRobotSanta,
} from './solution';

const puzzleResult = getHousesReceivedLeastOncePresent({ instructions: INPUT });

console.log({
  title: '--- Day 3: Perfectly Spherical Houses in a Vacuum ---',
  result: puzzleResult.size,
});

const puzzlePart2Result = getHousesReceivedLeastOncePresentWithRobotSanta(INPUT);

console.log({
  title: '--- Day 3: Perfectly Spherical Houses in a Vacuum - Part 2 ---',
  result: puzzlePart2Result,
});
