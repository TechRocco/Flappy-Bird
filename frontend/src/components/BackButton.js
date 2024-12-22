import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigates to the previous page in the history stack
  };

  return (
    <IconButton onClick={handleBack} aria-label="go back" color="dark">
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;