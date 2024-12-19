import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";

const UPDATE_HIGHSCORE = gql`
  mutation($playerId: ID!, $score: Int!) {
    updateHighScore(playerId: $playerId, score: $score) {
      id
      username
      highScore
    }
  }
`;

const GET_ME = gql`
  query {
    me {
      username
      highScore
      id
    }
  }
`;

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

const H1 = styled.h1`
    text-align: center; 
    border: 2px solid black;
    background-color: black;
    border-radius: 50px;
    color: wheat;
    width: 200px;
    padding: 5px; 
    margin: 0 auto; 
     margin-top: 20%;
    display: block; 
`;

const ScoreDiv = styled.div`
  max-width: 100%;
  max-height: 300px; 
  margin: 10% 20%;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px;
`;

const GameOver = () => {
  const location = useLocation();
  const { score } = location.state || {}; // Get score from location state
  
  const { data: userdata } = useQuery(GET_ME);
  
  const [highScore, setHighScore] = useState(null);
  const [updateHighScore, { loading, error }] = useMutation(UPDATE_HIGHSCORE, {
    onCompleted: (data) => {
      // Set high score once mutation completes
      setHighScore(data.updateHighScore.highScore);
    }
  });
  const playerId = userdata?.me?.id;
  // console.log(userdata.me.id);

  useEffect(() => {
    if (playerId && score !== undefined) {
      updateHighScore({ variables: { playerId, score } });
    }
  }, [playerId, score, updateHighScore]); // Trigger mutation when playerId or score changes

  if (loading) {
    return <p>Saving your score...</p>;
  }

  if (error) {
    console.error(error);
    return <p>Error saving high score!</p>;
  }

  return (
    <Home>
      <Container>
      <H1>Game Over</H1>
      <ScoreDiv>
      <p>Current Score : {score}</p>
      {highScore !== null ? (
        <p>Your High Score : {highScore}</p>
      ) : (
        <p>Loading high score...</p>
      )}
      </ScoreDiv>
    </Container>
    </Home>
  );
};

export default GameOver;
