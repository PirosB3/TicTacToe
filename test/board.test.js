var board = require('../board.js');

// Array.prototype.compare = function(testArr) {
//     if (this.length != testArr.length) return false;
//     for (var i = 0; i < testArr.length; i++) {
//         if (this[i].compare) { 
//             if (!this[i].compare(testArr[i])) return false;
//         }
//         if (this[i] !== testArr[i]) return false;
//     }
//     return true;
// };

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

	// var res =  [null,
	// 			null,
	// 			null,
	// 			player2.getID().playerID,
	// 			player1.getID().playerID,
	// 			player1.getID().playerID,
	// 			null,
	// 			null,
	// 			null
	// 			];
	// test.ok(res.compare(b.getBoard()));
	test.ok(called);
	test.done();
}

exports.testPlayer = function(test){
	var p = new board.Player("a_board_id");
	var id = p.getID();
	test.equal("a_board_id", id.boardID);
	test.done()
}