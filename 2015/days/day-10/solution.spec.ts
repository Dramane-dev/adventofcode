import { describe, expect, it } from 'vitest';
import { applyLookAndSaySequences } from './solution';

import { countConsecutively } from './utils/index';

describe('Day 10: All in a Single Night', () => {
  describe('countConsecutively', () => {
    const cases = [
      {
        level: 'easy',
        inputs: ['1'],
        searchedItem: '1',
        expected: 1,
      },
      {
        level: 'easy',
        inputs: ['1', '1'],
        searchedItem: '1',
        expected: 2,
      },
      {
        level: 'easy',
        inputs: ['1', '1'],
        searchedItem: '3',
        expected: 0,
      },
      {
        level: 'easy',
        inputs: ['2', '1'],
        searchedItem: '2',
        expected: 1,
      },
      {
        level: 'medium',
        inputs: ['1', '2', '1', '1'],
        searchedItem: '2',
        expected: 0,
      },
      {
        level: 'medium',
        inputs: ['1', '1', '1', '2', '2', '1'],
        searchedItem: '1',
        expected: 3,
      },
      {
        level: 'hard',
        inputs: ['3', '1', '1', '3', '3', '2', '2', '1', '1', '3'],
        searchedItem: '3',
        expected: 1,
      },
    ];

    it.each(cases)(
      'should return $expected when receive $inputs inputs',
      ({ inputs, searchedItem, expected }) => {
        // GIVEN
        // WHEN
        const result = countConsecutively({ inputs, searchedItem });

        // THEN
        expect(result).toBe(expected);
      },
    );
  });
  describe('applyLookAndSaySequences', () => {
    const cases = [
      {
        level: 'easy',
        input: '1',
        expected: 2,
      },
      {
        level: 'easy',
        input: '11',
        expected: 2,
      },
      {
        level: 'easy',
        input: '21',
        expected: 4,
      },
      {
        level: 'medium',
        input: '221',
        expected: 4,
      },
      {
        level: 'medium',
        input: '1211',
        expected: 6,
      },
      {
        level: 'medium',
        input: '111221',
        expected: 6,
      },
      {
        level: 'hard',
        input: '3113322113',
        repeat: 40,
        expected: 329356,
      },
    ];

    it.each(cases)(
      'should return $expected when receive $input input',
      ({ input, repeat, expected }) => {
        // GIVEN
        // WHEN
        const result = applyLookAndSaySequences({ input, repeat });

        // THEN
        expect(result).toBe(expected);
      },
    );
  });
});
