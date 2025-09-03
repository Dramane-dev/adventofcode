import { getRequiredRebbonToWrapPresents, getWrappingPaperSurfaceArea } from './solution';

describe('Day 2: I Was Told There Would Be No Math', () => {
  describe('getDeliveryFloor', () => {
    const cases = [
      { level: 'easy', input: ['2x3x4'], expected: 58 },
      { level: 'easy', input: ['1x1x10'], expected: 43 },
      { level: 'easy', input: ['23x20x22'], expected: 3_252 },
      { level: 'medium', input: ['2x3x4', '2x3x4'], expected: 116 },
      { level: 'hard', input: ['883x240x678', '6789x456x967894'], expected: 140_361_807_60 },
    ];

    it.each(cases)(
      'should return $expected when $level level with $input',
      ({ input, expected }) => {
        // GIVEN
        const instructions = input;

        // WHEN
        const result = getWrappingPaperSurfaceArea(input);

        // THEN
        expect(result).toBe(expected);
      },
    );
  });
  describe('getRequiredRebbonToWrapPresents', () => {
    const cases = [
      { level: 'easy', input: ['2x3x4'], expected: 34 },
      { level: 'easy', input: ['1x1x10'], expected: 14 },
      { level: 'easy', input: ['23x20x22'], expected: 10_204 },
      { level: 'medium', input: ['2x3x4', '2x3x4'], expected: 68 },
      { level: 'hard', input: ['883x240x678', '6789x456x967894'], expected: 2_996_534_456_982 },
    ];

    it.each(cases)(
      'should return $expected when $level level with $input',
      ({ input, expected }) => {
        // GIVEN
        const instructions = input;

        // WHEN
        const result = getRequiredRebbonToWrapPresents(input);

        // THEN
        expect(result).toBe(expected);
      },
    );
  });
});
