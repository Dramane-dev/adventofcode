import { getDeliveryFloor, getFirstDownInstructionIndex } from './solution';

describe('Day 1 - Not Quite Lisp', () => {
  describe('getDeliveryFloor', () => {
    const cases = [
      { level: 'easy', input: '(())', expected: 0 },
      { level: 'easy', input: '()', expected: 0 },
      { level: 'easy', input: '(', expected: 1 },
      { level: 'easy', input: ')', expected: -1 },
      { level: 'medium', input: '((()))', expected: 0 },
      { level: 'medium', input: '(()(()(', expected: 3 },
      { level: 'medium', input: '())', expected: -1 },
      { level: 'medium', input: '()))', expected: -2 },
      { level: 'medium', input: '(()())())', expected: -1 },
      { level: 'hard', input: '(((()))())(()(()))((())())(()(()))(((()(()))))', expected: 0 },
      { level: 'hard', input: '())())())())())((((()))))((()))(()()()())())', expected: -6 },
      { level: 'hard', input: '(((((((((())))))))))(((((())))))((())())())())', expected: -2 },
    ];

    it.each(cases)('should return $expected with $level input', ({ input, expected }) => {
      // GIVEN
      const instructions = input;

      // WHEN
      const result = getDeliveryFloor(input);

      // THEN
      expect(result).toBe(expected);
    });
  });

  describe('getFirstDownInstructionIndex', () => {
    const cases = [
      { level: 'easy', input: ')', expected: 1 },
      { level: 'easy', input: '()())', expected: 5 },
      { level: 'easy', input: '())', expected: 3 },
      { level: 'easy', input: '(()))', expected: 5 },
      { level: 'easy', input: '(())', expected: null }, // Santa never go to enter the basement
      { level: 'medium', input: '(()))(', expected: 5 },
      { level: 'medium', input: '()()())', expected: 7 },
      { level: 'medium', input: '((())())())', expected: 11 },
      { level: 'medium', input: '(()(())))))', expected: 9 },
      { level: 'medium', input: '(((())))', expected: null }, // Santa never go to enter the basement
      {
        level: 'hard',
        input: '(((()))())(()(()))((())())(()(()))(((()(())))))',
        expected: 47,
      },
      {
        level: 'hard',
        input: '())())())())())((((()))))((()))(()()()())())',
        expected: 3,
      },
      {
        level: 'hard',
        input: '(((((((((())))))))))(((((())))))((())())())())',
        expected: 43,
      },
      {
        level: 'hard',
        input: '(((((((())))))))(((((())))))(((())))',
        expected: null, // Santa never go to enter the basement
      },
    ];

    it.each(cases)('should return $expected with $level input', ({ input, expected }) => {
      // GIVEN
      const instructions = input;

      // WHEN
      const result = getFirstDownInstructionIndex(input);

      // THEN
      expect(result).toBe(expected);
    });
  });
});
