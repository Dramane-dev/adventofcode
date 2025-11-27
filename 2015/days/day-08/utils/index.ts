import { readFileSync } from 'fs';

export const getInput = (path: string) => {
  return readFileSync(path, 'utf-8').trim().split('\n');
};

export const computePatternMatches = ({ line, pattern }: { line: string; pattern: RegExp }) => {
  return (line.match(pattern) || []).length;
};

export const handleRegexOverlap = ({ line, pattern }: { line: string; pattern: RegExp }) => {
  return line.replaceAll(pattern, '');
};

export const subtractExcessPerPattern = ({
  line,
  pattern,
  numberOfCharacters,
  excessPerPattern,
}: {
  line: string;
  pattern: RegExp;
  numberOfCharacters: number;
  excessPerPattern: number;
}) => {
  const charsPatternMatches = computePatternMatches({ line, pattern });

  if (charsPatternMatches) {
    numberOfCharacters -= charsPatternMatches * excessPerPattern;
    line = handleRegexOverlap({ line, pattern });
  }

  return { line, numberOfCharacters };
};
