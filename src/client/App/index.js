//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Game from '../Game'
import SignIn from "../SignIn"
import SignUp from "../SignUp"
// Requirements
import React from 'react'
import Firebase from '../../server/Firebase'
import { CssBaseline } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

class Home extends React.Component
{
	render()
	{
		return null;
	};

	componentDidMount()
	{
		if (Firebase.User) Firebase.SignOut();
		this.props.history.replace('signin');
	};
};

export default class App extends React.Component
{
	render()
	{
		return (
			<div>
				<CssBaseline />
				<Router basename={process.env.PUBLIC_URL}>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/game" component={Game} />
						<Route path="/signin" component={SignIn} />
						<Route path="/signup" component={SignUp} />
					</Switch>
				</Router>
			</div>
		);
	};
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//