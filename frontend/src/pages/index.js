import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './signup';
import SignIn from './signin';
import PrivateRoute from '../components/PrivateRoute';
import HomeScreen from '../Screen/HomeScreen';
import GameScreen from '../Screen/GameScreen';
import MyProfile from '../Screen/MyProfile'
import Leaderboard from '../Screen/Leaderboard'
import GameOver from '../Screen/GameOver';


let Pages = () => {
    return (

        <Router>

            <Routes>
                {/* public routes */}
                <Route exact path="/" element={<HomeScreen />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/Leaderboard" element={<Leaderboard />} />
                <Route path="/gameover" element={<GameOver />} />


                {navigator.onLine ? (
                    <Route path="/game" element={<PrivateRoute />}>
                        <Route path="/game" element={<GameScreen />} />
                    </Route>
                ) : (
                    <Route path="/game" element={<GameScreen />} />
                )}

                {/* private routes */}
                <Route path="/profile" element={<PrivateRoute />}>
                    <Route path="/profile" element={<MyProfile />} />
                </Route>

            </Routes>

        </Router>
    );
}


export default Pages;