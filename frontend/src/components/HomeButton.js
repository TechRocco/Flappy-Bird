import React from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import styled from 'styled-components';


const StyledHomeIcon = styled(HomeRoundedIcon)`
  color: black;   
  transition: color 0.3s;
  border : 3px solid black;
  border-radius: 50%;
  padding: 5px;
`;



const HomeButton = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/'); // Navigates to the home page
  };

  return (
    <IconButton onClick={handleHome} aria-label="go home" color="dark">
      <StyledHomeIcon sx={{ fontSize: "40px" }} />
    </IconButton>
  );
};

export default HomeButton;