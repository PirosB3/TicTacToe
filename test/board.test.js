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
	test.equal('idle', b.getStatus());

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

	var called = false;
	b.on('statusChanged', function(e){
		test.equal('playing', e.status);
		called = true;
	});
	b.makeMove({
		id: player1.getID().playerID,
		move: 5
	});

	test.ok(called);
	test.done();
}

exports.testBoardAlgoVertical = function(test){

	var b = new board.Board();
	var p1 = b.generatePlayer().getID().playerID;
	var p2 = b.generatePlayer().getID().playerID;

	b.makeMove({
		id: p1,
		move: 1
	});

	b.makeMove({
		id: p2,
		move: 2
	});

	b.makeMove({
		id: p1,
		move: 4
	});

	b.makeMove({
		id: p2,
		move: 3
	});

	b.makeMove({
		id: p1,
		move: 7
	});

	// ended: 1,4,7
	test.equal('ended', b.getStatus());
	test.done();
}

exports.testBoardAlgoHorizontal = function(test){

	var b = new board.Board();
	var p1 = b.generatePlayer().getID().playerID;
	var p2 = b.generatePlayer().getID().playerID;

	b.makeMove({
		id: p1,
		move: 6
	});

	b.makeMove({
		id: p2,
		move: 2
	});

	b.makeMove({
		id: p1,
		move: 7
	});

	b.makeMove({
		id: p2,
		move: 3
	});

	b.makeMove({
		id: p1,
		move: 8
	});

	// ended: 6,7,7
	test.equal('ended', b.getStatus());
	test.done();
}

exports.testBoardAlgoDiagonal = function(test){

	var b = new board.Board();
	var p1 = b.generatePlayer().getID().playerID;
	var p2 = b.generatePlayer().getID().playerID;

	b.makeMove({
		id: p1,
		move: 6
	});

	b.makeMove({
		id: p2,
		move: 8
	});

	b.makeMove({
		id: p1,
		move: 7
	});

	b.makeMove({
		id: p2,
		move: 4
	});

	b.makeMove({
		id: p1,
		move: 1
	});

	b.makeMove({
		id: p2,
		move: 0
	});

	// ended: 8,4,0
	test.equal('ended', b.getStatus());
	test.done();
}

exports.testPlayer = function(test){
	var p = new board.Player("a_board_id");
	var id = p.getID();
	test.equal("a_board_id", id.boardID);
	test.done()
}