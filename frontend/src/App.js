import React from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, } from '@apollo/client';
//createHttpLink, setContext imported to access jwt and pass on every request
import { setContext } from 'apollo-link-context';
import cache from './cache';
import Pages from './pages/index';
import { ToastContainer } from "react-toastify";

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
    <ToastContainer/>
  </ApolloProvider>
);

// ReactDOM.render(<App />, document.getElementById('root'));
export default App;


// import React from 'react';
// import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context'; // Import for setting context
// import { WebSocketLink } from 'subscriptions-transport-ws'; // WebSocket link for subscriptions
// import Pages from './pages/index';

// // Configure our API URI & cache
// const uri = "http://localhost:4000/api"; // HTTP endpoint for GraphQL queries
// const httpLink = createHttpLink({ uri });

// // WebSocket URL for subscriptions
// const wsUri = "ws://localhost:4000/graphql"; // WebSocket URL for subscriptions

// // Create WebSocket link for subscriptions
// const wsLink = new WebSocketLink({
//   uri: wsUri,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       authToken: localStorage.getItem('token') || '', // Send token in the connection parameters for authentication
//     },
//   },
// });

// // Check for a token and return the headers to the context
// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       authorization: localStorage.getItem('token') || '', // Include token in the headers
//     },
//   };
// });

// // Configure Apollo Client with both HTTP and WebSocket links
// const client = new ApolloClient({
//   link: authLink.concat(httpLink).concat(wsLink), // Chain the links (HTTP + WebSocket)
//   cache: new InMemoryCache(), // Use InMemoryCache for caching
//   connectToDevTools: true, // Enable Apollo Client DevTools
// });

// const App = () => (
//   <ApolloProvider client={client}>
//     <Pages />
//   </ApolloProvider>
// );

// export default App;