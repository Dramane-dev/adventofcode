import crypto from 'crypto';

const FIVE_ZEROES = '00000';
const SIX_ZEROES = '000000';

export const findSantaLowestPositiveNumber = ({
  input,
  isSearchStartWithSixZeroes,
}: {
  input: string;
  isSearchStartWithSixZeroes?: boolean;
}) => {
  let lowestPositiveNumber = 1;

  for (let n = 1; n < Infinity; n++) {
    let hash = crypto.createHash('md5').update(`${input}${n}`).digest('hex');

    if (hash.startsWith(isSearchStartWithSixZeroes ? SIX_ZEROES : FIVE_ZEROES)) {
      return n;
    }
  }

  return lowestPositiveNumber;
};
