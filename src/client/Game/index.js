//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import './styles.css'
// Requirements
import React from 'react'
import Snake from './classes/core/Snake';
import Events from './classes/core/Events';
import Float2 from './classes/core/Float2';
import SnakeManager from './classes/SnakeManager';

const GAME_STATUS_START = 0;
const GAME_STATUS_PAUSED = 1;
const GAME_STATUS_PLAYING = 2;
const GAME_STATUS_FINISHED = 3;

//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

var speed = 0;
var score = 0;
var level = 1;
let update_callback = null;
let status_callback = null;

function OnGameReset()
{
	score = 0;
	level = 1;
	speed = 0.3;
	SnakeManager.Reset();
	Events.Interval(OnGameUpdate, speed * 1000);
	Events.Listener(window, "keydown", OnKeyboardDown);
};

function OnGameUpdate()
{
	SnakeManager.Update();

	if (SnakeManager.IsGameOver())
	{
		Events.Release();
		if (status_callback) status_callback();
	}

	if (score != SnakeManager.score)
	{
		score = SnakeManager.score;

		if (Math.sqrt(Snake.length) == (level + 3))
		{
			SnakeManager.score *= ++level;
			
			score = SnakeManager.score;
			speed = Math.max(speed / 1.25, 0.05);
			Events.Release();
			Events.Interval(OnGameUpdate, speed * 1000);
			Events.Listener(window, "keydown", OnKeyboardDown);
		}

		if (update_callback) update_callback();
	}
};

function OnKeyboardDown(e)
{
	e.preventDefault();
	SnakeManager.OnKeyDownEvent(e);
};

export default class Game extends React.Component {

	constructor(props) {
		super(...arguments);
		//this.state = { status: "won" };
		//this.state = { status: "lost" };
		this.state = { status: GAME_STATUS_START };
		this.score_h1 = React.createRef();
		this.level_h1 = React.createRef();
		this.graphics_div = React.createRef();
	};

	render() {
		return (
			<div id="web-game" ref={this.graphics_div}>
				<h1> Snake </h1>
				<p ref={this.score_h1}> Score: {score} </p>
				<p ref={this.level_h1}> Level: {level} </p>
			</div>
		);
	};

	onUpdateCallback()
	{
		this.level_h1.current.innerHTML = "Level: " + level;
		this.score_h1.current.innerHTML = "Score: " + score;
	};

	onStatusCallback()
	{
		Events.Release();
	};
    
	componentDidMount()
	{
		SnakeManager.Initiate(this.graphics_div.current, 15, 15);
		status_callback = this.onStatusCallback.bind(this);
		update_callback = this.onUpdateCallback.bind(this);
		OnGameReset();
    };

    componentWillUnmount() {
		Events.Release();
	};
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//