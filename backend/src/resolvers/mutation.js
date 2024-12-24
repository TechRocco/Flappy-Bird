const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();
const mongoose = require('mongoose');
const Player = require('../models/Player');
const GameSession = require('../models/GameSession');
const Achievement = require('../models/Achievement');
const { ApolloError } = require('apollo-server-express');
const gravatar = require('../util/gravatar');



module.exports = {
    signUp: async (parent, { username, email, password }, { models }) => {
        try {
            console.log("Input data:", { username, email, password });

            // Normalize email address
            email = email.trim().toLowerCase();

            const existingUser = await models.Player.findOne({
                $or: [{ username }, { email }]
            });

            if (existingUser) {
                throw new Error(
                    existingUser.username === username
                        ? "Username is already taken."
                        : "Email is already registered."
                );
            }

            // Hash the password asynchronously for better security
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the user in the database
            const user = await models.Player.create({
                username,
                email,
                avatar: gravatar(email), 
                password: hashedPassword
            });

            // Generate and return a JSON Web Token
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '1d' } // Set token expiration to 1 day
            );

            return token;
        } catch (err) {
            console.log('Error creating account:', err);
            throw new Error(`Error creating account: ${err.message}`);
        }
    },

    signIn: async (parent, { username, email, password }, { models }) => {
        if (email) {
            // normalize email address
            email = email.trim().toLowerCase();
        }
        const user = await models.Player.findOne({
            $or: [{ email }, { username }]
        });
        // if no user is found, throw an authentication error
        if (!user) {
            throw new AuthenticationError('User not found');
        }
        // if the passwords don't match, throw an authentication error
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError('Incorrect Password');
        }
        // create and return the json web token
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    },

    createOrUpdatePlayer: async(_, {username, score, email, password}) => {
      let player = await Player.findOne({ username });

      if (player) {
        if (score > player.highScore) {
          player.highScore = score;
          await player.save();  
        }
      } else {
        player = await Player.create({ username, highScore: score, email, password });
      }
    
      return player;
    },

    updateHighScore: async (_, { playerId, score }) => {
        const player = await Player.findById(playerId);
        if (!player) throw new Error("Player not found");

        if (score > player.highScore) {
            player.highScore = score;
            await player.save();

        }
        return player;
    },

    startGame: async (_, { playerId }) => {
        try {
          // Check if the player exists
          const player = await Player.findById(playerId);
          if (!player) {
            throw new ApolloError('Player not found', 'PLAYER_NOT_FOUND');
          }
  
          // Check if the player already has an active game session
          const existingSession = await GameSession.findOne({ player: playerId, endTime: null });
          if (existingSession) {
            throw new ApolloError('Game session already in progress', 'GAME_ALREADY_STARTED');
          }
  
          // Create a new game session
          const session = new GameSession({
            player: playerId, // Store the player ID
            startTime: new Date().toISOString(),
            score: 0, // Initialize score as 0 
          });
  
          // Save the session
          const savedSession = await session.save();
  
          // Return the saved session with player details populated
          const populatedSession = await GameSession.findById(savedSession.id).populate('player');
  
          return populatedSession;
        } catch (error) {
          // Catch and handle errors
          console.error('Error in startGame mutation:', error);
          throw new ApolloError(error.message || 'An unexpected error occurred', error.extensions.code || 'UNKNOWN_ERROR');
        }
      },

      endGame: async (_, { sessionId, score }) => {
        try {
          // Fetch the game session
          const session = await GameSession.findById(sessionId);
          if (!session) {
            throw new ApolloError('Game session not found', 'SESSION_NOT_FOUND');
          }
  
          // Check if the game is already ended
          if (session.endTime) {
            throw new ApolloError('Game already ended', 'GAME_ALREADY_ENDED');
          }
  
          // Update the session with the score and end time
          session.score = score;
          session.endTime = new Date().toISOString();
  
          // Save the updated session
          const updatedSession = await session.save();
  
          // Return the updated session with player details populated
          const populatedSession = await GameSession.findById(updatedSession.id).populate('player');
  
          return populatedSession;
        } catch (error) {
          // Catch and handle errors
          console.error('Error in endGame mutation:', error);
          throw new ApolloError(error.message || 'An unexpected error occurred', error.extensions.code || 'UNKNOWN_ERROR');
        }
      },

    unlockAchievement: async (_, { playerId, achievement, description, score }) => {
        const player = await Player.findById(playerId);
        if (!player) throw new Error("Player not found");

        const newAchievement = {
            name: achievement,
            description,
            unlockedAt: score,
        };
        await Achievement.save(newAchievement);

        player.achievements.push(newAchievement);
        await player.save();
        return player;
    },

}