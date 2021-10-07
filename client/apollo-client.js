import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from, } from '@apollo/client';
import fetch from 'cross-fetch';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        alert(`GraphQL error ${message}`);
      });
    }
  })
  const link = from([
    errorLink,
    createUploadLink({ uri: "http://localhost:5000/graphql", fetch  }),
  ]);
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  })

export default client;