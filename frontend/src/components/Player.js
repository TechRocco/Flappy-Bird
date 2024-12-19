import React from "react";
import styled from "styled-components";

const Heading = styled.div`
display: flex;
  justify-content: space-between; 
  padding: 10px;
  margin: auto;
`;

const P = styled.p`
 margin: 0;                    
  font-size: 16px; 
`;

const Player = ({player}) => {

    return(
        <Heading>
            <P>{player.username}</P>
            <P>{player.highScore}</P>
        </Heading>
    )
}

export default Player;