import crypto from 'crypto';

export const findSantaLowestPositiveNumber = (input: string) => {
  let lowestPositiveNumber = 1;

  for (let n = 1; n < Infinity; n++) {
    let hash = crypto.createHash('md5').update(`${input}${n}`).digest('hex');

    if (hash.startsWith('00000')) {
      return n;
    }
  }

  return lowestPositiveNumber;
};
