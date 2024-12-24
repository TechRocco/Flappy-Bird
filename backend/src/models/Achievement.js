// models/Achievement.js
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

const Achievement = mongoose.model('Achievement', AchievementSchema);

module.exports = Achievement;
