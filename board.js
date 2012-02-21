
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
	id = generateRandomID();
	this.players = [];
	this.getID = function() {
		return id;
	}
}

Board.prototype.generatePlayer = function() {
	if (this.players.length >= 2)
		return null;
	var p = new Player(this.getID());
	this.players.push(p);
	return p;
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