# A Walk In Dublin Demo
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

This is a demo of using Serverless and GraphQL.  It is based off of the Serverless GraphQL boilerplate

## Setup

If you haven't yet installed `serverless` on your machine, run:

```
npm install -g serverless@0.5.6
```
```

### Back
Add the `authTokenSecret` variable to `_meta/variables/s-variables-STAGE-REGION.json` and give it a strong value. This is the secret used to generate JSON web tokens. Then:

```
cd back/api
npm install
sls function deploy --all
sls endpoint deploy --all
```

### Client
```
cd ../../client/src
npm install
npm start
```

This will run the client locally.  You should be able to access it at http://localhost:8080


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

### Testing With A Local DynamoDB Instance
- Install [Docker](https://www.docker.com/)
- Run `docker-compose up` to install and run DynamoDB.
- Add the `localDynamoDbEndpoint` variable with the value `http://<DOCKER-MACHINE-IP>:8000` to `_meta/variables/s-variables-common.json`. Example value:  `http://192.168.99.100:8000`.
- Run `sls setup db -s <stage> -r <region>` to create tables in the local DynamoDB instance.
- Run `sls offline start` to start [the offline server](https://github.com/dherault/serverless-offline).
