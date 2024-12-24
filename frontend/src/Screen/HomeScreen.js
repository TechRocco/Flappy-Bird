import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedInVar } from '../cache';
import { gql, useMutation } from '@apollo/client';
import { toast } from "react-toastify";
import { CREATE_OR_UPDATE_PLAYER } from "../gql/mutation";



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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LinkButton = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.6);
  border: 2px solid white;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
    transform: scale(1.1);
  }
`;

const LinkButtonS = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid black;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
    transform: scale(1.1);
  }
`;

const Button = styled.button`
  text-decoration: none;
  color: white;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid black;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
    transform: scale(1.1);
  }
`;

const MenuItem = styled.li`
  margin-bottom: 40px;
  font-size: 24px;
  font-weight: bold;
`;

const HeaderItem = styled.div`
  margin-bottom: 40px;
  font-weight: bold;
  margin-top: 20px;
  margin-right: 8px;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 25%;
  text-align: center;
`;

const StyledIcon = styled(AccountCircleOutlinedIcon)`
  color: black;
  transition: color 0.3s;
  margin-left: 5px;
`;

const HomeScreen = () => {
  const navigate = useNavigate();
  const isLoggedIn = isLoggedInVar();
  const [username, setUsername] = useState('');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [createOrUpdatePlayer] = useMutation(CREATE_OR_UPDATE_PLAYER);

  useEffect(() => {
    document.title = 'Home — FlappyBird';

    const handleOnline = () => {
      setIsOffline(false);
      createPlayerAndSyncScores();
    };

    const handleOffline = () => {
      setIsOffline(true);
      handleUsernameInput();  // Update username when offline
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // If the app is already online, sync player
    if (navigator.onLine) {
      createPlayerAndSyncScores();
    } else {
      toast("No Internet Connection", { type: "info" });
      handleUsernameInput();  // Ensure we handle username when offline
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    isLoggedInVar(false);
    toast(`Logged Out`, { type: "success" });
    navigate('/');
  };

  const handleUsernameInput = () => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      const guestUsername = `Guest_${Math.floor(Math.random() * 10000)}`;
      setUsername(guestUsername);
      localStorage.setItem('username', guestUsername);
    } else {
      setUsername(storedUsername);
    }
  };

  const createPlayerAndSyncScores = async () => {
    const storedUsername = localStorage.getItem('username');
    const storedScores = JSON.parse(localStorage.getItem('scores')) || {};
    
    if (storedUsername) {
      const score = storedScores[storedUsername]?.score;
      if (score) {
        try {
          // Provide default email and password values
          const response = await createOrUpdatePlayer({
            variables: {
              username: storedUsername,
              score,
              email: `${storedUsername}@example.com`,  // Default email
              password: storedUsername,   // Default password
            },
          });
          console.log("Player created or updated:", response.data.createOrUpdatePlayer);
          
        } catch (error) {
          console.error("Error creating or updating player:", error);
          toast("Leaderboard Updation Failed!", { type: "error" });

        }
      }
    }
  };
  

  return (
    <Home>
      <Container>
        <Header>
          <p>
            {!isOffline && <Link to={'/profile'}>
              <StyledIcon sx={{ fontSize: '40px' }} />
            </Link>}
          </p>
          <HeaderItem>
            {isLoggedIn ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <div>
                <LinkButtonS to={'/signin'}>Sign In</LinkButtonS> |{' '}
                <LinkButtonS to={'/signup'}>Sign Up</LinkButtonS>
              </div>
            )}
          </HeaderItem>
        </Header>

        <Menu>
          <MenuItem>
            <LinkButton to={'/game'} onClick={handleUsernameInput}>
              Start Game
            </LinkButton>
          </MenuItem>

          <MenuItem>
            <LinkButton to={'/leaderboard'}>Leaderboard</LinkButton>
          </MenuItem>
        </Menu>

        {isOffline && (
          <div>
            <p>You are currently offline. Your username is: {username}</p>
          </div>
        )}
      </Container>
    </Home>
  );
};

export default HomeScreen;
