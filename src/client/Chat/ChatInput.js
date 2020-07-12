//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import "./ChatInput.css"
// Requirements
import React from 'react'
import FirebaseMessages from '../../server/FirebaseMessages'
// Material UI - core
import { Card, InputBase, IconButton } from '@material-ui/core';
// Material UI - icons
import SendIcon from '@material-ui/icons/Send';

//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class ChatInput extends React.Component {

	constructor(props) {
		super(...arguments);
		this.state = { input: '' };
	};

	render() {
		return (
			<Card className="app-chat-input" component="form">
				<InputBase style={{flexGrow: 1}} value={this.state.input} placeholder="Send Message..." onChange={this.onMsgChange.bind(this)} />
				<IconButton type="submit" onClick={this.onMsgSubmit.bind(this)}> <SendIcon/> </IconButton>
			</Card>
		);
	};

	onMsgChange(e) {
		e.preventDefault()
		this.setState({ input: e.target.value });
	};

	onMsgSubmit(e) {
		e.preventDefault();
		if (this.state.input.length) {
			console.log('FIREBASE :: sending message...');
			FirebaseMessages.Add(this.state.input).then(() => {
				console.log('FIREBASE :: send message was successful!')
			}).catch((error) => {
				console.error('FIREBASE ERROR : send message was unsuccessfull!', error)
			});
			this.setState({ input: '' });
		}
	};
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//