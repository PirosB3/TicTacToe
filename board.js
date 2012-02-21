
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
	// define ID
	id = generateRandomID();

	// define board, players and last moved
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
		// Gets an entrance of {id: xxxxx, move: 4}

		var playerID = action.id;
		if (players.indexOf(playerID) == -1)
			return false;
		if (lastMoved == playerID)
			return false;
		if (board[action.move] != null)
			return false;
		
		board[action.move] = playerID;
		lastMoved = playerID;

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

// Unique ID
// method to spawn two players
// method to make move
// event onMoveMade