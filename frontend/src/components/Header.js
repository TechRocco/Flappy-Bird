import React from 'react';
import styled from 'styled-components';
// import { useQuery, gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedInVar } from '../cache';

// local query
// const IS_LOGGED_IN = gql`
//   {
//     isLoggedIn @client
//   }
//  `;

const HeaderBar = styled.header`
width: 400px;
padding: 0.5rem;
// margin: 0.5rem;
display: flex;
height: 64px;
position: fixed;
align-items: center;
background-color: #fff;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
z-index: 1;
`;
const LogoText = styled.h1`
margin: 0;
padding: 0;
display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
  margin-right: 30px;
 `;

const Header = props => {
    // const { data, client } = useQuery(IS_LOGGED_IN);
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
        <HeaderBar>
            {isLoggedIn ? (
                <p><Link to={'/profile'}><img src={'xyz.png'} alt="Profile Logo" height="40" /></Link></p>
            ) : null
        }
            

            <UserState>
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <p>
                        <Link to={'/signin'}>Sign In</Link> or{' '}
                        <Link to={'/signup'}>Sign Up</Link>
                    </p>
                )}
            </UserState>
        </HeaderBar>
    );
};
export default Header;