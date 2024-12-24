import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
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
    useEffect(() => {
        // update the document title
        document.title = 'Sign In — FlappyBird';
    });
    // const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            // store the token
            localStorage.setItem('token', data.signIn);
            isLoggedInVar(true);
            toast("Successfully Loged In", { type: "success" });
            // Redirect to the originally requested route or home
            navigate(from, { replace: true });
        },
        onError: error => {
            console.log(error);
            toast(`${error.message}`, { type: "error" });
                    
        }
    });



    return (
        <React.Fragment>
            
            {/* {loading && <p>Loading...</p>} */}
            {/* {error && <p>error...</p>} */}
            <UserForm action={signIn} formType="signIn" />
           
        </React.Fragment>
    );
};
export default SignIn;