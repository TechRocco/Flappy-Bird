const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const mongoose = require("mongoose");
const models = require('./src/models');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
// Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST;

//connect with mongodb
async function main() {
    await mongoose.connect(DB_HOST);
}
main()
    .then((res) => {
        console.log("connection to DB successful");
    })
    .catch((err) => {
        console.log(err);
    });

// get the user info from a JWT
const getUser = token => {
    if (token) {
        try {
            // return the user information from the token
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            // if there's a problem with the token, throw an error
            throw new Error('Session invalid');
        }
    }
};


async function startServer() {
    const app = express();
    app.use(helmet());
    app.use(cors());

    // Apollo Server setup
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        // introspection: true, // Enable schema introspection
        // playground: true, 
        validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
        context: ({ req }) => {
            // get the user token from the headers
            const token = req.headers.authorization;
            // try to retrieve a user with the token
            const user = getUser(token);
           
            return { models, user };
        }
    });

    // Explicitly start the Apollo Server
    await server.start();

    // Apply the Apollo GraphQL middleware and set the path to /api
    server.applyMiddleware({ app, path: '/api' });

    app.listen(port, () => {
        console.log(
            `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
        );
    });
}

// Start the server
startServer();

// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const { PubSub } = require('graphql-subscriptions');
// const { SubscriptionServer } = require('subscriptions-transport-ws'); // Correctly import the SubscriptionServer
// const http = require('http');
// const mongoose = require('mongoose');
// const models = require('./models');
// const typeDefs = require('./schema');
// const resolvers = require('./resolvers');
// const jwt = require('jsonwebtoken');
// const { execute, subscribe } = require('graphql'); // Import execute and subscribe
// require('dotenv').config();

// // MongoDB connection
// const DB_HOST = process.env.DB_HOST;
// async function main() {
//     await mongoose.connect(DB_HOST);
// }
// main()
//     .then(() => {
//         console.log("Connection to DB successful");
//     })
//     .catch(err => {
//         console.log(err);
//     });

// // Get user from JWT token
// const getUser  = token => {
//     if (token) {
//         try {
//             return jwt.verify(token, process.env.JWT_SECRET);
//         } catch (err) {
//             throw new Error('Session invalid');
//         }
//     }
// };

// const pubsub = new PubSub(); // Create an instance of PubSub for subscription management

// const port = process.env.PORT || 4000;
// const app = express();

// async function startServer() {
//     const httpServer = http.createServer(app); // HTTP server for GraphQL queries and subscriptions

//     const server = new ApolloServer({
//         typeDefs,
//         resolvers,
//         context: ({ req }) => {
//             const token = req.headers.authorization;
//             const user = getUser (token);
//             return { models, user, pubsub }; // Provide pubsub in the context for resolvers to access
//         }
//     });

//     await server.start();
//     server.applyMiddleware({ app, path: '/api' });

//     // Set up SubscriptionServer with execute and subscribe explicitly passed
//     const subscriptionServer = SubscriptionServer.create(
//         {
//             schema: server.schema, // Provide the schema from the Apollo server
//             execute, // Provide execute function from graphql package
//             subscribe, // Provide subscribe function from graphql package
//             onConnect: (connectionParams) => {
//                 console.log('Client connected for subscriptions');
//             },
//             onDisconnect: () => {
//                 console.log('Client disconnected');
//             },
//         },
//         {
//             server: httpServer,
//             path: '/graphql', // WebSocket path for subscriptions
//         }
//     );

//     // Start the HTTP server that serves both GraphQL and WebSocket subscriptions
//     httpServer.listen(port, () => {
//         console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`);
//     });
// }

// startServer();