import { INPUT } from './input';
import { getDeliveryFloor, getFirstDownInstructionIndex } from './solution';

const puzzleResult = getDeliveryFloor(INPUT.instructions);

console.log({
  title: '--- Day 1: Not Quite Lisp ---',
  result: puzzleResult,
});

const puzzlePart2Result = getFirstDownInstructionIndex(INPUT.instructions);

console.log({
  title: '--- Day 1: Not Quite Lisp - Part 2 ---',
  result: puzzlePart2Result,
});
