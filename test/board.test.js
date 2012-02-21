var board = require('../board.js');

exports.testBoard = function(test){
	var b = new board.Board();
	test.ok(b.getID());

	// get players
	var player1 = b.generatePlayer();
	test.equal(player1.getID().boardID, b.getID());
	var player2 = b.generatePlayer();

	// no more players can play
	test.ok(!b.generatePlayer());

	test.ok(b.makeMove({
		id: player1.getID().playerID,
		move: 4
	}));

	test.ok(!b.makeMove({
		id: player1.getID().playerID,
		move: 1
	}));

	test.ok(b.makeMove({
		id: player2.getID().playerID,
		move: 3
	}));

	test.ok(!b.makeMove({
		id: player1.getID().playerID,
		move: 3
	}));

	test.done()
}

exports.testPlayer = function(test){
	var p = new board.Player("a_board_id");
	var id = p.getID();
	test.equal("a_board_id", id.boardID);
	test.done()
}