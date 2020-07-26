//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import "./GameMessage.css"
// Requirements
import React from 'react'
import Firebase from '../../server/Firebase'

//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class GameMessage extends React.Component
{
	render()
	{
		let tag = (this.props.data.userId == Firebase.UserId ? "selected" : "");

		return (
			<div id="INFT574-game-message" className={tag}>
				<p> {this.props.data.name}: </p>
				<p> {this.props.data.message} </p>
			</div>
		);
	};
};