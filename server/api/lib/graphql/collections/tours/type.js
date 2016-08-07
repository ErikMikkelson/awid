'use strict';

const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;

module.exports = new GraphQLObjectType({
  name: 'Tour',
  description: 'TOur',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    location: {type: GraphQLString},
    description: {type: GraphQLString}
  })
});
