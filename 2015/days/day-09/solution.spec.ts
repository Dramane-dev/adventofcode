import { findMostShortWay } from './solution';
import {
  cleanInput,
  findUniqueLocations,
  parseInput,
  generateLocationsPermutations,
  computePlannedRoutesDistances,
  computePlannedRouteDistance,
} from './utils';

describe('Day 9: All in a Single Night', () => {
  describe('cleanInput', () => {
    const cases = [
      {
        level: 'easy',
        input: ['London to Dublin = 464', 'London to Belfast = 518', 'Dublin to Belfast = 141'],
        expected: ['London Dublin 464', 'London Belfast 518', 'Dublin Belfast 141'],
      },
      {
        level: 'medium - 4 cities',
        input: [
          'Paris to London = 100',
          'Paris to Berlin = 200',
          'Paris to Rome = 300',
          'London to Berlin = 150',
          'London to Rome = 250',
          'Berlin to Rome = 180',
        ],
        expected: [
          'Paris London 100',
          'Paris Berlin 200',
          'Paris Rome 300',
          'London Berlin 150',
          'London Rome 250',
          'Berlin Rome 180',
        ],
      },
      {
        level: 'edge - 2 cities only',
        input: ['CityA to CityB = 50'],
        expected: ['CityA CityB 50'],
      },
      {
        level: 'medium - symmetric distances',
        input: ['Alpha to Beta = 10', 'Alpha to Gamma = 10', 'Beta to Gamma = 10'],
        expected: ['Alpha Beta 10', 'Alpha Gamma 10', 'Beta Gamma 10'],
      },
      {
        level: 'hard - 5 cities with trap',
        input: [
          'A to B = 1',
          'A to C = 100',
          'A to D = 100',
          'A to E = 100',
          'B to C = 1',
          'B to D = 100',
          'B to E = 100',
          'C to D = 1',
          'C to E = 100',
          'D to E = 1',
        ],
        expected: [
          'A B 1',
          'A C 100',
          'A D 100',
          'A E 100',
          'B C 1',
          'B D 100',
          'B E 100',
          'C D 1',
          'C E 100',
          'D E 1',
        ],
      },
    ];

    it.each(cases)('should return $expected when $level level', ({ input, expected }) => {
      // GIVEN
      // WHEN
      const result = cleanInput(input);

      // THEN
      expect(result).toEqual(expected);
    });
  });
  describe('findUniqueLocations', () => {
    const cases = [
      {
        level: 'easy - example from AoC',
        input: ['London to Dublin = 464', 'London to Belfast = 518', 'Dublin to Belfast = 141'],
        expected: ['London', 'Dublin', 'Belfast'],
      },
      {
        level: 'medium - 4 cities',
        input: [
          'Paris to London = 100',
          'Paris to Berlin = 200',
          'Paris to Rome = 300',
          'London to Berlin = 150',
          'London to Rome = 250',
          'Berlin to Rome = 180',
        ],
        expected: ['Paris', 'London', 'Berlin', 'Rome'],
      },
      {
        level: 'edge - 2 cities only',
        input: ['CityA to CityB = 50'],
        expected: ['CityA', 'CityB'],
      },
      {
        level: 'medium - symmetric distances',
        input: ['Alpha to Beta = 10', 'Alpha to Gamma = 10', 'Beta to Gamma = 10'],
        expected: ['Alpha', 'Beta', 'Gamma'],
      },
      {
        level: 'hard - 5 cities with trap',
        input: [
          'A to B = 1',
          'A to C = 100',
          'A to D = 100',
          'A to E = 100',
          'B to C = 1',
          'B to D = 100',
          'B to E = 100',
          'C to D = 1',
          'C to E = 100',
          'D to E = 1',
        ],
        expected: ['A', 'B', 'C', 'D', 'E'],
      },
    ];

    it.each(cases)('should return $expected when $level level', ({ input, expected }) => {
      // GIVEN
      const cleanedInput = cleanInput(input);

      // WHEN
      const result = findUniqueLocations(cleanedInput);

      // THEN
      expect(result).toEqual(expected);
    });
  });
  describe('parseInput', () => {
    const cases = [
      {
        level: 'easy - example from AoC',
        input: ['London to Dublin = 464', 'London to Belfast = 518', 'Dublin to Belfast = 141'],
        expected: new Map<string, number>([
          ['London-Dublin', 464],
          ['Dublin-London', 464],
          ['London-Belfast', 518],
          ['Belfast-London', 518],
          ['Dublin-Belfast', 141],
          ['Belfast-Dublin', 141],
        ]),
      },
      {
        level: 'medium - 4 cities',
        input: [
          'Paris to London = 100',
          'Paris to Berlin = 200',
          'Paris to Rome = 300',
          'London to Berlin = 150',
          'London to Rome = 250',
          'Berlin to Rome = 180',
        ],
        expected: new Map<string, number>([
          ['Paris-London', 100],
          ['London-Paris', 100],
          ['Paris-Berlin', 200],
          ['Berlin-Paris', 200],
          ['Paris-Rome', 300],
          ['Rome-Paris', 300],
          ['London-Berlin', 150],
          ['Berlin-London', 150],
          ['London-Rome', 250],
          ['Rome-London', 250],
          ['Berlin-Rome', 180],
          ['Rome-Berlin', 180],
        ]),
      },
      {
        level: 'edge - 2 cities only',
        input: ['CityA to CityB = 50'],
        expected: new Map<string, number>([
          ['CityA-CityB', 50],
          ['CityB-CityA', 50],
        ]),
      },
      {
        level: 'medium - symmetric distances',
        input: ['Alpha to Beta = 10', 'Alpha to Gamma = 10', 'Beta to Gamma = 10'],
        expected: new Map<string, number>([
          ['Alpha-Beta', 10],
          ['Beta-Alpha', 10],
          ['Alpha-Gamma', 10],
          ['Gamma-Alpha', 10],
          ['Beta-Gamma', 10],
          ['Gamma-Beta', 10],
        ]),
      },
      {
        level: 'hard - 5 cities with trap',
        input: [
          'A to B = 1',
          'A to C = 100',
          'A to D = 100',
          'A to E = 100',
          'B to C = 1',
          'B to D = 100',
          'B to E = 100',
          'C to D = 1',
          'C to E = 100',
          'D to E = 1',
        ],
        expected: new Map<string, number>([
          ['A-B', 1],
          ['B-A', 1],
          ['A-C', 100],
          ['C-A', 100],
          ['A-D', 100],
          ['D-A', 100],
          ['A-E', 100],
          ['E-A', 100],
          ['B-C', 1],
          ['C-B', 1],
          ['B-D', 100],
          ['D-B', 100],
          ['B-E', 100],
          ['E-B', 100],
          ['C-D', 1],
          ['D-C', 1],
          ['C-E', 100],
          ['E-C', 100],
          ['D-E', 1],
          ['E-D', 1],
        ]),
      },
    ];

    it.each(cases)('should return $expected when $level level', ({ input, expected }) => {
      // GIVEN
      const cleanedInput = cleanInput(input);

      // WHEN
      const result = parseInput(cleanedInput);

      // THEN
      expect(result).toEqual(expected);
    });
  });
  describe('generateLocationsPermutations', () => {
    const cases = [
      {
        level: 'easy - example from AoC',
        input: ['London to Dublin = 464', 'London to Belfast = 518', 'Dublin to Belfast = 141'],
        expected: [
          ['London', 'Dublin', 'Belfast'],
          ['London', 'Belfast', 'Dublin'],
          ['Dublin', 'London', 'Belfast'],
          ['Dublin', 'Belfast', 'London'],
          ['Belfast', 'Dublin', 'London'],
          ['Belfast', 'London', 'Dublin'],
        ],
      },
      {
        level: 'medium - 4 cities',
        input: [
          'Paris to London = 100',
          'Paris to Berlin = 200',
          'Paris to Rome = 300',
          'London to Berlin = 150',
          'London to Rome = 250',
          'Berlin to Rome = 180',
        ],
        expected: [
          ['Paris', 'London', 'Berlin', 'Rome'],
          ['Paris', 'London', 'Rome', 'Berlin'],
          ['Paris', 'Berlin', 'London', 'Rome'],
          ['Paris', 'Berlin', 'Rome', 'London'],
          ['Paris', 'Rome', 'Berlin', 'London'],
          ['Paris', 'Rome', 'London', 'Berlin'],
          ['London', 'Paris', 'Berlin', 'Rome'],
          ['London', 'Paris', 'Rome', 'Berlin'],
          ['London', 'Berlin', 'Paris', 'Rome'],
          ['London', 'Berlin', 'Rome', 'Paris'],
          ['London', 'Rome', 'Berlin', 'Paris'],
          ['London', 'Rome', 'Paris', 'Berlin'],
          ['Berlin', 'London', 'Paris', 'Rome'],
          ['Berlin', 'London', 'Rome', 'Paris'],
          ['Berlin', 'Paris', 'London', 'Rome'],
          ['Berlin', 'Paris', 'Rome', 'London'],
          ['Berlin', 'Rome', 'Paris', 'London'],
          ['Berlin', 'Rome', 'London', 'Paris'],
          ['Rome', 'London', 'Berlin', 'Paris'],
          ['Rome', 'London', 'Paris', 'Berlin'],
          ['Rome', 'Berlin', 'London', 'Paris'],
          ['Rome', 'Berlin', 'Paris', 'London'],
          ['Rome', 'Paris', 'Berlin', 'London'],
          ['Rome', 'Paris', 'London', 'Berlin'],
        ],
      },
      {
        level: 'edge - 2 cities only',
        input: ['CityA to CityB = 50'],
        expected: [
          ['CityA', 'CityB'],
          ['CityB', 'CityA'],
        ],
      },
      {
        level: 'medium - symmetric distances',
        input: ['Alpha to Beta = 10', 'Alpha to Gamma = 10', 'Beta to Gamma = 10'],
        expected: [
          ['Alpha', 'Beta', 'Gamma'],
          ['Alpha', 'Gamma', 'Beta'],
          ['Beta', 'Alpha', 'Gamma'],
          ['Beta', 'Gamma', 'Alpha'],
          ['Gamma', 'Beta', 'Alpha'],
          ['Gamma', 'Alpha', 'Beta'],
        ],
      },
      {
        level: 'hard - 5 cities with trap',
        input: [
          'A to B = 1',
          'A to C = 100',
          'A to D = 100',
          'A to E = 100',
          'B to C = 1',
          'B to D = 100',
          'B to E = 100',
          'C to D = 1',
          'C to E = 100',
          'D to E = 1',
        ],
        expected: [
          ['A', 'B', 'C', 'D', 'E'],
          ['A', 'B', 'C', 'E', 'D'],
          ['A', 'B', 'D', 'C', 'E'],
          ['A', 'B', 'D', 'E', 'C'],
          ['A', 'B', 'E', 'D', 'C'],
          ['A', 'B', 'E', 'C', 'D'],
          ['A', 'C', 'B', 'D', 'E'],
          ['A', 'C', 'B', 'E', 'D'],
          ['A', 'C', 'D', 'B', 'E'],
          ['A', 'C', 'D', 'E', 'B'],
          ['A', 'C', 'E', 'D', 'B'],
          ['A', 'C', 'E', 'B', 'D'],
          ['A', 'D', 'C', 'B', 'E'],
          ['A', 'D', 'C', 'E', 'B'],
          ['A', 'D', 'B', 'C', 'E'],
          ['A', 'D', 'B', 'E', 'C'],
          ['A', 'D', 'E', 'B', 'C'],
          ['A', 'D', 'E', 'C', 'B'],
          ['A', 'E', 'C', 'D', 'B'],
          ['A', 'E', 'C', 'B', 'D'],
          ['A', 'E', 'D', 'C', 'B'],
          ['A', 'E', 'D', 'B', 'C'],
          ['A', 'E', 'B', 'D', 'C'],
          ['A', 'E', 'B', 'C', 'D'],
          ['B', 'A', 'C', 'D', 'E'],
          ['B', 'A', 'C', 'E', 'D'],
          ['B', 'A', 'D', 'C', 'E'],
          ['B', 'A', 'D', 'E', 'C'],
          ['B', 'A', 'E', 'D', 'C'],
          ['B', 'A', 'E', 'C', 'D'],
          ['B', 'C', 'A', 'D', 'E'],
          ['B', 'C', 'A', 'E', 'D'],
          ['B', 'C', 'D', 'A', 'E'],
          ['B', 'C', 'D', 'E', 'A'],
          ['B', 'C', 'E', 'D', 'A'],
          ['B', 'C', 'E', 'A', 'D'],
          ['B', 'D', 'C', 'A', 'E'],
          ['B', 'D', 'C', 'E', 'A'],
          ['B', 'D', 'A', 'C', 'E'],
          ['B', 'D', 'A', 'E', 'C'],
          ['B', 'D', 'E', 'A', 'C'],
          ['B', 'D', 'E', 'C', 'A'],
          ['B', 'E', 'C', 'D', 'A'],
          ['B', 'E', 'C', 'A', 'D'],
          ['B', 'E', 'D', 'C', 'A'],
          ['B', 'E', 'D', 'A', 'C'],
          ['B', 'E', 'A', 'D', 'C'],
          ['B', 'E', 'A', 'C', 'D'],
          ['C', 'B', 'A', 'D', 'E'],
          ['C', 'B', 'A', 'E', 'D'],
          ['C', 'B', 'D', 'A', 'E'],
          ['C', 'B', 'D', 'E', 'A'],
          ['C', 'B', 'E', 'D', 'A'],
          ['C', 'B', 'E', 'A', 'D'],
          ['C', 'A', 'B', 'D', 'E'],
          ['C', 'A', 'B', 'E', 'D'],
          ['C', 'A', 'D', 'B', 'E'],
          ['C', 'A', 'D', 'E', 'B'],
          ['C', 'A', 'E', 'D', 'B'],
          ['C', 'A', 'E', 'B', 'D'],
          ['C', 'D', 'A', 'B', 'E'],
          ['C', 'D', 'A', 'E', 'B'],
          ['C', 'D', 'B', 'A', 'E'],
          ['C', 'D', 'B', 'E', 'A'],
          ['C', 'D', 'E', 'B', 'A'],
          ['C', 'D', 'E', 'A', 'B'],
          ['C', 'E', 'A', 'D', 'B'],
          ['C', 'E', 'A', 'B', 'D'],
          ['C', 'E', 'D', 'A', 'B'],
          ['C', 'E', 'D', 'B', 'A'],
          ['C', 'E', 'B', 'D', 'A'],
          ['C', 'E', 'B', 'A', 'D'],
          ['D', 'B', 'C', 'A', 'E'],
          ['D', 'B', 'C', 'E', 'A'],
          ['D', 'B', 'A', 'C', 'E'],
          ['D', 'B', 'A', 'E', 'C'],
          ['D', 'B', 'E', 'A', 'C'],
          ['D', 'B', 'E', 'C', 'A'],
          ['D', 'C', 'B', 'A', 'E'],
          ['D', 'C', 'B', 'E', 'A'],
          ['D', 'C', 'A', 'B', 'E'],
          ['D', 'C', 'A', 'E', 'B'],
          ['D', 'C', 'E', 'A', 'B'],
          ['D', 'C', 'E', 'B', 'A'],
          ['D', 'A', 'C', 'B', 'E'],
          ['D', 'A', 'C', 'E', 'B'],
          ['D', 'A', 'B', 'C', 'E'],
          ['D', 'A', 'B', 'E', 'C'],
          ['D', 'A', 'E', 'B', 'C'],
          ['D', 'A', 'E', 'C', 'B'],
          ['D', 'E', 'C', 'A', 'B'],
          ['D', 'E', 'C', 'B', 'A'],
          ['D', 'E', 'A', 'C', 'B'],
          ['D', 'E', 'A', 'B', 'C'],
          ['D', 'E', 'B', 'A', 'C'],
          ['D', 'E', 'B', 'C', 'A'],
          ['E', 'B', 'C', 'D', 'A'],
          ['E', 'B', 'C', 'A', 'D'],
          ['E', 'B', 'D', 'C', 'A'],
          ['E', 'B', 'D', 'A', 'C'],
          ['E', 'B', 'A', 'D', 'C'],
          ['E', 'B', 'A', 'C', 'D'],
          ['E', 'C', 'B', 'D', 'A'],
          ['E', 'C', 'B', 'A', 'D'],
          ['E', 'C', 'D', 'B', 'A'],
          ['E', 'C', 'D', 'A', 'B'],
          ['E', 'C', 'A', 'D', 'B'],
          ['E', 'C', 'A', 'B', 'D'],
          ['E', 'D', 'C', 'B', 'A'],
          ['E', 'D', 'C', 'A', 'B'],
          ['E', 'D', 'B', 'C', 'A'],
          ['E', 'D', 'B', 'A', 'C'],
          ['E', 'D', 'A', 'B', 'C'],
          ['E', 'D', 'A', 'C', 'B'],
          ['E', 'A', 'C', 'D', 'B'],
          ['E', 'A', 'C', 'B', 'D'],
          ['E', 'A', 'D', 'C', 'B'],
          ['E', 'A', 'D', 'B', 'C'],
          ['E', 'A', 'B', 'D', 'C'],
          ['E', 'A', 'B', 'C', 'D'],
        ],
      },
    ];

    it.each(cases)('should return $expected when $level level', ({ input, expected }) => {
      // GIVEN
      const cleanedInput = cleanInput(input);
      const locations = findUniqueLocations(cleanedInput);

      // WHEN
      const result = generateLocationsPermutations({ locations, startIndex: 0 });

      // THEN
      expect(result).toEqual(expected);
    });
  });
  describe('computePlannedRouteDistance', () => {
    const cases = [
      {
        level: 'easy - example from AoC',
        input: ['London to Dublin = 464', 'London to Belfast = 518', 'Dublin to Belfast = 141'],
        expected: 605,
      },
      {
        level: 'medium - 4 cities',
        input: [
          'Paris to London = 100',
          'Paris to Berlin = 200',
          'Paris to Rome = 300',
          'London to Berlin = 150',
          'London to Rome = 250',
          'Berlin to Rome = 180',
        ],
        expected: 430,
      },
      {
        level: 'edge - 2 cities only',
        input: ['CityA to CityB = 50'],
        expected: 50,
      },
      {
        level: 'medium - symmetric distances',
        input: ['Alpha to Beta = 10', 'Alpha to Gamma = 10', 'Beta to Gamma = 10'],
        expected: 20,
      },
      {
        level: 'hard - 5 cities with trap',
        input: [
          'A to B = 1',
          'A to C = 100',
          'A to D = 100',
          'A to E = 100',
          'B to C = 1',
          'B to D = 100',
          'B to E = 100',
          'C to D = 1',
          'C to E = 100',
          'D to E = 1',
        ],
        expected: 4,
      },
    ];

    it.each(cases)('should return $expected when $level level', ({ input, expected }) => {
      // GIVEN
      const cleanedInput = cleanInput(input);
      const locations = findUniqueLocations(cleanedInput);
      const locationsDistances = parseInput(cleanedInput);
      const plannedRoutes = generateLocationsPermutations({ locations, startIndex: 0 });

      // WHEN
      const result = computePlannedRouteDistance({
        plannedRoute: plannedRoutes[0],
        locationsDistances,
      });

      // THEN
      expect(result).toEqual(expected);
    });
  });
  describe('computePlannedRoutesDistances', () => {
    const cases = [
      {
        level: 'easy - example from AoC',
        input: ['London to Dublin = 464', 'London to Belfast = 518', 'Dublin to Belfast = 141'],
        expected: [605, 659, 982, 659, 605, 982],
      },
      {
        level: 'medium - 4 cities',
        input: [
          'Paris to London = 100',
          'Paris to Berlin = 200',
          'Paris to Rome = 300',
          'London to Berlin = 150',
          'London to Rome = 250',
          'Berlin to Rome = 180',
        ],
        expected: [
          430, 530, 600, 630, 630, 700, 480, 580, 650, 630, 630, 750, 550, 700, 550, 750, 580, 530,
          600, 550, 430, 480, 650, 550,
        ],
      },
      {
        level: 'edge - 2 cities only',
        input: ['CityA to CityB = 50'],
        expected: [50, 50],
      },
      {
        level: 'medium - symmetric distances',
        input: ['Alpha to Beta = 10', 'Alpha to Gamma = 10', 'Beta to Gamma = 10'],
        expected: [20, 20, 20, 20, 20, 20],
      },
      {
        level: 'hard - 5 cities with trap',
        input: [
          'A to B = 1',
          'A to C = 100',
          'A to D = 100',
          'A to E = 100',
          'B to C = 1',
          'B to D = 100',
          'B to E = 100',
          'C to D = 1',
          'C to E = 100',
          'D to E = 1',
        ],
        expected: [
          4, 103, 202, 202, 103, 202, 202, 202, 301, 202, 301, 400, 202, 301, 301, 400, 202, 202,
          301, 301, 103, 202, 301, 202, 103, 202, 202, 202, 103, 202, 202, 202, 202, 103, 202, 301,
          301, 301, 400, 400, 301, 301, 301, 400, 202, 301, 301, 301, 103, 103, 301, 202, 202, 301,
          202, 202, 400, 301, 301, 400, 202, 301, 202, 301, 103, 103, 400, 301, 202, 202, 400, 301,
          301, 301, 301, 301, 400, 400, 103, 202, 202, 301, 202, 202, 301, 400, 202, 301, 301, 301,
          202, 103, 202, 103, 202, 202, 202, 301, 301, 400, 202, 202, 301, 202, 202, 202, 400, 301,
          4, 103, 202, 202, 103, 202, 301, 301, 202, 301, 202, 103,
        ],
      },
    ];

    it.each(cases)('should return $expected when $level level', ({ input, expected }) => {
      // GIVEN
      const cleanedInput = cleanInput(input);
      const locations = findUniqueLocations(cleanedInput);
      const locationsDistances = parseInput(cleanedInput);
      const plannedRoutes = generateLocationsPermutations({ locations, startIndex: 0 });

      // WHEN
      const result = computePlannedRoutesDistances({ plannedRoutes, locationsDistances });

      // THEN
      expect(result).toEqual(expected);
    });
  });
  describe('findMostShortWay', () => {
    const cases = [
      {
        level: 'easy',
        input: ['London to Dublin = 464', 'London to Belfast = 518', 'Dublin to Belfast = 141'],
        expected: 605,
      },
      {
        level: 'medium - 4 cities',
        input: [
          'Paris to London = 100',
          'Paris to Berlin = 200',
          'Paris to Rome = 300',
          'London to Berlin = 150',
          'London to Rome = 250',
          'Berlin to Rome = 180',
        ],
        expected: 430, // Paris → London → Berlin → Rome
      },
      {
        level: 'edge - 2 cities only',
        input: ['CityA to CityB = 50'],
        expected: 50,
      },
      {
        level: 'medium - symmetric distances',
        input: ['Alpha to Beta = 10', 'Alpha to Gamma = 10', 'Beta to Gamma = 10'],
        expected: 20, // Equilateral triangle, any path = 20
      },
      {
        level: 'hard - 5 cities with trap',
        input: [
          'A to B = 1',
          'A to C = 100',
          'A to D = 100',
          'A to E = 100',
          'B to C = 1',
          'B to D = 100',
          'B to E = 100',
          'C to D = 1',
          'C to E = 100',
          'D to E = 1',
        ],
        expected: 4, // A → B → C → D → E
      },
    ];

    it.each(cases)('should return $expected when $level level', ({ input, expected }) => {
      // GIVEN
      // WHEN
      const result = findMostShortWay(input);

      // THEN
      expect(result).toBe(expected);
    });
  });
});
