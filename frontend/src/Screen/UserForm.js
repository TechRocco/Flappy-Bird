import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/button';
import BackButton from '../components/BackButton';
import Alert from '@mui/material/Alert';


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
const Wrapper = styled.div`
 max-width: 100%;
 padding: 1em;
 margin:30% 15% ;
 background-color: rgba(0, 0, 0, 0.2);
 border: 2px solid black;
 border-radius: 5px;
`;
const Form = styled.form`
 label{display: block;
   line-height: 2em;
   color: White;
   }

 input {
 display: block;
   line-height: 2em;
    width: 100%;
    margin-bottom: 1em;
    background-color: rgba(32, 22, 22, 0);
  }
 `;

// include the props passed to the component for later use
const UserForm = props => {
    // set the default state of the form
    const [values, setValues] = useState();
    // update the state when a user types in the form
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const onSubmit = event => {
        event.preventDefault();
        props.action({ variables: { ...values } });

    };

    return (
        <Home>
            <Container>
                <div style={{ position: 'relative', top: '20px', left: '20px' }}>
                    <BackButton />
                </div>

                {/* <div style={{position: 'relative', top: '50px', left: '0px'}}>
                {props.errorMessage && 
                            <Alert severity="error" onClose={() => props.setErrorMessage(null)}>
                                {props.errorMessage}
                            </Alert>}
                </div> */}
                
                <Wrapper>
                    {/* Display the appropriate form header */}
                    {props.formType === 'signup' ? <h2 style={{ color: "White", borderBottom: "2px solid black" }}>Sign Up</h2> : <h2 style={{ color: "White", borderBottom: "2px solid black" }}>Sign In</h2>}
                    {/* perform the mutation when a user submits the form */}
                    <Form onSubmit={onSubmit}>
                        {props.formType === 'signup' && (
                            <React.Fragment>
                                <label htmlFor="username">Username:</label>
                                <input
                                    required
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="username"
                                    onChange={onChange}
                                />
                            </React.Fragment>
                        )}
                        <label htmlFor="email">Email:</label>
                        <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            onChange={onChange}
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            required
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={onChange}
                        />
                        <Button type="submit">Submit</Button>
                    </Form>
                </Wrapper>
            </Container>
        </Home>
    );
};
export default UserForm;