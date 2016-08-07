# A Walk In Dublin Demo
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

This is a demo of using Serverless and GraphQL.  It is based off of the Serverless GraphQL boilerplate

## Setup

If you haven't yet installed `serverless` on your machine, run:

```
npm install -g serverless@0.5.6
```
```

### Server
Add the `authTokenSecret` variable to `_meta/variables/s-variables-STAGE-REGION.json` and give it a strong value. This is the secret used to generate JSON web tokens. Then:

```
cd server/api
npm install
sls function deploy --all
sls endpoint deploy --all
```

### Client
A Walk In Dublin client

## Tools Used
* Based off [Starter Pack](https://sp.603.nu] and [Serverless-GraphQL](https://github.com/serverless/serverless-graphql)
* Other technologies:
- Auth0 using public key authentication so no danger of a secret getting released
- [Apollo Client](http://docs.apollostack.com/apollo-client/) To make binding to the GraphQL data easier


## Running locally
1. Clone this repository
2. Sign up and create a new [Auth0 app](https://auth0.com)
3. Add http://localhost:3001 as an Allowed Origin (CORS) for your newly created app (don't forget to press save)
4. Copy configExmple.js to config.js (gitignored)
5. Update the newly copied config.js with your Auth0 app's Client ID and Domain
6. Run the following commands in the app's root directory then open http://localhost:3001
```
cd client
npm install
npm run dev
```

## Building the production version
1. Update config.js with your production config values
2. Run the following commands in the app's root directory then check the /dist folder
```
npm install
npm run build


 You can then deploy the client to an S3 bucket with:

```
npm run build
sls client deploy
```

### Deploying to S3 bucket
Make sure you're still in the `client/src` folder mentioned above, then run:

```
npm run build
sls client deploy
```

### Testing With A Local DynamoDB Instance (I think this works)
- Install [Docker](https://www.docker.com/)
- Run `docker-compose up` to install and run DynamoDB.
- Add the `localDynamoDbEndpoint` variable with the value `http://<DOCKER-MACHINE-IP>:8000` to `_meta/variables/s-variables-common.json`. Example value:  `http://192.168.99.100:8000`.
- Run `sls setup db -s <stage> -r <region>` to create tables in the local DynamoDB instance.
- Run `sls offline start` to start [the offline server](https://github.com/dherault/serverless-offline).
