//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import "./ChatMessage.css"
// Requirements
import React from 'react'
import Firebase from '../../server/Firebase'
// Material UI - core
import { Card, Typography } from '@material-ui/core';

//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class ChatMessage extends React.Component {

	render() {

		const class_name = "app-chat-message " + (this.props.username === Firebase.Username ? "right" : "left");

		return (
			<Card className={class_name}>
				<Typography variant="subtitle2"> {this.props.username} </Typography>
				<Typography variant="body1"> {this.props.message} </Typography>
			</Card>
		);
	};

};