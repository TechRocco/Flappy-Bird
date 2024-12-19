import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import SignUp from './signup';
import SignIn from './signin';
import PrivateRoute from '../components/PrivateRoute';
import HomeScreen from '../Screen/HomeScreen';
import GameScreen from '../Screen/GameScreen';
import MyProfile from '../Screen/MyProfile'
import Leaderboard from '../Screen/Leaderboard'
import GameOver from '../Screen/GameOver';
import styled from 'styled-components';




let Pages = () => {
    return (
        
        <Router>
            
                <Routes>
                    {/* public routes */}
                    <Route exact path="/" element={<HomeScreen />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    {/* <Route path="/game" element={<GameScreen />} />

                    <Route path="/profile" element={<MyProfile />} />

                    <Route path="/Leaderboard" element={<Leaderboard />} />
                    <Route path="/gameover" element={<GameOver />} /> */}



                    {/* private routes */}
                    <Route path="/game" element={<PrivateRoute />}>
                        <Route path="/game" element={<GameScreen />} />
                    </Route>
                    <Route path="/profile" element={<PrivateRoute />}>
                        <Route path="/profile" element={<MyProfile />} />
                    </Route>
                    <Route path="/leaderboard" element={<PrivateRoute />}>
                        <Route path="/leaderboard" element={<Leaderboard />} />
                    </Route>
                    <Route path="/gameover" element={<PrivateRoute />}>
                        <Route path="/gameover" element={<GameOver />} />
                    </Route>
                </Routes>
           
        </Router>
    );
}


export default Pages;