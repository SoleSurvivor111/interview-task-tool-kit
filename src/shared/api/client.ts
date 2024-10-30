import { ApolloClient, InMemoryCache } from '@apollo/client';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

export default client;
