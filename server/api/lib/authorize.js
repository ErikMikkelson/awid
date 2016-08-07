'use strict';

const Promise = require('bluebird');
const jwt = require('jsonwebtoken');

const auth0 = {
    public_key: [
      "-----BEGIN PUBLIC KEY-----",
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApvgjn+8ocf4TJR6x0pEH",
      "f39RC/1awcxa9uefuHiXyEbkBDKBSXanA/tfkq9cdWN4AsBeObYkEwc40MwmY8sY",
      "X0sLZBJhmn6DxZ5R9Hnx7VQRy7oYbNplHcPV3tv9G7MqVP1crOlt0SSyo1zJ+x1E",
      "Cs5r77xIfZ5AsnOgqL19u0e4XErMIbLuDDklXvnmZTVsjVTX/lTSJB/PKbcpKOJY",
      "pwKcLHvMWLt6kWSLPk1mDhSPk1E0lUPR5AeNsPVxokk47LhPE4FX2XBMspLPMM1z",
      "6RgceuPLaqSAYDMG2a7ovtuiYY97vEfKe+LiMjr5fsOXxdw3ER3sPYMK/4sniI25",
      "fwIDAQAB",
      "-----END PUBLIC KEY-----"
    ].join("\n")
}

module.exports = params => {
   try {
        const tokenParts = params.authorizationToken.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            throw new Error("The authorizationToken is not well formatted.  Must be 'Bearer <jwt>'", {
                authorizationToken: params.authorizationToken
            });
        }

        const decoded = jwt.verify(tokenParts[1], auth0.public_key, {
            algorithm: "RS256"
        });

        return Promise.resolve(generatePolicy(decoded.sub, "Allow", params.methodArn));
    } catch (err) {
        return Promise.reject("Unauthorized");
    }
}

function generatePolicy(principalId, effect, resource) {
    return {
        principalId,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect || "Deny",
                    Resource: resource
                }
            ]
        }
    };
}
