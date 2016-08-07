'use strict';

const Promise = require('bluebird');

let validate = {
  username: (username) => {
    let re = /^[a-z0-9_-]{3,16}$/;
    if (!re.test(username)) return Promise.reject('invalid username');
  },
  email: (email) => {
    let re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!re.test(email)) return Promise.reject('invalid email');
  },
  name: (name) => {
    return;
  },
};


module.exports = (data) => {
  Object.keys(data).forEach((d) => {validate[d](data[d])});
  return Promise.resolve();
}
