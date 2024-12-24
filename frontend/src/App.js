import React from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, } from '@apollo/client';
//createHttpLink, setContext imported to access jwt and pass on every request
import { setContext } from 'apollo-link-context';
import cache from './cache';
import Pages from './pages/index';
import { ToastContainer } from "react-toastify";



// configure our API URI(backend server api) & cache
const uri = "";
const httpLink = createHttpLink({ uri });


 // check for a token and return the headers to the context
 const authLink = setContext((_, { headers }) => {
  return {
  headers: {
  ...headers,
  authorization: localStorage.getItem('token') || ''
  }
  };
  });

// configure Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

 // check for a local token
 
 

const App = () => (
  <ApolloProvider client={client}>
    <Pages />
    <ToastContainer/>
  </ApolloProvider>
);

export default App;

