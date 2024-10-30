import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import ApolloProvider from './app/providers/ApolloProvider';
import './main.css';
import { attachReduxDevTools } from '@effector/redux-devtools-adapter';

attachReduxDevTools();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
