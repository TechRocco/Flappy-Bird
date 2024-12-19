// models/GameSession.js
const mongoose = require('mongoose');

const GameSessionSchema = new mongoose.Schema({
    player: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Player', 
        required: true 
    },

    score: { 
        type: Number, 
        required: true 
    },

    startTime: { 
        type: String, 
        default: 0 

    },

    endTime: { 
        type: String 

    }
});

const GameSession = mongoose.model('GameSession', GameSessionSchema);

module.exports = GameSession;