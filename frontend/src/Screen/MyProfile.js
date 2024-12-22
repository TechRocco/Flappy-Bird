// import React from "react";
// import { gql, useQuery } from '@apollo/client';


// const GET_ME = gql`
// query{
//   me {
//     username
//     highScore
//     email
//     achievements {
//       id
//       name
//       unlockedAt
//       description
//     }
//   }
// }
//  `;
// const MyProfile = () => {
//     const { loading, error, data } = useQuery(GET_ME);

//     if (loading) return <p>Loading...</p>;
//     // if there is an error fetching the data, display an error message
//     if (error) {
//         console.log(error)
//         return <p>Error!</p>;
//     }

//     console.log(data);
//     return (
//         <div>
//             <p>Username: {data.me.username}</p>
//             <p>Email: {data.me.email}</p>
//             <p>HighScore: {data.me.highScore}</p>
//             <p>
//                 Achievements: 
//                  {data.me.achievements.map((ach) => (
//                     <span key={ach.id}> 
//                     <p>{`name: ${ach.name}`}</p>
//                     <p>{`description: ${ach.description}`}</p>
//                     <p>{`description: ${ach.unlockedAt}`}</p>
//                     </span>
//                 ))}
//             </p>
//             {/* <p>Username: {data.me.username}</p> */}
//         </div>
//     );
// };

// export default MyProfile;


import React from "react";
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import BackButton from "../components/BackButton";
import { GET_PROFILE } from "../gql/query";


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

// Styled components for the profile page layout
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px;
  border-radius: 10px;
  max-width: 70%;
  max-height: 70%;
  margin: 50px auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const Heading = styled.h2`
  color: #333;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const InfoItem = styled.div`
  font-size: 18px;
  color: #333;
  margin: 10px 0;
  text-align: left;
  width: 100%;
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
`;

const AchievementsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const Achievement = styled.div`
  background-color: rgba(0, 0, 0, 0.77);
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #00796b;
  color: white;
`;

const MyProfile = () => {
    const { loading, error, data } = useQuery(GET_PROFILE);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    return (

      <Home>
        <Container>
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <BackButton />
                </div>
        <ProfileContainer>
            {/* Displaying user avatar */}
            <Avatar src={data.me.avatar} alt="User Avatar" />

            {/* Displaying username */}
            <Heading>{data.me.username}</Heading>

            {/* Displaying user email */}
            <InfoItem>Email: {data.me.email}</InfoItem>

            {/* Displaying highscore */}
            <InfoItem>Highscore: {data.me.highScore}</InfoItem>

            {/* Displaying achievements */}
            <AchievementsContainer>
                <h3>Achievements</h3>
                {data.me.achievements.length > 0 ? (
                    data.me.achievements.map((ach) => (
                        <Achievement key={ach.id}>
                            <p><strong>{ach.name}</strong></p>
                            <p>{ach.description}</p>
                            <p><em>Unlocked at: {ach.unlockedAt}</em></p>
                        </Achievement>
                    ))
                ) : (
                    <p>No achievements unlocked yet!</p>
                )}
            </AchievementsContainer>
        </ProfileContainer>
        </Container>
        </Home>
    );
};

export default MyProfile;
