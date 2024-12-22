const {PubSub} = require('graphql-subscriptions');
const pubsub = new PubSub();

module.exports = {

    leaderboardUpdates: {
        subscribe: () => pubsub.asyncIterator(["LEADERBOARD_UPDATED"]),
      },

}