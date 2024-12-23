import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import HighScoreFeed from '../components/HighscoreFeed';
import React, { useEffect } from 'react';
import BackButton from '../components/BackButton';
import { toast } from 'react-toastify';
import { GET_LEADERBOARD } from '../gql/query';


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



const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: auto;
  color: rgb(155, 236, 241);
  background-color: rgb(19, 18, 18); 
  position: sticky; 
  top: 0; 
  z-index: 10; 
  border-bottom: 2px solid rgba(34, 29, 29, 0.57);
`;

const LeaderboardDiv = styled.div`
  max-width: 100%;
  max-height: 300px; 
  margin: 10% 20%;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid black;
  border-radius: 5px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;




const P = styled.p`
margin: 0;                     
font-size: 16px; 
`;

const H1 = styled.h1`
    text-align: center; 
    border: 2px solid black;
    background-color: black;
    border-radius: 50px;
    color: wheat;
    width: 242px;
    padding: 5px; 
    margin: 0 auto; 
     margin-top: 20%;
    display: block; 
`;


let Leaderboard = () => {

  useEffect(() => {
    document.title = 'Leaderboard — FlappyBird';
  })
    const {loading, error, data} = useQuery(GET_LEADERBOARD);
    if (loading) {
        console.log('Loading...', loading);
        return <p>Loading...</p>;
      }
      if (error) {
        console.log(error);
        toast(`Leaderboard Updation Failed!: ${error}` , { type: "error" });
      }
      // toast("Leaderboard Updated", { type: "success" });
      console.log('Data:', data.getLeaderboard);
    return (
      <Home>
      <Container>
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <BackButton />
      </div>
        <H1>
        Leaderboard
      </H1>
      <LeaderboardDiv>
        <Heading>
            <P>Username</P>
            <P>HighScore</P>
        </Heading>
        <HighScoreFeed players={data.getLeaderboard}/>
        </LeaderboardDiv>
        {/* <List>
            <img
                // src={xyz}
                alt='{xyz} avatar'
                height="50px"
            />
        </List> */}
        </Container>
        </Home>
    );
}

export default Leaderboard;




// import { gql, useSubscription } from '@apollo/client';
// import styled from 'styled-components';
// import HighScoreFeed from '../components/HighscoreFeed';
// import React from 'react';
// import BackButton from '../components/BackButton';

// const Home = styled.div`
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Container = styled.div`
//   background-image: url("./images/background-day.png");
//   background-repeat: no-repeat;
//   background-size: 400px 600px;
//   width: 400px;
//   height: 600px;
//   position: relative;
//   overflow: hidden;
//   border: 2px solid black;
// `;

// const Heading = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 10px;
//   margin: auto;
//   background-color: rgba(255, 255, 255, 0.57);
//   position: sticky;
//   top: 0;
//   z-index: 10;
//   border-bottom: 2px solid rgba(34, 29, 29, 0.57);
// `;

// const LeaderboardDiv = styled.div`
//   max-width: 100%;
//   max-height: 300px;
//   margin: 10% 20%;
//   background-color: rgba(0, 0, 0, 0.2);
//   border: 2px solid black;
//   border-radius: 5px;
//   overflow: auto;

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// const P = styled.p`
//   margin: 0;
//   font-size: 16px;
// `;

// const H1 = styled.h1`
//   text-align: center;
//   border: 2px solid black;
//   background-color: black;
//   border-radius: 50px;
//   color: wheat;
//   width: 242px;
//   padding: 5px;
//   margin: 0 auto;
//   margin-top: 20%;
//   display: block;
// `;

// // GraphQL Subscription to listen for leaderboard updates
// const LEADERBOARD_SUBSCRIPTION = gql`
//   subscription {
//     leaderboardUpdates {
//       id
//       username
//       highScore
//       email
//     }
//   }
// `;

// const Leaderboard = () => {
//   // Use subscription to get real-time updates for leaderboard
//   const { loading, error, data } = useSubscription(LEADERBOARD_SUBSCRIPTION);

//   if (loading) {
//     return <p>Loading...</p>;
//   }
//   if (error) {
//     console.error(error);
//     return <p>Error!</p>;
//   }

//   // Log the updated data for debugging
//   console.log('Leaderboard Data:', data);

//   return (
//     <Home>
//       <Container>
//         <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
//           <BackButton />
//         </div>
//         <H1>Leaderboard</H1>
//         <LeaderboardDiv>
//           <Heading>
//             <P>Username</P>
//             <P>HighScore</P>
//           </Heading>
//           {/* Pass the updated players list to the HighScoreFeed component */}
//           <HighScoreFeed players={data?.leaderboardUpdates || []} />
//         </LeaderboardDiv>
//       </Container>
//     </Home>
//   );
// };

// export default Leaderboard;
