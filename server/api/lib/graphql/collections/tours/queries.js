'use strict';

const GraphQLList = require('graphql').GraphQLList;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;

const UserType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  tours: {
    type: new GraphQLList(UserType),
    description: 'List of tours',
    resolve: function(source, args) {
      return resolves.getAll();
    }
  },
  tour: {
    type: UserType,
    description: 'Get a tour by name',
    args: {
      name: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: function(source, args) {
      return validate(args).then(() => resolves.get(args.name));
    }
  }
}
