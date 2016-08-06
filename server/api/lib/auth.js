'use strict';

const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const Config = require('../../config.js')

const auth0 = Config.auth0;

function authorize(token, requiredPermissions) {

  // make sure user is logged in
  try {
    var user = jwt.verify(tokenParts[1], auth0.public_key, {
      algorithm: "RS256"
    });
  } catch (e) {
    return Promise.reject('Invalid Token');
  }

  // make sure user have the required permissions
  requiredPermissions.forEach((p) => {
    if (user.permissions.indexOf(p) === -1) return Promise.reject('User is unauthorized to take this action');
  });

  return Promise.resolve(user);
}

module.exports = {
  authorize
};
