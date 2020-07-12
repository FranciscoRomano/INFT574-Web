//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import './styles.css'
import Chat from '../Chat'
import SignIn from "../SignIn"
import SignUp from "../SignUp"
// Requirements
import React from 'react'
import Firebase from '../../server/Firebase'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Material UI - core
import { CssBaseline, CircularProgress } from '@material-ui/core'

//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class App extends React.Component {

	constructor(props) {
		super(...arguments);
		this.state = { ready: false };

		Firebase.IsInitialized().then(() => {
			this.setState({ ready: true });
		});
	};

	render() {

		if (!this.state.ready) return (<div id="loader"><CircularProgress /></div>);

		return (
			<div>
				<CssBaseline />
				<Router>
					<Switch>
						<Route exact path="/" component={Chat} />
						<Route exact path="/signin" component={SignIn} />
						<Route exact path="/signup" component={SignUp} />
					</Switch>
				</Router>
			</div>
		);
	}

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//