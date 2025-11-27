import {
  ASCII_CODE_PATTERN,
  ESCAPE_DOUBLE_QUOTES_PATTERN,
  ESCAPE_SEQUENCES_PATTERN,
} from './constants';
import { subtractExcessPerPattern } from './utils';

export const computeStringsCode = (santaList: string[]) => {
  return santaList.reduce((prevLine, currLine) => prevLine + currLine.length, 0);
};

export const computeStringsInMemory = (santaList: string[]) => {
  const QUOTE_WRAPPER_CHARS = 2;
  let numberOfCharacters = 0;

  santaList.forEach((line) => {
    numberOfCharacters += line.length;

    ({ line, numberOfCharacters } = subtractExcessPerPattern({
      line,
      pattern: ASCII_CODE_PATTERN,
      numberOfCharacters,
      excessPerPattern: 3,
    }));

    ({ line, numberOfCharacters } = subtractExcessPerPattern({
      line,
      pattern: ESCAPE_SEQUENCES_PATTERN,
      numberOfCharacters,
      excessPerPattern: 1,
    }));

    ({ line, numberOfCharacters } = subtractExcessPerPattern({
      line,
      pattern: ESCAPE_DOUBLE_QUOTES_PATTERN,
      numberOfCharacters,
      excessPerPattern: 1,
    }));

    numberOfCharacters -= QUOTE_WRAPPER_CHARS;
  });

  return numberOfCharacters;
};

export const computeCodeMemoryDifference = ({
  codeLength,
  memoryLength,
}: {
  codeLength: number;
  memoryLength: number;
}) => {
  return Math.abs(codeLength - memoryLength);
};
