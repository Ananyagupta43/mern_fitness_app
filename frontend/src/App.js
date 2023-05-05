import React from 'react';
import { Box } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/New_navbar';
import Home from './pages/Home';
import ExerciseDetails from './pages/ExerciseDetails'
import Footer from './components/Footer';
import Login from './pages/login/Login';
import SignUp from "./pages/Signup";
import ExercisesPage from "./pages/exercise_page/ExercisesPage";
import GetStarted from './pages/GetStarted';
import Signout from './pages/Signout';
const App = () => {
  return (
    <Box width="400px" sx={{ width: { xl: '1536px' } }} m="auto" className="main-container" >
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/exercise/:id" element={<ExerciseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/exercisespage" element={<ExercisesPage />} />
        <Route path="/Getstarted" element={<GetStarted />} />
        <Route path="/logout" element={<Signout />} />
      </Routes>
      <Footer />
    </Box>
  )
}

export default App;