//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import "./GameMessageBox.css"
import GameMessage from "./GameMessage"
import GameMessageInput from "./GameMessageInput"
// Requirements
import React from 'react'
import FirebaseMessages from '../../server/FirebaseMessages'
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class GameMessageBox extends React.Component
{
    constructor()
    {
		super(...arguments);
		this.state = { messages: [] };
		this.messages_ref = React.createRef();
	};

    render()
    {
		return (
			<div id="INFT574-game-messages">
				<p> CHATROOM </p>
				<div ref={this.messages_ref}> { this.state.messages.map((json, index) => { return (
					<GameMessage key={index} data={json} />
				) }) } </div>
				<GameMessageInput/>
			</div>
		);
	};

	
	componentDidMount()
	{
		// register firebase snapshot
		this.snapshot_handle = FirebaseMessages.OnSnapshot(this.onFirebaseSnapshotCallback.bind(this));
	};

	componentDidUpdate()
	{
		// scroll to bottom of messages
		var elem = this.messages_ref.current;
		elem.scrollTop = elem.scrollHeight - elem.clientHeight;
	};
	
	componentWillUnmount()
	{
		// unregister firebase snapshot
		this.snapshot_handle();
	};

	onFirebaseSnapshotCallback(snapshot)
	{
		let temp = [];
		snapshot.forEach(doc => { temp.push(doc.data()); });
		this.setState({ messages: temp.sort((a, b) => a.timestamp - b.timestamp) });
	};
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//