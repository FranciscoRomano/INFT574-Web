//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Requirements
import React from 'react'
import EventHandler from './classes/EventHandler'
import SnakeBoard from './classes/SnakeBoard';

//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class GameCanvas extends React.Component {

	constructor(props) {
        super(...arguments);
        this.cols = props.cols || 20;
        this.rows = props.rows || 20;
		this.cellW = 8; 
		this.cellH = 8;
		this.container = React.createRef();
	};

	render() {
		return (
			<div ref={this.container} width={this.cols * this.cellW} height={this.rows * this.cellH}>
			</div>
		);
    };
    
    componentDidMount() {
		//this.ctx2D = this.canvas.current.getContext("2d");
		//this.game_grid = new GraphicsBoard(this.container.current, 20, 20, 16, 16);
		this.game_grid = new SnakeBoard(this.container.current, 20, 20, 16, 16);



		console.log("got context");
    }

    componentWillUnmount() {
        EventHandler.Release();
    }
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//