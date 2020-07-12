// import './styles.css'
// import Chat from '../Chat'
// import SignIn from "../SignIn"
// import SignUp from "../SignUp"
// // Requirements
// import React, { useState, useEffect } from 'react'
// import Firebase from '../../server/Firebase'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// // Material UI - core
// import { CssBaseline, CircularProgress } from '@material-ui/core'

// export default function App() {

// 	const [firebaseInitialized, setFirebaseInitialized] = useState(false)

// 	useEffect(() => {
// 		Firebase.IsInitialized().then(val => {
// 			setFirebaseInitialized(val)
// 		})
// 	})


// 	return firebaseInitialized !== false ? (
// 		<div>
// 			<CssBaseline />
// 			<Router>
// 				<Switch>
// 					<Route path="/signin" component={SignIn} />
// 					<Route path="/signup" component={SignUp} />
// 					<Route path="/" component={Chat} />
// 				</Switch>
// 			</Router>
// 		</div>
// 	) : <div id="loader"><CircularProgress /></div>
// }



//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import './styles.css'
import Chat from '../Chat'
import SignIn from "../SignIn"
import SignUp from "../SignUp"
// Requirements
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Material UI - core
import { CssBaseline } from '@material-ui/core'

//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class App extends React.Component {

	render() {

		return (
			<div>
				<CssBaseline />
				<Router basename={process.env.PUBLIC_URL}>
					<Switch>
						<Route exact path="/"       component={SignIn} />
						<Route exact path="/chat"   component={Chat}   />
						<Route exact path="/signup" component={SignUp} />
					</Switch>
				</Router>
			</div>
		);
	};

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//