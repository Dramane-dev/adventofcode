import {
  computeEncodedStrings,
  computeStringsCode,
  computeStringsInMemory,
  computeStringsLengthDifference,
} from './solution';
import { getInput } from './utils';

describe('Day 8: Matchsticks', () => {
  describe('computeStringsCode', () => {
    const cases = [
      {
        level: 'easy - simple double quotes',
        input: [String.raw`""`],
        expected: 2,
      },
      {
        level: 'easy - simple string',
        input: [String.raw`"abc"`],
        expected: 5,
      },
      {
        level: 'easy - string with escape sequences',
        input: [String.raw`"n\\"`],
        expected: 5,
      },
      {
        level: 'easy - string with escape double quotes',
        input: [String.raw`"aaa\"aaa"`],
        expected: 10,
      },
      {
        level: 'easy - string with ascii code',
        input: [String.raw`"\x27"`],
        expected: 6,
      },
      {
        level: 'easy - string with multiple escape sequences & escape double quotes',
        input: [String.raw`"n\\\\\""`],
        expected: 9,
      },
      {
        level: 'easy - aoc example',
        input: getInput('./tests/aoc.txt'),
        expected: 23,
      },
      {
        level: 'easy - strings file',
        input: getInput('./tests/easy.txt'),
        expected: 59,
      },
      {
        level: 'medium - strings file',
        input: getInput('./tests/medium.txt'),
        expected: 85,
      },
      {
        level: 'hard - strings file',
        input: getInput('./tests/hard.txt'),
        expected: 264,
      },
    ];

    it.each(cases)('should return $expected when $level level', ({ input, expected }) => {
      // GIVEN
      // WHEN
      const result = computeStringsCode(input);

      // THEN
      expect(result).toBe(expected);
    });
  });
  describe('computeStringsInMemory', () => {
    const cases = [
      {
        level: 'easy - simple double quotes',
        input: [String.raw`""`],
        expected: 0,
      },
      {
        level: 'easy - simple string',
        input: [String.raw`"abc"`],
        expected: 3,
      },
      {
        level: 'easy - string with escape sequences',
        input: [String.raw`"n\\"`],
        expected: 2,
      },
      {
        level: 'easy - string with escape double quotes',
        input: [String.raw`"aaa\"aaa"`],
        expected: 7,
      },
      {
        level: 'easy - string with ascii code',
        input: [String.raw`"\x27"`],
        expected: 1,
      },
      {
        level: 'easy - string with multiple escape sequences & escape double quotes',
        input: [String.raw`"n\\\\\""`],
        expected: 4,
      },
      {
        level: 'easy - aoc example',
        input: getInput('./tests/aoc.txt'),
        expected: 11,
      },
      {
        level: 'easy - strings file',
        input: getInput('./tests/easy.txt'),
        expected: 38,
      },
      {
        level: 'medium - strings file',
        input: getInput('./tests/medium.txt'),
        expected: 61,
      },
      {
        level: 'hard - strings file',
        input: getInput('./tests/hard.txt'),
        expected: 195,
      },
    ];

    it.each(cases)('should return $expected when $level level', ({ input, expected }) => {
      // GIVEN
      // WHEN
      const result = computeStringsInMemory(input);

      // THEN
      expect(result).toBe(expected);
    });
  });
  describe('computeStringsLengthDifference', () => {
    const cases = [
      {
        level: 'easy - simple double quotes',
        input: [String.raw`""`],
        expected: 2,
      },
      {
        level: 'easy - simple string',
        input: [String.raw`"abc"`],
        expected: 2,
      },
      {
        level: 'easy - string with escape sequences',
        input: [String.raw`"n\\"`],
        expected: 3,
      },
      {
        level: 'easy - string with escape double quotes',
        input: [String.raw`"aaa\"aaa"`],
        expected: 3,
      },
      {
        level: 'easy - string with ascii code',
        input: [String.raw`"\x27"`],
        expected: 5,
      },
      {
        level: 'easy - aoc example',
        input: getInput('./tests/aoc.txt'),
        expected: 12,
      },
      {
        level: 'easy - strings file',
        input: getInput('./tests/easy.txt'),
        expected: 21,
      },
      {
        level: 'medium - strings file',
        input: getInput('./tests/medium.txt'),
        expected: 24,
      },
      {
        level: 'hard - strings file',
        input: getInput('./tests/hard.txt'),
        expected: 69,
      },
    ];

    it.each(cases)('should return $expected when $level level', ({ input, expected }) => {
      // GIVEN
      const codeLength = computeStringsCode(input);
      const memoryLength = computeStringsInMemory(input);

      // WHEN
      const result = computeStringsLengthDifference({
        firstStringsLength: codeLength,
        secondStringsLength: memoryLength,
      });

      // THEN
      expect(result).toBe(expected);
    });
  });
  describe('computeEncodedStrings', () => {
    const cases = [
      {
        level: 'easy - simple double quotes',
        input: [String.raw`""`],
        expected: 6,
      },
      {
        level: 'easy - simple string',
        input: [String.raw`"abc"`],
        expected: 9,
      },
      {
        level: 'easy - string with escape sequences',
        input: [String.raw`"n\\"`],
        expected: 11,
      },
      {
        level: 'easy - string with escape double quotes',
        input: [String.raw`"aaa\"aaa"`],
        expected: 16,
      },
      {
        level: 'easy - string with ascii code',
        input: [String.raw`"\x27"`],
        expected: 11,
      },
      {
        level: 'easy - string with multiple escape sequences & escape double quotes',
        input: [String.raw`"n\\\\\""`],
        expected: 19,
      },
      {
        level: 'easy - aoc example',
        input: getInput('./tests/aoc.txt'),
        expected: 42,
      },
      {
        level: 'easy - strings file',
        input: getInput('./tests/easy.txt'),
        expected: 101,
      },
      {
        level: 'medium - strings file',
        input: getInput('./tests/medium.txt'),
        expected: 128,
      },
      {
        level: 'hard - strings file',
        input: getInput('./tests/hard.txt'),
        expected: 352,
      },
    ];

    it.each(cases)('should return $expected when $level level', ({ input, expected }) => {
      // GIVEN
      // WHEN
      const result = computeEncodedStrings(input);

      // THEN
      expect(result).toBe(expected);
    });
  });
  describe('computeStringsLengthDifference - part 2', () => {
    const cases = [
      {
        level: 'easy - simple double quotes',
        input: [String.raw`""`],
        expected: 4,
      },
      {
        level: 'easy - simple string',
        input: [String.raw`"abc"`],
        expected: 4,
      },
      {
        level: 'easy - string with escape sequences',
        input: [String.raw`"n\\"`],
        expected: 6,
      },
      {
        level: 'easy - string with escape double quotes',
        input: [String.raw`"aaa\"aaa"`],
        expected: 6,
      },
      {
        level: 'easy - string with ascii code',
        input: [String.raw`"\x27"`],
        expected: 5,
      },
      {
        level: 'easy - aoc example',
        input: getInput('./tests/aoc.txt'),
        expected: 19,
      },
      {
        level: 'easy - strings file',
        input: getInput('./tests/easy.txt'),
        expected: 42,
      },
      {
        level: 'medium - strings file',
        input: getInput('./tests/medium.txt'),
        expected: 43,
      },
      {
        level: 'hard - strings file',
        input: getInput('./tests/hard.txt'),
        expected: 88,
      },
    ];

    it.each(cases)('should return $expected when $level level', ({ input, expected }) => {
      // GIVEN
      const firstStringsLength = computeStringsCode(input);
      const secondStringsLength = computeEncodedStrings(input);

      // WHEN
      const result = computeStringsLengthDifference({ firstStringsLength, secondStringsLength });

      // THEN
      expect(result).toBe(expected);
    });
  });
});
