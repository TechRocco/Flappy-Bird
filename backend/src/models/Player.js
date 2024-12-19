// models/Player.js
const { request } = require('express');
const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 

    },
    description: { 
        type: String 

    },
    unlockedAt: { 
        type: Date 

    }
});

const PlayerSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 

    },
    email: { 
        type: String, 
        required: true, 
        unique: true 

    },

    password: {
        type: String,
        required: true

    }, 
    
    highScore: { 
        type: Number, 
        default: 0 

    },
    achievements: [AchievementSchema]
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
