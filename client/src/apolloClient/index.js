import ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface(process.env.API_URL);

const client = new ApolloClient({
  networkInterface,
});
export default client;
