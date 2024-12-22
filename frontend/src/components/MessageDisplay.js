import React from "react";
import styled from "styled-components";
import { Alert } from "@mui/material";

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
const MessageDisplay = (props) => {
    return(
        <Home>
            <Container>

                {props.error && <Alert severity="error">{props.error}</Alert>}
                {props.success && <Alert severity="success">{props.success}</Alert>}
                
            </Container>
        </Home>
    )
};

export default MessageDisplay;