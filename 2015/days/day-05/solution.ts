const VOWELS = ['a', 'e', 'i', 'o', 'u'];
const MIN_VOWELS_REQUIRED = 3;
const CONSECUTIVE_CHAR_PATTERN = new RegExp(/([a-z])\1/, 'i');
const NAUGHTY = ['ab', 'cd', 'pq', 'xy'];

const checkIfContainNaughtyStrings = (str: string) => {
  return NAUGHTY.some((naughtyValue) => new RegExp(naughtyValue).test(str));
};

const checkIfContainVowels = (str: string) => {
  let numberOfVowels = 0;

  str.split('').map((value) => {
    if (VOWELS.includes(value)) {
      numberOfVowels += 1;
    }
  });

  return numberOfVowels >= MIN_VOWELS_REQUIRED;
};

const checkIfContainConsecutiveChar = (char: string) => {
  return CONSECUTIVE_CHAR_PATTERN.test(char);
};

export const findHowManyNiceStrings = (strings: string[]) => {
  let numberOfNiceStrings = 0;

  for (let i = 0; i < strings.length; i++) {
    const str = strings[i];

    if (checkIfContainNaughtyStrings(str)) {
      continue;
    }

    if (checkIfContainVowels(str) && checkIfContainConsecutiveChar(str)) {
      numberOfNiceStrings += 1;
    }
  }

  return numberOfNiceStrings;
};
