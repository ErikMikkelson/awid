'use strict';

const Authorize = require ('../lib/authorize');

module.exports.handler = (event, context, cb) => {
    const params = {
        authorizationToken: event.authorizationToken,
        methodArn: event.methodArn
    };

  Authorize(params)
    .then((response) => cb(null, response))
    .catch((error) => cb(error));
}
