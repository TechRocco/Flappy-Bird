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

import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import BackButton from "../components/BackButton";
import { GET_PROFILE } from "../gql/query";
import { toast } from "react-toastify";



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
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const InfoItem = styled.div`
  font-size: 18px;
  color: wheat;
  margin: 5px 0;
  text-align: left;
  width: 100%;
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
`;

const AchievementsContainer = styled.div`
  margin-top: 5px;
  width: 100%;
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  
`;

const Badge = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);

  &:hover::after {
    content: '${(props) => props.level}';
    position: absolute;
    bottom: -30px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
  }
`;

const MedalIcon = styled.img`
  width: 70px; /* Set to the same size as the circle */
  height: 70px; /* Set to the same size as the circle */
  border-radius: 50%;
`;

const Checkmark = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  background-color: green;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
`;

const BadgeDescription = styled.div`
  position: absolute;
  top: 60px;
  background-color: white;
  color: black;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  font-size: 12px;
`;

const MyProfile = () => {
  useEffect(() => {
    document.title = `Profile — FlappyBird`;
  })
  const { loading, error, data } = useQuery(GET_PROFILE);
  const [selectedBadge, setSelectedBadge] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error){
    toast(`${error}`, {type: "error"});
  }

  const handleBadgeClick = (description) => {
    setSelectedBadge(description);
    setTimeout(() => setSelectedBadge(null), 3000); // Hide after 3 seconds
  };
  

  const highScore = data.me.highScore;

  return (
    <Home>
      <Container>
        <div style={{ position: 'relative', top: '20px', left: '20px' }}>
          <BackButton />
        </div>
        <ProfileContainer>
          <Avatar src={data.me.avatar} alt="User Avatar" />
          <Heading>{data.me.username}</Heading>
          <InfoItem>Email: {data.me.email}</InfoItem>
          <InfoItem>Highscore: {data.me.highScore}</InfoItem>
          <AchievementsContainer>
            <h3>Achievements</h3>
          </AchievementsContainer>
          <BadgeContainer>
            <Badge
              level="Bronze"
              onClick={() => handleBadgeClick("Bronze level unlocked at 5 points")}
            >
              <MedalIcon src={require("../assets/images/bronze-medal.png")} alt="Bronze Medal" />
              {highScore >= 5 && <Checkmark>✓</Checkmark>}
            </Badge>
            <Badge
              level="Silver"
              onClick={() => handleBadgeClick("Silver level unlocked at 10 points")}
            >
              <MedalIcon src={require("../assets/images/silver-medal.png")} alt="Silver Medal" />
              {highScore >= 10 && <Checkmark>✓</Checkmark>}
            </Badge>
            <Badge
              level="Gold"
              onClick={() => handleBadgeClick("Gold level unlocked at 15 points")}
            >
              <MedalIcon src={require("../assets/images/gold-medal.png")} alt="Gold Medal" />
              {highScore >= 15 && <Checkmark>✓</Checkmark>}
            </Badge>
          </BadgeContainer>
          {selectedBadge && <BadgeDescription>{selectedBadge}</BadgeDescription>}
        </ProfileContainer>
      </Container>
    </Home>
  );
};

export default MyProfile;
