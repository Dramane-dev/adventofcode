export const cleanInput = (input: string) => {
  return input.split('x').map((item) => parseInputToNumber(item));
};

export const assertIsValidInputSize = (input: string) => {
  if (!(input.length >= 5)) {
    throw new Error(
      `Incorrect input size, the minimum required is 5 but received: ${input.length}`,
    );
  }
};

export const parseInputToNumber = (input: string) => {
  return parseInt(input, 10);
};

export const sortInput = (input: number[]) => {
  return input.sort((a, b) => a - b);
};
