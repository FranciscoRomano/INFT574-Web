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
		this.state = { name: '', email: '', password: '' };
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
					<TextField required label="Name" variant="outlined" value={this.state.name} onChange={this.onChangeNameTextField.bind(this)} />
					<TextField required label="Email" variant="outlined" value={this.state.email} onChange={this.onChangeEmailTextField.bind(this)} />
					<TextField required label="Password" variant="outlined" type="password" value={this.state.password} onChange={this.onChangePasswordTextField.bind(this)} />
					<Button variant="contained" size="large" type="submit" onClick={this.onClickSubmit.bind(this)}> SUBMIT </Button>
					<Button variant="outlined" size="large" onClick={this.onClickBack.bind(this)}> BACK </Button>
				</form>
			</Paper>
		);
	}

	onClickBack(e) {
		this.props.history.replace('signin');
	};

	onClickSubmit(e) {
		e.preventDefault();
		console.log("FIREBASE :: signing up...");
		Firebase.SignUp(this.state.name, this.state.email, this.state.password).then(() => {
			console.log("FIREBASE :: sign up was successful!");
			this.props.history.replace('/');
		}).catch(error => {
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


/*




import React, { useState } from 'react'
import Firebase from '../../server/Firebase'

import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'


const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

function SignUp(props) {

	const { classes } = props

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	if(Firebase.User) { props.history.replace('/'); return null; };

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign Up
       			</Typography>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false }>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="name">Name</InputLabel>
						<Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email</InputLabel>
						<Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
					</FormControl>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={OnSignUp}
						className={classes.submit}>
						SUBMIT
          			</Button>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/signin"
						className={classes.submit}>
						BACK
          			</Button>
				</form>
			</Paper>
		</main>
	)

	async function OnSignUp() {
		try {
			await Firebase.SignUp(name, email, password)
			props.history.replace('/')
		} catch(error) {
			alert(error.message)
		}
	}
}

export default withRouter(withStyles(styles)(SignUp))
*/