import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { gql, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GET_ME } from "../gql/query";


const BIRD_HEIGHT = 28;
const BIRD_WIDTH = 33;
const WALL_HEIGHT = 600;
const WALL_WIDTH = 400;
const GRAVITY = 8;
const OBJ_WIDTH = 52;
const INITIAL_OBJ_SPEED = 6;
const INITIAL_OBJ_GAP = 200;



function GameScreen() {
  const navigate = useNavigate();
  const [isStart, setIsStart] = useState(false);
  const [birdpos, setBirspos] = useState(300);
  const [objHeight, setObjHeight] = useState(0);
  const [objPos, setObjPos] = useState(WALL_WIDTH);
  const [score, setScore] = useState(0);

  const [objSpeed, setObjSpeed] = useState(INITIAL_OBJ_SPEED);
  const [objGap, setObjGap] = useState(INITIAL_OBJ_GAP);
  const { data: userdata } = useQuery(GET_ME);

  // Track milestones and high score
  const [hasNotifiedMilestone, setHasNotifiedMilestone] = useState(false);
  const [hasNotifiedHighScore, setHasNotifiedHighScore] = useState(false);


  // Start game and control bird's movement when spacebar is pressed or mouse click is detected
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space" || event.code === "ArrowUp") {
        // If the game is not started yet, start the game
        if (!isStart) {
          setIsStart(true);
        } else if (birdpos < BIRD_HEIGHT) {
          setBirspos(0); // Prevent bird from going out of bounds
        } else {
          setBirspos((birdpos) => birdpos - 50); // Make bird go up
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isStart, birdpos]);

  // Start game on mouse click
  const handleMouseClick = () => {
    if (!isStart) {
      setIsStart(true);  // Start the game when clicked
    } else if (birdpos < BIRD_HEIGHT) {
      setBirspos(0);  // Prevent bird from going out of bounds
    } else {
      setBirspos((birdpos) => birdpos - 50);  // Make bird go up on click
    }
  };

  // Adjust speed and gap after certain score thresholds
  useEffect(() => {
    if (score >= 10 && score < 20) {
      setObjSpeed(8);  // Speed increases after score reaches 10
      setObjGap(150);   // Gap decreases after score reaches 10
    } else if (score >= 20) {
      setObjSpeed(10); // Speed increases further after score reaches 20
      setObjGap(100);   // Gap decreases further after score reaches 20
    }
  }, [score]);

  useEffect(() => {
    // Gravity effect - bird continuously falls due to gravity
    let intVal;
    if (isStart && birdpos < WALL_HEIGHT - BIRD_HEIGHT) {
      intVal = setInterval(() => {
        setBirspos((birdpos) => birdpos + GRAVITY);
      }, 24);
    }
    return () => clearInterval(intVal);
  }, [isStart, birdpos]);

  useEffect(() => {
    let objval;
    if (isStart && objPos >= -OBJ_WIDTH) {
      objval = setInterval(() => {
        setObjPos((objPos) => objPos - objSpeed);
      }, 24);

      return () => {
        clearInterval(objval);
      };
    } else {
      setObjPos(WALL_WIDTH);
      setObjHeight(Math.floor(Math.random() * (WALL_HEIGHT - objGap)));
      if (isStart) setScore((score) => score + 1);
    }
  }, [isStart, objPos, objSpeed, objGap]);

  useEffect(() => {
    // Check for collision with the ceiling or floor
    if (birdpos <= 0 || birdpos >= WALL_HEIGHT - BIRD_HEIGHT) {
      navigate('/gameover', { state: { score } });
    }

    // Check for collision with the object pipes
    let topObj = birdpos >= 0 && birdpos < objHeight;
    let bottomObj =
      birdpos <= WALL_HEIGHT &&
      birdpos >=
      WALL_HEIGHT - (WALL_HEIGHT - objGap - objHeight) - BIRD_HEIGHT;

    if (
      objPos >= OBJ_WIDTH &&
      objPos <= OBJ_WIDTH + 80 &&
      (topObj || bottomObj)
    ) {
      navigate('/gameover', { state: { score } });
    }
  }, [isStart, birdpos, objHeight, objPos, objGap]);

  useEffect(() => {
    let highScore;
    if (navigator.onLine) {
      highScore = userdata?.me?.highScore;
    } else {
      const storedUsername = localStorage.getItem('username');
      const storedScores = JSON.parse(localStorage.getItem('scores')) || {};
      highScore = storedScores[storedUsername]?.score;
    }

    if (score > highScore && !hasNotifiedHighScore) {
      toast("🔥 New High Score!", { type: "info" });
      setHasNotifiedHighScore(true);
    }


    if (navigator.onLine) {
      if (score === 5 && score > highScore && !hasNotifiedMilestone) {
        toast("🎉 Bronze Badge Achieved!", { type: "success" });
        setHasNotifiedMilestone(true);
      } else if (score === 10 && score > highScore && !hasNotifiedMilestone) {
        toast("🥈 Silver Badge Achieved!", { type: "success" });
        setHasNotifiedMilestone(true);
      } else if (score === 15 && score > highScore && !hasNotifiedMilestone) {
        toast("🥇 Gold Badge Achieved!", { type: "success" });
        setHasNotifiedMilestone(true);
      }
    }


  }, [score, userdata, hasNotifiedMilestone, hasNotifiedHighScore]);


  return (
    <Home onClick={handleMouseClick}>
      <Background height={WALL_HEIGHT} width={WALL_WIDTH}>
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
          <BackButton />
        </div>
        <ScoreShow>Score: {score}</ScoreShow>
        {!isStart ? <Startboard>Press Space or Click To Start</Startboard> : null}
        <Obj
          height={objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={0}
          deg={180}
        />
        <Bird
          height={BIRD_HEIGHT}
          width={BIRD_WIDTH}
          top={birdpos}
          left={100}
        />
        <Obj
          height={WALL_HEIGHT - objGap - objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={WALL_HEIGHT - (objHeight + (WALL_HEIGHT - objGap - objHeight))}
          deg={0}
        />
      </Background>
    </Home>
  );
}

export default GameScreen;

const Home = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  background-image: url("./images/background-day.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
`;

const Bird = styled.div`
  position: absolute;
  background-image: url("./images/yellowbird-upflap.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const Obj = styled.div`
  position: relative;
  background-image: url("./images/pipe-green.png");
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${(props) => props.deg}deg);
`;

const Startboard = styled.div`
  position: relative;
  top: 35%;
  background-color: black;
  padding: 10px;
  width: 200px;
  left: 50%;
  margin-left: -100px;
  text-align: center;
  font-size: 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
`;

const ScoreShow = styled.div`
  position: absolute;
  top: 10px; /* Adjust as needed */
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 24px;
  font-weight: bold;
  z-index: 10; /* Ensure it appears above other elements */
  text-align: center;
`;
