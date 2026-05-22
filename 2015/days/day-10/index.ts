import { INPUT } from './input';
import { applyLookAndSaySequences } from './solution';

const puzzleResult = applyLookAndSaySequences({ input: INPUT, repeat: 40 });

console.log({
  title: '--- Day 10: Elves Look, Elves Say ---',
  result: puzzleResult,
});

const puzzlePart2Result = applyLookAndSaySequences({ input: INPUT, repeat: 50 });

console.log({
  title: '--- Day 10: Elves Look, Elves Say - Part 2 ---',
  result: puzzlePart2Result,
});
