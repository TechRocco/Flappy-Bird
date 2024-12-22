import React, { useState, useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../Screen/UserForm';
import { isLoggedInVar } from '../cache';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { SIGNIN_USER } from '../gql/mutation';

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
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            // console.log(data);
            // store the token
            localStorage.setItem('token', data.signIn);
            isLoggedInVar(true);
            toast("Successfully Loged In", { type: "success" });
            // update the local cache
            // client.writeData({ data: { isLoggedIn: true } });
            // Redirect to the originally requested route or home
            navigate(from, { replace: true });
        },

        onError: error => {
            console.log(error);
            setErrorMessage(error.message || 'An unexpected error occurred');
            toast(`${error.message}`, { type: "error" });
                    
        }
    });



    return (
        <React.Fragment>
            
            {/* {loading && <p>Loading...</p>} */}
            <UserForm action={signIn} formType="signIn" errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
            {/* if the data is loading, display a loading message*/}
            {/* if there is an error, display a error message*/}
        </React.Fragment>
    );
};
export default SignIn;