import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { getStoredAuthData } from '../utils';

const networkInterface = createNetworkInterface(process.env.API_URL);

networkInterface.use([{
  applyMiddleware(req, next) {
    const storedAuthData = getStoredAuthData();
    if (!req.options.headers) {
      req.options.headers = {};  // eslint-disable-line no-param-reassign
    }
    req.options.headers.authorization = // eslint-disable-line no-param-reassign
        storedAuthData.idToken ?
        `Bearer ${storedAuthData.idToken}` : null;
    next();
  },
}]);

const client = new ApolloClient({
  networkInterface,
});
export default client;
