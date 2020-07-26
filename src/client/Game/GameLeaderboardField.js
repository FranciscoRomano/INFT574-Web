//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import './GameLeaderboardField.css'
// Requirements
import React from 'react'
import Firebase from '../../server/Firebase';
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class GameLeaderboardField extends React.Component
{
    render()
    {
        let tag = this.props.data.userId === Firebase.UserId ? "selected" : "";
		return (
			<div id="INFT574-game-leaderboard-field" className={tag}>
				<p> {this.props.data.rank} </p>
                <p> {this.props.data.name} </p>
                <p> {this.props.data.score} </p>
			</div>
		);
	};
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//