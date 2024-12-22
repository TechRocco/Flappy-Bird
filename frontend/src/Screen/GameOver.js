import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import HomeButton from "../components/HomeButton";
import RestartButton from "../components/RestartButton";
import MessageDisplay from "../components/MessageDisplay";
import { UPDATE_HIGHSCORE} from "../gql/mutation";
import { GET_ME } from "../gql/query";


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

const Buttons = styled.div`
max-width: 100%;
  max-height: 300px; 
  margin: 10% 20%;
  // border: 2px solid black;
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
  ;

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
    const storedScores = JSON.parse(localStorage.getItem('scores')) || {};
    const username = localStorage.getItem('username') || 'Guest';



    if (playerId && score !== undefined) {
      updateHighScore({ variables: { playerId, score } });
    } else if(!navigator.onLine){
      // Check if there's a saved high score for the current user (guest or otherwise)

    const currentHighScore = storedScores[username]?.score || 0;
    setHighScore(currentHighScore);

    if (score !== undefined) {
      // If the new score is higher than the current high score, update it
      if (score > currentHighScore) {
        storedScores[username] = { score };
        localStorage.setItem('scores', JSON.stringify(storedScores));
        setHighScore(score); // Update high score in the state
      }
    }
    }
  }, [playerId, score, updateHighScore]); // Trigger mutation when playerId or score changes

  if (loading) {
    return <p>Saving your score...</p>;
  }

  if (error) {
    console.log(error);
    return <MessageDisplay error={error}/>;
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

      <Buttons>
      <div>
        <HomeButton />
      </div>
      <div>
        <RestartButton />
      </div>
      </Buttons>
    </Container>
    </Home>
  );
};

export default GameOver;
