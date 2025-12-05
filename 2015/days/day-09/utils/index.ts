import { LocationsDistancesType } from '../index.type';

export const cleanInput = (input: string[]) => {
  return input.map((item) => {
    return item.replace('to ', '').replace('= ', '');
  });
};

export const filterEmptyItem = (item: string) => {
  return item.split(' ').filter((v) => v);
};

export const parseInput = (input: string[]) => {
  const locationsDistances = new Map<string, number>([]);

  input.forEach((item) => {
    const filledItem = filterEmptyItem(item);

    locationsDistances.set(`${filledItem[0]}-${filledItem[1]}`, Number(filledItem[2]));
    locationsDistances.set(`${filledItem[1]}-${filledItem[0]}`, Number(filledItem[2]));
  });

  return locationsDistances;
};

export const findUniqueLocations = (input: string[]) => {
  const locations: string[] = [];

  input.forEach((item) => {
    const filledItem = filterEmptyItem(item);

    if (!locations.includes(filledItem[0])) {
      locations.push(filledItem[0]);
    }

    if (!locations.includes(filledItem[1])) {
      locations.push(filledItem[1]);
    }
  });

  return locations;
};

export const generateLocationsPermutations = ({
  locations,
  startIndex,
}: {
  locations: string[];
  startIndex: number;
}) => {
  let stepsWay: string[][] = [];

  const isLastTurn = startIndex === locations.length - 1;

  if (isLastTurn) {
    stepsWay.push([...locations]);

    return stepsWay;
  }

  for (let i = startIndex; i < locations.length; i++) {
    // destructuring assignment
    [locations[startIndex], locations[i]] = [locations[i], locations[startIndex]];

    stepsWay.push(...generateLocationsPermutations({ locations, startIndex: startIndex + 1 }));

    // backtracking reverse swap
    [locations[startIndex], locations[i]] = [locations[i], locations[startIndex]];
  }

  return stepsWay;
};

export const getDistance = ({
  locationsDistances,
  from,
  to,
}: {
  locationsDistances: LocationsDistancesType;
  from: string;
  to: string;
}): number => {
  const distance = locationsDistances.get(`${from}-${to}`);

  if (distance === undefined) {
    throw new Error(`Distance not found for locations ${from}-${to}`);
  }

  return distance;
};

export const computePlannedRouteDistance = ({
  plannedRoute,
  locationsDistances,
}: {
  plannedRoute: string[];
  locationsDistances: LocationsDistancesType;
}) => {
  return plannedRoute.reduce((totalDistance, currentLocation, index) => {
    if (index === plannedRoute.length - 1) {
      return totalDistance;
    }

    return (
      totalDistance +
      getDistance({
        locationsDistances,
        from: currentLocation,
        to: plannedRoute[index + 1],
      })
    );
  }, 0);
};

export const computePlannedRoutesDistances = ({
  plannedRoutes,
  locationsDistances,
}: {
  plannedRoutes: string[][];
  locationsDistances: LocationsDistancesType;
}) => {
  return plannedRoutes.map((plannedRoute) =>
    computePlannedRouteDistance({
      plannedRoute,
      locationsDistances,
    }),
  );
};
