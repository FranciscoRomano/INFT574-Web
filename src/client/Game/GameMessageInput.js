//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import "./GameMessageInput.css"
// Requirements
import React from 'react'
import FirebaseMessages from '../../server/FirebaseMessages'
import SendIcon from '@material-ui/icons/Send';

//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class GameMessageInput extends React.Component
{

    constructor()
    {
		super(...arguments);
		this.state = { "input": "" };
	};

    render()
    {
		return (
			<form id="INFT574-game-message-input">
				<input type="text" value={this.state.input} placeholder="message..." onChange={this.onInputChange.bind(this)}/>
				<button type="submit" onClick={this.onButtonClick.bind(this)}> <SendIcon/> </button>
			</form>
		);
    };

    onButtonClick(e)
    {
        e.preventDefault();
		if (this.state.input.length) {
			console.log('FIREBASE :: sending message...');
			FirebaseMessages.Send(this.state.input).then(() => {
				console.log('FIREBASE :: send message was successful!')
			}).catch((error) => {
				console.error('FIREBASE ERROR : send message was unsuccessfull!', error)
			});
			this.setState({ input: '' });
		}
    }
    
    onInputChange(e)
    {
		e.preventDefault();
        this.setState({ "input": e.target.value });
    }

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//