import React, {useState, useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../Screen/UserForm';
import { isLoggedInVar } from '../cache';
import { useLocation, useNavigate } from 'react-router-dom';

const SIGNIN_USER = gql`
 mutation signIn($email: String!, $password: String!) {
   signIn(email: $email, password: $password)
 }
`;
const SignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location.state?.from?.pathname || '/'; // Fallback to home if no previous route
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        // update the document title
        document.title = 'Sign In — Notedly';
    });
    // const client = useApolloClient();
    const [signIn, {loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            // console.log(data);
            // store the token
            localStorage.setItem('token', data.signIn);
            isLoggedInVar(true);
            // update the local cache
            // client.writeData({ data: { isLoggedIn: true } });
            // Redirect to the originally requested route or home
            navigate(from, { replace: true });
        },

        onError: error => {
            console.log(error);
            setErrorMessage(error.message || 'An unexpected error occurred');        }
    });

    
    
    return (
        <React.Fragment>
            <UserForm action={signIn} formType="signIn" />
            {/* if the data is loading, display a loading message*/}
            {loading && <p>Loading...</p>}
            {/* if there is an error, display a error message*/}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {/* {error && <p>Error signing in!</p>} */}
        </React.Fragment>
    );
};
export default SignIn;