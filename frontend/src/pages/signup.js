import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../Screen/UserForm';
import { isLoggedInVar } from '../cache';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SIGNUP_USER } from '../gql/mutation';



// include the props passed to the component for later use
const SignUp = () => {
    const navigate = useNavigate();
    // const client = useApolloClient();
    //add the mutation hook
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // console.log the JSON Web Token when the mutation is complete
            console.log(data.signUp);
            // store the JWT in localStorage
            localStorage.setItem('token', data.signUp);
            // update the local cache
            isLoggedInVar(true);
            toast("Successfully Loged In", { type: "success" });
            
            // client.writeData({ data: { isLoggedIn: true } });
            // redirect the user to the homepage
            navigate('/');
        },
        onError: error => {
                    console.log(error);
                    toast(`${error.message}`, { type: "error" });
                            
                } 
    });

    useEffect(() => {
        // update the document title
        document.title = 'Sign Up — FlappyBird';
    });
    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
            {/* if the data is loading, display a loading message*/}
            {loading && <p>Loading...</p>}
            {/* if there is an error, display a error message*/}
            {/* {error && <p>Error creating an account!</p>} */}
        </React.Fragment>
    );
};


export default SignUp;