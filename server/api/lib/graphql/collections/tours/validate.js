'use strict';

const Promise = require('bluebird');

let validate = {
  name: (name) => {
    return;
  },
  location: (location) => {
    return;
  },
  description: (description) => {
    return;
  },
};


module.exports = (data) => {
  Object.keys(data).forEach((d) => {validate[d](data[d])});
  return Promise.resolve();
}
