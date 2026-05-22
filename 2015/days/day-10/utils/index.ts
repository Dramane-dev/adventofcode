export const countConsecutively = ({
  inputs,
  searchedItem,
  startIndex,
}: {
  inputs: string[];
  searchedItem: string;
  startIndex: number;
}) => {
  let count = 0;
  let canContinueToCount = true;

  for (let i = startIndex; i <= inputs.length; i++) {
    if (inputs[i] !== searchedItem) {
      canContinueToCount = false;
      return count;
    }

    if (canContinueToCount) {
      count++;
    }
  }

  return count;
};
