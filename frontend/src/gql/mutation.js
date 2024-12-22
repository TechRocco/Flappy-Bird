import { gql } from "@apollo/client";

const UPDATE_HIGHSCORE = gql`
  mutation($playerId: ID!, $score: Int!) {
    updateHighScore(playerId: $playerId, score: $score) {
      id
      username
      highScore
    }
  }
`;

const CREATE_OR_UPDATE_PLAYER = gql`
  mutation CreateOrUpdatePlayer($username: String!, $score: Int!, $email: String!, $password: String!) {
    createOrUpdatePlayer(username: $username, score: $score, email: $email, password: $password) {
      id
      username
      highScore
    }
  }
`;

const SIGNUP_USER = gql`
mutation signUp($email: String!, $username: String!, $password: String!) {
  signUp(email: $email, username: $username, password: $password)
}
`;

const SIGNIN_USER = gql`
 mutation signIn($email: String!, $password: String!) {
   signIn(email: $email, password: $password)
 }
`;

export{SIGNIN_USER, 
    SIGNUP_USER,
    CREATE_OR_UPDATE_PLAYER,
    UPDATE_HIGHSCORE
}