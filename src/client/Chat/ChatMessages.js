//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import "./ChatMessages.css"
import ChatMessage from "./ChatMessage"
// Requirements
import React from 'react'
import FirebaseMessages from '../../server/FirebaseMessages'

//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class ChatMessages extends React.Component {

	constructor(props) {
		super(...arguments);
		this.state = { messages: [] };
	};

	render() {
		return (
			<div className="app-chat-messages">
				{ this.state.messages.map((json, index) => { return (
					<ChatMessage key={index} username={json.username} message={json.message} />
				) }) }
			</div>
		);
	};

	onMsgSnapshot(snapshot) {
		let temp = [];
		snapshot.forEach(doc => { temp.push(doc.data()); });
		this.setState({ messages: temp.sort((a, b) => a.timestamp - b.timestamp) });
	};

	componentDidMount() {
		// register firebase snapshot
		this.snapshot_handle = FirebaseMessages.OnSnapshot(this.onMsgSnapshot.bind(this));
	};
	
	componentWillUnmount() {
		// unregister firebase snapshot
		this.snapshot_handle();
	};

};