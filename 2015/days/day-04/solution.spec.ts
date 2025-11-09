import { findSantaLowestPositiveNumber } from './solution';

describe('Day 3: Perfectly Spherical Houses in a Vacuum', () => {
  describe('findSantaLowestPositiveNumber', () => {
    const cases = [
      { level: 'easy', input: 'abcdef', expected: 609043 },
      { level: 'medium', input: 'pqrstuv', expected: 1048970 },
      { level: 'medium', input: 'bgvyzdsv', expected: 254575 },
      { level: 'hard', input: 'abcdefpqrstuvbgvyzdsv', expected: 283636 },
    ];

    it.each(cases)(
      'should return $expected when $level level with $input',
      ({ input, expected }) => {
        // GIVEN
        // WHEN
        const result = findSantaLowestPositiveNumber({ input: input });

        // THEN
        expect(result).toBe(expected);
      },
    );
  });
  describe('findSantaLowestPositiveNumber with isSearchStartWithSixZeroes', () => {
    const cases = [
      { level: 'easy', input: 'abcdef', expected: 6742839 },
      { level: 'medium', input: 'pqrstuv', expected: 5714438 },
      { level: 'medium', input: 'bgvyzdsv', expected: 1038736 },
      { level: 'hard', input: 'abcdefpqrstuvbgvyzdsv', expected: 7015308 },
    ];

    it.each(cases)(
      'should return $expected when $level level with $input',
      ({ input, expected }) => {
        // GIVEN
        // WHEN
        const result = findSantaLowestPositiveNumber({
          input: input,
          isSearchStartWithSixZeroes: true,
        });

        // THEN
        expect(result).toBe(expected);
      },
    );
  });
});
