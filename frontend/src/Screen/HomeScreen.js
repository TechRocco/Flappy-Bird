import React from "react";
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedInVar } from '../cache';


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

// const Menu = styled.div`
// text-align: center;
// margin: 25% 30%;
// `;

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

const Button = styled.button` text-decoration: none;
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
  }`;

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
  margin-left: 5px
`;



const HomeScreen = () => {
     const navigate = useNavigate();
        const isLoggedIn = isLoggedInVar(); // Use reactive variable directly
    
        const handleLogout = () => {
            // Clear user authentication on logout
            localStorage.removeItem('token');
            // client.resetStore();
            isLoggedInVar(false);
            // redirect the user to the home page
            navigate('/')      
        };
    return (
    <Home>
    <Container>
        <Header>
            <p><Link to={'/profile'}><StyledIcon sx={{ fontSize: "40px" }}/></Link></p>
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
            {/* <HeaderItem><LinkButtonS to={'/signin'}>Sign In</LinkButtonS> |{' '} <LinkButtonS to={'/signup'}>Sign Up</LinkButtonS>
            </HeaderItem> */}
        </Header>

        <Menu>
            <MenuItem><LinkButton to={'/game'}>Start Game</LinkButton></MenuItem>

            <MenuItem><LinkButton to={'/leaderboard'}>Leaderboard</LinkButton></MenuItem>
        </Menu>

        {/* <li>
            <Link to={'/profile'}>MyProfile</Link>
        </li>
        <li>
            <Link to={'/signin'}>SignIn</Link>
        </li> */}

    </Container>
    </Home>
    );
}
export default HomeScreen;