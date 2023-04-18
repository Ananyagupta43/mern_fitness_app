import React, { useState } from 'react'
import { Box } from '@mui/system';
import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';
import NewHeroBanner from '../components/New-Hero-Banner/nhbanner';

const Home = () => {
  return (
    <Box>
      <NewHeroBanner />
      <Exercises />

    </Box>
  )
}

export default Home;