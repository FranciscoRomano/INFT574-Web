import React from 'react'
import Firebase from '../../server/Firebase'
/*
import { withRouter } from 'react-router-dom';

import FirebaseMessages from '../../server/FirebaseMessages'

import { Typography, Paper, Avatar, CircularProgress, Button, CardMedia, CardContent, Toolbar } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'



import { makeStyles } from '@material-ui/core/styles';


import { Alert } from '@material-ui/lab';
import Card from '@material-ui/core/Card';

import InputBase from '@material-ui/core/InputBase';

import SendIcon from '@material-ui/icons/Send';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import BottomNavigation from '@material-ui/core/BottomNavigation';
*/

import "./styles.css"
import ChatHead from "./ChatHead"
import ChatInput from "./ChatInput"
import ChatMessages from "./ChatMessages"

export default class Chat extends React.Component {

	render() {
		if (!this.checkUserStatus()) return null;
		return (
			<div>
				<ChatHead {...this.props}/>
				<ChatInput/>
				<ChatMessages/>
			</div>
		);
	};

	checkUserStatus() {
		if (!Firebase.User) {
			console.warn("FIREBASE :: you have been signed out!");
			this.props.history.replace('signin');
			return false;
		}
		return true;
	};

};