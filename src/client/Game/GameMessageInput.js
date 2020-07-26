//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import "./GameMessageInput.css"
// Requirements
import React from 'react'
import FirebaseMessages from '../../server/FirebaseMessages'
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
				<input type="text" value={this.state.input} placeholder="Message..." onChange={this.onInputChange.bind(this)}/>
				<button type="submit" onClick={this.onButtonClick.bind(this)}></button>
			</form>
		);
    };

    onButtonClick(e)
    {
        e.preventDefault();
		if (this.state.input.length) {
			FirebaseMessages.Send(this.state.input);
			this.setState({ input: '' });
		}
    };
    
    onInputChange(e)
    {
		e.preventDefault();
        this.setState({ "input": e.target.value });
    };
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//