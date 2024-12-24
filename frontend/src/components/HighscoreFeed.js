import React from 'react';
import Player from './Player';

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