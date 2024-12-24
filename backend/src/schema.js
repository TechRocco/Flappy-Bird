const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Player {
        id: ID!
        username: String
        email: String
        highScore: Int
        avatar: String
        achievements: [Achievement!]!
    }

    type Achievement { 
        id: ID! 
        name: String! 
        description: String 
        unlockedAt: String 
    }    

    type GameSession {
        id: ID!
        player: Player!
        score: Int
        startTime: String!
        endTime: String
    }

    type Query {
        getLeaderboard(limit: Int): [Player!]!
        getPlayerProfile(playerId: ID!): Player
        getPlayerAchievements(playerId: ID!): [String!]!
        getGameSession(sessionId: ID!): GameSession
        getPlayerSessions(playerId: ID!): [GameSession!]!
        me: Player!
    }

    type Mutation {
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String!, password: String!): String!
        updateHighScore(playerId: ID!, score: Int!): Player!
        unlockAchievement(playerId: ID!, achievement: String!, description: String!, score: Int!): Player!
        startGame(playerId: ID!): GameSession!
        endGame(sessionId: ID!, score: Int!): GameSession!
        createOrUpdatePlayer(username: String!, , score: Int!, email: String!, password: String!): Player!
    }

    type Subscription {
        leaderboardUpdates: [Player!]!
    }
`;

module.exports = typeDefs;