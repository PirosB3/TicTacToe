var events = require('events');

var generateRandomID = function () {
        var pool = [];
        return function () {
            var num = Math.floor(Math.random() * 1001);
            if (pool.indexOf(num) != -1) return this();
            pool.push(num);
            return num;
        }
    }()

    function Board() {
        events.EventEmitter.call(this);
        var id = generateRandomID();

        var board = (function () {
            var b = [];
            for (var i = 0; i < 9; i++)
            	b[i] = null;
            return b;
        })();
        var lastMoved = null;
        var players = [];
        var status = {status: 'idle'};

        // define methods
        var gameFinished = function () {

                for (var i = 0; i < 9; i += 3) {
                    if ((board[i] == lastMoved) && (board[i + 1] == lastMoved) && (board[i + 2] == lastMoved)) return true;
                }

                // check vertical
                for (var i = 0; i < 3; i++) {
                    if ((board[i] == lastMoved) && (board[i + 3] == lastMoved) && (board[i + 6] == lastMoved)) return true;
                }

                // check diagonal
                if (board[4] == lastMoved) {
                    if ((board[0] == lastMoved) && (board[8] == lastMoved)) return true;

                    if ((board[2] == lastMoved) && (board[6] == lastMoved)) return true;
                }
                return false;
            }
        
        var getID = function () {
            return id;
        };
        var getBoard = function () {
            return board;
        };
        var getStatus = function () {
            return status;
        }
        var makeMove = function (action) {

            var playerID = action.id;
            var move = action.move;

            if (players.indexOf(playerID) == -1) return false;
            if (lastMoved == playerID) return false;
            if (board[move] != null) return false;
            if ((move < 0) || (move > 8)) return false;

            board[move] = playerID;
            lastMoved = playerID;

            if (gameFinished()) {
            	status['status'] = 'ended';
            	status['winner'] = playerID; 
            } else {
            	status['status'] = 'playing';
            }
            this.emit('statusChanged', {board: board, status: status});
            return board;
        };
        var generatePlayer = function () {
            if (players.length >= 2) return null;
            var p = new Player(id);
            players.push(p.getID().playerID);
            return p;
        };

        this.getID = getID;
        this.getBoard = getBoard;
        this.getStatus = getStatus;
        this.makeMove = makeMove;
        this.generatePlayer = generatePlayer;
    }

Board.prototype = new events.EventEmitter();

function Player(boardID) {
    var id = generateRandomID();
    this.getID = function () {
        return {
            playerID: id,
            boardID: boardID
        }
    }
}

exports.Player = Player;
exports.Board = Board;