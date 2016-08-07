'use strict';

const Promise = require('bluebird');
const uuid = require('uuid');
const db = require('../../../dynamodb');
const invoke = require('../../../invoke')
const _ = require('lodash');

const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const toursTable = projectName + '-tours-' + stage;

module.exports = {
  create(tour) {
    tour.id = uuid.v1();

    return db('put', {
      TableName: toursTable,
      Item: tour
    })
    // let's invoke another lambda asynchronously (don't wait till it finished)!
    .then(() => invoke('timeout', {tour, delay: 70}))  // no actual delay here
    // if we pass a callback it will run synchronously, so we'll get a response
    .then(() => invoke('timeout', {tour, delay: 50}, (response) => {
      // this should be delayed for 50ms
      // let's do something with the response
      if (response.result === 'success') {
        console.log("response data:", response);
      } else {
        return Promise.reject(new Error("Something went wrong :("));
      }
    }))
    // finally return the tour record
    .then(() => tour);
  },

  get(name) {
    return db('get', {
      TableName: toursTable,
      Key: {name},
      AttributesToGet: [
        'id',
        'name',
        'description',
        'location'
      ]
    }).then(reply => reply.Item);
  },

  getAll() {
    return db('scan', {
      TableName: toursTable,
      AttributesToGet: [
        'id',
        'name',
        'description',
        'location'
      ]
    }).then(reply => reply.Items);
  },

  update(tour, obj) {

    // update data
    tour.name = obj.name || tour.name;
    tour.location = obj.location || tour.location;
    tour.description = obj.description || tour.description;

    return db('put', {
      TableName: toursTable,
      Item: tour
    }).then(() => _.merge({}, tour, obj));
  },

  remove(tour) {
    return db('delete', {
      TableName: toursTable,
      Key: { name: tour.name }
    });
  }
};
