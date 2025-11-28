import {
  ASCII_CODE_PATTERN,
  DOUBLE_QUOTES_PATTERN,
  ESCAPE_CHAR_PATTERN,
  ESCAPE_DOUBLE_QUOTES_PATTERN,
  ESCAPE_SEQUENCES_PATTERN,
  QUOTE_WRAPPER_CHARS,
} from './constants';
import { addExcessPerPattern, subtractExcessPerPattern } from './utils';

export const computeStringsCode = (santaList: string[]) => {
  return santaList.reduce((prevLine, currLine) => prevLine + currLine.length, 0);
};

export const computeStringsInMemory = (santaList: string[]) => {
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

export const computeEncodedStrings = (santaList: string[]) => {
  let numberOfCharacters = 0;

  santaList.forEach((line) => {
    numberOfCharacters += line.length;
    ({ line, numberOfCharacters } = addExcessPerPattern({
      line,
      numberOfCharacters,
      pattern: ESCAPE_CHAR_PATTERN,
      excessPerPattern: 1,
    }));

    ({ line, numberOfCharacters } = addExcessPerPattern({
      line,
      numberOfCharacters,
      pattern: DOUBLE_QUOTES_PATTERN,
      excessPerPattern: 1,
    }));

    numberOfCharacters += QUOTE_WRAPPER_CHARS;
  });

  return numberOfCharacters;
};

export const computeStringsLengthDifference = ({
  firstStringsLength,
  secondStringsLength,
}: {
  firstStringsLength: number;
  secondStringsLength: number;
}) => {
  return Math.abs(firstStringsLength - secondStringsLength);
};
