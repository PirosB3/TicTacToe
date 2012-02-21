var board = require('../board.js');

exports.testBoard = function(test){
	var b = new board.Board();
	test.ok(b.getID());
	var p = b.generatePlayer();
	test.equal(p.getID().boardID, b.getID());

	test.ok(b.generatePlayer());
	test.ok(!b.generatePlayer());
	test.done()
}

// exports.testPlayer = function(test){
// 	var p = new board.Player("a_board_id");
// 	var id = p.getID();
// 	test.equal("a_board_id", id.boardID);
// 	test.done()
// }