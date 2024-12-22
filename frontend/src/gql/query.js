import { gql } from '@apollo/client';


const GET_ME = gql`
  query {
    me {
      username
      highScore
      id
    }
  }
`;

const GET_LEADERBOARD = gql `
query{
  getLeaderboard {
    id
    username
    highScore
    email
  }
}
`;

const GET_PROFILE = gql`
query{
  me {
    username
    highScore
    email
    achievements {
      id
      name
      unlockedAt
      description
    }
  }
}
`;

export{ GET_ME,
    GET_LEADERBOARD,
    GET_PROFILE
 };