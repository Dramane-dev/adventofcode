import {
  cleanInput,
  findUniqueLocations,
  parseInput,
  generateLocationsPermutations,
  computePlannedRoutesDistances,
} from './utils';

export const findMostShortWay = (input: string[]) => {
  const cleanedInput = cleanInput(input);
  const locations = findUniqueLocations(cleanedInput);
  const locationsDistances = parseInput(cleanedInput);
  const plannedRoutes = generateLocationsPermutations({ locations, startIndex: 0 });
  const distances = computePlannedRoutesDistances({ plannedRoutes, locationsDistances });

  return Math.min(...distances);
};
