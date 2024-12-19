import React from 'react';
// import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';
//createHttpLink, setContext imported to access jwt and pass on every request
import { setContext } from 'apollo-link-context';
import cache from './cache';
import GameScreen from './Screen/GameScreen';
import Pages from './pages/index';

// configure our API URI & cache
const uri = "http://localhost:4000/api";
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
    {/* <GameScreen /> */}
    
    <Pages />
  </ApolloProvider>
);

// ReactDOM.render(<App />, document.getElementById('root'));
export default App;