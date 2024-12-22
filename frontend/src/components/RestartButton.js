import React from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReplayCircleFilledOutlinedIcon from '@mui/icons-material/ReplayCircleFilledOutlined';

const RestartButton = () => {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate('/game'); // Navigates to the game page
  };

  return (
    <IconButton onClick={handleRestart} aria-label="restart" color="dark">
      <ReplayCircleFilledOutlinedIcon sx={{ fontSize: "55px", color: "black" }} />
    </IconButton>
  );
};

export default RestartButton;