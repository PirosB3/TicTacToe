var events = require('events');

var generateRandomID = function() {
	var pool = [];
	return function() {
		var num = Math.floor(Math.random()*1001);
		if (pool.indexOf(num) != -1)
			return this();
		pool.push(num);
		return num;
	}
}()

function Board() {
	events.EventEmitter.call(this);

	id = generateRandomID();

	board = (function(){
		var b = [];
		for(var i=0; i < 9; i++)
			b[i] = null;
		return b;
	});
	lastMoved = null;
	players = [];

	// define methods
	this.getID = function() {
		return id;
	};
	this.getBoard = function() {
		return board;
	};
	this.makeMove = function(action) {

		var playerID = action.id;
		if (players.indexOf(playerID) == -1)
			return false;
		if (lastMoved == playerID)
			return false;
		if (board[action.move] != null)
			return false;
		
		board[action.move] = playerID;
		lastMoved = playerID;

		this.emit('statusChanged', board);
		

		return board;
	};
	this.generatePlayer = function() {
		if (players.length >= 2)
			return null;
		var p = new Player(id);
		players.push(p.getID().playerID);
		return p;	
	};
}

Board.prototype = new events.EventEmitter();

function Player(boardID) {
	var id = generateRandomID();
	this.getID = function() {
		return {
			playerID: id,
			boardID: boardID
		}
	}
}

exports.Player = Player;
exports.Board = Board;