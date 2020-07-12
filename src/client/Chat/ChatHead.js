//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import "./ChatHead.css"
// Requirements
import React from 'react'
import Firebase from '../../server/Firebase'
import FirebaseMessages from '../../server/FirebaseMessages'
// Material UI - core
import { IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
// Material UI - icons
import MenuIcon from '@material-ui/icons/Menu';

//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class ChatHead extends React.Component {

	constructor(props) {
		super(...arguments);
		this.state = { toggle: false, anchor: null }
	};

	render() {
		return (
			<div className="app-chat-head">
				<IconButton onClick={this.onMenuOpen.bind(this)}> <MenuIcon/> </IconButton>
				<Menu className="app-chat-head-menu" open={this.state.toggle} onClose={this.onMenuClose.bind(this)} anchorEl={this.state.anchor}>
					<MenuItem onClick={this.onMenuClearHistory.bind(this)}> Clear History </MenuItem>
					<MenuItem onClick={this.onMenuSignOut.bind(this)}> Sign Out </MenuItem>
				</Menu>
				<div>

				<Typography variant="h5"> Chatroom </Typography>
				</div>
			</div>
		);
	};

	onMenuOpen(e) {
		this.setState({ toggle: true, anchor: e.target });
	};

	onMenuClose(e) {
		this.setState({ toggle: false });
	};

	onMenuSignOut(e) {
		Firebase.SignOut().then(() => {
			console.log("FIREBASE :: sign out was successfull!");
			this.props.history.replace('/');
		}).catch((error) => {
			console.log("FIREBASE ERROR :: sign out was unsuccessfull!", error);
			this.props.history.replace('/');
		});
		this.setState({ toggle: false });
	};

	onMenuClearHistory(e) {
		FirebaseMessages.Get().then((snapshot) => {
			snapshot.forEach((doc) => {
				if (doc.data().username === Firebase.Username)
					doc.ref.delete();
			})
		});
		this.setState({ toggle: false });
	};

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//