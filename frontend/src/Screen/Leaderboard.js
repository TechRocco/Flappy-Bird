import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import HighScoreFeed from '../components/HighscoreFeed';
import React from 'react';

const Home = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
background-image: url("./images/background-day.png");
  background-repeat: no-repeat;
  background-size: 400px 600px;
  width: 400px;
  height: 600px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
`;



const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.57); 
  position: sticky; 
  top: 0; 
  z-index: 10; 
  border-bottom: 2px solid rgba(34, 29, 29, 0.57);
`;

const LeaderboardDiv = styled.div`
  max-width: 100%;
  max-height: 300px; 
  margin: 10% 20%;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid black;
  border-radius: 5px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;




const P = styled.p`
margin: 0;                     
font-size: 16px; 
`;

const H1 = styled.h1`
    text-align: center; 
    border: 2px solid black;
    background-color: black;
    border-radius: 50px;
    color: wheat;
    width: 242px;
    padding: 5px; 
    margin: 0 auto; 
     margin-top: 20%;
    display: block; 
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

let Leaderboard = () => {
    const {loading, error, data} = useQuery(GET_LEADERBOARD);
    if (loading) {
        console.log('Loading...', loading);
        return <p>Loading...</p>;
      }
      if (error) {
        console.log(error);
        return <p>Error!</p>;
      }
    
      console.log('Data:', data.getLeaderboard);
    return (
      <Home>
      <Container>
        <H1>
        Leaderboard
      </H1>
      <LeaderboardDiv>
        <Heading>
            <P>Username</P>
            <P>HighScore</P>
        </Heading>
        <HighScoreFeed players={data.getLeaderboard}/>
        </LeaderboardDiv>
        {/* <List>
            <img
                // src={xyz}
                alt='{xyz} avatar'
                height="50px"
            />
        </List> */}
        </Container>
        </Home>
    );
}

export default Leaderboard;