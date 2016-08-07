'use strict';

const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;

const TourType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  createTour: {
    type: TourType,
    description: 'Create Tour',
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      location: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.create(args));
    }
  },
  updateTour: {
    type: TourType,
    description: 'Update Tour',
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(source, args) {
      return validate(args).then((tour) => resolves.update(tour, args));
    }
  },
  deleteTour: {
    type: TourType,
    description: 'Delete Tour',
    resolve(source, args) {
      return validate(args).then((tour) => resolves.remove(tour));
    }
  }
}
