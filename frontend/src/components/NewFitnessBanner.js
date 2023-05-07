import React, { useEffect } from 'react'
import { Box, Stack, Typography, Button } from '@mui/material';
import anime from 'animejs';
 import styles from './New-Hero-Banner/nh-banner.css'
import Navbar from './New_navbar';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const NewFitnessBanner = () => {

    const navigate = useNavigate();

    const changePage=()=>{
      navigate("/exercisespage");
    }

  return (
    <div className="section-wrapper">
      <Navbar />
      <div className="container">
        <div className="container-main w-100" >
          <div className="w-77 color-white fitness-text">
            <div className='fitness f-text'>FITNESS</div>
            <div className='fitness first-text'>FIRST</div>
          </div>
          <div className="w-20 text-smile color-white">
            <div className='w-100 '>Go</div>
            <div className='w-100 '>SWEAT</div>
            <div className='w-100 '>SMILE</div>
            <div className='w-100 '>REPEAT</div>
          </div>
        </div>

        <div className="button-st">
          <button className="button-end mt-2" href="#exercises"  onClick={changePage}>Explore</button>
        </div>
      </div>
    </div>
  )
}

export default NewFitnessBanner