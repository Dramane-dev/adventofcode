export const getDeliveryFloor = (input: string) => {
  return input
    .split('')
    .map((instruction) => (instruction === '(' ? 1 : -1))
    .reduce((prev, curr) => prev + curr, 0);
};

export const getFirstDownInstructionIndex = (input: string) => {
  let index = 1;
  let floor = 0;

  for (const instruction of input) {
    floor += instruction === '(' ? 1 : -1;

    if (floor === -1) {
      return index;
    }

    index++;
  }

  return null;
};
