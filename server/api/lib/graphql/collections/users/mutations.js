'use strict';

const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;

const UserType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  createUser: {
    type: UserType,
    description: 'Create User',
    args: {
      username: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.create(args));
    }
  },
  updateUser: {
    type: UserType,
    description: 'Update User',
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(source, args) {
      return validate(args).then((user) => resolves.update(user, args));
    }
  },
  deleteUser: {
    type: UserType,
    description: 'Delete User',
    resolve(source, args) {
      return validate(args).then((user) => resolves.remove(user));
    }
  }
}
