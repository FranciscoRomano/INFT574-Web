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
var status = GAME_STATUS_START;
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
		if (Math.sqrt(Snake.length) == (level + 3))
		{
			SnakeManager.score *= ++level;
			speed = Math.max(speed / 1.25, 0.05);
			Events.Release();
			Events.Interval(OnGameUpdate, speed * 1000);
			Events.Listener(window, "keydown", OnKeyboardDown);
		}
		
		score = SnakeManager.score;
		if (update_callback) update_callback();
	}
};

function OnKeyboardDown(e)
{
	e.preventDefault();
	if (e.repeat) return;

	SnakeManager.OnKeyDownEvent(e);
	if (e.keyCode == 27)
	{
		status = GAME_STATUS_PAUSED;
		status_callback();
	}
};

export default class Game extends React.Component {

	constructor(props) {
		super(...arguments);
		//this.state = { status: "won" };
		//this.state = { status: "lost" };
		this.state = { status: GAME_STATUS_START };
		this.score_p = React.createRef();
		this.level_p = React.createRef();
		this.graphics_div = React.createRef();
		this.pause_menu_div = React.createRef();
	};

	render() {
		return (
			<div id="snake-game" ref={this.graphics_div}>
				<p className="title"> SNAKE </p>
				<p className="stand"> PRESS "ESCAPE" TO PAUSE </p>
				<p className="level" ref={this.level_p}> LEVEL : {level} </p>
				<p className="score" ref={this.score_p}> SCORE : {score} </p>
				<div id="pause-menu" ref={this.pause_menu_div}>
					PAUSE
					<input type="button" value="RESUME" onClick={this.onPauseMenuResumeClick.bind(this)}/>
					<input type="button" value="RESTART"/>
					<input type="button" value="LEADERBOARD"/>
				</div>
			</div>
		);
	};

	onUpdateCallback()
	{
		this.level_p.current.innerHTML = "LEVEL : " + level;
		this.score_p.current.innerHTML = "SCORE : " + score;
	};

	onStatusCallback()
	{
		if (SnakeManager.IsGameOver()) {
			Events.Release();
		}

		if (status == GAME_STATUS_PAUSED)
		{
			Events.Release();
			this.pause_menu_div.current.className = "show";
		}
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

	onPauseMenuResumeClick() {
		this.pause_menu_div.current.className = "";
		Events.Release();
		Events.Interval(OnGameUpdate, speed * 1000);
		Events.Listener(window, "keydown", OnKeyboardDown);
	};
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//