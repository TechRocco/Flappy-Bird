import React from 'react';
import Player from './Player';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const HighScoreFeed = ( {players} ) => {
    return (
        <div>
            {players.map(player => (
                <div key={player.id}>
                    <Player player={player} />
                </div>
            ))}
        </div>
    );
};
export default HighScoreFeed;