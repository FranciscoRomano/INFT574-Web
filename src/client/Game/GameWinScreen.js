//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import './styles.css'
// Requirements
import React from 'react'
import Float2 from './classes/Float2';
import SnakeBoard from './classes/SnakeBoard';
import Events from './classes/Events';

//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/** @type { SnakeBoard } */
var board;

var score;
var speed;
var level;
var width;
var length;
let moves = [];

let count 

let win_callback = null;
let lose_callback = null;


function AddMove(xy) {
	if (moves.length == 2) moves.splice(0, 1);
	moves.push(xy);
}

function GetMove() {
	let t = moves.length ? moves.splice(0, 1)[0] : board.n_direction;
	return t;
}

function GameLoad(e) {

	level = 4;
	score = 0;
	width = 1;
	speed = 0.3;
	length = board.cols * board.rows;

	moves = [];
	board.load();
	Events.Interval(GameTick, speed * 1000);
	Events.Listener(window, "keydown", GameMove);
	Events.Listener(window, "keypress", GameMove);
}

function GameTick(e) {

	board.move(GetMove());
	if (!board.tick()) {
		Events.Release();
		lose_callback();
	}
	else if ((level + width) == board.snake_tiles.length) {
		level += 2;
		speed = (speed / 5) * 4;
		width = board.snake_tiles.length;
		Events.Release({ method: GameTick });
		Events.Interval(GameTick, speed * 1000);
	}
	else if ((board.snake_tiles.length) >= board.grid.blocks.length) {
		board.tick();
		Events.Release();
		win_callback();
	}
}

function GameMove(e) {
	e.preventDefault();
	if (e.repeat) return;
	if ((e.keyCode == 87 || e.keyCode == 38)) AddMove(new Float2(0, -1));
	if ((e.keyCode == 83 || e.keyCode == 40)) AddMove(new Float2(0,  1));
	if ((e.keyCode == 65 || e.keyCode == 37)) AddMove(new Float2(-1, 0));
	if ((e.keyCode == 68 || e.keyCode == 39)) AddMove(new Float2( 1, 0));
}

export default class GameWinScreen extends React.Component {


	
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//