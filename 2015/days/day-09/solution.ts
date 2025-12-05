import { findRoute, maxAggregator, minAggregator } from './utils';

export const findMostShortWay = (input: string[]) => {
  return findRoute({ input, aggregator: minAggregator });
};

export const findMostLongWay = (input: string[]) => {
  return findRoute({ input, aggregator: maxAggregator });
};
