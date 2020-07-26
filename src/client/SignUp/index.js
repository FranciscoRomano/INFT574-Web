//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import './styles.css'
// Requirements
import React from 'react'
import Firebase from '../../server/Firebase'
// Material UI - core
import { Avatar, Button, Paper, TextField, Typography } from '@material-ui/core'
// Material UI - icons
import ChatIcon from '@material-ui/icons/Chat'

//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class SignUp extends React.Component {

	constructor(props) {
		super(...arguments);
		this.state = { name: '', email: '', password: '', error: '' };
	};

	render() {
		return (
			<Paper className="app-signup">
				<div className="app-signup-head">
					<Avatar > <ChatIcon /> </Avatar>
					<Typography variant="h4"> SIGN UP </Typography>
					<Typography variant="subtitle2"> INFT574 Messaging App </Typography>
				</div>
				<form className="app-signup-form">
					<Typography variant="body1" className="app-signin-form-error"> {this.state.error} </Typography>
					<TextField required label="Name" variant="outlined" value={this.state.name} onChange={this.onChangeNameTextField.bind(this)} />
					<TextField required label="Email" variant="outlined" type="email" value={this.state.email} onChange={this.onChangeEmailTextField.bind(this)} />
					<TextField required label="Password" variant="outlined" type="password" value={this.state.password} onChange={this.onChangePasswordTextField.bind(this)} />
					<Button variant="contained" size="large" type="submit" onClick={this.onClickSubmit.bind(this)}> SUBMIT </Button>
					<Button variant="outlined" size="large" onClick={this.onClickBack.bind(this)}> BACK </Button>
				</form>
			</Paper>
		);
	}

	onClickBack(e) {
		this.props.history.replace('/');
	};

	onClickSubmit(e) {
		e.preventDefault();
		console.log("FIREBASE :: signing up...");
		Firebase.SignUp(this.state.name, this.state.email, this.state.password).then(() => {
			console.log("FIREBASE :: sign up was successful!");
			this.props.history.replace('/game');
		}).catch(error => {
			this.setState({ error: error.message });
			console.error("FIREBASE ERROR :: sign up was unsuccessful!", error);
		});
	};

	onChangeNameTextField(e) {
		this.setState({ name: e.target.value });
	};

	onChangeEmailTextField(e) {
		this.setState({ email: e.target.value });
	};

	onChangePasswordTextField(e) {
		this.setState({ password: e.target.value });
	};

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//