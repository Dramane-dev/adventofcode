export const countConsecutively = ({
  inputs,
  searchedItem,
}: {
  inputs: string[];
  searchedItem: string;
}) => {
  let count = 0;
  let canContinueToCount = true;

  inputs.forEach((input) => {
    if (input !== searchedItem) {
      canContinueToCount = false;
      return count;
    }

    if (canContinueToCount) {
      count++;
    }
  });

  return count;
};
