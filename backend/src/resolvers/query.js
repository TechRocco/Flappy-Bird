
module.exports = {
    getPlayerAchievements: async (_, args, { models }) => {
        const player = await models.Player.findById(args.playerId);
        return player ? models.player.achievements : [];
    },
    
    getGameSession: async (_, { sessionId }, {models}) => {
        return await models.GameSession.findById(sessionId).populate('player');
    },
    getPlayerSessions: async (_, { playerId }, {models}) => {
        return await models.GameSession.find({ player: playerId }).populate('player');
    },

    getLeaderboard: async (_, { limit }, {models}) => {
        return await models.Player.find().sort({ highScore: -1 }).limit(20);
    },
    getPlayerProfile: async (_, { playerId }, {models}) => {
        return await models.Player.findById(playerId);
    },
    me: async (parent, args, { models, user }) => {
        // find a user given the current user context
        return await models.Player.findById(user.id);
    },
}