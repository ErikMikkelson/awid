'use strict';

const Promise = require('bluebird');
const uuid = require('uuid');
const db = require('../../../dynamodb');
const invoke = require('../../../invoke')
const _ = require('lodash');

const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const usersTable = projectName + '-users-' + stage;

module.exports = {
  create(user) {
    user.id = uuid.v1();

    return db('put', {
      TableName: usersTable,
      Item: user
    })
    // let's invoke another lambda asynchronously (don't wait till it finished)!
    .then(() => invoke('timeout', {user, delay: 70}))  // no actual delay here
    // if we pass a callback it will run synchronously, so we'll get a response
    .then(() => invoke('timeout', {user, delay: 50}, (response) => {
      // this should be delayed for 50ms
      // let's do something with the response
      if (response.result === 'success') {
        console.log("response data:", response);
      } else {
        return Promise.reject(new Error("Something went wrong :("));
      }
    }))
    // finally return the user record
    .then(() => user);
  },

  get(username) {
    return db('get', {
      TableName: usersTable,
      Key: {username},
      AttributesToGet: [
        'id',
        'username',
        'name',
        'email'
      ]
    }).then(reply => reply.Item);
  },

  getAll() {
    return db('scan', {
      TableName: usersTable,
      AttributesToGet: [
        'id',
        'username',
        'name',
        'email'
      ]
    }).then(reply => reply.Items);
  },

  update(user, obj) {

    // update data
    user.email = obj.email || user.email;
    user.name = obj.name || user.name;

    return db('put', {
      TableName: usersTable,
      Item: user
    }).then(() => _.merge({}, user, obj));
  },

  remove(user) {
    return db('delete', {
      TableName: usersTable,
      Key: { username: user.username }
    });
  }
};
