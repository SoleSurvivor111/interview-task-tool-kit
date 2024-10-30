import React from 'react';
import { ApolloProvider as Provider } from '@apollo/client';
import client from '../../shared/api/client';

const ApolloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;
